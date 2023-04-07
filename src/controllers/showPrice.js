import { Router } from 'express'
const route = Router()

import { auth } from '../middlewares/auth.js'

import { serviceGet, serviceSet } from '../services/showPrice.js'

route.get('/', async (req, res) => {
    const price = await serviceGet()

    res.json(price)
})

route.post('/', auth, async (req, res) => {
    const { showPrice } = req.body

    const price = await serviceSet(showPrice)
    if (!price) return res.json({ error: 'Error al actualizar el estado del precio' })

    res.json(price)
})

export default route