import {EFFECT} from "./effects.mjs";
import {CARD_TYPE, LOCATION_LEVEL, LOCATION_TYPE} from "../components/functions/enums.mjs";

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
    /*camel: {
        id: "camel",
        type: CARD_TYPE.item,
    },*/
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
    steamBoat: {
        id: "steamBoat",
        type: CARD_TYPE.item,
    },
    jeep: {
        id: "jeep",
        type: CARD_TYPE.item,
    },
    /*astrolabe: {
        id: "astrolabe",
        type: CARD_TYPE.item,
    },*/
    hotAirBaloon: {
        id: "hotAirBaloon",
        type: CARD_TYPE.item,
    },
    goldPan: {
        id: "goldPan",
        type: CARD_TYPE.item,
    },
    airplane: {
        id: "airplane",
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
    /*spyglass: {
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
    },*/
    /*beerMug: {
        id: "beerMug",
        type: CARD_TYPE.item,
    },*/
    journal: {
        id: "journal",
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
    binoculars: {
        id: "binoculars",
        type: CARD_TYPE.item,
    },
    /*camouflagePaint: {
        id: "camouflagePaint",
        type: CARD_TYPE.item,
    },*/
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
    /*flintPistol: {
        id: "flintPistol",
        type: CARD_TYPE.item,
    },*/
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
    flask: {
        id: "flask",
        type: CARD_TYPE.item,
    },
    /*floraSamples: {
        id: "floraSamples",
        type: CARD_TYPE.item,
    },*/
    /*boomerang: {
        id: "boomerang",
        type: CARD_TYPE.item,
    },*/
    /*beetleMask: {
        id: "beetleMask",
        type: CARD_TYPE.item,
    },*/
    rope: {
        id: "rope",
        type: CARD_TYPE.item,
    },
    revolver: {
        id: "revolver",
        type: CARD_TYPE.item,
    },
    torch: {
        id: "torch",
        type: CARD_TYPE.item,
    },
    machete: {
        id: "machete",
        type: CARD_TYPE.item,
    },
    beartrap: {
        id: "beartrap",
        type: CARD_TYPE.item,
    },
    airmail: {
        id: "airmail",
        type: CARD_TYPE.item,
    },
    armyKnife: {
        id: "armyKnife",
        type: CARD_TYPE.item,
    },
    handLens: {
        id: "handLens",
        type: CARD_TYPE.item,
    },
    philologyBook: {
        id: "philologyBook",
        type: CARD_TYPE.item,
    },
});

export const ARTIFACT_IDs = Object.freeze({
    /*golemShem: {
        id: "golemShem",
        type: CARD_TYPE.artifact,
    },*/
    /*bookOfSecrets: {
        id: "bookOfSecrets",
        type: CARD_TYPE.artifact,
    },*/
    /*chestOfWonders: {
        id: "chestOfWonders",
        type: CARD_TYPE.artifact,
    },*/
    /*mirrorShard: {
        id: "mirrorShard",
        type: CARD_TYPE.artifact,
    },*/
    /*portalStone: {
        id: "portalStone",
        type: CARD_TYPE.artifact,
    },*/
    pathfinderStaff: {
        id: "pathfinderStaff",
        type: CARD_TYPE.artifact,
    },
    /*healingOrb: {
        id: "healingOrb",
        type: CARD_TYPE.artifact,
    },*/
    /*mysteriousTexts: {
        id: "mysteriousTexts",
        type: CARD_TYPE.artifact,
    },*/
    cursedTreasure: {
        id: "cursedTreasure",
        type: CARD_TYPE.artifact,
    },
    darkKnowledge: {
        id: "darkKnowledge",
        type: CARD_TYPE.artifact,
    },/*
    baneBanisher: {
        id: "baneBanisher",
        type: CARD_TYPE.artifact,
    },*/
    /*goldenMask: {
        id: "goldenMask",
        type: CARD_TYPE.artifact,
    },*/
    warMask: {
        id: "warMask",
        type: CARD_TYPE.artifact,
    },
    jewelryBox: {
        id: "jewelryBox",
        type: CARD_TYPE.artifact,
    },
    earRingOfLight: {
        id: "earRingOfLight",
        type: CARD_TYPE.artifact,
    },
    beastKiller: {
        id: "beastKiller",
        type: CARD_TYPE.artifact,
    },
    seaNecklace: {
        id: "seaNecklace",
        type: CARD_TYPE.artifact,
    },
    /*forbiddenScrolls: {
        id: "forbiddenScrolls",
        type: CARD_TYPE.artifact,
    },*/
    /*fragileBlade: {
        id: "fragileBlade",
        type: CARD_TYPE.artifact,
    },*/
    ritualDagger: {
        id: "ritualDagger",
        type: CARD_TYPE.artifact,
    },
    huntingArrows: {
        id: "huntingArrows",
        type: CARD_TYPE.artifact,
    },
    decoratedHorn: {
        id: "decoratedHorn",
        type: CARD_TYPE.artifact,
    },
    trophySkull: {
        id: "trophySkull",
        type: CARD_TYPE.artifact,
    },
    birdFlute: {
        id: "birdFlute",
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
    /*drinkingHorn: {
        id: "drinkingHorn",
        type: CARD_TYPE.artifact,
    },*/
    mortar: {
        id: "mortar",
        type: CARD_TYPE.artifact,
    },
    owlEyes: {
        id: "owlEyes",
        type: CARD_TYPE.artifact,
    },
    /*ritualDagger: {
        id: "ritualDagger",
        type: CARD_TYPE.artifact,
    },*/
    /* fearlessBlade: {
         id: "fearlessBlade",
         type: CARD_TYPE.artifact,
     },
     keysToAllDoors: {
         id: "keysToAllDoors",
         type: CARD_TYPE.artifact,
     },
     },*/
    sunDial: {
        id: "sunDial",
        type: CARD_TYPE.artifact,
    },
    cauldron: {
        id: "cauldron",
        type: CARD_TYPE.artifact,
    },
    ornateHammer: {
        id: "ornateHammer",
        type: CARD_TYPE.artifact,
    },
    boneRattle: {
        id: "boneRattle",
        type: CARD_TYPE.artifact,
    },
    sacredDrum: {
        id: "sacredDrum",
        type: CARD_TYPE.artifact,
    },
    snakeBracelet: {
        id: "snakeBracelet",
        type: CARD_TYPE.artifact,
    },
    earRingOfDarkness: {
        id: "earRingOfDarkness",
        type: CARD_TYPE.artifact,
    },
    /*jewelDice: {
        id: "jewelDice",
        type: CARD_TYPE.artifact,
    },*/
    preciousLock: {
        id: "preciousLock",
        type: CARD_TYPE.artifact,
    },
    tradersSatchel: {
        id: "tradersSatchel",
        type: CARD_TYPE.artifact,
    },
    coconutFlask: {
        id: "coconutFlask",
        type: CARD_TYPE.artifact,
    },
    ancientWine: {
        id: "ancientWine",
        type: CARD_TYPE.artifact,
    },
    mirrorBowl: {
        id: "mirrorBowl",
        type: CARD_TYPE.artifact,
    },
    guradiansCrown: {
        id: "guradiansCrown",
        type: CARD_TYPE.artifact,
    },
    boneHairpin: {
        id: "boneHairpin",
        type: CARD_TYPE.artifact,
    },
    sandals: {
        id: "sandals",
        type: CARD_TYPE.artifact,
    },
    guidingStone: {
        id: "guidingStone",
        type: CARD_TYPE.artifact,
    },
    guidingSkull: {
        id: "guidingSkull",
        type: CARD_TYPE.artifact,
    },
});

export const GUARDIAN_IDs = Object.freeze({
    beetle: {
        id: "beetle",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockText],
    },
    scorpion: {
        id: "scorpion",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
    spider: {
        id: "spider",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
    owl: {
        id: "owl",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockAdventurer],
    },
    tiger: {
        id: "tiger",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
    frog: {
        id: "frog",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCoin],
    },
    monkey: {
        id: "monkey",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
    ants: {
        id: "ants",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
    bat: {
        id: "bat",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockAdventurer],
    },
    lizard: {
        id: "lizard",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockAdventurer],
    },
    hippo: {
        id: "hippo",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCoin],
    },
    bird: {
        id: "bird",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockAdventurer],
    },
    hyena: {
        id: "hyena",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
    snake: {
        id: "snake",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
    redbird: {
        id: "redbird",
        type: CARD_TYPE.guardian,
        lockEffects: [EFFECT.lockCard],
    },
});

export const EXPEDITIONS_IDs = Object.freeze({
    hiddenGems: {
        id: "hiddenGems",
        type: CARD_TYPE.goalCard,
    },
    secretPaths: {
        id: "secretPaths",
        type: CARD_TYPE.goalCard,
    },
    rareFinds: {
        id: "rareFinds",
        type: CARD_TYPE.goalCard,
    },
    fullyEquipped: {
        id: "fullyEquipped",
        type: CARD_TYPE.goalCard,
    },
    trophyHunter: {
        id: "trophyHunter",
        type: CARD_TYPE.goalCard,
    },
    trustedGear: {
        id: "trustedGear",
        type: CARD_TYPE.goalCard,
    },
    collector: {
        id: "collector",
        type: CARD_TYPE.goalCard,
    },
    cartographer: {
        id: "cartographer",
        type: CARD_TYPE.goalCard,
    },
    fearless: {
        id: "fearless",
        type: CARD_TYPE.goalCard,
    },
    beyondBasics: {
        id: "beyondBasics",
        type: CARD_TYPE.goalCard,
    },
    quantityAboveAll: {
        id: "quantityAboveAll",
        type: CARD_TYPE.goalCard,
    },
    belongsToTheMuseum: {
        id: "belongsToTheMuseum",
        type: CARD_TYPE.goalCard,
    },
    guardedTreasure: {
        id: "guardedTreasure",
        type: CARD_TYPE.goalCard,
    },
    checkMyResults: {
        id: "checkMyResults",
        type: CARD_TYPE.goalCard,
    },
    holyGrail: {
        id: "holyGrail",
        type: CARD_TYPE.goalCard,
    },
    powerfulDestruction: {
        id: "powerfulDestruction",
        type: CARD_TYPE.goalCard,
    },
    animalLover: {
        id: "animalLover",
        type: CARD_TYPE.goalCard,
    },
    teamWork: {
        id: "teamWork",
        type: CARD_TYPE.goalCard,
    },
    touchTheSkies: {
        id: "touchTheSkies",
        type: CARD_TYPE.goalCard,
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
    b26: {
        id: "b26",
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
        type: LOCATION_TYPE.brown,
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
    g34: {
        id: "g34",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["3"],
    },
    lc1: {
        id: "lc1",
        type: LOCATION_TYPE.lostCity,
        level: LOCATION_LEVEL["3"],
    },
    emptyLocation: {
        id: "emptyLocation",
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL["2"],
    },
    emptyBrownLocation: {
        id: "emptyBrownLocation",
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL["2"],
    },
    emptyGreenLocation: {
        id: "emptyGreenLocation",
        type: LOCATION_TYPE.emptyGreenLocation,
        level: LOCATION_LEVEL["2"],
    },
});

export const CARDS_ACTIONLESS = [ITEM_IDs.ostrich.id, ITEM_IDs.seaTurtle.id, ARTIFACT_IDs.flameJewel.id,
    ARTIFACT_IDs.inscribedBlade.id];

export const INITIAL_CARDS = [{...ITEM_IDs.coin}, {...ITEM_IDs.coin}, {...ITEM_IDs.explore}, {...ITEM_IDs.explore},
    {...ITEM_IDs.fear}, {...ITEM_IDs.fear}];

export const GLOBAL_VARS = Object.freeze({
    handSize: 5,
    initialCards: INITIAL_CARDS,
    itemsInStore: 5,
    artifactsInStore: 1,
    adventurers: 2,
    playerColors: ["#ffcc00", "#33cc00", "#0066ff", "#cc0000"],
    numOfLegendTokens: 2    ,
});