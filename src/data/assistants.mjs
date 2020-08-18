import {EFFECT} from "./effects.mjs";

export const Assistants = Object.freeze({
    goldDigger: {
        id: "goldDigger",
        silverEffects: [EFFECT.gainCoin, EFFECT.gainCoin],
        goldEffects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
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
        silverEffects: [EFFECT.draw1, EFFECT.discard],
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
        goldEffects: [EFFECT.gain2JeepsOrCoinExplore],
    },
    seaman: {
        id: "seaman",
        silverEffects: [EFFECT.gainShipOrExplore],
        goldEffects: [EFFECT.gain2ShipsOrCoinExplore],
    },
    trader: {
        id: "trader",
        silverEffects: [EFFECT.buyWithDiscount1],
        goldEffects: [EFFECT.buyWithDiscount1, EFFECT.buyWithDiscount1],
    },
});