import { Router } from 'express'
const route = Router()

import { auth } from '../middlewares/auth.js'

import {
    serviceGetAll,
    serviceGetOne,
    serviceGetCategory,
    serviceGetTags,
    serviceGetPromotion,
    serviceCreate,
    serviceUpdateOne,
    serviceUpdate,
    serviceDelete
} from '../services/apiProducts.js'

route.get('/', async (req, res) => {
    const products = await serviceGetAll()

    res.json(products)
})

route.get('/admin', auth, async (req, res) => {
    const products = await serviceGetAll()

    res.json(products)
})

route.get('/product/:productId', async (req, res) => {
    const productId = req.params.productId

    const product = await serviceGetOne(productId)

    res.json(product)
})

route.get('/category/:category', async (req, res) => {
    const category = req.params.category

    const products = await serviceGetCategory(category)

    res.json(products)
})

route.get('/tags', async (req, res) => {
    const tags = req.query.tag

    const products = await serviceGetTags(tags)

    res.json(products)
})

route.get('/promotion', async (req, res) => {
    const products = await serviceGetPromotion()

    res.json(products)
})

route.post('/', auth, async (req, res) => {
    const productData = req.body

    const product = await serviceCreate(productData)

    res.json(product)
})

route.put('/updateOne', auth, async (req, res) => {
    const { productId, productData } = req.body

    const product = await serviceUpdateOne(productId, productData)

    res.json(product)
})

route.put('/update', auth, async (req, res) => {
    const { arr } = req.body

    const product = await serviceUpdate(arr)

    res.json(product)
})

route.delete('/', auth, async (req, res) => {
    const { productsId } = req.body

    const product = await serviceDelete(productsId)

    res.json(product)
})

export default route