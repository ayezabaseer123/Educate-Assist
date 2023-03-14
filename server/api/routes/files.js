const express = require('express');
const router = express.Router();
const firebase = require("../../db");
const _ = require("lodash");
const firestore = firebase.firestore();

let fs = require('fs');

const path = require('path');



// Upload Endpoint
router.post('/upload/:teamId/:creator/:creatorId/:timestamp',async (req, res) => {
    let creatorId=req.params.creatorId
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
 const file = req.files.file;
  var dir = `${__dirname}/uploads/${creatorId}`;
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
file.mv(`${dir}/${file.name}`, err => {
if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    let collection_files =  firestore.collection("files").doc();

    collection_files
      .set({
        filesId: collection_files.id,
        creatorId:req.params.creatorId,
        teamId: req.params.teamId,
        creator:req.params.creator,
        filePath:`/uploads/${creatorId}`,
        fileName:file.name, 
        timestamp:req.params.timestamp
        
      })
      .then(async (response) => {
        res.status(201).json({
             fileName: file.name, filePath: `/uploads/${creatorId}/${file.name}` 
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
        
    
//TODO:  in get request
//     const directoryPath = path.join(__dirname, '/client/public/uploads/123');
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log(file); 
//     });
// });
   

  });
});


router.get("/getFiles/:teamId", async (req, res) => {
    const teamId = req.params.teamId;
   let result;
    result = await firestore
       .collection("files")
       .where("teamId", "==", teamId).orderBy("timestamp",'desc')
       .get();
 
     const documents = result.docs.map((doc) => doc.data());
 
     
   
     if (documents.length == 0)
       return res.status(404).json({
         message: "No record Exists",
       });
    
     return res.status(200).json(documents);
   
 
   
 });

 router.get("/getUserFiles/:userId/:roleType", async (req, res) => {
  const userId = req.params.userId;
  const roleType=req.params.roleType
  let result;
  let studentFiles;
  if(roleType=="teacher")
  { 
    result = await firestore
     .collection("files")
     .where("creatorId", "==", userId).orderBy("timestamp",'desc')
     .get();
     const documents = result.docs.map((doc) => doc.data());

   
 
     if (documents.length == 0)
       return res.status(404).json({
         message: "No record Exists",
       });
    
     return res.status(200).json(documents);
}

else{

  result = await firestore
  .collection("classRoom")
  .where("membersAdded", "array-contains", userId)
  .get();

  const documents = result.docs.map((doc) => doc.data().teamId);
  if (documents.length == 0)
       return res.status(404).json({
         message: "No record Exists",
       });
    
    
  studentFiles= await firestore
  .collection("files")
  .where("teamId", "in", documents)
  .get();


  const documents1= studentFiles.docs.map((doc) => doc.data());
  console.log(documents1);
  if (documents1.length == 0){
       return res.status(404).json({
         message: "No record Exists",
       });

     

      }
      return res.status(200).json(documents1); 


}
  
  
 

 
});

 router.get('/download',async function(req, res){
  if(!req.query?.fileId){
    res.status(400).send("File Id not found");
  }
  const fileId=req.query.fileId;

  let result;
   
   
     result = await firestore
       .collection("files")
       .where("filesId", "==", fileId)
       .get();
       const documents = result.docs.map((doc) => doc.data());
       if (documents.length == 0)
       return res.status(404).json({
         message: "No record Exists",
       });

       let filePath=documents[0].filePath
       let fileName=documents[0].fileName
      console.log(filePath)

  // firebase function to get file path using fileId

  const file = `${__dirname}${filePath}/${fileName}`;
  res.download(file); // Set disposition and send it.
});

module.exports = router;