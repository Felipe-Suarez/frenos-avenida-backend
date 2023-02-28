import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config/index.js'

export const auth = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) return res.json({ error: 'Error: No estas logeado' })

    jwt.verify(token, TOKEN_SECRET, async (err) => {
        if (err) return res.json({ error: 'Error: token no valido' })

        return next()
    });
}