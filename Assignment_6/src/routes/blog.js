const router = require("express").Router();
const Blog = require("../models/Blog");

// Your routing code goes here

router.get("/blog", async (req, res) => {
  if (req.query) {
    const user = await Blog.find({ topic: req.query.search }).limit(
      parseInt(req.query.page)
    );
    res.status(200).json({ status: "Success", result: user });
  } else {
    const user = await Blog.find();
    res.status(200).json(user);
  }
});

router.post("/blog", async (req, res) => {
  try {
    const user = await Blog.create(req.body);
    res.status(200).json({ status: "Success", result: user });
  } catch (e) {
    res.status(400).json({ status: "Failed" });
  }
});

router.put("/blog/:id", async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id }, req.body);
    const user = await Blog.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      result: user,
    });
  } catch (e) {
    res.status(400).json({ status: "Failed" });
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    const user = await Blog.findOne({ _id: req.params.id });
    await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      result: user,
    });
  } catch (e) {
    res.status(400).json({ status: "Failed" });
  }
});

module.exports = router;
