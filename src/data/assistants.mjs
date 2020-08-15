import {EFFECT} from "./effects.mjs";

export const Assistants = Object.freeze({
    goldDigger: {
        id: "goldDigger",
        silverEffects: [EFFECT.gainCoin],
        goldEffects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore],
    },
    professor: {
        id: "professor",
        silverEffects: [EFFECT.gainText],
        goldEffects: [EFFECT.gainExplore, EFFECT.gainText],
    },
    hunter: {
        id: "hunter",
        silverEffects: [EFFECT.loseWalk, EFFECT.arrow, EFFECT.gainWeapon],
        goldEffects: [EFFECT.gainWeapon],
    },
    smuggler: {
        id: "smuggler",
        silverEffects: [EFFECT.loseCoin, EFFECT.arrow, EFFECT.gainWeapon],
        goldEffects: [EFFECT.loseCoin, EFFECT.arrow, EFFECT.gainWeaponOrJewel],
    },
    bodyGuard: {
        id: "bodyGuard",
        silverEffects: [EFFECT.destroyCard],
        goldEffects: [EFFECT.destroyCard, EFFECT.gainExplore],
    },
    chef: {
        id: "chef",
        silverEffects: [EFFECT.discard, EFFECT.arrow, EFFECT.draw1],
        goldEffects: [EFFECT.draw1],
    },
    pilot: {
        id: "pilot",
        silverEffects: [EFFECT.gainPlaneOrCoin],
        goldEffects: [EFFECT.gain2PlanesOr2Coins],
    },
    cartographer: {
        id: "cartographer",
        silverEffects: [EFFECT.gainJeepOrExplore],
        goldEffects: [EFFECT.gain2JeepsOr2Explores],
    },
    seaman: {
        id: "seaman",
        silverEffects: [EFFECT.gainShipOrExplore],
        goldEffects: [EFFECT.gain2ShipsOr2Explores],
    },
    trader: {
        id: "trader",
        silverEffects: [EFFECT.buyWithDiscount1],
        goldEffects: [EFFECT.buyWithDiscount1, EFFECT.buyWithDiscount1],
    },
});