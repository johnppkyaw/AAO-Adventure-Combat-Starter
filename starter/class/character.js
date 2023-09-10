class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.strength = 10;
    this.health = 100;

  }

  //remove health points from the character
  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }


  die() {
    //drops the dead character's items in the current room
    this.items.forEach(item => {
      this.currentRoom.items.push(item);
    })

    //empties character's item list and room
    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
