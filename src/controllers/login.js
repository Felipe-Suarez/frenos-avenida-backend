import { Router } from 'express'
const route = Router()

import { serviceLogin } from '../services/login.js'

route.post('/', async (req, res) => {
    const { email, password } = req.body

    const response = await serviceLogin(email, password)

    res.json(response)
})

export default route