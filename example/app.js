const express = require('express')
const path = require('path')
const fs = require('fs')
const opn = require('opn')

const app = express()

fs.copyFileSync(
  path.resolve(__dirname, `../dist/index.js`),
  path.resolve(__dirname, `./public/js/index.js`)
)

app.use(express.static(path.resolve(__dirname, './public')))

app.get('/', (res, req) => {
  res.redirect('/index.html')
})

app.listen(15566, _ => {
  console.log('listen to http://localhost:15566')
  opn('http://localhost:15566')
})