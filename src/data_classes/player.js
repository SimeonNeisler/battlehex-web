export default class player {
  constructor(userId, color, income, resources) {
    this.userId = userId;
    this.color = color;
    this.income = income;
    this.resources = resources;
  }
  getUserName() {
    return this.userId;
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
