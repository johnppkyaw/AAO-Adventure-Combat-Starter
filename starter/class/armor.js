const {Item} = require('./item');

class Armor extends Item {
  //armors need to be instantiated with defense property in world.js
  constructor(choice, name, description, deflectBonus, isArmor, cost) {
    super(name, description);
    this.choice = choice;
    //player equipped with an armor will receive enemy damage minus the said armor's defense point.
    this.deflectBonus = deflectBonus;
    this.isArmor = isArmor;
    this.cost = cost;
  }
}

module.exports = {
  Armor,
};
