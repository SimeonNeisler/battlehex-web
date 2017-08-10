var bodyParser = require("body-parser");
var express = require("express");
var firebase = require("firebase");
var app = express();

var config = {
  apiKey : "AIzaSyBzxM1cmlN18AvVIE9SrBVIihn4O5vM8Zg",
  authDomain: "battlehex-web.firebaseapp.com",
  databaseURL: "https://battlehex-web.firebaseio.com/",
  storageBucket: "gs://battlehex-web.appspot.com/"
}

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/shop", (req, res) => {
  res.redirect("/store");
});

app.get("/store", (req, res) => {
  res.render("store");
});

app.get("/store/:product", (req, res) => {
  res.render("product");
});

app.post("/newGame", (req, res) => {
  res.redirect("/createGame");
});

app.get("/createGame", (req, res) => {
  res.render("newGame");
});


app.listen(3000, process.env.IP, () => {
  console.log("Server uplink established");
});
