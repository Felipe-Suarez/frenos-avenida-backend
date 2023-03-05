import { Router } from 'express'
const route = Router()

import { auth } from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'

import {
    serviceGetSizePublic,
    serviceGetSize,
    serviceGetPublic,
    serviceGetPriv,
    serviceGetAll,
    serviceGetOne,
    serviceGetCategory,
    serviceGetTags,
    serviceGetPromotion,
    serviceExistProduct,
    serviceCreate,
    serviceSearch,
    serviceSearchPublic,
    serviceUpdateOne,
    serviceUpdate,
    serviceDelete,
    serviceDeleteImage
} from '../services/apiProducts.js'

route.get('/size', auth, async (req, res) => {
    const size = await serviceGetSizePublic(true)

    res.json(size)
})

route.get('/size/admin/priv', auth, async (req, res) => {
    const size = await serviceGetSizePublic(false)

    res.json(size)
})

route.get('/size/admin', auth, async (req, res) => {
    const size = await serviceGetSize()

    res.json(size)
})

route.get('/', async (req, res) => {
    const { limit, offset } = req.query

    const products = await serviceGetPublic(Number(limit), Number(offset))

    res.json(products)
})

route.get('/admin/priv', auth, async (req, res) => {
    const { limit, offset } = req.query
    const products = await serviceGetPriv(Number(limit), Number(offset))

    res.json(products)
})

route.get('/admin', auth, async (req, res) => {
    const { limit, offset } = req.query
    const products = await serviceGetAll(Number(limit), Number(offset))

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

    const existProduct = await serviceExistProduct(req.body.name)

    if (existProduct.length > 0) {
        serviceDeleteImage(req.body.image)
        res.json({ error: `Error: El Producto con nombre '${req.body.name}' ya existe` })
    } else {
        productData.public = req.query.type !== 'public'
        const product = await serviceCreate(productData)
        res.json(product)
    }
})

route.post('/search', async (req, res) => {
    const { search } = req.body

    const products = await serviceSearchPublic(search, true)

    res.json(products)
})

route.post('/search/admin/priv', auth, async (req, res) => {
    const { search } = req.body

    const products = await serviceSearchPublic(search, false)

    res.json(products)
})

route.post('/search/admin', auth, async (req, res) => {
    const { search } = req.body

    const products = await serviceSearch(search)

    res.json(products)
})


route.post('/image', auth, upload.single("image"), async (req, res) => {
    res.json(req.file.filename)
})

route.put('/updateOne', auth, async (req, res) => {
    const { productId, productData } = req.body

    const existProduct = await serviceExistProduct(productData.name)

    if (existProduct.length === 1 && productId !== existProduct[0].id) {
        res.json({ error: `Error: El Producto con nombre '${productData.name}' ya existe` })
    } else {
        productData.public = req.query.type !== 'public'
        const product = await serviceUpdateOne(productId, productData)
        res.json(product)
    }
})

route.put('/update', auth, async (req, res) => {
    const { arr } = req.body

    const product = await serviceUpdate(arr)

    res.json(product)
})

route.delete('/image', auth, async (req, res) => {
    const { image } = req.body

    serviceDeleteImage(image)

    res.end()
})

route.delete('/', auth, async (req, res) => {
    const { productsId } = req.body

    const product = await serviceDelete(productsId)

    res.json(product)
})

export default route