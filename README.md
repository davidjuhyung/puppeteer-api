# Puppeteer Web API

Why do you need a Puppeteer Web API?
- Puppeteer Buildpack on Heroku is 200+MB in size, which takes up the half the allowed slug size on Heroku (500MB). Just to name a few frustrations:
  - https://github.com/nguyenkaos/puppeteer-heroku-buildpack/issues/1
  - https://stackoverflow.com/questions/71299185/heroku-error-compiled-slug-size-is-too-large-with-puppeteer
- Even if you managed to fit it under 500MB, the performance of the application is severely degraded with the "out of memory" error throwing every 5 seconds.
- There have not been any proposed solutions other than opting out to use a premium sofrware. Hence, I have made a dedicated Heroku server that does exactly what the Puppeteer library does, except now you do not need to install Puppeteer on your machine.

<br />

## To get a screenshot of an HTML page

### POST https://puppeteer-web-api.herokuapp.com/screenshot
### Request Body Parameters

| Parameter     | Type          | Required  | Description                                   |Default Value |
| ------------- |---------------| --------- | ----------------------------------------------|--------------------|
| html          | string        |   Yes     | The stringified HTML                          |  n/a               |
| width         | number        |   No      | The width of screenshot                       |  width of body     |  
| height        | number        |   No      | The height of screenshot                      |  height of body    |
| x             | number        |   No      | The x position of top-left corner of screenshot | 0 |
| y             | number        |   No      | The y position of top-left corner of screenshot | 0 |

### Response
Buffer

### Example
```typescript
const html = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
     Hello
    </body>
    <style>
      body {
        width: 100px;
        height: 50px;
      }
    </style>
  </html>
`
try {
  const res = await axios.post('https://puppeteer-web-api.herokuapp.com/screenshot'. {
    html,
    width: 100,
    height: 50
  })
  
  fs.writeFileSync('tmp.png', Buffer.from(res.data))

} catch (err) {
  console.log({err})
}

```
