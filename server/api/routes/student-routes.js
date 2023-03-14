const express=require('express');
const router=express.Router();
const multer=require('multer');
const firebase=require('../../db');
const Student=require('../../models/student');
const firestore=firebase.firestore();
const checkAuth= require('../middleware/check_auth')

const storage=multer.diskStorage({
   destination: function(req, file, cb){
       cb(null,'./uploads/');
   },
   filename: function(req, file,cb){
       cb(null, Date.now()+file.originalname);
   }

});
const upload=multer({storage:storage});
router.post('/student',checkAuth,upload.single('studentImage'),async(req,res,next)=>{
    try{
        console.log(req.file);
     const data=req.body;
     await firestore.collection('students').doc().set(data);
     res.send('Record saved successfully');
    }
    catch(error){
        console.log("error", error);
        res.status(400).send(error.message);
}
})
const {getAllStudents,getStudent,updateStudent, deleteStudent}=require('../../controllers/studentController');


router.get('/student',getAllStudents);
router.get('/student/:id',getStudent);
router.put('/student/:id',updateStudent);
router.delete('/student/:id',deleteStudent)
module.exports={
    routes:router
}