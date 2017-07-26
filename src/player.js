export default class player {
  constructor(userName, color, income, resources) {
    this.userName = userName;
    this.color = color;
    this.income = income;
    this.resources = resources;
  }
  getUserName() {
    return this.userName;
  }
  getColor() {
    return this.color;
  }
  getIncome() {
    return this.income;
  }
  getResources() {
    return this.resources;
  }
  adjustIncome(incomeMod) {
    this.income += incomeMod;
  }
  adjustResources(resourceMod) {
    this.resources += resourceMod;
  }
}
