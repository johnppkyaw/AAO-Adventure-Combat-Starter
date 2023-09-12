module.exports = {
  rooms: [
    {
      id: 1,
      name: "Crossroad",
      description: "You are standing at the crossroad. To the north, east, south and west you see empty space, waiting to be filled.",
      exits: {n: 2, e: 3, w: 4, s: 5}
    },
    {
      id: 2,
      name: "Northern point of the crossroad",
      description: "You are standing at the north point of the crossroad. To the north, you see The Dragon's Abyss and to the south, you see the crossroad.",
      exits: {n: 19, s: 1}
    },
    {
      id: 3,
      name: "Eastern point of the crossroad",
      description: "You are standing at the east point of the crossroad. To the west, you see the crossroad, and to the east, you see Frostbite Caverns.",
      exits: {w: 1, e: 15}
    },
    {
      id: 4,
      name: "Western point of the crossroad",
      description: "You are standing at the west point of the  crossroad. To the east, you see the crossroad.  To the west, you see the Serpent's Den.",
      exits: {e: 1, w: 11}
    },
    {
      id: 5,
      name: "Southern point of the crossroad",
      description: "You are standing at the south point of the crossroad. To the north, you see the crossroad and to the south, you see Ravenfall North.",
      exits: {n: 1, s: 6}
    },
    {
      id: 6,
      name: "Ravenfall North",
      description: "You are standing at Ravenfall North. To the north, you see the southern point of the crossroad and to the south, you see Ravenfall Central.",
      exits: {n: 5, s: 7}
    },
    {
      id: 7,
      name: "Ravenfall Central",
      description: "You are standing at Ravenfall Central. To the north, you see Ravenfall North, to the south, you see Ravenfall South, to the east, you see Ravenfall East, and to the west, you see Ravenfall West.",
      exits: {n: 6, s: 8, e: 10, w: 9}
    },
    {
      id: 8,
      name: "Ravenfall South",
      description: "You are standing at Ravenfall South. To the north, you see Ravenfall Central.",
      exits: {n: 7}
    },
    {
      id: 9,
      name: "Ravenfall West",
      description: "You are standing at Ravenfall West. To the east, you see Ravenfall Central.",
      exits: {e: 7}
    },
    {
      id: 10,
      name: "Ravenfall East",
      description: "You are standing at Ravenfall East. To the east, you see Ravenfall Central.",
      exits: {w: 7}
    },
    {
      id: 11,
      name: "Serpent's Den",
      description: "You are standing at Serpent's Den. To the north, you see Venomous Abyss, to the east, you see western point of the crossroad, to the west, you see Fangfall Passage, and to the south, you see Serpent's Lair.",
      exits: {n: 13, s: 14, e: 4, w: 12}
    },
    {
      id: 14,
      name: "Serpent's Lair",
      description: "You are standing at Serpent's Lair. To the north, you see Serpent's Den.",
      exits: {n: 11}
    },
    {
      id: 13,
      name: "Venomous Abyss",
      description: "You are standing at Venomous Abyss. To the south, you see Serpent's Den.",
      exits: {s: 11}
    },
    {
      id: 12,
      name: "Fangfall Passage",
      description: "You are standing at Fangfall Passage. To the east, you see Serpent's Den.",
      exits: {e: 11}
    },
    {
      id: 15,
      name: "Frostbite Caverns",
      description: "You are standing at Frostbite Caverns. To the north, you see Glacial Nexus, to the east, you see Crystaline Catacombs, to the west, you see eastern point of the crossroad, and to the south, you see Frostfire Chasm.",
      exits: {n: 18, s: 17, e: 16, w: 3}
    },
    {
      id: 18,
      name: "Glacial Nexus",
      description: "You are standing at Glacial Nexus. To the south, you see Frostbite Caverns.",
      exits: {s: 15}
    },
    {
      id: 16,
      name: "Crystaline Catacombs",
      description: "You are standing at Crystaline Catacombs. To the west, you see Frostbite Caverns.",
      exits: {w: 15}
    },
    {
      id: 17,
      name: "Frostfire Chasm",
      description: "You are standing at Frostfire Chasm. To the north, you see Frostbite Caverns.",
      exits: {n: 15}
    },
    {
      id: 19 ,
      name: "The Dragon's Abyss",
      description: "You are standing at The Dragon's Abyss. To the north, you see Sapphire Glade, to the east, you see Astral Nexus, to the west, you see Shadowed Hollow, and to the south, you see the northern point of the crossroad.",
      exits: {n: 21, s: 2, e: 22, w: 20}
    },
    {
      id: 20,
      name: "Shadowed Hollow",
      description: "You are standing at Shadowed Hollow. To the east, you see The Dragon's Abyss.",
      exits: {e: 19}
    },
    {
      id: 21,
      name: "Sapphire Glade",
      description: "You are standing at Sapphire Glade. To the south, you see The Dragon's Abyss.",
      exits: {s: 19}
    },
    {
      id: 22,
      name: "Astral Nexus",
      description: "You are standing at Astral Nexus. To the west, you see The Dragon's Abyss.",
      exits: {w: 19}
    }
  ],
  items: [
    {
      name: "rock",
      description: "Just a simple rock",
      room: 1
    },
    {
      name: "sandwich",
      description: "A tasty looking sandwich",
      room: 2,
      isFood: true
    }
  ],
  enemies: [
    {
      name: "goblin",
      species: "goblin",
      description: "A mean-looking goblin",
      room: 15
    },
    {
      name: "snake",
      species: "snake",
      description: "A venomous snake",
      room: 11
    }
  ],
  weapons: [
    {
      choice: "WA",
      name: "Standard Sword",
      description: "adds bonus damage to your attack",
      damageBonus: 10,
      isWeapon: true,
      cost: 100
    },
    {
      choice: "WB",
      name: "Excalibar",
      description: "adds bonus damage to your attack",
      damageBonus: 20,
      isWeapon: true,
      cost: 200
    },
    {
      choice: "WC",
      name: "Daedric Sword",
      description: "adds bonus damage to your attack",
      damageBonus: 40,
      isWeapon: true,
      cost: 400
    }
  ],
  armors: [
    {
      choice: "AA",
      name: "Leather Armor",
      description: "deflects damage from enemy's attack",
      deflectBonus: 10,
      isArmor: true,
      cost: 100
    },
    {
      choice: "AB",
      name: "Ebony Armor",
      description: "deflects damage from enemy's attack",
      deflectBonus: 20,
      isArmor: true,
      cost: 200
    },
    {
      choice: "AC",
      name: "Daedric Armor",
      description: "deflects damage from enemy's attack",
      deflectBonus: 40,
      isArmor: true,
      cost: 400
    }
  ],
  shopkeepers: [
    {
      name: "Savior A",
      description: "Get your finest weapon and armor here",
      room: 7,
      isAlly: true
    }
  ]
}

//Room template
// ,
//     {
//       id: ***,
//       name: "***",
//       description: "You are standing at ***. To the north, you see Frostbite Caverns.  To the north, you see ***, to the east, you see ***, to the west, you see ***, and to the south, you see ***.",
//       exits: {n: ***, s: ***, e: ***, w: ***}
//     }
