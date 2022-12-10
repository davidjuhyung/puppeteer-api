import restify, { Server } from "restify"
import { screenshotHTML } from "../../handlers/v1/screenshot"

export const initScreenshotRoutes = (server: Server) => {
  server.post('/screenshot', restify.plugins.conditionalHandler([
    { version: '1.0.0', handler: screenshotHTML },
  ]))

  server.get('/', restify.plugins.conditionalHandler([
    { version: '1.0.0', handler: (req, res, next) => {
      res.send('Welcome')
      next()
    } },
  ]))

}