import { DaoProducts } from '../persistance/index.js'

export const serviceGetPublic = async () => await DaoProducts.getPublic()

export const serviceGetAll = async () => await DaoProducts.getAll()

export const serviceGetOne = async productId => await DaoProducts.getOne(productId)

export const serviceGetCategory = async category => await DaoProducts.getCategory(category)

export const serviceGetTags = async tags => await DaoProducts.getByTags(tags)

export const serviceGetPromotion = async () => await DaoProducts.getInPromotion()

export const serviceCreate = async productData => await DaoProducts.create(productData)

export const serviceUpdateOne = async (productId, productData) =>
    await DaoProducts.updateOne(productId, productData)

export const serviceUpdate = async arr => await DaoProducts.update(arr)

export const serviceDelete = async productsId => await DaoProducts.delete(productsId)