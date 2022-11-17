const fs = require("fs");
const http = require("http");

fs.writeFile(
  "index.html",
  `<h1> Hello World </h1>
  <p> This is Manivanna </p>`,
  (err) => {
    if (err) console.log(err);
  }
);

http
  .createServer((req, res) => {
    fs.readFile(`index.html`, function (err, filedata) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(filedata);
    });
  })
  .listen(5000, "localhost");
