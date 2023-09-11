const {Character} = require('./character');

class Shopkeeper extends Character {

  constructor(name, description, currentRoom, isAlly) {
    super(name, description, currentRoom);
    this.isAlly = isAlly;
    this.weapon = ["Standard Sword", "Excalibar", "Daedric Sword"];
    this.armor = ["Leather Armor", "Ebony Armor", "Daedric Armor"]
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`${this.items[i].name}\n`);
      }
    }
  }

  dropItem(itemName) {
    this.currentRoom.items.push(this.getItemByName(itemName));
  }

}

module.exports = {Shopkeeper};
