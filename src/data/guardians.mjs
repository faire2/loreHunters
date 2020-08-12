import {CARD_TYPE} from "../components/functions/enums.mjs";
import {EFFECT} from "./effects.mjs";

export const Guardians = Object.freeze({
    snake: {
        id: "snake",
        cardName: "snake",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseExplore, EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainShip],
        cost: null,
        points: 5
    },
    frog: {
        id: "frog",
        cardName: "frog",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseJeep, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainShip],
        cost: null,
        points: 5
    },
    tiger: {
        id: "tiger",
        cardName: "tiger",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainShip],
        cost: null,
        points: 5
    },
    hyena: {
        id: "hyena",
        cardName: "hyena",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseWalk, EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainJeep],
        cost: null,
        points: 5
    },
    beetle: {
        id: "beetle",
        cardName: "beetle",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainJeep],
        cost: null,
        points: 5
    },
    hippo: {
        id: "hippo",
        cardName: "hippo",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseShip, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainJeep],
        cost: null,
        points: 5
    },
    redbird: {
        id: "redbird",
        cardName: "redbird",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseWalk, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainPlane],
        cost: null,
        points: 5
    },
    owl: {
        id: "owl",
        cardName: "owl",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        effects: [EFFECT.gainPlane],
        cost: null,
        points: 5
    },
    spider: {
        id: "spider",
        cardName: "spider",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.discard, EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.destroyCard],
        cost: null,
        points: 5
    },
    ants: {
        id: "ants",
        cardName: "ants",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        effects: [EFFECT.destroyCard],
        cost: null,
        points: 5
    },
    vulture: {
        id: "vulture",
        cardName: "vulture",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.losePlane, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.destroyCard],
        cost: null,
        points: 5
    },
    lizard: {
        id: "lizard",
        cardName: "lizard",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseWalk, EFFECT.loseText, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.draw1],
        cost: null,
        points: 5
    },
    scorpion: {
        id: "scorpion",
        cardName: "scorpion",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.discard, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        effects: [EFFECT.draw1],
        cost: null,
        points: 5
    },
    monkey: {
        id: "monkey",
        cardName: "monkey",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        effects: [EFFECT.loseCoin, EFFECT.arrow, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: null,
        points: 5
    },
    bat: {
        id: "bat",
        cardName: "bat",
        type: CARD_TYPE.guardian,
        defeatCost: [EFFECT.losePlane, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        effects: [EFFECT.loseText, EFFECT.arrow, EFFECT.gainWeapon],
        cost: null,
        points: 5
    },
});