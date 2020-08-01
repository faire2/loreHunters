import {EFFECT} from "./effects.mjs";
import {ASSISTANT_LEVEL} from "../components/functions/enums.mjs";

export const Assistants = Object.freeze({
    adventurerIncome: {
        id: "adventurerIncome",
        effects: [EFFECT.gainAdventurerForThisRound],
        level: ASSISTANT_LEVEL.gold
    },
    drawCardIncome: {
        id: "drawCardIncome",
        effects: [EFFECT.draw1],
        level: ASSISTANT_LEVEL.gold
    },
    coinIncome: {
        id: "coinIncome",
        effects: [EFFECT.gainCoin],
        level: ASSISTANT_LEVEL.silver,
    },
    exploreIncome: {
        id: "exploreIncome",
        effects: [EFFECT.gainExplore],
        level: ASSISTANT_LEVEL.silver,
    },
    discountedBuyIncome: {
        id: "discountedBuyIncome",
        effects: [EFFECT.buyWithDiscount1],
        level: ASSISTANT_LEVEL.silver,
    },
    exploreAndCoinIncome: {
        id: "exploreAndCoinIncome",
        effects: [EFFECT.gainExplore, EFFECT.gainCoin],
        level: ASSISTANT_LEVEL.gold
    },
    coinAndTextIncome: {
        id: "coinAndTextIncome",
        effects: [EFFECT.gainCoin, EFFECT.gainText],
        level: ASSISTANT_LEVEL.gold
    },
    textIncome: {
        id: "textIncome",
        effects: [EFFECT.gainText],
        level: ASSISTANT_LEVEL.silver,
    },
    uptradeIncome: {
        id: "uptradeIncome",
        effects: [EFFECT.uptrade],
        level: ASSISTANT_LEVEL.silver,
    },
    weaponIncome: {
        id: "weaponIncome",
        effects: [EFFECT.gainWeapon],
        level: ASSISTANT_LEVEL.gold
    },
    planeIncome: {
        id: "planeIncome",
        effects: [EFFECT.gainPlane],
        level: ASSISTANT_LEVEL.silver
    },
    twoPlanesIncome: {
        id: "twoPlanesIncome",
        effects: [EFFECT.gainPlane, EFFECT.gainPlane],
        level: ASSISTANT_LEVEL.gold
    },
})