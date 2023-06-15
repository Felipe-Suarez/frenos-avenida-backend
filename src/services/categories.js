import { DaoCategories } from "../persistance/index.js"

export const serviceGet = async () => await DaoCategories.getNames()