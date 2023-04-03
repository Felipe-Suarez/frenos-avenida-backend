import express from 'express'
import router from './src/router.js'

import cors from 'cors'

import { PORT } from './config/index.js'

const app = express()

app.use(cors({ origin: 'https://battelinifrenos.com.ar' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

app.use('/public', express.static('assets/imgs'))

const port = PORT || 3030
app.listen(port, console.log(`Server on port: ${port}`))