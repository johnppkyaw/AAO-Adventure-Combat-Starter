const {Item} = require('./item');

class Weapon extends Item {
  //weapons need to be instantiated with damage property in world.js
  constructor(choice, name, description, damageBonus, isWeapon, cost) {
    super(name, description);
    this.choice = choice;
    this.damageBonus = damageBonus;
    this.isWeapon = isWeapon;
    this.cost = cost;
  }
}

module.exports = {
  Weapon,
};
