const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
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

  hit(name) {
    const targetEnemy = this.currentRoom.getEnemyByName(name);
    setTimeout(this.currentRoom.printRoom.bind(this.currentRoom), targetEnemy.cooldown + 1000);
    targetEnemy.applyDamage(this.strength);
    console.log(`You attacked ${name}!`);
    targetEnemy.attackTarget = this;
    targetEnemy.attack();
    if(this.health <= 0) {
      this.die();
      return;
    }

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

  takeItem(itemName) {
    this.items.push(this.currentRoom.getItemByName(itemName));
  }

  dropItem(itemName) {
    this.currentRoom.items.push(this.getItemByName(itemName));
  }

  eatItem(itemName) {
    // Check if item is instanceof food
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].name === itemName && (this.items[i] instanceof Food)) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        this.items.splice(index, 1);
        console.log(`${this.name} has eaten ${itemName}`);
        return;
    }
    console.log("The item does not exist or is not a food!")
  }

  getItemByName(name) {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].name === name) {
            index = i;
        }
        break;
    }
    if (index !== -1) {
        return this.items.splice(index, 1).pop();
    }
  }

}

module.exports = {Player};
