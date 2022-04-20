import { Next, Request, Response } from "restify"
import { myPuppeteer } from "../../puppeteer"

export const renderHTML = async (req: Request, res: Response, next: Next) => {
  const html = req.body.html
  const rWidth = req.body.width
  const rHeight = req.body.height
  const clipX = req.body.x || 0
  const clipY = req.body.y || 0


  console.log(req.body)

  const page = await myPuppeteer.browser.newPage()

  if (rWidth && rHeight) {
    await page.setViewport({
      width: rWidth,
      height: rHeight,
      deviceScaleFactor: 2,
    });
  }

  await page.setContent(html)
  await page.evaluateHandle('document.fonts.ready')

  const bodyHandle = await page.$('body');
  const { width, height } = await bodyHandle.boundingBox()
  const screenshot = await page.screenshot({
    clip: {
      x: clipX,
      y: clipY ,
      width: width - clipX,
      height: height - clipY
    },
    type: 'png'
  }) as Buffer

  res.send(screenshot)

  return next()
}
