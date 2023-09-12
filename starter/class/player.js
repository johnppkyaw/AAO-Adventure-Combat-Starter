const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
    this.weapon = null;
    this.armor = null;
    this.deflect = 0;
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

  printEquipments() {
    //prints the equipped weapon
    if (!this.weapon) {
      console.log(`${this.name} is not equipped with any weapons.`);
    } else {
      console.log(`${this.name} is currently equipped with ${this.weapon}.`);
    }

    //prints the equipped armor
    if (!this.armor) {
      console.log(`${this.name} is not equipped with any armors.`);
    } else {
      console.log(`${this.name} is currently equipped with ${this.armor}.`);
    }


  }

  //buy equipment
  buyEquipment(choice) {
    const { World } = require('./world');
    const shopkeeperPresent = this.currentRoom.getShopkeepers();

    //shopkeeper not found;
    if(shopkeeperPresent.length === 0) {
      console.log(`Equipment not found!  Shopkeeper is not available at this location!`)
      return;
    }

    //shopkeeper found;
    const weaponPicked = World.weapons.find(weapon => weapon.choice.toLowerCase() === choice.toLowerCase());

    //buying weapon
    if (weaponPicked) {
      //check if player already has weapon equipped
      if(this.weapon) {
        console.log(`You already have ${this.weapon.name} equiped. Sell that first`)
        return;
        //check if player can afford it
      } else if (weaponPicked.cost > this.gold) {
        console.log(`Not enough gold!`)
        return;
      } else {
        this.weapon = weaponPicked;
        this.gold -= weaponPicked.cost;
        this.strength += weaponPicked.damageBonus;
        console.log(`You have purchased ${weaponPicked.name} and increased your strength to ${this.strength}!`);
        return;
      }
    } else {
      //buying armor
      const armorPicked = World.armors.find(armor => armor.choice.toLowerCase() === choice.toLowerCase());
      if (armorPicked) {
        //check if player already has armor equipped
        if(this.armor) {
          console.log(`You already have ${this.armor.name} equiped. Sell that first`)
          return;
          //check if player can afford it
        } else if (armorPicked.cost > this.gold) {
          console.log(`Not enough gold!`)
          return;
        } else {
          this.armor = armorPicked;
          this.deflect += armorPicked.deflectBonus;
          this.gold -= armorPicked.cost;
          console.log(`You have purchased ${armorPicked.name} which deflects enemy's attack by ${armorPicked.deflectBonus}!`);
          return;
        }
      }
    }
    console.log(`Equipment not found!  Pick the one that is available for sale!`)
    return;
  }

  //sell equipement
  sellEquipment(equipment) {
    //equipment string should be either 'weapon' or 'armor'
    if (equipment !== "weapon" && equipment !== "armor") {
      console.log(`You must type "sell weapon" or "sell armor"!`)
      return;
    }

    const shopkeeperPresent = this.currentRoom.getShopkeepers();

    //shopkeeper not found;
    if(shopkeeperPresent.length === 0) {
      console.log(`Cannot sell equipment!  Shopkeeper is not available at this location!`)
      return;
    }

    //shopkeeper found;
    //if player has weapon or armor
    if (equipment === "weapon" && this.weapon) {
      console.log(`You have sold ${this.weapon.name} and earned ${this.weapon.cost} gold!  However, you also lost ${this.weapon.damageBonus} strength!`);
      this.strength -= this.weapon.damageBonus;
      this.gold += this.weapon.cost;
      this.weapon = null;
      return;
    } else if (equipment === "armor" && this.armor) {
      console.log(`You have sold ${this.armor.name} and earned ${this.armor.cost} gold!  However, you also lost ${this.armor.deflectBonus} deflect bonus!`);
      this.deflect -= this.armor.deflectBonus;
      this.gold += this.armor.cost;
      this.armor = null;
      return;
    }

    //if player does not have the weapon or armor
    console.log(`You don't have a weapon or armor to sell!!`)
    return;
  }


  hit(name) {
    const targetEnemy = this.currentRoom.getEnemyByName(name);
    const targetShopkeeper = this.currentRoom.getShopkeeperByName(name);
    if(!targetEnemy) {
      if(targetShopkeeper) {
        console.log('You cannot attack the shopkeepers!');setTimeout(this.currentRoom.printRoom.bind(this.currentRoom), 3000);
      } else {
        console.log('You cannot attack the enemy who is not at the current location!');
        setTimeout(this.currentRoom.printRoom.bind(this.currentRoom), 3000);
      }
      return;
    }
    targetEnemy.applyDamage(this.strength);
    console.log(`You attacked ${name}!`);
    targetEnemy.attackTarget = this;
    const enemyCooldown = targetEnemy.cooldown;
    targetEnemy.attack();
    setTimeout(this.currentRoom.printRoom.bind(this.currentRoom), enemyCooldown + 4000);
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
    const itemToTake = this.currentRoom.getItemByName(itemName);
    if (itemToTake) {
      this.items.push(itemToTake);
      return;
    }
    console.log("The item does not exist!");
    return;
  }

  dropItem(itemName) {
    if(itemName === this.weapon.name || itemName === this.weapon.armor) {
      console.log('You cannot drop equipments!  You must sell them to a shopkeeper!')
    }
    const itemToDrop = this.getItemByName(itemName);
    if(itemToDrop) {
      this.currentRoom.items.push(itemToDrop);
      return;
    }
    console.log("You don't have that item!");
    return;
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
