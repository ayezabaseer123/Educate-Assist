const express = require("express");
const router = express.Router();
const firebase = require("../../db");
const _ = require("lodash");
const firebase1 = require("firebase/app");
const firestore = firebase.firestore();

require("firebase/firestore");

router.post("/create", async (req, res, next) => {
  const creatorId = req.body.creatorId;
  const result = await firestore
    .collection("classRoom")
    .where("teamCreatorid", "==", creatorId)
    .get();
  const documents = await result.docs.map((doc) => doc.data());
  let recordExists = await documents.find(
    ({ teamCreatorid, teamName }) =>
      teamCreatorid === req.body.creatorId && teamName == req.body.teamName
  );

  if (recordExists == null) {
    let collection_classroom = await firestore.collection("classRoom").doc();

    collection_classroom
      .set({
        teamId: collection_classroom.id,
        teamCreatorid: req.body.creatorId,
        teamName: req.body.teamName,
        teamDescription: req.body.teamDescription,
        teamCode: req.body.teamCode,
        membersAdded: req.body.members,
        
      })
      .then(async (response) => {
        let team = {
          teamId: collection_classroom.id,
          teamCreatorid: req.body.creatorId,
          teamName: req.body.teamName,
          teamDescription: req.body.teamDescription,
          teamCode: req.body.teamCode,
          membersAdded: req.body.members,
         
        };

        console.log(team, "id");
        res.status(201).json(team);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    console.log(recordExists);
    return res.status(409).json({
      message: "Team already exists. Please try with different Team name",
    });
  }
});

router.get("/getStudents/:userId", async (req, res) => {
  const result = await firestore
    .collection("requests")
    .where("requestReceiver", "==", req.params.userId)
    .get();

  const documents = result.docs.map((doc) => doc.data());
  let recordExists = await documents.filter(
    ({ requestReceiver, requestAccepted }) =>
      requestReceiver === req.params.userId && requestAccepted === true
  );
  if (recordExists != null) {
    console.log(recordExists[0]);
    let documents1 = [];
    for (let i = 0; i < recordExists.length; i++) {
      let result1 = await firestore
        .collection("users")
        .where("id", "==", recordExists[i]?.requestSender)
        .get();
      console.log(recordExists[i].requestSender);
      result1.docs.map((doc) => documents1.push(doc.data()));
    }
    let uniqueStudents = _.uniqBy(documents1, "id");
    res.status(200).json(uniqueStudents);
  } else {
    return res.status(204).json({
      message: "No record Exists",
    });
  }
});

router.get("/getClassrooms/:userId/:roleType", async (req, res) => {
  const roleType = req.params.roleType;
  const userId = req.params.userId;
  let result;
  let recordExists = null;
  if (roleType == "teacher") {
    result = await firestore
      .collection("classRoom")
      .where("teamCreatorid", "==", userId)
      .get();

    const documents = result.docs.map((doc) => doc.data());
    if (documents.length == 0)
    return res.status(404).json({
      message: "No record Exists",
    });



    recordExists = await documents.filter(
      ({ teamCreatorid }) => teamCreatorid == userId
    );
  } else if (roleType == "student") {
    result = await firestore
      .collection("classRoom")
      .where("membersAdded", "array-contains", req.params.userId)
      .get();

    const documents = result.docs.map((doc) => doc.data());
    if (documents.length == 0)
      return res.status(404).json({
        message: "No record Exists",
      });

    return res.status(200).json(documents);
  }

  if (recordExists == null) {
    return res.status(404).json({
      message: "No record Exists",
    });
  } else {
    return res.status(200).json(recordExists);
  }
});

router.patch("/getClassroom/teamCode/:teamCode/:userId", async (req, res) => {
  const teamCode = req.params.teamCode;
  const userId = req.params.userId;
  console.log(teamCode);
  let result;

  result = await firestore
    .collection("classRoom")
    .where("teamCode", "==", teamCode)
    .get();

  const documents = result.docs.map((doc) => doc.data());
  console.log(documents);
  if (documents.length == 0) {
    return res.status(204).json({
      message: "No record Exist",
    });
  } else {
    if (!documents[0].hasOwnProperty("membersAdded")) {
      documents[0].membersAdded = [userId];
      return res.status(200).json(documents);
    } else if (documents[0].membersAdded.includes(userId)) {
      return res.status(404).json({
        message: "Already in teams",
      });
    } else {
      console.log(documents[0].teamId);
      let memberAdded1 = documents[0].membersAdded;
      memberAdded1.push(userId);

      var collection = await firestore
        .collection("classRoom")
        .doc(documents[0].teamId);
      collection.update({
        membersAdded: memberAdded1,
      });
      let finalResult = await firestore
        .collection("classRoom")
        .where("teamCode", "==", teamCode)
        .get();

      const documents1 = finalResult.docs.map((doc) => doc.data());
      return res.status(200).json(documents1[0]);
    }
  }

  // return res.status(200).json(documents);
});

router.patch("/addmembers/:teamId", async (req, res) => {
  const addMembers = req.body;
  const teamId = req.params.teamId;
  console.log(addMembers,"addMembers");
  console.log(teamId,"teamId");
  console.log(addMembers[0])
  let result;

  result = await firestore
    .collection("classRoom")
    .where("teamId", "==", teamId)
    .get();

  const documents = result.docs.map((doc) => doc.data());
  console.log(documents);
  if (documents.length == 0) {
    return res.status(204).json({
      message: "No record Exist",
    });
  } else {
    if (!documents[0].hasOwnProperty("membersAdded")) {
      documents[0].membersAdded = addMembers;
      console.log(documents[0].membersAdded,"documents0")
     
      var collection = await firestore
        .collection("classRoom")
        .doc(teamId);
      collection.update({
        membersAdded: documents[0].membersAdded,
      });
      let finalResult = await firestore
        .collection("classRoom")
        .where("teamId", "==", teamId)
        .get();

      const documents1 = finalResult.docs.map((doc) => doc.data());
      return res.status(200).json(documents1[0]);
    }
    else {
     
      let memberAdded1 = documents[0].membersAdded;
      let membersAdded = [...memberAdded1, ...addMembers];

      var collection = await firestore
        .collection("classRoom")
        .doc(documents[0].teamId);
      collection.update({
        membersAdded: membersAdded,
      });
      let finalResult = await firestore
        .collection("classRoom")
        .where("teamId", "==", teamId)
        .get();

      const documents1 = finalResult.docs.map((doc) => doc.data());
      return res.status(200).json(documents1[0]);
    }
  }

  // return res.status(200).json(documents);
});

module.exports = router;
