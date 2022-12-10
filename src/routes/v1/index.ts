import { Server } from "restify"
import { initPdfRoutes } from "./pdf"
import { initScreenshotRoutes } from "./screenshot"

export const initRoutes = (server: Server) => {
  initScreenshotRoutes(server)
  initPdfRoutes(server)
}