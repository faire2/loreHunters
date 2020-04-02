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

export const LOCATION_IDs = Object.freeze({
        b1: {
            id: "b1",
            level: LOCATION_LEVEL["1"],
        },
        b2: {
            id: "b2",
            level: LOCATION_LEVEL["1"],
        },
        b3: {
            id: "b3",
            level: LOCATION_LEVEL["1"],
        },
        b4: {
            id: "b4",
            level: LOCATION_LEVEL["1"],
        },
        b5: {
            id: "b5",
            level: LOCATION_LEVEL["2"],
        },
        b6: {
            id: "b6",
            level: LOCATION_LEVEL["2"],
        },
        b7: {
            id: "b7",
            level: LOCATION_LEVEL["2"],
        },
        b8: {
            id: "b8",
            level: LOCATION_LEVEL["2"],
        },
        b9: {
            id: "b9",
            level: LOCATION_LEVEL["2"],
        },
        b10: {
            id: "b10",
            level: LOCATION_LEVEL["2"],
        },
        b11: {
            id: "b11",
            level: LOCATION_LEVEL["2"],
        },
        b12: {
            id: "b12",
            level: LOCATION_LEVEL["2"],
        },
        b13: {
            id: "b13",
            level: LOCATION_LEVEL["3"],
        },
        b14: {
            id: "b14",
            level: LOCATION_LEVEL["3"],
        },
        b15: {
            id: "b15",
            level: LOCATION_LEVEL["3"],
        },
        b16: {
            id: "b16",
            level: LOCATION_LEVEL["3"],
        },
        g1: {
            id: "g1",
            level: LOCATION_LEVEL["2"],
        },
        g2: {
            id: "g2",
            level: LOCATION_LEVEL["2"],
        },
        g3: {
            id: "g3",
            level: LOCATION_LEVEL["2"],
        },
        g4: {
            id: "g4",
            level: LOCATION_LEVEL["2"],
        },
        g5: {
            id: "g5",
            level: LOCATION_LEVEL["2"],
        },
        g6: {
            id: "g6",
            level: LOCATION_LEVEL["2"],
        },
        g7: {
            id: "g7",
            level: LOCATION_LEVEL["2"],
        },
        g8: {
            id: "g8",
            level: LOCATION_LEVEL["2"],
        },
        g9: {
            id: "g9",
            level: LOCATION_LEVEL["3"],
        },
        g10: {
            id: "g10",
            level: LOCATION_LEVEL["3"],
        },
        g11: {
            id: "g11",
            level: LOCATION_LEVEL["3"],
        },
        g12: {
            id: "g12",
            level: LOCATION_LEVEL["3"],
        },
})

export const TRANSMISSIONS = Object.freeze({
    getStates: "getState",
    stateUpdate: "stateUpdate",
    nextPlayer: "nextPlayer",
    finishedRound: "finishedRound",
})