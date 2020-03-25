import React from "react";
import {
    AdventurerIcon,
    Arrow,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Discard,
    Draw1Card,
    Draw2Cards,
    Explore,
    Fear,
    Jeep,
    Jewel,
    Plane,
    Ship,
    Text,
    Uptrade,
    Walk,
    Weapon
} from "../components/Symbols";
import bgrItemEmpty from "../img/cardBackgrounds/ItemBrownEmpty3.png";
import bgrWalk from "../img/cardBackgrounds/ItemBrownWalk3.png";
import bgrJeep from "../img/cardBackgrounds/ItemBrownJeep3.png";
import bgrShip from "../img/cardBackgrounds/ItemBrownShip3.png";
import bgrPlane from "../img/cardBackgrounds/ItemBrownPlane3.png";
import bgrArtifact from "../img/cardBackgrounds/Artifacts7.png";
import bgrGuardian from "../img/cardBackgrounds/Guardian12.png";
import {EFFECT} from "./effects";

export const CARD_TRANSPORT = Object.freeze({
    empty: bgrItemEmpty,
    walk: bgrWalk,
    jeep: bgrJeep,
    ship: bgrShip,
    plane: bgrPlane,
    artifact: bgrArtifact,
    guardian: bgrGuardian
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

export const RES = Object.freeze({
    coin: "coin",
    explore: "explore",
    text: "text"
});




export const ITEMS = Object.freeze({
    fear: {
        id: "fear",
        cardName: "Fear",
        type: CARD_TYPE.basic,
        itemTransport: CARD_TRANSPORT.walk,
        cost: 0,
        effectsText: "",
        points: -1
    },
    coin: {
        cardName: "Coin",
        id: "coin",
        type: CARD_TYPE.basic,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.gainCoin],
        cost: 0,
        points: 0
    },
    explore: {
        id: "explore",
        cardName: "Explore",
        type: CARD_TYPE.basic,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.gainExplore],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        id: "seaTurtle",
        cardName: "Sea Turtle",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effects: [EFFECT.draw1, EFFECT.gainShip],
        cost: 2,
        points: 1
    },
    ostrich: {
        id: "ostrich",
        cardName: "Ostrich",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effects: [EFFECT.draw1, EFFECT.gainJeep],
        cost: 2,
        points: 1
    },
    camel: {
        id: "camel",
        cardName: "Camel",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 1
    },
    packDonkey: {
        id: "packDonkey",
        cardName: "Pack Donkey",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.draw2],
        cost: 3,
        points: 1
    },
    horse: {
        id: "horse",
        cardName: "Horse",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 4,
        points: 1
    },
    dog: {
        id: "dog",
        cardName: "Dog",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.draw2, EFFECT.discard],
        cost: 1,
        points: 1
    },
    canoe: {
        id: "canoe",
        cardName: "Canoe",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        effects2: [EFFECT.gainShip, EFFECT.gainShip],
        cost: 3,
        points: 1
    },
    jeep: {
        id: "jeep",
        cardName: "Jeep",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        effects2: [EFFECT.gainJeep, EFFECT.gainJeep],
        cost: 3,
        points: 1
    },
    astrolabe: {
        id: "astrolabe",
        cardName: "Astrolabe",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effects: [EFFECT.gainShip, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 3,
        points: 1
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        cardName: "Hot Air Baloon",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effects: [EFFECT.gainPlane, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: 1
    },
    airplane: {
        id: "airplane",
        cardName: "Airplane",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.plane,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 5,
        points: 2
    },
    goldPan: {
        id: "goldPan",
        cardName: "Gold Pan",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },
    hat: {
        id: "hat",
        cardName: "Hat",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.gainExplore, EFFECT.gainText],
        cost: 1,
        points: 1
    },
    trowel: {
        id: "trowel",
        cardName: "Trowel",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.loseExplore, EFFECT.gainJewel],
        cost: 1,
        points: 1
    },
    pickaxe: {
        id: "pickAxe",
        cardName: "Pickaxe",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.loseExplore, EFFECT.gainText, EFFECT.gainWeapon],
        cost: 1,
        points: 1
    },
    spyglass: {
        id: "spyglass",
        cardName: "Spyglass",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainShiny],
        effects2: [EFFECT.gainJeep, EFFECT.gainJeep],
        cost: 1,
        points: 1
    },
    hammock: {
        id: "hammock",
        cardName: "Hammock",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects2Text: [EFFECT.refreshAdventurer, EFFECT.uptrade],
        cost: 1,
        points: 1
    },
    coffee: {
        id: "coffee",
        cardName: "Coffee",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.draw2, EFFECT.discard, EFFECT.refreshAllAdventurers],
        cost: 2,
        points: 1
    },
    banjo: {
        id: "banjo",
        cardName: "Banjo",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.gainCoinForLegends],
        cost: 2,
        points: 1
    },
    beerMug: {
        id: "beerMug",
        cardName: "Beer Mug",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.return],
        cost: 2,
        points: 1
    },
    journal: {
        id: "journal",
        cardName: "Journal",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.gainExploreForShinys],
        cost: 4,
        points: 1
    },
    lockPick: {
        id: "lockPick",
        cardName: "Lock Pick",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.discard, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 0
    },
    parrot: {
        id: "parrot",
        cardName: "Parrot",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.discard, EFFECT.gainJewel],
        cost: 2,
        points: 1
    },
    boots: {
        id: "boots",
        cardName: "Boots",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.walk,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainWalk],
        cost: 3,
        points: 1
    },
    pocketWatch: {
        id: "pocketWatch",
        cardName: "Pocket Watch",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.gainCoin, EFFECT.gainCoinsIfLast],
        cost: 3,
        points: 1
    },
    grapplingHook: {
        id: "grapplingHook",
        cardName: "Grappling Hook",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.useAdjacentEmptyLocation],
        cost: 2,
        points: 1
    },
    camouflagePaint: {
        id: "camouflagePaint",
        cardName: "Camouflage Paint",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.useOpponentsLocation],
        cost: 4,
        points: 1
    },
    tent: {
        id: "tent",
        cardName: "Tent",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.plane,
        effects: [EFFECT.useYourLocation],
        cost: 4,
        points: 1,
    },
    fishingRod: {
        id: "fishingRod",
        cardName: "Fishing Rod",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.revealItemBuyWithDiscount2],
        cost: 2,
        points: 1
    },
    compass: {
        id: "compass",
        cardName: "Compass",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.revealArtifactBuyWithDiscount2],
        cost: 2,
        points: 1
    },
    /*flintPistol: {
        id: "flintPistol",
        cardName: "Flint Pistol",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.defeatGuardian],
        cost: 4,
        points: 1
    },*/
    /*bowAndArrows: {
        id: "bowAndArrows",
        cardName: "Bow and Arrows",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.gainExplore, EFFECT.gainExploreForGuardians],
        cost: 2,
        points: 2
    },*/
    messengerPidgeon: {
        id: "messengerPidgeon",
        cardName: "Messenger Pidgeon",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.gainText, EFFECT.drawFromDiscard],
        cost: 3,
        points: 2
    },
    whip: {
        id: "whip",
        cardName: "Whip",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.destroyThisCard, EFFECT.gainArtifact],
        cost: 2,
        points: 1
    },
    bookOfMyths: {
        id: "bookOfMyths",
        cardName: "Book of Myths",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.progressForFree, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    bag: {
        id: "bag",
        cardName: "Bag",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.gainItemToHand, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    /*floraSamples: {
        id: "floraSamples",
        cardName: "Flora Samples",
        type: CARD_TYPE.item,
        itemTransport: itemTransportS.itemJeep,
        cost: 2,
        points: 2
    },*/
    boomerang: {
        id: "boomerang",
        cardName: "Boomerang",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effects: [EFFECT.gainWalk, EFFECT.draw1, EFFECT.discard],
        cost: 3,
        points: 3
    },
    beetleMask: {
        id: "beetleMask",
        cardName: "Beetle Mask",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.removeGuardian],
        cost: 3,
        points: 4
    },
    hook: {
        id: "hook",
        cardName: "Hook",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effects: [EFFECT.destroyCard],
        cost: 2,
        points: 3
    },
});



export const ARTIFACTS = Object.freeze({
    /*golemShem: {
    id: "golemShem",
        cardName: "Golem Shem",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainAdventurerForThisRound],
        cost: 3,
        points: 2
    },
    bookOfSecrets: {
        id: "bookOfSecrets",
        cardName: "Book of secrets",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainBonusFromLegendYouCompleted, EFFECT.gainBonusFromLegendYouCompleted],
        cost: 4,
        points: 2
    },*/
    bookOfSecrets: {
        id: "bookOfSecrets",
        cardName: "Book of Secrets",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainBonusFromUnclaimedLegend],
        cost: 1,
        points: 2
    },
    chestOfWonders: {
        id: "chestOfWonders",
        cardName: "Chest of Wonders",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.useItemOnMarket],
        cost: 2,
        points: 2
    },
    mirrorShard: {
        id: "mirrorShard",
        cardName: "Mirror shard",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.useArtifactOnMarket],
        cost: 2,
        points: 2
    },
    portalStone: {
        id: "portalStone",
        cardName: "Portal stone",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainPlane, EFFECT.moveAdvToEmptyLocation],
        cost: 2,
        points: 2
    },
    /*pathfinderStaff: {
        id: "pathfinderStaff",
        cardName: "Pathfinder's Staff",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainPlane, EFFECT.moveToAdjacentLocation],
        cost: 1,
        points: 1
    },*/
    /*healingOrb: {
        id: "healingOrb",
        cardName: "Healing Orb",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.refreshAdventurer],
        cost: 3,
        points: 2
    },*/
    mysteriousTexts: {
        id: "mysteriousTexts",
        cardName: "Mysterious Texts",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.draw2, EFFECT.refreshAdventurer],
        cost: 4,
        points: 2
    },
    cursedTreasure: {
        id: "cursedTreasure",
        cardName: "Cursed Treasure",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 3
    },
    darkKnowledge: {
        id: "darkKnowledge",
        cardName: "Dark Knowledge",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainFear, EFFECT.gainJewel],
        cost: 2,
        points: 2
    },
    goldenMask: {
        id: "goldenMask",
        cardName: "Golden Mask",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.payTouseOccupiedLocation],
        cost: 4,
        points: 1
    },
    warMask: {
        id: "warMask",
        cardName: "War Mask",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.draw1, EFFECT.destroyCard],
        cost: 1,
        points: 2
    },
    ritualDagger: {
        id: "ritualDagger",
        cardName: "Ritual Dagger",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.discardFor2Jewels],
        cost: 3,
        points: 1
    },
    ringOfLight: {
        id: "ringOfLight",
        cardName: "Ring of Light",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.drawFromDrawDeck],
        cost: 3,
        points: 3
    },
    beastKiller: {
        id: "beastKiller",
        cardName: "Beast Killer",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.defeatGuardian],
        cost: 4,
        points: 1
    },
    /*flameJewek: {
    id: "flameJewel",
        cardName: "Flame Jewel",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainOrDecipherWithJewel],
        cost: 3,
        points: 2
    },*/
    /*inscribedBlade: {
    id: ""inscribedBlade,
        cardName: "Inscribed Blade",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainOrDecipherWithTextsOrWeapon],
        cost: 3,
        points: 2
    },*/
    amuletOfCharm: {
        id: "amuletOfCharm",
        cardName: "Amulet of Charm",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.buyItemWithDiscount3],
        cost: 3,
        points: 2
    },
    drinkingHorn: {
        id: "drinkingHorn",
        cardName: "Drinking Horn",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.destroyCard, EFFECT.discardFor2Cards],
        cost: 2,
        points: 3
    },
    ancientCipher: {
        id: "ancientCipher",
        cardName: "Ancient Cipher",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        cost: 2,
        points: 2
    },
    transmutation: {
        id: "transmutation",
        cardName: "Transmutation",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.destroyCard, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 2
    },
    fearlessBlade: {
        id: "fearlessBlade",
        cardName: "Fearless Blade",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.destroyCard, EFFECT.gainWeapon],
        cost: 2,
        points: 1
    },
    keysToAllDoors: {
        id: "keysToAllDoors",
        cardName: "Keys to all Doors",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },
    treacherousWhistle: {
        id: "treacherousWhistle",
        cardName: "Treacherous Whistle",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [],
        cost: 1,
        points: 2
    },
    giantEgg: {
        id: "giantEgg",
        cardName: "Giant Egg",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.uptrade],
        /*effectsText2: //todo implement effects 2
            <div className="effectsText">Destroy this card to defeat a guardian </div>, //todo replace guardian with an icon
        effects2: [EFFECT.destroyThisCardToDefeatAGuardan],*/
        cost: 1,
        points: 2
    },
});

/* cost turns to VP when guardian is defeated */
export const GUARDIANS = Object.freeze({
    foxSpirit: {
        id: "foxSpirit",
        cardName: "Fox Spirit",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        cost: 1,
        points: -1
    },
    forestDragon: {
        id: "forestDragon",
        cardName: "Forest Dragon",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainText, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: -1
    },
    naga: {
        id: "naga",
        cardName: "Naga",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainText],
        cost: 2,
        points: -1
    },
    stoneTitan: {
        id: "stoneTitan",
        cardName: "Stone Titan",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseWeapon, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    golem: {
        id: "golem",
        cardName: "Golem",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainExplore],
        cost: 2,
        points: -1
    },
    mountainGuardian: {
        id: "mountainGuardian",
        cardName: "Mountain Guardian",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.losePlane, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.destroyCard, EFFECT.gainText, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    gryphon: {
        id: "gryphon",
        cardName: "Gryphon",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.losePlane, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        cost: 3,
        points: -1
    },
    whisperingShadow: {
        id: "whisperingShadow",
        cardName: "Whispering Shadow",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainExplore],
        cost: 1,
        points: -1
    },
    giantScarab: {
        id: "giantScarab",
        cardName: "Giant Scarab",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainWeapon],
        cost: 3,
        points: -1
    },
    swampSnake: {
        id: "swampSnake",
        cardName: "Swamp snake",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        cost: 2,
        points: -1
    },
    stealingMonkey: {
        id: "stealingMonkey",
        cardName: "Stealing Monkey",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        cost: 3,
        points: -1
    },
    hornedHippo: {
        id: "hornedHippo",
        cardName: "Horned Hippo",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainText, EFFECT.gainWeapon],
        cost: 3,
        points: -1
    },
    lakeMonster: {
        id: "lakeMonster",
        cardName: "Lake Monster",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseShip, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    energyLeech: {
        id: "energyLeech",
        cardName: "Energy Leech",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainExplore],
        cost: 1,
        points: -1
    },
    swarmingSpiders: {
        id: "swarmingSpiders",
        cardName: "Swarming Spiders",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainCoin],
        cost: 2,
        points: -1
    },
    HeartOfForest: {
        id: "HeartOfForest",
        cardName: "Heart of the Forest",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    wyvern: {
        id: "wyvern",
        cardName: "Wyvern",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainText, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: -1
    },
    crabmanHermit: {
        id: "crabmanHermit",
        cardName: "Crabman Hermit",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        cost: 2,
        points: -1
    },
});