import ContainerFirebase from "../../Containers/ContainerFirebase.js";

export default class FirebaseProducts extends ContainerFirebase {
    constructor() {
        super('products')
    }

    async getSizePublic(type) {
        try {
            const snapshotDocs = await this.collection.where('public', '==', type).get()
            const documents = snapshotDocs.size

            return { documents }
        } catch (error) { console.log(error) }
    }

    async getSize() {
        try {
            const snapshotDocs = await this.collection.get()
            const documents = snapshotDocs.size

            return { documents }
        } catch (error) { console.log(error) }
    }

    async getCategory(category) {
        try {
            if (!category) throw new Error(`Error: category/${category}`)

            const snapshotDocs = await this.collection.where('category', '==', category).get()
            const docs = snapshotDocs.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }
    }

    async getByTags(tags) {
        try {
            if (!tags) throw new Error(`Error: tags/${tags}`)

            const snapshotDocs = await this.collection.where('tags', '==', tags).get()
            const docs = snapshotDocs.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }
    }

    async getInPromotion() {
        try {
            const snapshotDocs = await this.collection.where('promotion', '==', true).get()
            const docs = snapshotDocs.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }
    }

    async getPublic(type, limit, offset) {
        try {
            const snapshotDocs = this.collection.where('public', '==', type)
            const documents = await snapshotDocs.limit(limit).offset(offset).get()
            const docs = documents.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }
    }

    async existProduct(name) {
        try {
            const snapshotDocs = this.collection.where('name', '==', name)
            const documents = await snapshotDocs.get()
            const docs = documents.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }
    }

    async search(search) {
        try {
            const snapshotDocs = this.collection.where('name', '>=', search.toLowerCase()).where('name', '<=', search.toLowerCase() + '\uf8ff')
            const documents = await snapshotDocs.get()
            const docs = documents.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }
    }

    async searchPublic(search, type) {
        try {
            const snapshotDocs = this.collection.where('name', '>=', search.toLowerCase()).where('name', '<=', search.toLowerCase() + '\uf8ff').where('public', '==', type)
            const documents = await snapshotDocs.get()
            const docs = documents.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }

    }
}