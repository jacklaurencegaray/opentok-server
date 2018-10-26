import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
mongoose.connect(process.env.DB, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)

export default app
