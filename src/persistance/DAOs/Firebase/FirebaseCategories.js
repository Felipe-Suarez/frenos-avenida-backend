import ContainerFirebase from "../../Containers/ContainerFirebase.js";

export default class FirebaseCategories extends ContainerFirebase {
    constructor() {
        super('categories')
    }

    async getNames() {
        const snapshotDocs = await this.collection.get()
        const docs = snapshotDocs.docs

        const data = docs.map(doc => (doc.data().name))
        if (!data) throw new Error(`Error: data/${data}`)

        return data
    }
}