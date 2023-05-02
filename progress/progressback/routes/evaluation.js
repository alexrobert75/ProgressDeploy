const express = require("express");
const router = express.Router();
const Evaluation = require("../models/Evaluation");
const Answer = require("../models/Answer");
const User = require("../models/User");
const checkTeacher = require("../middlewares/checkTeacher");
const checkEvalExpiry = require("../middlewares/checkEvalExpiry");
const requireAuth = require("../middlewares/requireAuth");
const checkId = require("../middlewares/checkId");

router.post("/newevaluation", checkEvalExpiry, async (req, res, next) => {
  const answerArray = req.body.evalFormatted;
  const averageGrade = req.body.finalGrade;
  const evalTitle = req.body.evalTitle;
  const answerListWithId = [];

  const createAnswersPromise = new Promise((res, rej) => {
    answerArray.forEach(async (answer) => {
      const newAnswer = {
        questionId: answer.questionId,
        repartition: answer.repartition,
        reponse: answer.reponse,
      };
      const createdAnswer = await Answer.create(newAnswer);
      answerListWithId.push(createdAnswer.id);

      if (answerArray.length === answerListWithId.length) {
        res();
      }
    });
  });

  await createAnswersPromise;

  //create evaluation data
  const newEvaluation = {
    answerList: answerListWithId,
    userId: req.session.currentUser._id,
    globalGrade: averageGrade,
    evalTitle: evalTitle
  };
  const createdEvaluation = await Evaluation.create(newEvaluation);
  const updatedUser = await User.findByIdAndUpdate(
    req.session.currentUser._id,
    {
      currentEvaluation: {
        isOpen: false,
      },
    }
  );
  res.status(201).json(createdEvaluation);
});

//fetch all eval for one student
router.get("/allevaluation", requireAuth, (req, res, next) => {
  Evaluation.find({ userId: req.session.currentUser._id })
    .populate({
      path: "answerList",
      populate: { path: "questionId" },
    })
    .then((evaluations) => {
      res.status(200).json(evaluations);
    })
    .catch(next);
});

//fetch all eval for teacher
router.get("/allevaluations", checkTeacher, (req, res, next) => {
  Evaluation.find()
    .populate({
      path: "userId",
    })
    .then((evaluations) => {
      res.status(200).json(evaluations);
    })
    .catch(next);
});

//fetch all eval for teacher with all details
router.get("/allevaluationsfulldetails", checkTeacher, (req, res, next) => {
  Evaluation.find()
    .populate({
      path: "userId answerList",
      populate: { path: "questionId" },
    })
    .then((evaluations) => {
      res.status(200).json(evaluations);
    })
    .catch(next);
});

//fetch one eval for one student
router.get("/:id", requireAuth, checkId, (req, res, next) => {
  Evaluation.findById(req.params.id)
    .populate({
      path: "userId answerList",
      populate: { path: "questionId" },
    })
    .then((evaluation) => {
      res.status(200).json(evaluation);
    })
    .catch(next);
});

//delete one evaluation by id, teacher only
router.post(
  "/deleteevaluation",
  requireAuth,
  checkTeacher,
  (req, res, next) => {
    const id = req.body.id;
    Evaluation.deleteOne({ _id: id })
      .then((evaluation) => {
        res.status(200).json(evaluation);
      })
      .catch(next);
  }
);

// Update an evaluation

router.post("/updateevaluation", async (req, res, next) => {
  const evalId = req.body.id;
  const answerArray = req.body.evaluation.evalFormatted;
  const averageGrade = req.body.evaluation.finalGrade;
  let counterUpdate = 0;

  //update answers within the eval
  const updateAnswersPromise = new Promise((res, rej) => {
    answerArray.forEach(async (answer) => {
      const answerUpdateData = {
        repartition: answer.repartition,
        reponse: answer.reponse,
      };
      const updatedAnswer = await Answer.findByIdAndUpdate(
        answer.answerId,
        answerUpdateData
      );
      counterUpdate++;

      if (answerArray.length === counterUpdate) {
        res();
      }
    });
  });
  await updateAnswersPromise;
  const updatedEvaluation = await Evaluation.findByIdAndUpdate(evalId, {
    globalGrade: averageGrade,
  });
  res.status(201).json(answerArray);
});

module.exports = router;
