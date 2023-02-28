import ContainerFirebase from "../../Containers/ContainerFirebase.js";

export default class FirebaseUsers extends ContainerFirebase {
    constructor() {
        super('users')
    }

    async getByEmail(email) {
        try {
            if (!email) throw new Error(`Error: email/${email}`)

            const snapshotDocs = await this.collection.where('email', '==', email).get()
            const docs = snapshotDocs.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data[0]
        } catch (error) { console.log(error) }
    }

    async getById(userId) {
        try {
            if (!userId) throw new Error(`Error: userId/${userId}`)

            const snapshotDocs = await this.collection.where('id', '==', userId).get()
            const docs = snapshotDocs.docs

            const data = docs.map(doc => ({ id: doc.id, data: doc.data() }))
            if (!data) throw new Error(`Error: data/${data}`)

            return data[0]
        } catch (error) { console.log(error) }
    }
}