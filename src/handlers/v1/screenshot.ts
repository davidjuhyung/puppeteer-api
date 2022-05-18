import { Next, Request, Response as ServerResponse } from "restify"
import { InternalServerError } from "restify-errors"
import { Response } from "../../consonants/response"
import { myPuppeteer } from "../../puppeteer"

export const screenshotHTML = async (req: Request, serRes: ServerResponse, next: Next) => {
  try {
    const html = req.body.html || null
    const rWidth = req.body.width || null
    const rHeight = req.body.height || null
    const clipX = req.body.x || 0
    const clipY = req.body.y || 0


    if (!html || !rWidth || !rHeight) {
      throw Error('You are missing the required parameter(s).')
    }

    const page = await myPuppeteer.browser.newPage()

    await page.setViewport({
      deviceScaleFactor: 2,
      width: rWidth,
      height: rHeight
    })

    await page.setContent(html)
    await page.evaluateHandle('document.fonts.ready')

    const bodyHandle = await page.$('body');
    const { width, height } = await bodyHandle.boundingBox()
    const screenshot = await page.screenshot({
      clip: {
        x: clipX,
        y: clipY,
        width: width - clipX,
        height: height - clipY
      },
      path: 'test.png'
    }) as Buffer

    await page.close();

    serRes.send(new Response<Buffer>(screenshot))

    return next()
  } catch (err) {
    serRes.send(new Response<Buffer>(null, err.message))
    return next(new InternalServerError(err));
  }
}
