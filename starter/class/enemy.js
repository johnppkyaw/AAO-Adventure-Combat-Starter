const {Character} = require('./character');
const {Food} = require('./food');

class Enemy extends Character {
  constructor(name, description, currentRoom, health, strength) {
    super(name, description, currentRoom);
    this.health = health;
    this.strength = strength;
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    //shuffle direction array;
    let direction = ['n', 's', 'e', 'w'];
    for (let i = direction.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [direction[i], direction[randomIndex]] = [direction[randomIndex], direction[i]];
    }

    for (let j = 0; j < direction.length; j++) {
      //if the exit exists, move to that room.
      if (this.currentRoom.exits[direction[j]]) {
        this.currentRoom = this.currentRoom.exits[direction[j]];
        this.cooldown += 1000;
        return;
      }
    }
  }

  takeSandwich() {
    const itemToTake = this.currentRoom.items.filter(item => item instanceof Food).pop();
    if (itemToTake) {
      console.log(`Enemy ${this.name} took ${itemToTake.name}!`);
      this.items.push(itemToTake);
      this.currentRoom.getItemByName(itemToTake.name);
      return;
    }
    return;
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  attack() {
    if (this.attackTarget === null) {
    } else {
      const cooldown = this.cooldown;
      this.rest();
      this.takeSandwich();
      this.attackTarget.applyDamage(this.strength);
      this.randomMove();
      setTimeout(() => {
        console.log(`Enemy ${this.name} attacked back and fled to ${this.currentRoom.name}`);
      }, cooldown + 3000);
      this.cooldown += 1000;

    }
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
    }
  }

  scratchNose() {
    this.cooldown += 1000;
    this.alert(`${this.name} scratches its nose`);
  }
}

// let room = new Room("Test Room", "A test room");
// let enemy = new Enemy('enemy', 'an ordinary character', room);
// console.log(enemy.act());
// console.log(enemy.act());


module.exports = {Enemy};
