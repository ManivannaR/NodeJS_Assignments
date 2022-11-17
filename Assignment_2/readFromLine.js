const { stdin, stdout } = require("process");
const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter your name:", (ans) => {
  console.log(`Hello ${ans}`);
  rl.close();
});
