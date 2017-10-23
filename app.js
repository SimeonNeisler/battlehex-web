var bodyParser = require("body-parser"),
    express    = require("express"),
    firebase   = require("firebase"),
    flash      = require("connect-flash"),
    path       = require("path");
const settings =  require("./config/settings");

var app = express();



//Config settings for database
var config = {
  apiKey : settings.apiKey,
  authDomain: settings.authDomain,
  databaseURL: settings.databaseURL,
  projectId: settings.projectId,
  storageBucket: settings.storageBucket,
  messagingSenderId: settings.messagingSenderId
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

app.use((req, res, next) => {
  res.locals.currentUser = firebase.auth().currentUser;
  next();
});


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

app.use(express.static(path.join(__dirname, 'client/build')));

//=======================
//ROUTES
//=======================

//Login Page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post("/auth/email", (req, res) => {
  console.log(req.body.email);
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch((err) => {
    if(err) {
      console.log(err);
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
        firebase.auth().currentUser.updateProfile({
          displayName: req.body.username
        }).then(() => {
          database.ref('users/' + firebase.auth().currentUser.uid).set({
            displayName: req.body.username
          });
        }).catch((err) => {
          console.log(err);
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
      insta: cards.instant,
      upgrades: cards.upgrade,
      abilities: cards.abilities
    });
  });
});

//Dev screen to create new cards
app.get("/store/new", (req, res) => {
  res.render("newCard");
});


//Adds new card to the store
app.post("/store", (req, res) => {
  if(req.body.abilities != null) {
    var abilitiesArr = req.body.abilities.split(' ');
  } else {
    var abilitiesArr = null;
  }
  switch(req.body.type) {
    case "unit":
      database.ref('cards/' + req.body.type).push().set({
          type: req.body.type,
          name: req.body.name,
          unitClass: req.body.unitClass,
          strength: parseInt(req.body.strength),
          hitpoints: parseInt(req.body.hitpoints),
          range: parseInt(req.body.range),
          moves: parseInt(req.body.moves),
          abilities: abilitiesArr,
          description: req.body.description,
          cost: parseInt(req.body.deployCost),
          price: parseFloat(req.body.storePrice),
          image: req.body.image
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("New Card created");
          res.redirect("/store");
        }
      });
    break;
    case "instant":
      database.ref('cards/' + req.body.type).push().set({
            type: req.body.type,
            name: req.body.name,
            strength: parseInt(req.body.strength),
            description: req.body.description,
            cost: parseInt(req.body.deployCost),
            price: parseFloat(req.body.storePrice),
            image: req.body.image,
            area: parseInt(req.body.area)
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log(typeof(req.body.strength));
          console.log("New Card created");
          res.redirect("/store");
        }
      });
    break;
    case "upgrade":
      database.ref('cards/' + req.body.type).push().set({
          type: req.body.type,
          name: req.body.name,
          unitClass: req.body.unitClass,
          strength: parseInt(req.body.strength),
          hitpoints: parseInt(req.body.hitpoints),
          range: parseInt(req.body.range),
          moves: parseInt(req.body.moves),
          abilities: abilitiesArr,
          description: req.body.description,
          cost: parseInt(req.body.deployCost),
          price: parseFloat(req.body.storePrice),
          image: req.body.image
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("New Card created");
          res.redirect("/store");
        }
      });
    break;
    case "ability":
      database.ref('cards/' + req.body.type).push().set({
        type: req.body.type,
        name: req.body.name,
        description: req.body.description,
        cost: parseInt(req.body.cost),
        price: parseFloat(req.body.price),
        image: req.body.image
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("New Card created");
          res.redirect("/store");
        }
      });
    break;
  }
});

app.get("/store/checkout", middleWare.isLoggedIn, (req, res) => {
  var uid = firebase.auth().currentUser.uid;
  return database.ref('users/' + uid + '/cart').once('value').then((snapshot) => {
    var cart = snapshot.val();
    var totalPrice = 0;
    for (var key in cart) {
      if(!cart.hasOwnProperty(key)) continue;
      var card = cart[key];
      totalPrice += card.price;
    }
    res.render("checkout", {
      cart: cart,
      totalPrice: totalPrice
    });
  });
});

app.post("/store/checkout", (req, res) => {
  var uid = firebase.auth().currentUser.uid;
  database.ref('users/' + uid +'/cart').push(
  ).set({
    cardID: req.body.card,
    price: parseFloat(req.body.price)
  }), (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log("Card successfully added");
    }
  }
  res.redirect("/store/checkout");
});

app.get("/decks", (req, res) => {
  res.render("decks");
});

app.post("/decks", (req, res) => {
  var uid = firebase.auth().currentUser.uid;
  database.ref('users/' + uid + '/cards/userCards').once('value').then((snapshot) => {
    var ownedCards = snapshot.val();
    if(ownedCards == null) {
      var pushedCards = req.body.cards.split(",");
    } else {
      var newCards = (req.body.cards.split(","));
      var pushedCards = ownedCards.concat(newCards);
      console.log(Array.isArray(pushedCards));
      console.log(pushedCards);
    }
    database.ref('users/' + uid + '/cards').set({
      userCards: pushedCards
    }, (err) => {
      if(err) {
        console.log(err);
        res.redirect("/landing");
      } else {
        console.log("Cards added to inventory");
        database.ref('users/' + uid + '/cart').remove((err) => {
          if (err) {
            console.log(err);
          }
          res.redirect("/decks");
        });
      }
    });
  });
});

/*app.get("/store/:product", middleWare.isLoggedIn, (req, res) => {
  res.render("product");
});*/


app.get("/createGame", middleWare.isLoggedIn, (req, res) => {
  res.render("newGame");
});

app.post("/newGame", middleWare.isLoggedIn, (req, res) => {
  res.redirect("/createGame");
});

var port = process.env.PORT || 5000;

app.listen(port, process.env.IP, () => {
  console.log("Server uplink established");
});
