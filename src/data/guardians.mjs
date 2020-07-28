import {CARD_TYPE} from "../components/functions/enums.mjs";
import {EFFECT} from "./effects.mjs";

export const Guardians = Object.freeze({
    beetle: {
        id: "beetle",
        cardName: "beetle",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    scorpion: {
        id: "scorpion",
        cardName: "scorpion",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseText, EFFECT.discard, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    spider: {
        id: "spider",
        cardName: "spider",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseWeapon, EFFECT.discard, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    owl: {
        id: "owl",
        cardName: "owl",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    tiger: {
        id: "tiger",
        cardName: "tiger",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseCoin, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    frog: {
        id: "frog",
        cardName: "frog",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseText, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    monkey: {
        id: "monkey",
        cardName: "monkey",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    ants: {
        id: "ants",
        cardName: "ants",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    bat: {
        id: "bat",
        cardName: "bat",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseBlimp, EFFECT.loseCoin, EFFECT.discard, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    lizard: {
        id: "lizard",
        cardName: "lizard",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseText, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    hippo: {
        id: "hippo",
        cardName: "hippo",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseShip, EFFECT.loseShip, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    bird: {
        id: "bird",
        cardName: "bird",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseBlimp, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    hyena: {
        id: "hyena",
        cardName: "hyena",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.loseText, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    snake: {
        id: "snake",
        cardName: "snake",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
    redbird: {
        id: "redbird",
        cardName: "redbird",
        type: CARD_TYPE.guardian,
        effects: [EFFECT.loseCoin, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        cost: null,
        points: 5
    },
});