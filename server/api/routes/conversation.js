const express = require("express");
const router = express.Router();
const firebase = require("../../db");
const Conversation = require("../../models/conversation");
const firestore = firebase.firestore();
const config = require("../../config");
const admin = require("firebase-admin");
let collection_conversation;

router.post("/", async (req, res, next) => {
  collection_conversation = await firestore.collection("conversation").doc();
  collection_conversation
    .set({
      conversation_id: collection_conversation.id,
      members: [req.body.senderId, req.body.receiverId],
      timestamp: admin.firestore.Timestamp.now(),
    })
    .then(async(response) => {
        console.log(collection_conversation.id)
        const convoId= await firestore.collection("conversation")
        .where('conversation_id', '==',collection_conversation.id)
        
        .get()
        const documents = convoId.docs.map(doc => doc.data())
        res.status(200).json(
             documents[0]
   
        )

      
     
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:userId", async (req, res, next) => {
  // const conRef = firestore.collection('conversation');
  const result = await firestore
    .collection("conversation")
    .where("members", "array-contains", req.params.userId)
    .get();

  const documents = result.docs.map((doc) => doc.data());
  res.status(200).json(documents);

  //     const conversation =  await conRef.where('conversation_id', '==', 'tXQ5ND21UEv42x1gymoo').get()

  //   res.status(200).json(
  //     conversation
  // );
});

module.exports = router;
