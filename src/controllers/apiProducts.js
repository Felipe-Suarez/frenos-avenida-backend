import { Router } from 'express'
const route = Router()

import { auth } from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'

import fs from 'fs'

import {
    serviceGetPublic,
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
    const products = await serviceGetPublic()

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

    productData.public = true
    const product = await serviceCreate(productData)

    res.json(product)
})

route.post('/priv', auth, async (req, res) => {
    const productData = req.body

    productData.public = false
    const product = await serviceCreate(productData)

    res.json(product)
})

route.post('/image', auth, upload.single("image"), async (req, res) => {
    res.json(req.file.filename)
})

route.put('/updateOne', auth, async (req, res) => {
    const { productId, productData } = req.body

    productData.public = true
    const product = await serviceUpdateOne(productId, productData)

    res.json(product)
})

route.put('/updateOne/priv', auth, async (req, res) => {
    const { productId, productData } = req.body

    productData.public = false
    const product = await serviceUpdateOne(productId, productData)

    res.json(product)
})

route.put('/update', auth, async (req, res) => {
    const { arr } = req.body

    const product = await serviceUpdate(arr)

    res.json(product)
})

route.delete('/image', auth, async (req, res) => {
    const { image } = req.body

    fs.unlink(`assets/imgs/${image}`, err => console.log('Error al eliminar imagen'))

    res.end()
})

route.delete('/', auth, async (req, res) => {
    const { productsId } = req.body

    const product = await serviceDelete(productsId)

    res.json(product)
})

export default route