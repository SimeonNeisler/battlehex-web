import storeCard from './storeCard.js';

export default class unitCard extends storeCard {
  constructor(name, type, deployCost, storePrice, unitClass, strength, hitpoints, moves, range, abilities, image) {
    super(name, type, deployCost, storePrice, image);
    this.unitClass = unitClass;
    this.strength = strength;
    this.hitpoints = hitpoints;
    this.moves = moves;
    this.range = range;
    this.abilities = abilities;
  }
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
  getDeployCost() {
    return this.deployCost;
  }
  getStorePrice() {
    return this.storePrice;
  }
  getUnitClass() {
    return this.unitClass;
  }
  getStength() {
    return this.strength;
  }
  getHitpoints() {
    return this.hitpoints;
  }
  getMoves() {
    return this.moves;
  }
  getRange() {
    return this.range;
  }
  getAbilities() {
    return this.abilities;
  }

  setName(newName) {
    this.name = newName;
  }
  setType(newType) {
    this.type = newType;
  }
  setDeployCost(newCost) {
    this.deployCost = newCost;
  }
  setStorePrice(newPrice) {
    this.storePrice = newPrice;
  }
  setUnitClass(newClass) {
    this.unitClass = newClass;
  }
  setStrength(newStrength) {
    this.strength = newStrength;
  }
  setHitpoints(newHitpoints) {
    this.hitpoints = newHitpoints;
  }
  setMoves(newMoves) {
    this.moves = newMoves;
  }
  setRange(newRange) {
    this.range = newRange;
  }
  addAbility(newAbility) {
    this.abilities.push(newAbility);
  }
  removeAbility(oldAbility) {
    var index = this.abilities.indexOf(oldAbility);
    if(index > -1) {
      this.abilities.splice(oldAbility, 1);
    }
  }
}
