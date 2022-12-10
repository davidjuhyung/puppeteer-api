import { Next, Request, Response as ServerResponse } from "restify"
import { InternalServerError } from "restify-errors"
import { Response } from "../../consonants/response"
import { myPuppeteer } from "../../puppeteer"

export const generatePdf = async (req: Request, serRes: ServerResponse, next: Next) => {
  try {
    const html = req.body.html || null

    if (!html) {
      throw Error('You are missing the required parameter(s).')
    }

    const page = await myPuppeteer.browser.newPage()
    await page.setContent(html);

    const pdfBuffer = await page.pdf();

    await page.close();

    serRes.send(new Response<Buffer>(pdfBuffer))

    return next()
  } catch (err) {
    serRes.send(new Response<Buffer>(null, err.message))
    return next(new InternalServerError(err));
  }
}
