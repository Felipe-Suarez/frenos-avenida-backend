import { DaoUsers } from '../persistance/index.js'

import bcrypt from 'bcrypt'

export const serviceRegister = async (email, password, confirmPassword, admin = false) => {

    const emailExists = await DaoUsers.getByEmail(email)
    if (emailExists) return { error: 'El usuario ya existe' }

    else {
        if (password !== confirmPassword) return { error: 'las contraseñas deben ser iguales' }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = {
            email,
            password: hashedPassword,
            admin
        }

        DaoUsers.create(user)
        return { user }
    }
}