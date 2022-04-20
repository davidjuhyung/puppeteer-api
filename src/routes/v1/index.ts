import { Server } from "restify"
import { initRenderRoutes } from "./render"

export const initRoutes = (server: Server) => {
  initRenderRoutes(server)
}