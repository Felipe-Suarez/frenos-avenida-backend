import { db } from '../../../config/firebase.js'

export default class ContainerFirebase {
    constructor(collection) {
        this.collection = db.collection(collection);
    }

    async getAll() {
        try {
            const snapshotDocs = await this.collection.get()
            const docs = snapshotDocs.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data

        } catch (error) { console.log(error) }
    }

    async getOne(id) {
        try {
            if (!id) throw new Error(`Error: id/${id}`)

            const doc = this.collection.doc(id)
            const snapshotDoc = await doc.get()
            const data = { id: snapshotDoc.id, data: snapshotDoc.data() }

            return data

        } catch (error) { console.log(error) }
    }

    async create(obj) {
        try {
            if (!obj) throw new Error(`Error: obj/${obj}`)

            const doc = this.collection.doc()
            obj.date = new Date()

            await doc.create(obj)

            return { id: doc.id, data: obj }

        } catch (error) { console.log(error) }
    }

    async updateOne(id, obj) {
        try {
            if (!id || !obj) throw new Error(`Error: id/${id} | obj/${obj}`)

            const doc = this.collection.doc(id)
            await doc.update(obj)

            return obj

        } catch (error) { console.log(error) }
    }

    async update(arr) {
        try {
            if (!arr) throw new Error(`Error: arr/${arr}`)

            await arr.forEach(async item => {
                this.updateOne(item.id, item.obj)
            });

            return arr
        } catch (error) { console.log(error) }
    }

    async delete(ids) {
        try {
            if (!ids) throw new Error(`Error: ids/${ids}`)

            await ids.forEach(async id => {
                const doc = this.collection.doc(id)
                await doc.delete()
            });

            return { msg: 'Operacion exitosa' }

        } catch (error) { console.log(error) }
    }
}