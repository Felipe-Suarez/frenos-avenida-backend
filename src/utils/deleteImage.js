import fs from 'fs'

export const deleteImage = image => {
    fs.unlink(`assets/imgs/${image}`, err => console.log('Error al eliminar imagen'))
}