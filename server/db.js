

const admin=require('firebase-admin');
const serviceAccount=require('./ser/nodewithfirebase-5b93b-firebase-adminsdk-b7qvy-e1bff103d3.json')
const db=admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)})

admin.firestore().settings({ignoreUndefinedProperties:true});
module.exports=db;
