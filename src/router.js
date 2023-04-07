import { Router } from 'express';
import cors from 'cors';

const router = Router();

import apiProducts from './controllers/apiProducts.js';
import login from './controllers/login.js';
import mail from './controllers/mail.js';
import showPrice from './controllers/showPrice.js';

const corsOptions = {
    origin: ['https://battelinifrenos.com.ar', 'https://admin.battelinifrenos.com.ar'], // Permitir solicitudes desde ambos dominios
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: true
};

router.options('*', cors(corsOptions));

router
    .use('/api/products', cors(corsOptions), apiProducts)
    .use('/login', cors(corsOptions), login)
    .use('/mail', cors(corsOptions), mail)
    .use('/showPrice', cors(corsOptions), showPrice);

export default router;



/*import { Router } from 'express'
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

export default router*/