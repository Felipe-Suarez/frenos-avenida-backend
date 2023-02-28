import { DaoPrice } from "../persistance/index.js"

export const serviceGet = async () => await DaoPrice.getOne('HNs2PyKM3TVFcozulfZt')

export const serviceSet = async showPrice => await DaoPrice.updateOne('HNs2PyKM3TVFcozulfZt', showPrice)