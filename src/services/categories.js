import { DaoCategories } from "../persistance/index.js"

export const serviceGet = async () => await DaoCategories.getNames()

export const serviceCreate = async (obj) => await DaoCategories.create(obj)