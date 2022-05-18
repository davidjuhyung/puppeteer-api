import axios from "axios"
import fs from "fs"

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

const getScreenshot = async () => {
  try {
    const res = (await axios.post('http://localhost:8080/screenshot', {
      html,
      width: 100,
      height: 50,
    })).data
    
    if (res.errorMessage !== '') {
      throw new Error(res.errorMessage)
    }
  
    fs.writeFileSync('tmp.png', Buffer.from(res.data))
  
  } catch (err) {
    console.log({err})
  }
}

const getPdf = async () => {
  try {
    const res = (await axios.post('http://localhost:8080/pdf', {
      html
    })).data
    
    if (res.errorMessage !== '') {
      throw new Error(res.errorMessage)
    }
  
    fs.writeFileSync('tmp.pdf', Buffer.from(res.data))
  
  } catch (err) {
    console.log({err})
  }
}

const runTests = async () => {
  await getScreenshot()
  await getPdf()
}



(async () => runTests())()


