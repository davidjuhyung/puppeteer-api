import puppeteer from 'puppeteer'

type AsyncReturnType<T extends (...args: any) => Promise<any>> =
    T extends (...args: any) => Promise<infer R> ? R : any

export interface PuppeteerDefinition {
  browser: AsyncReturnType<typeof puppeteer.launch>
  launch(): Promise<void>
}

export class Puppeteer implements PuppeteerDefinition {
  browser: AsyncReturnType<typeof puppeteer.launch>

  async launch(): Promise<void> {
    this.browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
    })
  }
}

export const myPuppeteer: PuppeteerDefinition = new Puppeteer()
