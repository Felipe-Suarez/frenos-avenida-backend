import firebaseAdmin from 'firebase-admin'

import { PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID } from './index.js'

const firebase = {
    "type": "service_account",
    "project_id": "backend-ecommerce-99607",
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY,
    "client_email": CLIENT_EMAIL,
    "client_id": CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lugrn%40backend-ecommerce-99607.iam.gserviceaccount.com"
}

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebase)
});

export const db = firebaseAdmin.firestore();

export { firebaseAdmin }