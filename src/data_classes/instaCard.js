import storeCard from './storeCard.js';

export default class instaCard extends storeCard {
  constructor(name, type, deployCost, storePrice, image, description, strength, area) {
    super(name, type, deployCost, storePrice, image, description);
    this.strength = strength;
    this.area = area;
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
  getStength() {
    return this.strength;
  }
  getArea() {
    return this.area;
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
  setStrength(newStrength) {
    this.strength = newStrength;
  }
  setArea(newArea) {
    this.area = newArea;
  }
}
