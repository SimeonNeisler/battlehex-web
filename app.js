var bodyParser = require("body-parser"),
    express    = require("express"),
    firebase   = require("firebase"),
    //flash      = require("connect-flash"),
    path       = require("path"),
    admin      = require("firebase-admin");

const settings =  require("./config/settings");
const stripe = require('stripe')(settings.stripeSecretKey);
import {abilityCard, instaCard, unitCard, upgradeCard} from './src/data_classes';

var serviceAccount = require('config/battlehex-web-firebase-adminsdk-ca57k-d02dd26f88.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://battlehex-web.firebaseio.com'
});

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

//=======================
//ROUTES
//=======================

//Login Page

//Login with tokens
app.post('/auth/token', (req, res) => {
    const verified = firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
      firebase.auth().create
    });
});

//Login with email and password
app.post('/auth/email', (req, res) => {
  console.log("Request Received");
  console.log(req.body);
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
    console.log(user.uid);
    res.send({uid: user.uid, auth: true});
  }).catch((err) => {
    if(err) {
      console.log(err);
      res.send({err, auth: false});
    }
  });
});

//Logout
app.get('/auth/logout', (req, res) => {
  firebase.auth().signOut().then(() => {
    console.log("Signout successful");
    res.send({auth: false});
  }).catch((err) => {
    console.log(err);
    res.send(err);
  });

});

//Registration
app.post('/register', (req, res) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch((err) => {
      if(err) {
        console.log(err);
        res.redirect('/');
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
      }
  });
});

//Retrieve store inventory (cards being sold)
app.get('/cards', async (req, res) => {
  let snapshot = await database.ref('/cards').once('value');
  let cards = snapshot.val();
  res.send(cards);
});

//Retrieve cards owned by user
app.get('/userCards', async (req, res) => {
  let snapshot = await database.ref('users/LT8SXOBVszYSE4Q4In2q9LiOvkk2/cards').once('value');
  let userCards = snapshot.val();
  console.log(userCards);
  res.send(userCards);
});

//Send a new card to the store
app.post('/store', (req, res) => {
  console.log(req.body);
  console.log("Card sent");
  var {cardName, type, deployCost, storePrice, description, image, strength, hitpoints, range, moves, unitClass, abilities, area, action} = req.body.card;


  if(abilities != null) {
    var abilitiesArr = abilities.split(' ');
  } else {
    var abilitiesArr = null;
  }

  switch(type) {
    case "unit":
      var newCard = new unitCard(cardName, type, deployCost, storePrice, image, description, unitClass, strength, hitpoints, range, moves, abilitiesArr);
      break;
    case "instant":
      var newCard = new instaCard(cardName, type, deployCost, storePrice, image, description, strength, area);
      break;
    case "upgrade":
      var newCard = new upgradeCard(cardName, type, deployCost, storePrice, image, description, unitClass, strength, hitpoints, range, moves, abilitiesArr);
      break;
    case "ability":
      var newCard = new abilityCard(cardName, type, deployCost, storePrice, image, description, action);
  }
  database.ref('cards/' + type).push().set({
    card: newCard
  });
  res.send("Card submitted");
});


//retool route to accept multiple cards on purchase and iteratively add them to user's deck pool


app.post('/store/purchase', async (req, res) => {
  const currentUser = firebase.auth().currentUser;
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.token.id
  });

  const cart = req.body.cart;

  let snapshot = await database.ref('users/' + currentUser.uid + '/cards').once('value');
  let userCards = snapshot.val();
  if(!userCards) {
    userCards = {};
  }

  Object.keys(cart).map((cardTypes) => {
    if(!userCards[cardTypes]) {
      userCards[cardTypes] = {};
    }
    Object.keys(cart[cardTypes]).map((card) => {
      if(userCards[cardTypes][card]) {
        userCards[cardTypes][card] += cart[cardTypes][card];
      } else {
        userCards[cardTypes][card] = cart[cardTypes][card];
      }
    });
  });
  console.log(userCards);

  database.ref('users/' + currentUser.uid).set({
    cards: userCards
  });
});


/*app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});*/

/*app.get("/register", (req, res) => {
  res.render("register");
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
