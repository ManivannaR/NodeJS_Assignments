const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here

let result = 0;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("calculator.ejs");
});

app.get("/add", (req, res) => {
  if (result < -1000000) {
    res.send(`Error - Underflow`);
  } else if (result > 1000000) {
    res.send(`Error - Overflow`);
  } else {
    res.send(`Success - The sum of given two numbers: ${result}`);
  }
});

app.get("/sub", (req, res) => {
  if (result < -1000000) {
    res.send(`Error - Underflow`);
  } else if (result > 1000000) {
    res.send(`Error - Overflow`);
  } else {
    res.send(`Success - The difference of given two numbers: ${result}`);
  }
});

app.get("/multiply", (req, res) => {
  if (result < -1000000) {
    res.send(`Error - Underflow`);
  } else if (result > 1000000) {
    res.send(`Error - Overflow`);
  } else {
    res.send(`Success - The product of given two numbers: ${result}`);
  }
});

app.get("/divide", (req, res) => {
  if (result < -1000000) {
    res.send(`Error - Underflow`);
  } else if (result > 1000000) {
    res.send(`Error - Overflow`);
  } else {
    res.send(`Success - The division of given two numbers: ${result}`);
  }
});

app.get("/errorpage", (req, res) => {
  res.send("Can't divide by 0");
});

app.post("/operations", (req, res) => {
  if (req.body.operation == "add") {
    result = parseInt(req.body.num1) + parseInt(req.body.num2);
    res.redirect("/add");
  } else if (req.body.operation == "sub") {
    result = req.body.num1 - req.body.num2;
    res.redirect("/sub");
  } else if (req.body.operation == "min") {
    result = req.body.num1 * req.body.num2;
    res.redirect("/multiply");
  } else {
    if (req.body.num2 == 0) {
      res.redirect("/errorpage");
    } else {
      result = req.body.num1 / req.body.num2;
      res.redirect("/divide");
    }
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
