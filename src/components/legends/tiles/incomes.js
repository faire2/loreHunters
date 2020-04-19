import {EFFECT} from "../../../data/effects";
import {AdventurerIcon, Coin, Draw1Card, Explore, Plane, Text, Uptrade, Weapon} from "../../Symbols";
import React from "react";

export const INCOMES = Object.freeze({
    adventurerIncome: {
        id: "adventurerIncome",
        effects: [EFFECT.gainAdventurerForThisRound],
        effectsText: [<AdventurerIcon/>],
    },
    drawCardIncome: {
        id: "drawCardIncome",
        effects: [EFFECT.draw1],
        effectsText: [<Draw1Card/>],
    },
    coinIncome: {
        id: "coinIncome",
        effects: [EFFECT.gainCoin],
        effectsText: [<Coin/>],
    },
    exploreIncome: {
        id: "exploreIncome",
        effects: [EFFECT.gainExplore],
        effectsText: [<Explore/>],
    },
    discountedBuyIncome: {
        id: "discountedBuyIncome",
        effects: [EFFECT.gainDiscountedBuy],
        effectsText: [],
    },
    exploreAndCoinIncome: {
        id: "exploreAndCoinIncome",
        effects: [EFFECT.gainExplore, EFFECT.gainCoin],
        effectsText: [<Coin/>, <Explore/>],
    },
    coinAndTextIncome: {
        id: "coinAndTextIncome",
        effects: [EFFECT.gainCoin, EFFECT.gainText],
        effectsText: [<Coin/>, <Text/>],
    },
    textIncome: {
        id: "textIncome",
        effects: [EFFECT.gainText],
        effectsText: [<Text/>],
    },
    uptradeIncome: {
        id: "uptradeIncome",
        effects: [EFFECT.uptrade],
        effectsText: [<Uptrade/>],
    },
    weaponIncome: {
        id: "weaponIncome",
        effects: [EFFECT.gainWeapon],
        effectsText: [<Weapon/>],
    },
    planeIncome: {
        id: "planeIncome",
        effects: [EFFECT.gainPlane],
        effectsText: [<Plane/>],
    },
    twoPlanesIncome: {
        id: "twoPlanesIncome",
        effects: [EFFECT.gainPlane, EFFECT.gainPlane],
        effectsText: [<Plane/>, <Plane/>],
    },
})