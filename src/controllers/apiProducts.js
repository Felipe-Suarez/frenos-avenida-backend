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
    serviceImportExcel,
    serviceExistProduct,
    serviceCreate,
    serviceSearch,
    serviceSearchPublic,
    serviceUpdateOne,
    serviceUpdate,
    serviceDelete,
    serviceDeleteImage
} from '../services/apiProducts.js'

import { serviceGet } from '../services/categories.js'

route.get('/size', async (req, res) => {
    const size = await serviceGetSizePublic(true)
    if (!size) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(size)
})

route.get('/size/admin/priv', auth, async (req, res) => {
    const size = await serviceGetSizePublic(false)
    if (!size) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(size)
})

route.get('/size/admin', auth, async (req, res) => {
    const size = await serviceGetSize()
    if (!size) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(size)
})

route.get('/', async (req, res) => {
    const { limit, offset, category } = req.query

    const categoryQuery = category ? category.toUpperCase() : null
    const products = await serviceGetPublic(Number(limit), Number(offset), categoryQuery)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.get('/admin/priv', auth, async (req, res) => {
    const { limit, offset, category } = req.query

    const categoryQuery = category ? category.toUpperCase() : null
    const products = await serviceGetPriv(Number(limit), Number(offset), categoryQuery)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.get('/admin', async (req, res) => {
    const { limit, offset, category } = req.query

    const categoryQuery = category ? category.toUpperCase() : null
    const products = await serviceGetAll(Number(limit), Number(offset), categoryQuery)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.get('/product/:productId', async (req, res) => {
    const productId = req.params.productId

    const product = await serviceGetOne(productId)
    if (!product) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(product)
})

route.get('/category/:category', async (req, res) => {
    const category = req.params.category

    const products = await serviceGetCategory(category ? category.toUpperCase() : category)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.get('/tags', async (req, res) => {
    const tags = req.query.tag

    const products = await serviceGetTags(tags)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.get('/promotion', async (req, res) => {
    const products = await serviceGetPromotion()
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.get('/categoryNames', async (req, res) => {
    res.json(await serviceGet())
})

route.post('/importExcel', auth, async (req, res) => {
    const { file } = req.body

    if (!file || file.length === 0) {
        res.json({ error: 'Error: datos no validos' })
    } else {
        const response = await serviceImportExcel(file)
        res.json(response)
    }
})

route.post('/existName', auth, async (req, res) => {
    const existProduct = await serviceExistProduct(req.body.name)

    if (existProduct.length > 0)
        res.json({ error: `Error: El Producto con nombre '${req.body.name}' ya existe` })
    else
        res.json({ msg: 'El nombre se puede utilizar' })
})

route.post('/', auth, async (req, res) => {
    const productData = req.body

    const testValues = Object.values(productData);
    const verifyValues = testValues.map((item) => item.replace(/\s+/g, ""));
    const areValid = verifyValues.every((item) => item !== "" && item.length >= 1);

    if (areValid) {
        const existProduct = await serviceExistProduct(req.body.name)

        if (existProduct.length > 0) {
            serviceDeleteImage(req.body.image)
            res.json({ error: `Error: El Producto con nombre '${req.body.name}' ya existe` })
        } else {
            productData.public = req.query.type !== 'public'
            productData.name = productData.name.toLowerCase()
            const product = await serviceCreate(productData)
            res.json(product)
        }
    } else {
        res.json({ error: 'todos los campos tienen que estar llenos o con 1 caracter mínimo' })
    }
})

route.post('/search', async (req, res) => {
    const { search } = req.body

    const products = await serviceSearchPublic(search, true)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.post('/search/admin/priv', auth, async (req, res) => {
    const { search } = req.body

    const products = await serviceSearchPublic(search, false)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})

route.post('/search/admin', auth, async (req, res) => {
    const { search } = req.body

    const products = await serviceSearch(search)
    if (!products) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(products)
})


route.post('/image', auth, upload.single("image"), async (req, res) => {
    const image = req?.file?.filename
    if (!image) return res.json({ error: 'Error: No se pudo guardar la imagen' })
    res.json(image)
})

route.put('/existName', auth, async (req, res) => {
    const { productId, name } = req.body

    const existProduct = await serviceExistProduct(name)

    if (existProduct.length === 1 && productId !== existProduct[0].id)
        res.json({ error: `Error: El Producto con nombre '${req.body.name}' ya existe` })
    else
        res.json({ msg: true })
})

route.put('/updateOne', auth, async (req, res) => {
    const { productId, productData } = req.body

    const testValues = Object.values(productData);
    const verifyValues = testValues.map((item) => item.replace(/\s+/g, ""));
    const areValid = verifyValues.every((item) => item !== "" && item.length >= 1);

    if (areValid) {
        const existProduct = await serviceExistProduct(productData.name)

        if (existProduct.length === 1 && productId !== existProduct[0].id) {
            res.json({ error: `Error: El Producto con nombre '${productData.name}' ya existe` })
        } else {
            productData.public = req.query.type !== 'public'
            const product = await serviceUpdateOne(productId, productData)
            res.json(product)
        }
    } else {
        res.json({ error: 'todos los campos tienen que estar llenos o con 1 caracter mínimo' })
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

    if (!image) return res.json({ error: 'No se pudo eliminar la imagen' })
    res.json({ msg: 'Imagen eliminada exitosamente!' })
})

route.delete('/', auth, async (req, res) => {
    const { productsId } = req.body

    const product = await serviceDelete(productsId)
    if (!product) return res.json({ error: 'Error: ha ocurrido un error inesperado' })

    res.json(product)
})

export default route