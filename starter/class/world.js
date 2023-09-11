const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Enemy } = require('./enemy');
const { Shopkeeper } = require('./shopkeeper');

class World {

  static rooms = {};
  static enemies = [];
  static shopkeepers = [];
  static player = null;

  static setPlayer(player) {
    this.player = player;
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].setPlayer(player);
      }
    }
  }

  static startGame() {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].randomMove();
        World.enemies[i].rest();
      }
    }
  }

  static getEnemiesInRoom(room) {
    return World.enemies.filter(enemy => enemy.currentRoom === room);
  }

  static getShopkeeperInRoom(room) {
    return World.shopkeepers.filter(shopkeeper => shopkeeper.currentRoom === room);
  }

  static loadWorld(worldData) {

    const roomList = worldData.rooms;
    const itemList = worldData.items;
    const enemyList = worldData.enemies;
    const shopkeepers = worldData.shopkeepers;

    // Instantiate new room objects
    // Get name, id and description from room data
    for (let i = 0 ; i < roomList.length ; i++) {

        let roomData = roomList[i];
        let newRoom = new Room(roomData.name, roomData.description);

        World.rooms[roomData.id] = newRoom;
    }

    // Connect rooms by ID
    // Note that all rooms must be created before they can be connected
    for (let i = 0 ; i < roomList.length ; i++) {

      let roomID = roomList[i].id;
      let roomConnections = roomList[i].exits;

      for (const direction in roomConnections) {
        let connectedRoomID = roomConnections[direction];
        let roomToConnect = World.rooms[connectedRoomID];
        World.rooms[roomID].connectRooms(direction, roomToConnect);
      }

    }

    // Instantiate items
    for (let i = 0 ; i < itemList.length ; i++) {

      let itemData = itemList[i];
      let newItem;

      if (itemData.isFood) {
        newItem = new Food(itemData.name, itemData.description);
      } else {
        newItem = new Item(itemData.name, itemData.description);
      }

      let itemRoom = World.rooms[itemData.room];
      itemRoom.items.push(newItem);
   }

    // Instantiate enemies
    for (let i = 0 ; i < enemyList.length ; i++) {

      let enemyData = enemyList[i];
      let enemyRoom = World.rooms[enemyData.room];
      let newEnemy = new Enemy(enemyData.name, enemyData.description, enemyRoom);
      World.enemies.push(newEnemy);
    }

    // Instantiate shopkeepers
    for (let i = 0; i < shopkeepers.length; i++) {
      let shopkeeperData = shopkeepers[i];
      let shopkeeperRoom = World.rooms[shopkeeperData.room];
      let newShopkeeper = new Shopkeeper(shopkeeperData.name, shopkeeperData.description, shopkeeperRoom, shopkeeperData.isEnemy);
      World.shopkeepers.push(newShopkeeper);
    }
  }
}

module.exports = {
  World,
};
