const router = require("express").Router();
const studentData = require("../src/InitialData");

router.get("/student", (req, res) => {
  res.status(200).json(studentData);
});

router.get("/student/:id", (req, res) => {
  const student = studentData.filter((ele) => {
    if (ele.id == req.params.id) return ele;
  });
  if (student.length == 1) {
    res.status(200).json(student[0]);
  } else {
    res.status(400).json({ status: "Invalid Request" });
  }
});

router.delete("/student/:id", (req, res) => {
  const deleteIndex = studentData.findIndex((obj) => {
    return obj.id == req.params.id;
  });
  if (deleteIndex == -1) {
    res.status(400).json({ status: "Invalid Request" });
  } else {
    studentData.splice(deleteIndex, 1);
    res.status(200).json(studentData);
  }
});

router.post("/student", (req, res) => {
  res.setHeader("content-type", "application/x-www-form-urlencoded");
  if (
    req.body.name == "" ||
    req.body.currentClass == "" ||
    req.body.division == ""
  ) {
    res.status(400).send("Invalid Data");
  } else {
    req.body.id = new Date();
    studentData.push(req.body);
    res.status(200).json({
      status: "Success",
      message: "Student added",
    });
  }
});

router.put("/student/:id", (req, res) => {
  res.setHeader("content-type", "application/x-www-form-urlencoded");
  if (req.body.name == "") {
    res.status(400).send("Invalid Data");
  } else {
    let updateIndex = studentData.findIndex((obj) => {
      return obj.id == req.params.id;
    });
    if (updateIndex == -1) {
      res.status(400).send("Invalid Request");
    } else {
      studentData[updateIndex].name = req.body.name;
      res.status(200).json({
        status: "Success",
        message: "Student updated",
      });
    }
  }
});

module.exports = router;
