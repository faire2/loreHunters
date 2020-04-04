export const LOCATION_LEVEL = Object.freeze({
    1: "I",
    2: "II",
    3: "III"
});

export const LOCATION_STATE = Object.freeze({
    unexplored: "unexplored",
    explored: "explored",
    occupied: "occupied",
});

export const LOCATION_TYPE = Object.freeze({
    basic: "basic location",
    green: "green location",
    brown: "brown location",
});

export const CARD_STATE = Object.freeze({
    active: "active card",
    destroyed: "destroyed card",
    defeatedGuardian: "defeated guardian",
    discard: "card is discarded",
    drawDeck: "card in draw deck",
    inHand: "card is in hand",
    inStore: "card is in store",
});

export const CARD_TYPE = Object.freeze({
    item: "item",
    artifact: "artifact",
    basic: "basic",
    guardian: "guardian"
});

export const ITEM_IDs = Object.freeze({
    fear: {
        id: "fear",
        type: CARD_TYPE.basic,
    },
    coin: {
        id: "coin",
        type: CARD_TYPE.basic,
    },
    explore: {
        id: "explore",
        type: CARD_TYPE.basic,
    },
    seaTurtle: {
        id: "seaTurtle",
        type: CARD_TYPE.item,
    },
    ostrich: {
        id: "ostrich",
        type: CARD_TYPE.item,
    },
    camel: {
        id: "camel",
        type: CARD_TYPE.item,
    },
    packDonkey: {
        id: "packDonkey",
        type: CARD_TYPE.item,
    },
    horse: {
        id: "horse",
        type: CARD_TYPE.item,
    },
    dog: {
        id: "dog",
        type: CARD_TYPE.item,
    },
    canoe: {
        id: "canoe",
        type: CARD_TYPE.item,
    },
    jeep: {
        id: "jeep",
        type: CARD_TYPE.item,
    },
    astrolabe: {
        id: "astrolabe",
        type: CARD_TYPE.item,
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        type: CARD_TYPE.item,
    },
    airplane: {
        id: "airplane",
        type: CARD_TYPE.item,
    },
    goldPan: {
        id: "goldPan",
        type: CARD_TYPE.item,
    },
    hat: {
        id: "hat",
        type: CARD_TYPE.item,
    },
    trowel: {
        id: "trowel",
        type: CARD_TYPE.item,
    },
    pickaxe: {
        id: "pickaxe",
        type: CARD_TYPE.item,
    },
    spyglass: {
        id: "spyglass",
        type: CARD_TYPE.item,
    },
    hammock: {
        id: "hammock",
        type: CARD_TYPE.item,
    },
    coffee: {
        id: "coffee",
        type: CARD_TYPE.item,
    },
    banjo: {
        id: "banjo",
        type: CARD_TYPE.item,
    },
    beerMug: {
        id: "beerMug",
        type: CARD_TYPE.item,
    },
    journal: {
        id: "journal",
        type: CARD_TYPE.item,
    },
    lockPick: {
        id: "lockPick",
        type: CARD_TYPE.item,
    },
    parrot: {
        id: "parrot",
        type: CARD_TYPE.item,
    },
    boots: {
        id: "boots",
        type: CARD_TYPE.item,
    },
    pocketWatch: {
        id: "pocketWatch",
        type: CARD_TYPE.item,
    },
    grapplingHook: {
        id: "grapplingHook",
        type: CARD_TYPE.item,
    },
    camouflagePaint: {
        id: "camouflagePaint",
        type: CARD_TYPE.item,
    },
    tent: {
        id: "tent",
        type: CARD_TYPE.item,
    },
    fishingRod: {
        id: "fishingRod",
        type: CARD_TYPE.item,
    },
    compass: {
        id: "compass",
        type: CARD_TYPE.item,
    },
    flintPistol: {
        id: "flintPistol",
        type: CARD_TYPE.item,
    },
    bowAndArrows: {
        id: "bowAndArrows",
        type: CARD_TYPE.item,
    },
    messengerPidgeon: {
        id: "messengerPidgeon",
        type: CARD_TYPE.item,
    },
    whip: {
        id: "whip",
        type: CARD_TYPE.item,
    },
    bookOfMyths: {
        id: "bookOfMyths",
        type: CARD_TYPE.item,
    },
    bag: {
        id: "bag",
        type: CARD_TYPE.item,
    },
    floraSamples: {
        id: "floraSamples",
        type: CARD_TYPE.item,
    },
    boomerang: {
        id: "boomerang",
        type: CARD_TYPE.item,
    },
    beetleMask: {
        id: "beetleMask",
        type: CARD_TYPE.item,
    },
    hook: {
        id: "hook",
        type: CARD_TYPE.item,
    },
});

export const ARTIFACT_IDs = Object.freeze({
    golemShem: {
        id: "golemShem",
        type: CARD_TYPE.artifact,
    },
    bookOfSecrets: {
        id: "bookOfSecrets",
        type: CARD_TYPE.artifact,
    },
    chestOfWonders: {
        id: "chestOfWonders",
        type: CARD_TYPE.artifact,
    },
    mirrorShard: {
        id: "mirrorShard",
        type: CARD_TYPE.artifact,
    },
    portalStone: {
        id: "portalStone",
        type: CARD_TYPE.artifact,
    },
    pathfinderStaff: {
        id: "pathfinderStaff",
        type: CARD_TYPE.artifact,
    },
    healingOrb: {
        id: "healingOrb",
        type: CARD_TYPE.artifact,
    },
    mysteriousTexts: {
        id: "mysteriousTexts",
        type: CARD_TYPE.artifact,
    },
    cursedTreasure: {
        id: "cursedTreasure",
        type: CARD_TYPE.artifact,
    },
    darkKnowledge: {
        id: "darkKnowledge",
        type: CARD_TYPE.artifact,
    },
    goldenMask: {
        id: "goldenMask",
        type: CARD_TYPE.artifact,
    },
    warMask: {
        id: "warMask",
        type: CARD_TYPE.artifact,
    },
    ritualDagger: {
        id: "ritualDagger",
        type: CARD_TYPE.artifact,
    },
    ringOfLight: {
        id: "ringOfLight",
        type: CARD_TYPE.artifact,
    },
    beastKiller: {
        id: "beastKiller",
        type: CARD_TYPE.artifact,
    },
    flameJewel: {
        id: "flameJewel",
        type: CARD_TYPE.artifact,
    },
    inscribedBlade: {
        id: "inscribedBlade",
        type: CARD_TYPE.artifact,
    },
    amuletOfCharm: {
        id: "amuletOfCharm",
        type: CARD_TYPE.artifact,
    },
    drinkingHorn: {
        id: "drinkingHorn",
        type: CARD_TYPE.artifact,
    },
    ancientCipher: {
        id: "ancientCipher",
        type: CARD_TYPE.artifact,
    },
    transmutation: {
        id: "transmutation",
        type: CARD_TYPE.artifact,
    },
    fearlessBlade: {
        id: "fearlessBlade",
        type: CARD_TYPE.artifact,
    },
    keysToAllDoors: {
        id: "keysToAllDoors",
        type: CARD_TYPE.artifact,
    },
    treacherusWhistle: {
        id: "treacherusWhistle",
        type: CARD_TYPE.artifact,
    },
    giantEgg: {
        id: "giantEgg",
        type: CARD_TYPE.artifact,
    },
});

export const GUARDIAN_IDs = Object.freeze({
    foxSpirit: {
        id: "foxSpirit",
        type: CARD_TYPE.guardian,
    },
    forestDragon: {
        id: "forestDragon",
        type: CARD_TYPE.guardian,
    },
    naga: {
        id: "naga",
        type: CARD_TYPE.guardian,
    },
    stoneTitan: {
        id: "stoneTitan",
        type: CARD_TYPE.guardian,
    },
    golem: {
        id: "golem",
        type: CARD_TYPE.guardian,
    },
    mountainGuardian: {
        id: "mountainGuardian",
        type: CARD_TYPE.guardian,
    },
    gryphon: {
        id: "gryphon",
        type: CARD_TYPE.guardian,
    },
    whisperingShadow: {
        id: "whisperingShadow",
        type: CARD_TYPE.guardian,
    },
    giantScarab: {
        id: "giantScarab",
        type: CARD_TYPE.guardian,
    },
    swampSnake: {
        id: "swampSnake",
        type: CARD_TYPE.guardian,
    },
    stealingMonkey: {
        id: "stealingMonkey",
        type: CARD_TYPE.guardian,
    },
    hornedHippo: {
        id: "hornedHippo",
        type: CARD_TYPE.guardian,
    },
    lakeMonster: {
        id: "lakeMonster",
        type: CARD_TYPE.guardian,
    },
    energyLeech: {
        id: "energyLeech",
        type: CARD_TYPE.guardian,
    },
    swarmingSpiders: {
        id: "swarmingSpiders",
        type: CARD_TYPE.guardian,
    },
    HeartOfForest: {
        id: "HeartOfForest",
        type: CARD_TYPE.guardian,
    },
    wyvern: {
        id: "wyvern",
        type: CARD_TYPE.guardian,
    },
    crabmanHermit: {
        id: "crabmanHermit",
        type: CARD_TYPE.guardian,
    },
});

/* Generating locations assigns them new key / value: *line*: numberOfLine, in which is the location displayed */
export const LOCATION_IDs = Object.freeze({
        1: {
            id: "1",
            type: LOCATION_TYPE.basic,
            level: LOCATION_LEVEL["1"],
        },
        2: {
            id: "2",
            type: LOCATION_TYPE.basic,
            level: LOCATION_LEVEL["1"],
        },
        3: {
            id: "3",
            type: LOCATION_TYPE.basic,
            level: LOCATION_LEVEL["1"],
        },
        4: {
            id: "4",
            type: LOCATION_TYPE.basic,
            level: LOCATION_LEVEL["1"],
        },
        5: {
            id: "5",
            type: LOCATION_TYPE.basic,
            level: LOCATION_LEVEL["1"],
        },
        b21: {
            id: "b21",
            type: LOCATION_TYPE.brown,
            level: LOCATION_LEVEL["2"],
        },
        b22: {
            id: "b22",
            type: LOCATION_TYPE.brown,
            level: LOCATION_LEVEL["2"],
        },
        b23: {
            id: "b23",
            type: LOCATION_TYPE.brown,
            level: LOCATION_LEVEL["2"],
        },
        b24: {
            id: "b24",
            type: LOCATION_TYPE.brown,
            level: LOCATION_LEVEL["2"],
        },
        b25: {
            id: "b25",
            type: LOCATION_TYPE.brown,
            level: LOCATION_LEVEL["2"],
        },
        b31: {
            id: "b31",
            type: LOCATION_TYPE.brown,
            level: LOCATION_LEVEL["3"],
        },
        b32: {
            id: "b32",
            level: LOCATION_LEVEL["3"],
        },
        b33: {
            id: "b33",
            type: LOCATION_TYPE.brown,
            level: LOCATION_LEVEL["3"],
        },
        g21: {
            id: "g21",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["2"],
        },
        g22: {
            id: "g22",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["2"],
        },
        g23: {
            id: "g23",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["2"],
        },
        g24: {
            id: "g24",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["2"],
        },
        g25: {
            id: "g25",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["2"],
        },
        g26: {
            id: "g26",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["2"],
        },
        g31: {
            id: "g31",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["3"],
        },
        g32: {
            id: "g32",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["3"],
        },
        g33: {
            id: "g33",
            type: LOCATION_TYPE.green,
            level: LOCATION_LEVEL["3"],
        },
});

export const TRANSMISSIONS = Object.freeze({
    getStates: "getState",
    stateUpdate: "stateUpdate",
    nextPlayer: "nextPlayer",
    finishedRound: "finishedRound",
    testData: "testData",
});