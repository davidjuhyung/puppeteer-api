# Puppeteer Web API

## To get a screenshot of an HTML page

### POST https://puppeteer-web-api.herokuapp.com/render 
### Requesst Body Parameters

| Parameter     | Type          | Required  | Description                                   |Default Value |
| ------------- |---------------| --------- | ----------------------------------------------|--------------------|
| html          | string        |   Yes     | The stringified HTML                          |  n/a               |
| width         | number        |   Yes     | The width of HTML page that will be rendered  |    n/a             |
| height        | number        |   Yes     | The height of HTML page that will be rendered |   n/a              |
| x             | number        |   No      | The x position of the left corner of HTML page that will be rendered | 0 |
| y             | number        |   No      | The y position of the left corner of HTML page that will be rendered | 0 |

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
  const res = await axios.post('https://puppeteer-web-api.herokuapp.com/render'. {
    html,
    width: 100,
    height: 50
  })
  
  fs.writeFileSync('tmp.png', Buffer.from(res.data))

} catch (err) {
  console.log({err})
}

```
