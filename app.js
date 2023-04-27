const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const userRouter = require('./Routes/userRoutes')
const postRouter = require('./Routes/postRoutes')
const viewRouter = require('./Routes/viewRoutes')

const app = express()

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'View'));

app.use(cors())
app.options('*', cors())

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use(express.json())
app.use(cookieParser())

app.use('/', viewRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

module.exports = app