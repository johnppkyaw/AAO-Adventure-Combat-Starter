const readline = require('readline');

const { Player } = require('./class/player');
const { World } = require('./class/world');

const worldData = require('./data/world-data');

let player;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printHelp() {
  console.log("Controls:")
  console.log("  Type 'h' for help");
  console.log("  Type 'q' to quit");
  console.log("  Type 'l' to look around");
  console.log("  Type 'n', 's', 'e', 'w' to move");
  console.log("  Type 'hit <enemy>' to hit enemy");
  console.log("  Type 'i' to check your inventory");
  console.log("  Type 'take <item>' to take an item");
  console.log("  Type 'drop <item>' to drop an item");
  console.log("  Type 'eat <item>' to eat a food item");
  console.log("  Type 'buy <choice>' to buy an equipment from a shopkeeper");
  console.log("  Type 'sell weapon' or 'sell armor' to sell an equipment to a shopkeeper");
  console.log("");
}

function startGame() {
  console.clear();
  console.log("Welcome to App Academy Adventure!\n");

  rl.question('Please enter your name: ', (name) => {
    console.clear();
    console.log(`Hello, ${name}!\n`);

    // Create the world and player
    World.loadWorld(worldData);
    player = new Player(name, World.rooms[1]);
    World.setPlayer(player);

    // Show commands
    printHelp();

    rl.question('\nHit RETURN to start your adventure\n', () => {

      console.clear();
      player.currentRoom.printRoom();

      processCommand();
    });
  });
}


function processCommand() {

  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      printHelp();

    } else if (cmd === 'q') {
      rl.close();
      process.exit();

    } else if (cmd === 'l') {
      player.currentRoom.printRoom();

    } else if (cmd === 'i') {
      player.printInventory();

    } else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {
      let direction = cmd;
      player.move(direction);

    } else if (cmd.startsWith("take ")) {
      let itemName = cmd.split(" ")[1];
      console.clear();
      player.takeItem(itemName);
      setTimeout(() => {
        player.currentRoom.printRoom();
      }, 5000);

    } else if (cmd.startsWith("drop ")) {
      let itemName = cmd.split(" ")[1];
      console.clear();
      player.dropItem(itemName);
      player.currentRoom.printRoom();

    } else if (cmd.startsWith("eat ")) {
      let itemName = cmd.split(" ")[1];
      console.clear();
      player.eatItem(itemName);
      setTimeout(() => {
        player.currentRoom.printRoom();
      }, 5000);

    } else if (cmd.startsWith("hit ")) {
      let enemyName = cmd.split(" ")[1];
      console.log(enemyName);
      let enemyCooldown;
      const enemyInRoom = player.currentRoom.getEnemyByName(enemyName);
      console.log(enemyInRoom)
      if (enemyInRoom) {
        enemyCooldown = enemyInRoom.cooldown;
      }
      console.clear();
      player.hit(enemyName);
      setTimeout(() => {
        player.currentRoom.printRoom();
      }, enemyCooldown + 8000);

    } else if (cmd.startsWith("buy ")) {
      const choice = cmd.split("buy ")[1].toLowerCase()
      console.clear();
      player.buyEquipment(choice);
      setTimeout(() => {
        player.currentRoom.printRoom();
      }, 3000);

    } else if (cmd.startsWith("sell ")) {
      const choice = cmd.split("sell ")[1].toLowerCase()
      console.clear();
      player.sellEquipment(choice);
      setTimeout(() => {
        player.currentRoom.printRoom();
      }, 3000);

    } else {
      console.log("Invalid command. Type 'h' for help.");
    }

    processCommand();
  });
}

startGame();
