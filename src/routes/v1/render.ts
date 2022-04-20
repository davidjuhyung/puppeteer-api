import restify, { Server } from "restify"
import { renderHTML } from "../../handlers/v1/render"

export const initRenderRoutes = (server: Server) => {
  server.post('/render', restify.plugins.conditionalHandler([
    { version: '1.0.0', handler: renderHTML },
  ]))
}