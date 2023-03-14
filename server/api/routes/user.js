const express = require("express");
const router = express.Router();
const firebase = require("../../db");
const User = require("../../models/user");
const firestore = firebase.firestore();
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const usersArrayArray = [];
const teachersArray = [];
const checkAuth = require("../middleware/check_auth");
router.post("/signup", async (req, res, next) => {
  const email = req.body.email;
  const result = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();
  const documents = await result.docs.map((doc) => doc.data());
  console.log(documents, "documents");

  let b = documents.find(({ email }) => email === req.body.email);
  // console.log(b.email)
  //   console.log(a,"map")

  if (b == null) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        var coll = firestore.collection("users").doc();
        coll
          .set({
            id: coll.id,
            email: req.body.email,
            name: req.body.name,
            role_type: req.body.role_type,
            password: hash,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
          })
          .then((result) => {
            console.log("f", result);
            res.status(201).json({
              message: "User created",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
  } else {
    return res.status(409).json({
      message: "mail exists",
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const users = await firestore.collection("users");
    const data = await users.get();

    if (data.empty) {
      res.status(400).send("no Student record found");
    } else {
      data.forEach((doc) => {
        const users = new User(
          doc.id,
          doc.data().email,
          doc.data().name,

          doc.data().password,
          doc.data().role_type
        );
        usersArrayArray.push(users);
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }

  let b = usersArrayArray.find(({ email }) => email === req.body.email);
  console.log(b);

  if (b == null) {
    return res.status(401).json({
      message: "Auth failed1",
    });
  }

  bcrypt.compare(req.body.password, b.password, (err, result) => {
    if (err) {
      return res.status(401).json({
        message: "Auth failed1",
      });
    }
    if (result) {
      const token = jwt.sign(
        {
          email: b.email,
          userId: b.id,
          name: b.name,
          role_type: b.role_type,
        },
        "secret",
        {
          expiresIn: "12h",
        }
      );
      console.log(token);
      return res.status(200).json({
        email: b.email,
        name: b.name,
        id: b.id,
        role_type: b.role_type,

        token: token,
      });
    }
    res.status(401).json({
      message: "Auth failed2",
    });
  });
});

router.get("/getAllTeachers", async (req, res, next) => {
  const result = await firestore
    .collection("users")
    .where("role_type", "==", "teacher")
    .get();

  const documents = await result.docs.map((doc) => doc.data());
  res.status(200).json(documents);
});

router.get("/getAllTeacherss", async (req, res, next) => {
  const result = await firestore
    .collection("users")
    .where("role_type", "==", "teacher")
    .get();

  const documents = await result.docs.map((doc) => doc.data());
  let documentsObj = documents;
  for (let i = 0; i < documentsObj.length; i++) {
    console.log(documentsObj[i], "documentssssss");
    const result1 = await firestore
      .collection("comments")
      .where("teacherId", "==", documentsObj[i].id)
      .get();
    let responseData;
    let finalRating;
    const documents1 = result1.docs.map((doc) => doc.data());
    if (documents1.length != 0) {
      
      const pyPost1 = await axios
        .post("http://127.0.0.1:2000/data", { data: documents1 })

        .then(function (response) {
          let i,
            count = { positive: 0, negative: 0, neutral: 0 },
            responseData = response.data;

          for (i in responseData) {
            count[responseData[i].sentiment]++;
          }

          let positive1 = count.positive;
          console.log(positive1);
          let negative1 = count.negative;
          let neutral1 = count.neutral;

          let totalcount = positive1 + negative1 + neutral1;
          let rating = positive1 / totalcount;
          finalRating = rating / 0.2;
        });

        documentsObj[i].rating=finalRating;
    }
  }

  res.status(200).json(documentsObj);
});

router.get("/getAllTeacher", async (req, res, next) => {
  console.log("ger", req.userData);
  const result = await firestore
    .collection("users")
    .where("role_type", "==", "teacher")
    .get();

  const documents = await result.docs.map((doc) => doc.data());
  res.status(200).json(documents);
});

router.get("/:userId", async (req, res) => {
  const result = await firestore
    .collection("users")
    .where("id", "==", req.params.userId)
    .get();

  const documents = result.docs.map((doc) => doc.data());
  res.status(200).json({ name: documents[0].name, id: documents[0].id });
});
router.get("/profile/:id", async (req, res, next) => {
  const result = await firestore
    .collection("users")
    .where("id", "==", req.params.id)
    .get();
  const documents = result.docs.map((doc) => doc.data());
  res.status(200).json(documents[0]);
});

router.put("/profile/update/:id", async (req, res, next) => {
  const id = req.params.id;
  const result = await firestore
    .collection("users")
    .where("id", "==", id)
    .get();
  const documents = await result.docs.map((doc) => doc.data());
  console.log(documents);

  let b = documents.find(({ id }) => id === req.params.id);

  if (b !== null) {
    var collection = firestore.collection("users").doc(id);
    collection
      .update({
        qualification: req.body.qualification,
        paymentpkg: req.body.paymentpkg,
        college: req.body.college,
        subjects: req.body.subjects,
        profileCompleted: req.body.profileCompleted,
        profilepicture: req.body.pic,
        city: req.body.city,
      })
      .then((result) => {
        console.log("f", result);
        res.status(201).json({
          message: "Updated",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
    // console.log(data.qualification)
  }
});

router.put("/studentprofile/update/:id", async (req, res, next) => {
  const id = req.params.id;
  const result = await firestore
    .collection("users")
    .where("id", "==", id)
    .get();
  const documents = await result.docs.map((doc) => doc.data());
  console.log(documents);

  let b = documents.find(({ id }) => id === req.params.id);

  if (b !== null) {
    var collection = firestore.collection("users").doc(id);
    collection
      .update({
        // qualification:req.body.qualification,
        // paymentpkg:req.body.paymentpkg,
        // college:req.body.college,
        // subjects:req.body.subjects,
        description: req.body.description,
      })
      .then((result) => {
        console.log("f", result);
        res.status(201).json({
          message: "Updated",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
    // console.log(data.qualification)
  }
});
module.exports = router;
