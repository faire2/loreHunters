import React from "react";
import {EFFECT} from "./effects.mjs";

export const FIELD_SIZE = Object.freeze({
    1: 1,
    2: 2,
    3: 3,
    lostCity: "lost city",
});

export const Legends2 = Object.freeze({
    legend1: {
        id: "legend1",
        victoryPoints: [1, 2, 4, 6, 10, 15, 20, 25],
        fields: [
            /* 1 */
            [
                {
                    effects: [],
                    cost: [EFFECT.loseExplore, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
                {
                    effects: [],
                    cost: [EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                }
            ],
            /* 2 */
            [
                {
                    effects: [EFFECT.gainCoinIfFirst],
                    cost: [EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.gainExploreOrMapIfFirst],
                    cost: [EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
            ],
            /* 3 */
            [
                {
                    effects: [EFFECT.gainMap],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 4 */
            [

                {
                    effects: [EFFECT.gainMap],
                    cost: [EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.gainExploreIfFirst],
                    effects3p: [EFFECT.gainExploreIfFirst, EFFECT.gainExploreIfFirst],
                    cost: [EFFECT.loseCoin, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.gainCoinIfFirst],
                    effects4p: [EFFECT.gainCoinIfFirst, EFFECT.gainCoinIfFirst],
                    cost: [EFFECT.loseExplore, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 5 */
            [
                {
                    effects: [EFFECT.gainMap],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 6 */
            [

                {
                    effects: [EFFECT.destroyCard, EFFECT.gainCoinIfFirst],
                    cost: [EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.gainOrUpgradeAssistant],
                    cost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseText],
                    size: FIELD_SIZE["2"],
                },
            ],
            /* 7 */
            [

                {
                    effects: [EFFECT.draw1],
                    cost: [EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
                {
                    effects: [EFFECT.defeatGuardian],
                    cost: [EFFECT.loseWeapon, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 8 */
            [

                {
                    effects: [EFFECT.discoverLostCity],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                }
            ]
        ]
    }
});
