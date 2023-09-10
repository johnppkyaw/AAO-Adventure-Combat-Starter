

class Room {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = [];
  }

  getEnemies() {
    const { World } = require('./world');
    return World.getEnemiesInRoom(this);
  }

  printRoom() {
    const { World } = require('./world');
    console.clear();
    console.log("");
    console.log(this.name);
    console.log("");
    console.log(this.description);
    console.log("");
    console.log("");
    console.log("");
    console.log(`Player: ${World.player.name} (HP: ${World.player.health})`);
    World.player.printInventory();
    console.log("");
    if (this.getEnemies().length > 0) {
      console.log(`Enemies: ${this.getEnemies().map(enemy => enemy.name + " (HP: " + enemy.health + ")").join(", ")}`);
    }
    if (this.items.length > 0) {
      console.log(`Items in the room: ${this.items.map(item => item.name).join(", ")}`);
    }
    console.log(this.getExitsString());
    console.log("");
  }

  getExits() {
    return Object.keys(this.exits);
  }

  getExitsString() {
    return `Exits: ${this.getExits().join(", ")}`
  }

  connectRooms(direction, connectingRoom) {

    // Check if the direction and connecting room are valid
    if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction) {
    return this.exits[direction];
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

  getEnemyByName(name) {
    return this.getEnemies().filter(enemy => enemy.name === name).pop();

}
}

module.exports = {Room};
