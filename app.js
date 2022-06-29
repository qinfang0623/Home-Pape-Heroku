// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));


global.weather = "Woops :(";


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

  const query = "Melbourne";
  const apiKey = "5df4c7f070169bd54d36cd8336f6fadf";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

  https.get(url, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      weather = " " + weatherData.weather[0].description;

    });
  });
  res.render(__dirname + "/index.html", {weather:weather});
});


app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server is running ...");
});
