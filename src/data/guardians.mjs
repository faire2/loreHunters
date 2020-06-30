import {CARD_TYPE} from "../components/functions/enums.mjs";
import {EFFECT} from "./effects.mjs";

export const Guardians = Object.freeze({
    foxSpirit: {
        id: "foxSpirit",
        cardName: "Fox Spirit",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: null,
        points: 1
    },
    forestDragon: {
        id: "forestDragon",
        cardName: "Forest Dragon",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainText],
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainText],
        cost: null,
        points: 1
    },
    naga: {
        id: "naga",
        cardName: "Naga",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainText],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: null,
        points: 2
    },
    stoneTitan: {
        id: "stoneTitan",
        cardName: "Stone Titan",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseExplore, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainExplore, EFFECT.gainWeapon],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainText],
        cost: null,
        points: 2
    },
    golem: {
        id: "golem",
        cardName: "Golem",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainExplore],
        discoveryEffect2: [EFFECT.gainWeapon],
        cost: null,
        points: 2
    },
    mountainGuardian: {
        id: "mountainGuardian",
        cardName: "Mountain Guardian",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseBlimp, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.destroyCard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainExplore],
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainExplore],
        cost: null,
        points: 1
    },
    gryphon: {
        id: "gryphon",
        cardName: "Gryphon",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseBlimp, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainText],
        cost: null,
        points: 2
    },
    whisperingShadow: {
        id: "whisperingShadow",
        cardName: "Whispering Shadow",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainText, EFFECT.gainWeapon],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: null,
        points: 1
    },
    giantScarab: {
        id: "giantScarab",
        cardName: "Giant Scarab",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainWeapon],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: null,
        points: 2
    },
    swampSnake: {
        id: "swampSnake",
        cardName: "Swamp snake",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.discard, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainText],
        cost: null,
        points: 2
    },
    stealingMonkey: {
        id: "stealingMonkey",
        cardName: "Stealing Monkey",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainExplore],
        cost: null,
        points: 1
    },
    hornedHippo: {
        id: "hornedHippo",
        cardName: "Horned Hippo",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainWeapon],
        discoveryEffect2: [EFFECT.gainWeapon],
        cost: null,
        points: 2
    },
    lakeMonster: {
        id: "lakeMonster",
        cardName: "Lake Monster",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: null,
        points: 2
    },
    energyLeech: {
        id: "energyLeech",
        cardName: "Energy Leech",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.discard, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainExplore],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: null,
        points: 1
    },
    swarmingSpiders: {
        id: "swarmingSpiders",
        cardName: "Swarming Spiders",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainCoin],
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainText],
        cost: null,
        points: 2
    },
    heartOfForest: {
        id: "heartOfForest",
        cardName: "Heart of the Forest",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore],
        discoveryEffect2: [EFFECT.gainText, EFFECT.gainText],
        cost: null,
        points: 2
    },
    wyvern: {
        id: "wyvern",
        cardName: "Wyvern",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryEffect2: [EFFECT.gainWeapon],
        cost: null,
        points: 2
    },
    crabmanHermit: {
        id: "crabmanHermit",
        cardName: "Crabman Hermit",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryEffect: [EFFECT.gainJewel],
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: null,
        points: 2
    },
});