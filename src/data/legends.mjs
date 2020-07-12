import React from "react";
import {EFFECT} from "./effects.mjs";

export const FIELD_SIZE = Object.freeze({
    1: 1,
    2: 2,
    3: 3,
    lostCity: "lost city",
});

export const Legends = Object.freeze({
    legend1: {
        id: "legend1",
        victoryPoints: [1, 2, 3, 5, 7, 9, 12, 15],
        columnRewards: [
            [
                [EFFECT.gainCoin], [EFFECT.gainAssistant],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainOrUpgradeAssistant],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainOrUpgradeAssistant],
            ],
            [
                [EFFECT.gainCoin], [EFFECT.gainOrUpgradeAssistant],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainOrUpgradeRelic],
            ],
            [
                [EFFECT.draw1], [EFFECT.gainOrUpgradeRelic],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainOrUpgradeRelic],
            ],
            [
                [EFFECT.draw1], [EFFECT.draw1],
            ]
        ],
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
                },
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
                    cost: [EFFECT.loseExplore, EFFECT.loseText, EFFECT.loseText],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 4 */
            [

                {
                    effects: [EFFECT.gainMap],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.gainExploreIfFirst],
                    effects3p: [EFFECT.gainExploreIfFirst, EFFECT.gainExploreIfFirst],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.gainCoinIfFirst],
                    effects4p: [EFFECT.gainCoinIfFirst, EFFECT.gainCoinIfFirst],
                    cost: [EFFECT.loseWeapon, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 5 */
            [
                {
                    effects: [EFFECT.gainMap],
                    cost: [EFFECT.loseCoin, EFFECT.loseJewel],
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
                    cost: [EFFECT.loseExplore, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
                {
                    effects: [EFFECT.defeatGuardian],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 8 */
            [

                {
                    effects: [],
                    cost: [EFFECT.loseExplore, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ]
        ]
    }
});
