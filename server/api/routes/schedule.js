const express = require("express");
const router = express.Router();
const firebase = require("../../db");
const _ = require("lodash");
const firestore = firebase.firestore();


router.post("/create", async (req, res, next) => {
 
  
    let collection_schedule = await firestore.collection("schedule").doc();

    collection_schedule
      .set({
        scheduleId: collection_schedule.id,
        schedularId:req.body.schedularId,
        teamId: req.body.teamId,
        startTime: req.body.startTime,
        availableTimeslot:req.body.availableTimeslot,
        splitTimeslot:req.body.splitTimeslot,
        schedularName: req.body.schedularName,
        scheduleTitle:req.body.scheduleTitle,
        timestamp:req.body.timestamp
      })
      .then(async (response) => {
        res.status(201).json({
          message: "Scheuled Successfully ",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  
});

router.get("/getSchedules/:teamId", async (req, res) => {
   const teamId = req.params.teamId;
  let result;
  
  
    result = await firestore
      .collection("schedule")
      .where("teamId", "==", teamId).
      orderBy("timestamp")
      .get();

    const documents = result.docs.map((doc) => doc.data());

    
  
    if (documents.length == 0)
      return res.status(404).json({
        message: "No record Exists",
      });
   
    return res.status(200).json(documents);
  

  
});


module.exports = router;