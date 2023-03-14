const express = require("express");
const router = express.Router();
const firebase = require("../../db");
const _ = require("lodash"); 
const firestore = firebase.firestore();
const config = require("../../config");
const admin = require("firebase-admin");

router.post("/", async (req, res, next) => {
  const requestReceiverId = req.body.requestReceiver;
  const result = await firestore
    .collection("requests")
    .where("requestReceiver", "==", requestReceiverId)
    .get();
  const documents = await result.docs.map((doc) => doc.data());
  let recordExists = await documents.find(
    ({ subjectChosen, requestSender ,requestReceiver}) =>
      subjectChosen === req.body.subjectChosen &&
      requestSender == req.body.requestSender &&
      requestReceiver == req.body.requestReceiver 
  );

  if (recordExists == null) {
    let collection_requests = await firestore.collection("requests").doc();

    collection_requests
      .set({
        requestId: collection_requests.id,
        requestSender: req.body.requestSender,
        subjectChosen: req.body.subjectChosen,
        paymentPackage: req.body.paymentPackage,
        requestReceiver: req.body.requestReceiver,
        requestAccepted: req.body.requestAccepted,
      })
      .then(async (response) => {
        res.status(201).json({
          message: "request Added ",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    console.log(recordExists)
    return res.status(409).json({
      message: "Request already exists",
    });
  }
});

router.get("/:userId", async (req, res) => {
  
 
      const result = await firestore
    .collection("requests")
    .where("requestReceiver", "==", req.params.userId)
    .get();

  const documents = result.docs.map((doc) => doc.data());
  let recordExists = await documents.filter(
    ({ requestReceiver ,requestAccepted}) =>
      requestReceiver === req.params.userId && requestAccepted==false
  );
if(recordExists !=null){

 let documents1 = []

 for(let i=0; i<recordExists.length; i++){
  let result1=  await firestore
  .collection("users")
  .where("id", "==", recordExists[i].requestSender)
  .get()
 
   
result1.docs.map((doc) => documents1.push(doc.data()))

 }

 let data=[]
 for(let i=0; i<recordExists.length; i++){
  data.push({ requestId:recordExists[i]?.requestId,requestSenderId: documents1[i]?.id,requestSender: documents1[i]?.name, paymentPackage: recordExists[i]?.paymentPackage,subjectChosen:recordExists[i].subjectChosen })
 }
  
    res.status(200).json(data);
}
else{
  return res.status(204).json({
    message: 'No record Exists'
});
}
  
    
  
});


router.get("/getTeachers/:userId", async (req, res) => {
const result = await firestore
.collection("requests")
.where("requestSender", "==", req.params.userId )
.get();

const documents = result.docs.map((doc) => doc.data());
let recordExists = await documents.filter(
({ requestSender,requestAccepted }) =>
  requestSender === req.params.userId && requestAccepted === true
);
if(recordExists !=null){
  console.log(recordExists[0])
let documents1 = []
for(let i=0; i<recordExists.length; i++){
let result1=  await firestore
.collection("users")
.where("id", "==", recordExists[i]?.requestReceiver)
.get()
console.log(recordExists[i].requestReceiver)
result1.docs.map((doc) => documents1.push(doc.data()))
}
let uniqueTeachers=_.uniqBy(documents1,'id');
res.status(200).json(uniqueTeachers);
}
else{
return res.status(204).json({
message: 'No record Exists'
});
}



});
router.get("/getStudents/:userId", async (req, res) => {
  
  const result = await firestore
 .collection("requests")
 .where("requestReceiver", "==", req.params.userId )
 .get();
 
 const documents = result.docs.map((doc) => doc.data());
 let recordExists = await documents.filter(
 ({ requestReceiver,requestAccepted }) =>
   requestReceiver === req.params.userId && requestAccepted === true
 );
 if(recordExists !=null){
   console.log(recordExists[0])
 let documents1 = []
 for(let i=0; i<recordExists.length; i++){
 let result1=  await firestore
 .collection("users")
 .where("id", "==", recordExists[i]?.requestSender)
 .get()
 console.log(recordExists[i].requestSender)
 result1.docs.map((doc) => documents1.push(doc.data()))
 }
 let uniqueStudents=_.uniqBy(documents1,'id');
 res.status(200).json(uniqueStudents);
 }
 else{
 return res.status(204).json({
 message: 'No record Exists'
 });
 }
 
 
 
 });



 router.get("/getStudents/team/:userId/:teamId", async (req, res) => {
  
  const result = await firestore
 .collection("requests")
 .where("requestReceiver", "==", req.params.userId )
 .get();
 
 const documents = result.docs.map((doc) => doc.data());
 let recordExists = await documents.filter(
 ({ requestReceiver,requestAccepted }) =>
   requestReceiver === req.params.userId && requestAccepted === true
 );
 if(recordExists !=null){
   console.log(recordExists[0])
 let documents1 = []
 for(let i=0; i<recordExists.length; i++){
 let result1=  await firestore
 .collection("users")
 .where("id", "==", recordExists[i]?.requestSender)
 .get()
 console.log(recordExists[i].requestSender)
 result1.docs.map((doc) => documents1.push(doc.data()))
 }
 let uniqueStudents=_.uniqBy(documents1,'id');

 const result2 = await firestore
 .collection("classRoom")
 .where("teamId", "==", req.params.teamId)
 .get();
 let remainingStudent=[]
 const documents2= result2.docs.map((doc) => doc.data());
 let membersAdded=documents2[0].membersAdded
 console.log(uniqueStudents,"uniqueStudents")
 console.log(membersAdded,"membersAdded")
 if(!membersAdded){
    remainingStudent=[...uniqueStudents]
   return res.status(200).json(remainingStudent);
 }
 for (let x in uniqueStudents) {
   if(!membersAdded.includes(uniqueStudents[x].id))
      remainingStudent.push(uniqueStudents[x])
  
}
console.log(remainingStudent,"remainingStudent")
 
 return res.status(200).json(remainingStudent);
 }


 else{
 return res.status(204).json({
 message: 'No record Exists'
 });
 }
 
 
 
 });

router.patch("/:id",async(req,res,next) => {
  const id = req.params.id
  const result = await firestore.collection("requests").where('requestId', '==',id).get()
  const documents =await result.docs.map(doc => doc.data())
  console.log(documents)

  let recordExists = documents.find(({ requestId}) =>requestId === req.params.id)

  if (recordExists !== null) {

              var collection =await firestore.collection('requests').doc(id);
              collection.update({
                  requestAccepted:req.body.requestAccepted,
                  
                  // description:req.body.description,
              })
                  .then(result => {
                      console.log("f", result)
                      res.status(201).json({
                          message: 'Updated'
                      });
                  })
                  .catch(err => {
                      console.log(err);
                      res.status(500).json({
                          error: err
                      });
                  })
                  // console.log(data.qualification)
          }
      })
      router.delete("/:id",async(req,res,next) => {
        const id = req.params.id
        const result = await firestore.collection("requests").where('requestId', '==',id).get()
        const documents =await result.docs.map(doc => doc.data())
        console.log(documents)
      
        let recordExists = documents.find(({ requestId}) =>requestId === req.params.id)
      
        if (recordExists !== null) {
      
                    var collection =await firestore.collection('requests').doc(id);
                    collection.delete()
                        .then(result => {
                            console.log("f", result)
                            res.status(201).json({
                                message: 'deleted'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        })
                        // console.log(data.qualification)
                }
            })
      
module.exports = router;
