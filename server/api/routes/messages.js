const express = require("express");
const router = express.Router();
const firebase = require("../../db");
const Message = require("../../models/message");
const firestore = firebase.firestore();
const config = require("../../config");
const admin = require("firebase-admin");

router.post("/", async (req, res, next) => {
  var collection_messages = firestore.collection("messages").doc();
  collection_messages
    .set({
      message_id: collection_messages.id,
      conversation_id: req.body.conversation_id,
      senderId: req.body.senderId,
      text: req.body.text,
      timestamp: req.body.timestamp,
    })
    .then((result) => {
      res.status(201).json({
        message: "Added ",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/:conversationId", async (req, res, next) => {
  // const conRef = firestore.collection('conversation');
  const result = await firestore
    .collection("messages")
    .where("conversation_id", "==", req.params.conversationId)
    .orderBy("timestamp")
    .get();
  const documents = result.docs.map((doc) => doc.data());
  res.status(200).json(documents);
});

module.exports = router;
