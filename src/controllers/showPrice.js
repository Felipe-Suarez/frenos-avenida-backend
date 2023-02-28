import { Router } from 'express'
const route = Router()

import { serviceShow } from '../services/showPrice.js'

route.post('/', async (req, res) => {
    const { showPrice } = req.body

    const price = await serviceShow(showPrice)

    res.json(price)
})

export default route