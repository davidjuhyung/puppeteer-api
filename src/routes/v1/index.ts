import { Server } from "restify"
import { initScreenshotRoutes } from "./screenshot"

export const initRoutes = (server: Server) => {
  initScreenshotRoutes(server)
}