
const firebase=require('../db');
const Student=require('../models/student');
const firestore=firebase.firestore();




const addStudent=async(req,res,next)=>{
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
}

const getAllStudents= async (req,res,next)=>
{
    try{
     const students= await firestore.collection('students');
     const data=await students.get();
     const studentsArray=[];
     if(data.empty){
         res.status(400).send("no Student record found");
     }
    else{
        data.forEach(doc=>{
            const student=new Student(
                doc.id,
                doc.data().firstName,
                doc.data().lastName,
                doc.data().fatherName,
                doc.data().class,
                doc.data().age,
                doc.data().subject,
                doc.data().phoneNumber,
                doc.data().subject,
                doc.data().year,
                doc.data().semester,
                doc.data().status

            );
            studentsArray.push(student);
        });
        res.send(studentsArray);
    }}
    catch(error){
        res.status(400).send(error.message);

    }
}
const getStudent=async (req,res,next)=>
{
    try{
      const id=req.params.id;
      const student=await firestore.collection('students').doc(id);
      const data=await student.get();
      if(!data.exists)
  {
   res.status(400).send('Student with the given id not exists');
  }
  else{
      res.send(data.data());
  }
}
    catch(error){
res.status(400).send(error.message);
    }
}

const updateStudent= async(req, res, next)=>
{
    try{
    const id= req.params.id;
    const data=req.body;
    const student= await firestore.collection('students').doc(id);
    await student.update(data);
    res.send("Record updated successfully");
    }
    catch(error){
       res.status(400).send(error.message);
    }
}
const deleteStudent=async(req, res, next)=>
{   try{ const id= req.params.id;
    await firestore.collection('students').doc(id).delete();
    res.send('Record deleted successfully');}
    catch(error){
        res.status(400).send(error.message)
    }
   
}
module.exports={
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}