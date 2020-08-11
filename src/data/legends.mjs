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
        // victory point for first and second token in a given column
        // last column is resolved in next property
        victoryPoints: {
            firstToken: [0, 1, 2, 4, 7, 9, 11, "?"],
            secondToken: [1, 2, 4, 6, 9, 12, 15, "?"],
        },
        // victory points for reaching lost city, first player gains most
        lostCityPoints: [15, 14, 13, 12, 12, 12, 12, 12],
        lostCityPlayers: [],
        columnRewards: [
            [
                [EFFECT.gainCoin], [EFFECT.gainSilverAssistant],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.gainSilverAssistant],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.gainBronzeRelic],
            ],
            [
                [EFFECT.gainCoin], [EFFECT.upgradeAssistant],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.upgradeAssistant],
            ],
            [
                [EFFECT.draw1], [EFFECT.gainBronzeRelic],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.gainBronzeRelic],
            ],
            [
                [EFFECT.gainRewardLevel, EFFECT.discoverLostCity], [EFFECT.gainRewardLevel],
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
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseText],
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
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseWeapon],
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
