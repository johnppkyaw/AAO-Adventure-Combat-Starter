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
      description: "You are standing at the north point of the crossroad. To the south, you see the crossroad.",
      exits: {s: 1}
    },
    {
      id: 3,
      name: "Eastern point of the crossroad",
      description: "You are standing at the east point of the crossroad. To the west, you see the crossroad.",
      exits: {w: 1}
    },
    {
      id: 4,
      name: "Western point of the crossroad",
      description: "You are standing at the west point of the  crossroad. To the east, you see the crossroad.",
      exits: {e: 1}
    },
    {
      id: 5,
      name: "Southern point of the crossroad",
      description: "You are standing at the south point of the crossroad. To the north, you see the crossroad and to the south, you see Ravenfall North",
      exits: {n: 1, s: 6}
    },
    {
      id: 6,
      name: "Ravenfall North",
      description: "You are standing at Ravenfall North. To the north, you see the southern point of the crossroad and to the south, you see Ravenfall Central",
      exits: {n: 5, s: 7}
    },
    {
      id: 7,
      name: "Ravenfall Central",
      description: "You are standing at Ravenfall Central. To the north, you see Ravenfall North, to the south, you see Ravenfall South, to the east, you see Ravenfall East, and to the west, you see Ravenfall West",
      exits: {n: 6, s: 8, e: 10, w: 9}
    },
    {
      id: 8,
      name: "Ravenfall South",
      description: "You are standing at Ravenfall South. To the north, you see Ravenfall Central",
      exits: {n: 7}
    },
    {
      id: 9,
      name: "Ravenfall West",
      description: "You are standing at Ravenfall West. To the east, you see Ravenfall Central",
      exits: {e: 7}
    },
    {
      id: 10,
      name: "Ravenfall East",
      description: "You are standing at Ravenfall East. To the east, you see Ravenfall Central",
      exits: {w: 7}
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
      description: "A mean-looking goblin",
      room: 3
    },
    {
      name: "snake",
      description: "A venamous snake",
      room: 5
    }
  ],
  shopkeepers: [
    {
      name: "Savior A",
      description: "Get your finest weapon and armor here",
      room: 7,
      isAlly: true
    },
    {
      name: "Savior B",
      description: "Get your finest weapon and armor here",
      room: 4,
      isAlly: true
    },
    {
      name: "Savior C",
      description: "Get your finest weapon and armor here",
      room: 2,
      isAlly: true
    },
    {
      name: "Savior D",
      description: "Get your finest weapon and armor here",
      room: 3,
      isAlly: true
    }
  ]
}
