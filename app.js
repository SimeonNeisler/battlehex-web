var bodyParser = require("body-parser");
var express = require("express");
var firebase = require("firebase");
var path = require("path");
var app = express();

var config = {
  apiKey : "AIzaSyBzxM1cmlN18AvVIE9SrBVIihn4O5vM8Zg",
  authDomain: "battlehex-web.firebaseapp.com",
  databaseURL: "https://battlehex-web.firebaseio.com/",
  storageBucket: "gs://battlehex-web.appspot.com/"
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");


//Login Page
app.get("/", (req, res) => {
  res.render("home");
});

//Home Page
app.get("/landing", (req, res) => {
  res.render("landing");
});

//Store Page
app.get("/store", (req, res) => {
  res.render("store");
});

app.post("/store", (req, res) => {
  res.redirect("/store");
});


app.get("/store/:product", (req, res) => {
  res.render("product");
});

app.get("/createGame", (req, res) => {
  res.render("newGame");
});

app.post("/newGame", (req, res) => {
  res.redirect("/createGame");
});

app.listen(3000, process.env.IP, () => {
  console.log("Server uplink established");
});
