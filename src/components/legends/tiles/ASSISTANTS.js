import {AdventurerIcon, Blimp, Coin, Discount, Draw1Card, Explore, Text, Uptrade, Weapon} from "../../Symbols";
import React from "react";

export const ASSISTANTS = Object.freeze({
    adventurerIncome: {
        id: "adventurerIncome",
        effectsText: [<AdventurerIcon/>],
    },
    drawCardIncome: {
        id: "drawCardIncome",
        effectsText: [<Draw1Card/>],
    },
    coinIncome: {
        id: "coinIncome",
        effectsText: [<Coin/>],
    },
    exploreIncome: {
        id: "exploreIncome",
        effectsText: [<Explore/>],
    },
    discountedBuyIncome: {
        id: "discountedBuyIncome",
        effectsText: [<Discount/>],
    },
    exploreAndCoinIncome: {
        id: "exploreAndCoinIncome",
        effectsText: [<Coin/>, <Explore/>],
    },
    coinAndTextIncome: {
        id: "coinAndTextIncome",
        effectsText: [<Coin/>, <Text/>],
    },
    textIncome: {
        id: "textIncome",
        effectsText: [<Text/>],
    },
    uptradeIncome: {
        id: "uptradeIncome",
        effectsText: [<Uptrade/>],
    },
    weaponIncome: {
        id: "weaponIncome",
        effectsText: [<Weapon/>],
    },
    planeIncome: {
        id: "planeIncome",
        effectsText: [<Blimp/>],
    },
    twoPlanesIncome: {
        id: "twoPlanesIncome",
        effectsText: [<Blimp/>, <Blimp/>],
    },
})