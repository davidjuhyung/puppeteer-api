import restify, { Server } from "restify"
import { generatePdf } from "../../handlers/v1/pdf"

export const initPdfRoutes = (server: Server) => {
  server.post('/pdf', restify.plugins.conditionalHandler([
    { version: '1.0.0', handler: generatePdf },
  ]))
}