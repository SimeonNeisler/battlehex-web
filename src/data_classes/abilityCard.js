import storeCard from './storeCard';

export default class abilityCard extends storeCard {
  constructor(name, type, deployCost, storePrice, description) {
    this.name = name;
    this.type = type;
    this.deployCost = deployCost;
    this.storePrice = storePrice;
    this.description = description;
  }
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
  getDeployCost() {
    return deployCost;
  }
  getStorePrice() {
    return this.storePrice;
  }
  getDescription() {
    return this.description;
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
}
