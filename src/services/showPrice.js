import { DaoPrice } from "../persistance/index.js"

export const serviceShow = async showPrice => await DaoPrice.updateOne('HNs2PyKM3TVFcozulfZt', showPrice)