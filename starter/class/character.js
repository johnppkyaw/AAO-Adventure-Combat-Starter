class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.strength = 10;
    this.health = 100;
    this.gold = 50;
    this.deflect = 0;
  }

  //remove health points from the character
  applyDamage(amount) {
    if (this.health <= 0) {
      this.die();
      return;
    }
    if(this.deflect > 0) {
      this.health -= (amount - this.deflect);
      console.log(`Armor deflected ${this.deflect} damage from enemy's ${amount} attack point.`)
      return;
    }
    this.health -= amount;
    return;
  }

  //loot gold in current room
  lootGold() {
    if (this.currentRoom.gold <= 0) {
      console.log(`${this.name} tried looting gold but none available!`)
      return;
    } else {
      console.log(`${this.name} looted ${this.currentRoom.gold} gold!`)
      this.gold += this.currentRoom.gold;
      this.currentRoom.gold = 0;
    }
  }

  die() {
    //drops the dead character's items and gold in the current room
    this.items.forEach(item => {
      this.currentRoom.items.push(item);
    })
    this.currentRoom.gold += this.gold;

    //empties character's gold, inventory, and room
    this.gold = 0;
    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
