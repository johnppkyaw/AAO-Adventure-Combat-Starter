const {Item} = require('./item');

class Armor extends Item {
  //armors need to be instantiated with defense property in world.js
  constructor(name, description, defense) {
    super(name, description);
    //player equipped with an armor will receive enemy damage minus the said armor's defense point.
    this.defense = defense;
  }
}

module.exports = {
  Weapon,
};
