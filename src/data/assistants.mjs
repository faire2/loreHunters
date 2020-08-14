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
        goldEffects: [EFFECT.gainPlane, EFFECT.gainCoin],
    },
    cartographer: {
        id: "cartographer",
        silverEffects: [EFFECT.gainJeepOrCoin],
        goldEffects: [EFFECT.gainPlane, EFFECT.gainCoin],
    },
    seaman: {
        id: "seaman",
        silverEffects: [EFFECT.gainShipOrCoin],
        goldEffects: [EFFECT.gainPlane, EFFECT.gainCoin],
    },
    trader: {
        id: "trader",
        silverEffects: [EFFECT.buyWithDiscount1],
        goldEffects: [EFFECT.buyWithDiscount1, EFFECT.buyWithDiscount1],
    },
});