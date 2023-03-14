const express = require('express');
const router = express.Router();
const firebase = require("../../db");
const _ = require("lodash");
const firestore = firebase.firestore();

let fs = require('fs');

const path = require('path');


var admin = require('firebase-admin');

// Upload Endpoint
router.post('/assignmentupload/:teamId/:creatorName/:creatorId/:timestamp/:scheduleTitle/:description/:dueDate/:points',async (req, res) => {
    let creatorId=req.params.creatorId
    let teamId=req.params.teamId
    let creatorName=req.params.creatorName
    let timestamp=req.params.timestamp
    let scheduleTitle=req.params.scheduleTitle
    let description=req.params.description
    let dueDate=req.params.dueDate
   
  
    let points=req.params.points
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
 const assignment = req.files.file;
  var dir = `${__dirname}/assignmentuploads/${teamId}`;
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
assignment.mv(`${dir}/${assignment.name}`, err => {
if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    let collection_assignment =  firestore.collection("assignments").doc();

    collection_assignment
      .set({
        assignmentId: collection_assignment.id,
        creatorId:creatorId,
        teamId: teamId,
        creator:creatorName,
        assignmentPath:`/assignmentuploads/${teamId}`,
        assignmentName:assignment.name, 
        timestamp:timestamp,
        scheduleTitle:scheduleTitle,
        description:description,
        dueDate:dueDate,
       
        points:points,
        uploadFilePath:`/team/${teamId}/assignment/${collection_assignment.id}/student`,
        uploadedBy:[],
        disableFor:[]

        
      })
      .then(async (response) => {
        res.status(201).json({
             assignmentName: assignment.name, assignmentPath: `/assignmentuploads/${teamId}/${assignment.name}` 
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
        
    


  });
});


router.get("/getAssignments/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
 let result;
  result = await firestore
     .collection("assignments")
     .where("teamId", "==", teamId).orderBy("timestamp",'desc')
     .get();

   const documents = result.docs.map((doc) => doc.data());

   
 
   if (documents.length == 0)
     return res.status(404).json({
       message: "No record Exists",
     });
  
   return res.status(200).json(documents);
 

 
});

router.get('/download',async function(req, res){
  if(!req.query?.assignmentId){
    res.status(400).send("File Id not found");
  }
  const assignmentId=req.query.assignmentId;

  let result;
   
   
     result = await firestore
       .collection("assignments")
       .where("assignmentId", "==", assignmentId)
       .get();
       const documents = result.docs.map((doc) => doc.data());
       if (documents.length == 0)
       return res.status(404).json({
         message: "No record Exists",
       });

       let assignmentPath=documents[0].assignmentPath
       let assignmentName=documents[0].assignmentName
      console.log(assignmentPath)

  // firebase function to get file path using fileId

  const assignment = `${__dirname}${assignmentPath}/${assignmentName}`;
  res.download(assignment); // Set disposition and send it.
});


router.patch('/studentAssignmentupload/:teamId/:userId/:userName/:timestamp/:assignmentId/:assignmentTitle/:totalScore/:dueDate/:uploadFilePath',async (req, res) => {
  let userId=req.params.userId
  let teamId=req.params.teamId
  let path=req.params.uploadFilePath
  let uploadFilePath = path.replaceAll('-', "/");
  let assignmentId=req.params.assignmentId
  let userName=req.params.userName
  let uploadedAt=req.params.timestamp
  let assignmentTitle=req.params.assignmentTitle
  let dueDate=req.params.dueDate
  let totalScore=req.params.totalScore
  console.log("getting here")
 

  let collection = await firestore
  .collection("assignments")
  .doc(assignmentId);

  let result;
   
   
  result = await firestore
    .collection("studentDetails")
    .where("teamId", "==", teamId).where("userId", "==", userId).where("assignmentTitle", "==", assignmentTitle)
    .get();

    const documents = result.docs.map((doc) => doc.data());
    

    let assignmentStudentId=documents[0].studentDetailsId
 

if (req.files === null) {
  return res.status(400).json({ msg: 'No file uploaded' });
}
const assignment = req.files.file;
let dir = `${__dirname}/${uploadFilePath}/${userId}`;
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
assignment.mv(`${dir}/${assignment.name}`, err => {
if (err) {
    console.error(err);
    return res.status(500).send(err);
  }

  
  let collection_assignment =  firestore.collection("studentDetails").doc(assignmentStudentId);

  collection_assignment
    .set({
      studentDetailsId:collection_assignment.id,
      assignmentId: assignmentId,
      userName:userName,
      teamId: teamId,
      userId:userId,
      uploadPath:`${uploadFilePath}/${userId}`,
      assignmentName:assignment.name, 
      uploadedAt:uploadedAt,
      assignmentTitle:assignmentTitle,
      totalScore:totalScore,
      dueDate:dueDate,
      points:-1,
      uploaded:true
     

      
    })
    .then(async (response) => {

      var arrUnion = collection.update({
        uploadedBy: admin.firestore.FieldValue.arrayUnion(userId)
      });
      // Atomically remove a region from the "regions" array field.
      var arrUnion = collection.update({
        disableFor: admin.firestore.FieldValue.arrayUnion(userId)
      });
      res.status(201).json({
           assignmentName: assignment.name 
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
 
  


});
});


router.get("/getStudentAssignments/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  console.log(teamId,"getxbsm")
 let result;
  result = await firestore
     .collection("studentDetails")
     .where("teamId", "==", teamId).orderBy("uploadedAt",'desc')
     .get();

   const documents = result.docs.map((doc) => doc.data());

   
 
   if (documents.length == 0)
     return res.status(404).json({
       message: "No record Exists",
     });
  
   return res.status(200).json(documents);
 

 
});


router.get('/download/teacher',async function(req, res){
  if(!req.query?.studentDetailsId){
    res.status(400).send("File Id not found");
  }
  const studentDetailsId=req.query.studentDetailsId;

  let result;
   
   
     result = await firestore
       .collection("studentDetails")
       .where("studentDetailsId", "==", studentDetailsId)
       .get();
       const documents = result.docs.map((doc) => doc.data());
       if (documents.length == 0)
       return res.status(404).json({
         message: "No record Exists",
       });

       let assignmentPath=documents[0].uploadPath
       let assignmentName=documents[0].assignmentName
      console.log(assignmentPath)

  // firebase function to get file path using fileId

  const assignment = `${__dirname}${assignmentPath}/${assignmentName}`;
  res.download(assignment); // Set disposition and send it.
});


router.patch('/update/:studentDetailsId/:value',async function(req, res){
  if(!req.params?.studentDetailsId){
    res.status(400).send("details id not found");
  }

  console.log(req.params.value)
  let collection = await firestore
  .collection("studentDetails")
  .doc(req.params.studentDetailsId);
  
  var arrUnion = collection.update({
    points:req.params.value
  });
  res.status(200).send("Updated")
});


router.get("/markssummary/:teamId/:userId", async (req, res) => {
  const teamId = req.params.teamId;
  const userId=req.params.userId
  console.log(teamId,"getxbsm")
 let result;
  result = await firestore
     .collection("studentDetails")
     .where("teamId", "==", teamId).where("userId","==",userId)
     .get();

   const documents = result.docs.map((doc) => doc.data());

   
 
   if (documents.length == 0)
     return res.status(404).json({
       message: "No record Exists",
     });
  
   return res.status(200).json(documents);
 

 
});

router.post("/studentDetails", async (req, res) => {
 
 let result;

 let collection_assignment =  firestore.collection("studentDetails").doc();

 collection_assignment
   .set({
     studentDetailsId: collection_assignment.id,
     teamId:req.body.teamId,
     userId:req.body.userId,
     assignmentTitle:req.body.assignmentTitle,
     totalScore: req.body.totalScore,
     points: req.body.points,
     dueDate: req.body.dueDate,
     uploaded:false

     
     
   })
   .then(async (response) => {
    res.status(201).json({
      "message":"Created"
 });
   })
   .catch((err)=>{
     console.log(err)
   })
  
 

 
});


module.exports = router;