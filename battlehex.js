var tiles = document.querySelectorAll(".square");
var numPlayers = 4;
var players = [];
var playerBoxes = document.querySelectorAll(".player");
const player = require('./src/player');
for (i = 0; i < tiles.length; i++) {
  tiles[i].textContent = ("Tile " + (i+1) + "\n");
  tiles[i].textContent += ("Resources: " + (Math.floor(Math.random() * 3) + 1));
}
for (i = 0; i < numPlayers; i++) {
  name = prompt("Insert Player Name: ");
  color = prompt("Choose Color: ");
  newPlayer = player(name, color, 0, 0);
  player[i] = newPlayer;
  playerBoxes[i].style.textContent = ("Player: " + name + "\n" + "Resources: " + 0 + "\n" + "Income: " + 0);
  playerBoxes[i].style.background = (color);
}

function adjustPlayerResources(playerNum, amount) {
  players[playerNum-1].adjustResources(amount);

}
