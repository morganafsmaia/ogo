"use strict";
// ----------------------------- SET UP --------------------------------
// requiring packages
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

// setting hostname and port
const hostname = "localhost";
const port = 9090;

// setting app with express
const app = express();

// parse application
app.use(bodyParser.urlencoded({ extended: false }));

// setting up static folder
app.use(express.static("public"));

// ------------------------------ROUTING------------------------------------

// Route for the homepage --> /
app.get("/", (request, response) => {
  //"Rendering" the html file
  response.sendFile(__dirname + "/html/index.html");
});

// Route for game page --> /game
app.get("/game", (request, response) => {
  //"Rendering" the html file
  response.sendFile(__dirname + "/html/game.html");
});

app.post("/game", (request, response) => {
  // getting from frontend how many rounds will be played
  let rounds = 2 * request.body.rounds;
  //testing if rounds is comming through from frontend
  //console.log(rounds);
  let items4Play = [];
  fs.readFile("data.json", (err, data) => {
    if (err) {
      throw err;
    }
    let parsedData = JSON.parse(data);
    while (items4Play.length < rounds) {
      let index = Math.floor(Math.random() * parsedData.length);
      let chosen = parsedData[index];
      items4Play.push(chosen);
      parsedData.splice(index, 1);
    }
    //console.log(items4Play);
    response.send(items4Play);
  });
});

//-------------------------------- APP.LISTEN ----------------------------------
// setting the listening to specific port

app.listen(port, () => {
  console.log(`Listening on ${port}!!`);
});
