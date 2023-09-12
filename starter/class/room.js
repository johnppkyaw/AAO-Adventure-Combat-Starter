class Room {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = [];
    this.gold = 0;
  }

  getEnemies() {
    const { World } = require('./world');
    return World.getEnemiesInRoom(this);
  }

  getShopkeepers() {
    const { World } = require('./world');
    return World.getShopkeeperInRoom(this);
  }

  printRoom() {
    const { World } = require('./world');
    const shopkeepers = this.getShopkeepers(); //array
    const enemies = this.getEnemies(); //array

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

    //Prints shopkeepers if in the same room as the player
    if (shopkeepers.length > 0) {
      console.log(`Shopkeeper: ${shopkeepers.map(shopkeeper => shopkeeper.name).join(", ")}`)
    }

    console.log("");

    //Prints enemies if in the same room as the player
    if(enemies.length > 0) {
      console.log(`Enemies in current location: ${enemies.map(enemy => enemy.name + " (HP: " + enemy.health + ")").join(", ")}`);
    }

    console.log(`Total enemies left: ${World.enemies.length}`)
    console.log("");
    if (this.items.length > 0) {
      console.log(`Items in the room: ${this.items.map(item => item.name).join(", ")}`);
    }
    if (this.gold > 0) {
      console.log(`Free gold in the room: ${this.gold}`);
    }
    console.log(this.getExitsString());
    console.log("");
  }

  printRoomWithEquipments() {
    const { World } = require('./world');
    this.printRoom();

    console.log(`Here are weapons and armors available for sale.  Type "buy <choice>" to buy the weapon or armor.  You have ${World.player.gold} gold to spend.`)

    //Print weapons
    World.weapons.forEach(weapon => {
      console.log(`Choice: ${weapon.choice} | ${weapon.name} | Damage bonus: +${weapon.damageBonus} | Cost: ${weapon.cost}`)
    })
    console.log("")

    //Print armors
    World.armors.forEach(armor => {
      console.log(`Choice: ${armor.choice} | ${armor.name} | Deflect bonus: +${armor.deflectBonus} | Cost: ${armor.cost}`)
    })




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

  getShopkeeperByName(name) {
    return this.getShopkeepers().filter(enemy => enemy.name.toLowerCase() === name.toLowerCase()).pop();
  }
}

module.exports = {Room};
