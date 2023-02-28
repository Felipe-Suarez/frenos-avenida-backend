import dotenv from 'dotenv'
dotenv.config()

export const PRIVATE_KEY_ID = process.env.PRIVATE_KEY_ID
export const PRIVATE_KEY = process.env.PRIVATE_KEY
export const CLIENT_EMAIL = process.env.CLIENT_EMAIL
export const CLIENT_ID = process.env.CLIENT_ID

export const PORT = process.env.PORT

export const TOKEN_SECRET = process.env.TOKEN_SECRET

export const MAIL = process.env.MAIL
export const PASS_MAIL = process.env.PASS_MAIL