const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const app = require('./app')

const db = process.env.DATABASE.replace('<password>', process.env.PASSWORD)
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(con => console.log('success'));

const port = 8000
app.listen(port, () => {
    console.log('kuys')
})