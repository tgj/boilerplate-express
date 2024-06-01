require("dotenv").config();
let express = require("express");
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use((req, _, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (_, res) => {
  path = __dirname + "/views/index.html";
  res.sendFile(path);
});

app.get("/json", (_, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    message,
  });
});

app.get(
  "/now",
  (req, _, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({
      time: req.time,
    });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

module.exports = app;
