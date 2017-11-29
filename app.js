var bodyParser = require("body-parser"),
    express    = require("express"),
    firebase   = require("firebase"),
    //flash      = require("connect-flash"),
    path       = require("path");

const settings =  require("./config/settings");

var app = express();



//Config settings for database
//var config = settings;
//Declare + initialize Database
var firebaseApp = firebase.initializeApp(settings);
var database = firebase.database();

//app.use(flash());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

/*app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});*/




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

/*app.use('*', (req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Credentials", "true"); res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});*/

//=======================
//ROUTES
//=======================

//Login Page

app.post('/auth/email', (req, res) => {
  console.log("Request Received");
  console.log(req.body);
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
    console.log(user.uid);
    res.send(user.uid);
  }).catch((err) => {
    if(err) {
      console.log(err);
      res.send(err);
    }
  });
});

app.get('/auth/currentUser', (req, res) => {
  const user = firebase.auth().currentUser;
  if (user) {
    res.send(user.uid);
  } else {
    res.send("Please login");
  }
});

app.get('/auth/logout', (req, res) => {
  firebase.auth().signOut().then(() => {
    console.log("Signout successful");
    res.send("Signed out");
  }).catch((err) => {
    console.log(err);
    res.send("Error Occurred");
  });

});

app.get("/store", async (req, res) => {
  var snapshot = await database.ref('/cards').once('value');
  var cards = snapshot.val();
  res.send(cards);

  /*.then((snapshot) => {
    var cards = snapshot.val();
    res.render("store", {
      units: cards.unit,
      insta: cards.instant,
      upgrades: cards.upgrade,
      abilities: cards.abilities
    });*/
});

app.post("/store", (req, res) => {
  var {cardName, type, deployCost, storePrice, description, image, strength, hitpoints, range, moves, unitClass, abilities, area} = req.body.state;
  res.send("Card submitted");
  if(abilities != null) {
    var abilitiesArr = abilities.split(' ');
  } else {
    var abilitiesArr = null;
  }
  switch(type) {
    case "unit":
      database.ref('cards/' + type).push().set({
          type: type,
          name: cardName,
          unitClass: unitClass,
          strength: parseInt(strength),
          hitpoints: parseInt(hitpoints),
          range: parseInt(range),
          moves: parseInt(moves),
          abilities: abilitiesArr,
          description: description,
          cost: parseInt(deployCost),
          price: parseFloat(storePrice),
          image: image
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("New Card created");
        }
      });
    break;
    case "instant":
      database.ref('cards/' + type).push().set({
            type: type,
            name: cardName,
            strength: parseInt(strength),
            description: description,
            cost: parseInt(deployCost),
            price: parseFloat(storePrice),
            image: image,
            area: parseInt(area)
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log(typeof(strength));
          console.log("New Card created");
        }
      });
    break;
    case "upgrade":
      database.ref('cards/' + type).push().set({
          type: type,
          name: cardName,
          unitClass: unitClass,
          strength: parseInt(strength),
          hitpoints: parseInt(hitpoints),
          range: parseInt(range),
          moves: parseInt(moves),
          abilities: abilitiesArr,
          description: description,
          cost: parseInt(deployCost),
          price: parseFloat(storePrice),
          image: image
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("New Card created");
        }
      });
    break;
    case "ability":
      database.ref('cards/' + type).push().set({
        type: type,
        name: cardName,
        description: description,
        cost: parseInt(cost),
        price: parseFloat(price),
        image: image
      }, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("New Card created");
        }
      });
    break;
  }
  res.send("Card Submitted.");
});

/*app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});*/

/*app.get("/register", (req, res) => {
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
});*/

/*
//Dev screen to create new cards
app.get("/store/new", (req, res) => {
  res.render("newCard");
});


//Adds new card to the store

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


/*app.get("/createGame", middleWare.isLoggedIn, (req, res) => {
  res.render("newGame");
});

app.post("/newGame", middleWare.isLoggedIn, (req, res) => {
  res.redirect("/createGame");
});*/

var port = process.env.PORT || 5000;

app.listen(port, process.env.IP, () => {
  console.log("Server uplink established");
});
