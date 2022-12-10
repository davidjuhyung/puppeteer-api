import restify from 'restify'
import { myPuppeteer } from './puppeteer';
import { initRoutes } from './routes/v1';

(async () => {
  const server = restify.createServer()

  server.use(restify.plugins.queryParser({
    mapParams: true
  }))

  server.use(restify.plugins.bodyParser({
    mapParams: true
  }))

  server.use(restify.plugins.acceptParser(server.acceptable))
  initRoutes(server)
  server.listen(process.env.PORT || 8080, () => {
    console.log('listening on ', process.env.PORT || 8080)
  })

  await myPuppeteer.launch()
})()

