import { sendMail } from '../utils/nodemailer.js'

import { Router } from 'express'
const route = Router()

route.post('/', async (req, res) => {
    const data = req.body

    const testValues = Object.values(data);
    const verifyValues = testValues.map((item) => item.replace(/\s+/g, ""));
    const areValid = verifyValues.every((item) => item !== "" && item.length > 5);

    if (areValid) {
        const send = await sendMail(data)
        if (send?.error) {
            res.status(404).json({ error: 'En este momento no se pueden enviar correos' })
            return
        }
        res.status(200).json({ msg: 'Mensaje enviado' })
    } else {
        res.json({ error: 'Campos no validos' })
    }
})

export default route