import express from 'express'
import router from './src/router.js'

import cors from 'cors'

import { PORT } from './config/index.js'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

const port = PORT || 8080
app.listen(port, console.log(`Server on port: ${port}`))