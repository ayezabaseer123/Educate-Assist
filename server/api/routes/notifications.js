const express = require("express");
const router = express.Router();
const firebase = require("../../db");

const firestore = firebase.firestore();
const config = require("../../config");
const admin = require("firebase-admin");

router.post("/", async (req, res, next) => {
  


    let collection_notifications = await firestore.collection("notificationss").doc();
    collection_notifications
      .set({
        notificationId: collection_notifications.id,
        notificationSender: req.body.notificationSender,
        notificationReceiver: req.body.notificationReceiver,
        subject: req.body.subject,
        timestamp:req.body.timestamp,
        type:req.body.type

      })
      .then(async (response) => {
        res.status(201).json({
          message: "Notification detail Added ",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  

});


router.get("/:userId", async (req, res) => {
  const result = await firestore
  .collection("notificationss")
  .where("notificationReceiver", "==", req.params.userId).orderBy("timestamp",'desc')
  .get();

const documents = result.docs.map((doc) => doc.data());
let recordExists = await documents.find(
  ({ notificationReceiver }) =>
  notificationReceiver === req.params.userId
);
if(recordExists !=null){
 let documents1 = []

  for(let i=0; i<documents.length; i++){
    const result1 = await firestore
    .collection("users")
    .where("id", "==", documents[i]?.notificationSender)
    .get();
    
 result1.docs.map((doc) => documents1.push(doc.data()))
  }

  
 let data=[]
 for(let i=0; i<documents.length; i++){
  data.push({ senderName: documents1[i]?.name, receiverId: documents[i]?.notificationReceiver,subject:documents[i].subject,type:documents[i]?.type })
 }
  
   return res.status(200).json(data);
  
}
else if(recordExists ==null){
    return res.status(204).json({
        message: "    No Notification exists     ",
      });
}


  

});



module.exports = router;