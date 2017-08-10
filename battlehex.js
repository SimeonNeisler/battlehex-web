var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("menu");
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
