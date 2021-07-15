// import { Request, Response } from 'express';
import * as admin from "firebase-admin";
import * as serviceAccount from "../../config/firebase-adminsdk.json";
// setting up the firebase creds in order to set the cloud functions.
const serviceAccountParams = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  };
  // initialozing the app 
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountParams),
  });
// Initialize firestore (db)
const firestore = admin.firestore();

const firestoreSettings = { timestampsInSnapshots: true };
admin.firestore().settings(firestoreSettings);

export { app, firestore };
