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
                    effectSlots: [0, 0, 0, 0],
                    cost: [EFFECT.loseExplore, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
                {
                    effectSlots: [0, 0, 0, 0],
                    cost: [EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 2 */
            [
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
            ],
            /* 3 */
            [
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseExplore, EFFECT.loseText, EFFECT.loseText],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 4 */
            [

                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 2, 2],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 1, 2],
                    cost: [EFFECT.loseWeapon, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 5 */
            [
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 6 */
            [

                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseText],
                    size: FIELD_SIZE["2"],
                },
            ],
            /* 7 */
            [

                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseExplore, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 8 */
            [

                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseExplore, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ]
        ]
    }
});
