import { DaoUsers } from '../persistance/index.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { TOKEN_SECRET } from '../../config/index.js'

export const serviceLogin = async (email, password) => {
    const user = await DaoUsers.getByEmail(email)
    if (!user) return { error: 'El usuario no existe' }

    else {
        const checkPass = await bcrypt.compare(password, user.data.password)

        if (checkPass) {
            const tokenData = {
                userEmail: user.data.email,
                userPass: user.data.password
            }

            const token = jwt.sign(tokenData, TOKEN_SECRET)

            return { token }
        }
        else return { error: 'contraseña incorrecta' }
    }
}