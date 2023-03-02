import ContainerFirebase from "../../Containers/ContainerFirebase.js";

export default class FirebaseProducts extends ContainerFirebase {
    constructor() {
        super('products')
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

    async getPublic() {
        try {
            const snapshotDocs = await this.collection.where('public', '==', true).get()
            const docs = snapshotDocs.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data
        } catch (error) { console.log(error) }
    }
}