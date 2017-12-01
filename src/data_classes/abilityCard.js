import storeCard from './storeCard';

export default class abilityCard extends storeCard {
  constructor(name, type, deployCost, storePrice, description, action) {
    super(name, type, deployCost, storePrice, description);
    this.action = action;
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
  getDescription() {
    return this.description;
  }
  getAction() {
    return this.action;
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
  setStorePrice(newStorePrice) {
    this.storePrice = newStorePrice;
  }
  setDescription(newDescription) {
    this.description = newDescription;
  }
  setAction(newAction) {
    this.action = newAction;
  }
}
