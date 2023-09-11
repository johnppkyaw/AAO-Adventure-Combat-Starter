const {Item} = require('./item');

class Weapon extends Item {
  //weapons need to be instantiated with damage property in world.js
  constructor(name, description, damage) {
    super(name, description);
    this.damage = damage;
  }
}

module.exports = {
  Weapon,
};
