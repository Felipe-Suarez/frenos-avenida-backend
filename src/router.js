import { Router } from 'express'
const router = Router()

import apiProducts from './controllers/apiProducts.js'
// import register from './controllers/register.js'
import login from './controllers/login.js'
import mail from './controllers/mail.js'
import showPrice from './controllers/showPrice.js'

router
    .use('/api/products', apiProducts)
    // .use('/register', register)
    .use('/login', login)
    .use('/mail', mail)
    .use('/showPrice', showPrice)

export default router