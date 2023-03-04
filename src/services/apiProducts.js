import { DaoProducts } from '../persistance/index.js'

import { deleteImage } from '../utils/deleteImage.js'

export const serviceGetSizePublic = async (type) => await DaoProducts.getSizePublic(type)

export const serviceGetSize = async () => await DaoProducts.getSize()

export const serviceGetPublic = async (limit, offset) => {
    const data = await DaoProducts.getPublic(true, limit, offset)
    const orderData = [...data].sort((a, b) => b.data.date._seconds - a.data.date._seconds)
    return orderData
}

export const serviceGetPriv = async (limit, offset) => {
    const data = await DaoProducts.getPublic(false, limit, offset)
    const orderData = [...data].sort((a, b) => b.data.date._seconds - a.data.date._seconds)
    return orderData
}

export const serviceGetAll = async (limit, offset) => await DaoProducts.getAll(limit, offset)

export const serviceGetOne = async productId => await DaoProducts.getOne(productId)

export const serviceGetCategory = async category => await DaoProducts.getCategory(category)

export const serviceGetTags = async tags => await DaoProducts.getByTags(tags)

export const serviceGetPromotion = async () => await DaoProducts.getInPromotion()

export const serviceSearch = async search => await DaoProducts.search(search)

export const serviceSearchPublic = async (search, type) => await DaoProducts.searchPublic(search, type)

export const serviceExistProduct = async name => await DaoProducts.existProduct(name)

export const serviceCreate = async productData => await DaoProducts.create(productData)

export const serviceUpdateOne = async (productId, productData) =>
    await DaoProducts.updateOne(productId, productData)

export const serviceUpdate = async arr => await DaoProducts.update(arr)

export const serviceDelete = async productsId => {
    for (let i = 0; i < productsId.length; i++) {
        const product = await DaoProducts.getOne(productsId[i])
        const image = await product.data.image
        deleteImage(image)
    }
    return DaoProducts.delete(productsId)
}

export const serviceDeleteImage = async image => {
    deleteImage(image)
}
