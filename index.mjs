import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import {Authrouter} from './backend/routes/auth.mjs'
import morgan from 'morgan'
import {router} from './backend/posts.mjs'

dotenv.config()

const app = express()
app.use(morgan('dev'))
app.use(express.static("frontend"))
app.use('/api/user', Authrouter)
app.use('/api/posts', router)

const port = process.env.PORT || 3000
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true})
app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})