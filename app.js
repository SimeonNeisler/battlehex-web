var bodyParser = require("body-parser"),
    express    = require("express"),
    firebase   = require("firebase"),
    flash      = require("connect-flash"),
    path       = require("path");

var app = express();

//Config settings for database
var config = {
  apiKey : "AIzaSyBzxM1cmlN18AvVIE9SrBVIihn4O5vM8Zg",
  authDomain: "battlehex-web.firebaseapp.com",
  databaseURL: "https://battlehex-web.firebaseio.com/",
  storageBucket: "gs://battlehex-web.appspot.com/"
}

//Declare + initialize Database
firebase.initializeApp(config);
var database = firebase.database();

//app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));

/*app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});*/


app.set("view engine", "ejs");


//=======================
//ROUTES
//=======================

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
  return database.ref('/cards/')
  res.render("store", {cards: cards});
});

//Dev screen to create new cards
app.get("/store/new", (req, res) => {
  res.render("newCard");
})

//Adds new card to the store
app.post("/store", (req, res) => {
  database.ref('cards/' + req.body.name).set({
    type: req.body.type,
    name: req.body.name,
    class: req.body.class,
    strength: req.body.strength,
    hitpoints: req.body.hitpoints,
    range: req.body.range,
    moves: req.body.moves,
    abilities: req.body.abilities,
    cost: req.body.cost,
    price: req.body.price,
    image: req.body.image
  }, (err) => {
    if(err) {
      console.log(err);
      //req.flash("error", "Something went wrong");
    } else {
      console.log("success");
      //req.flash("Success", "New Card Added");
      res.redirect("/store");
    }
  });
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
