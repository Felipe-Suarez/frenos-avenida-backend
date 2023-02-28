import { sendMail } from '../utils/nodemailer.js'

import { Router } from 'express'
const route = Router()

route.post('/', (req, res) => {
    const data = req.body
    sendMail(data)

    res.status(200).json({ msg: 'Mensaje enviado' })
})

export default route