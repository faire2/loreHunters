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
                [EFFECT.gainCoin], [EFFECT.gainSilverAssistant],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainSilverAssistant],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainBronzeRelic],
            ],
            [
                [EFFECT.gainCoin], [EFFECT.gainGoldAssistant],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainGoldAssistant],
            ],
            [
                [EFFECT.draw1], [EFFECT.gainBronzeRelic],
            ],
            [
                [EFFECT.gainMap], [EFFECT.gainBronzeRelic],
            ],
            [
                [EFFECT.gainRewardLevel, EFFECT.discoverLostCity], [EFFECT.draw1],
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
