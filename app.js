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
  projectId: "battlehex-web",
  storageBucket: "gs://battlehex-web.appspot.com/",
  messagingSenderId: "701267753318"
}

//Declare + initialize Database
var firebaseApp = firebase.initializeApp(config);
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

//=====================
//MiddleWare
//=====================
var middleWare = {
  isLoggedIn: function(req, res, next) {
    if(firebase.auth().currentUser) {
      return next();
    } else {
    console.log("Error: Must log in");
    res.redirect("/");
    }
  }
}

//=======================
//ROUTES
//=======================

//Login Page
app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch((err) => {
    if(err) {
      console.log(err);
      res.redirect("/");
    }
  }).then(() => {
    res.redirect("/landing");
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch((err) => {
      if(err) {
        console.log(err);
        res.redirect("/");
      } else {
        console.log("Account Created");
      }
    }).then(() => {
      if(firebase.auth().currentUser) {
        database.ref('users/' + firebase.auth().currentUser.uid).set({
          username: req.body.username
        });
        res.redirect("/landing");
      }
    });
  });


app.get("/signout", (req, res) => {
  firebase.auth().signOut().then(() => {
    console.log("Signout successful");
  }).catch((err) => {
    console.log(err);
  });
  res.render("login");
});

//Home Page
app.get("/landing", middleWare.isLoggedIn, (req, res) => {
  res.render("landing");
});

//Store Page
app.get("/store", middleWare.isLoggedIn, (req, res) => {
  return database.ref('/cards').once('value').then((snapshot) => {
    var cards = snapshot.val();
    res.render("store", {
      units: cards.unit,
      upgrades: cards.upgrade,
      insta: cards.insta
    });
  });
});

//Dev screen to create new cards
app.get("/store/new", (req, res) => {
  res.render("newCard");
});


//Adds new card to the store
app.post("/store", (req, res) => {
  var abilitiesArr = req.body.abilities.split(' ');
  database.ref('cards/' + req.body.type).push().set({
    type: req.body.type,
    name: req.body.name,
    unitClass: req.body.unitClass,
    strength: req.body.strength,
    hitpoints: req.body.hitpoints,
    range: req.body.range,
    moves: req.body.moves,
    abilities: abilitiesArr,
    description: req.body.description,
    cost: req.body.deployCost,
    price: req.body.storePrice,
    image: req.body.image
  }, (err) => {
    if(err) {
      console.log(err);
      //req.flash("error", "Something went wrong");
    } else {
      console.log("success");
      //req.flash("Success", "New Card Added");
      res.redirect("/store/new");
    }
  });
});


app.get("/store/:product", middleWare.isLoggedIn, (req, res) => {
  res.render("product");
});

app.get("/createGame", middleWare.isLoggedIn, (req, res) => {
  res.render("newGame");
});

app.post("/newGame", middleWare.isLoggedIn, (req, res) => {
  res.redirect("/createGame");
});

var port = process.env.PORT || 3000;

app.listen(port, process.env.IP, () => {
  console.log("Server uplink established");
});
