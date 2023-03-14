const express = require("express");
const router = express.Router();
const firebase = require("../../db");
const _ = require("lodash");
const firestore = firebase.firestore();
const axios = require("axios");

router.post("/viewprofile/comments/", async (req, res, next) => {
  var comments = await firestore.collection("comments").doc();
  comments
    .set({
      id: comments.id,
      commentersid: req.body.commentersid,
      commentedBy: req.body.commentedBy,
      email: req.body.email,
      comment: req.body.comment,
      teacherId: req.body.teacherId,
    })
    .then((result) => {
      console.log("f", result);
      res.status(201).json({
        message: "Comment Added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/viewprofile/comments/:userId", async (req, res, next) => {
  const result = await firestore
    .collection("comments")
    .where("teacherId", "==", req.params.userId)
    .get();
  let responseData;

  const documents = result.docs.map((doc) => doc.data());
  let finalRating;
  await axios
    .post("http://127.0.0.1:2000/data", { data: documents })

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
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  let obj = { documents, finalRating };
  if (!documents) res.status(200).json(obj);

  res.status(200).json(obj);
});

router.get("/filter/:userId", async (req, res, next) => {
  const result = await firestore
    .collection("comments")
    .where("teacherId", "==", req.params.userId)
    .get();
  const documents = result.docs.map((doc) => doc.data());
  console.log(documents, "doc1");
  let responseData;
  let positive = [];
  let negative = [];
  let neutral = [];

  let sentiment = [];

  // let array1=[]
  // for (let x in documents) {
  //   array1.push([documents[x]])
  // }
  // console.log(array1)
  // const pyPost=await axios.get("http://127.0.0.1:2000/helloworld/tim")
  await axios
    .post("http://127.0.0.1:2000/data", { data: documents })

    .then(function (response) {
      // handle success
      responseData = response.data;
      console.log(responseData, "responssedata");

      for (let item in responseData) {
        console.log(responseData[item]);
        if (responseData[item].sentiment == "postive")
          positive.push(responseData[item]);
        else if (responseData[item].sentiment == "negative")
          negative.push(responseData[item]);
        else neutral.push(responseData[item]);
      }
      console.log(positive, negative);
      sentiment = [...positive, ...neutral, ...negative];
      console.log(sentiment, "sentiment");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  res.status(200).json(sentiment);
});

router.get("/filter/negative/:userId", async (req, res, next) => {
  const result = await firestore
    .collection("comments")
    .where("teacherId", "==", req.params.userId)
    .get();
  const documents = result.docs.map((doc) => doc.data());
  console.log(documents, "doc1");
  let responseData;
  let positive = [];
  let negative = [];
  let neutral = [];

  let sentiment = [];

  await axios
    .post("http://127.0.0.1:2000/data", { data: documents })

    .then(function (response) {
      // handle success
      responseData = response.data;
      console.log(responseData, "responssedata");

      for (let item in responseData) {
        console.log(responseData[item]);
        if (responseData[item].sentiment == "postive")
          positive.push(responseData[item]);
        else if (responseData[item].sentiment == "negative")
          negative.push(responseData[item]);
        else neutral.push(responseData[item]);
      }
      console.log(positive, negative);
      sentiment = [...negative, ...neutral, ...positive];
      console.log(sentiment, "sentiment");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  res.status(200).json(sentiment);
});

module.exports = router;
