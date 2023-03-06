import { sendMail } from '../utils/nodemailer.js'

import { Router } from 'express'
const route = Router()

route.post('/', async (req, res) => {
    const data = req.body
    const send = await sendMail(data)

    if (send.error) res.status(404).json({ error: 'En este momento no se pueden enviar correos' })
    res.status(200).json({ msg: 'Mensaje enviado' })
})

export default route