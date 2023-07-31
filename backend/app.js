const express = require("express");
const cors = require("cors");
const logger = require("./logger");
const results = require("./results");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to game theory API");
});

app.get("/results", (req, res) => {
  try {
    res.send(results);
  } catch (error) {
    next(error);
  }
});

app.post("/results", (req, res) => {
  const newResult = req.body;
  //  results.push(req.body);
  res.status(201).send("Added a post");

  fs.readFile("results.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object
      obj.push(req.body); //add some data
      json = JSON.stringify(obj); //convert it back to json
      fs.writeFile("results.json", json, "utf8", callback); // write it back
    }
  });
});

function callback(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("File successfully written.");
  }
}
module.exports = app;
