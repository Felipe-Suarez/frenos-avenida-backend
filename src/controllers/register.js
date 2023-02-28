import { Router } from 'express'
const route = Router()

import { serviceRegister } from '../services/register.js'

route.post('/', async (req, res) => {
    const { email, password, confirmPassword } = req.body

    const response = await serviceRegister(email, password, confirmPassword)

    res.json(response)
})

export default route