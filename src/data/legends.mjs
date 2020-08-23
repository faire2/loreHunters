import {EFFECT} from "./effects.mjs";

export const FIELD_SIZE = Object.freeze({
    1: 1,
    1.5: 1.5,
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
            firstToken: [1, 2, 4, 6, 9, 12, 16, 0],
            secondToken: [0, 1, 2, 4, 6, 8, 10, 0],
        },
        // victory points for reaching lost city, first player gains most
        lostCityPoints: [22, 21, 19, 18, 18, 18, 18, 18],
        lostCityPlayers: [],
        columnRewards: [
            [
                [EFFECT.gainCoin], [EFFECT.gainSilverAssistant],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.gainSilverAssistant],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.upgradeAssistant],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.upgradeAssistant],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore],
            ],
            [
                [EFFECT.draw1], [EFFECT.gainArtifact],
            ],
            [
                [EFFECT.gainExplore], [EFFECT.defeatGuardianOnOwnedLocation],
            ],
            [
                [EFFECT.destroyCard, EFFECT.discoverLostCity], [EFFECT.destroyCard],
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
                    effectSlots: [0, 0, 0, 1],
                    cost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseWeapon],
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
                    effectSlots: [0, 0, 0, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 6 */
            [

                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseExplore, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
            ],
            /* 7 */
            [

                {
                    effectSlots: [0, 0, 1, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["2"],
                },
                {
                    effectSlots: [0, 0, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 8 */
            [
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseExplore, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ]
        ]
    },
    legend2: {
        id: "legend2",
        // victory point for first and second token in a given column
        // last column is resolved in next property
        victoryPoints: {
            firstToken: [1, 2, 3, 4, 5, 10, 15, 0],
            secondToken: [0, 3, 4, 5, 8, 12, 15, 0],
        },
        // victory points for reaching lost city, first player gains most
        lostCityPoints: [22, 21, 20, 19, 0, 0, 0, 0],
        lostCityPlayers: [],
        columnRewards: [
            [
                [EFFECT.gainCoin], [EFFECT.gainSilverAssistant],
            ],
            [
                [EFFECT.gainCoin, EFFECT.gainCoin], [EFFECT.destroyCard],
            ],
            [
                [EFFECT.draw1], [EFFECT.upgradeAssistant],
            ],
            [
                [EFFECT.gainAssistantFromLegend], [EFFECT.gainArtifact],
            ],
            [
                [EFFECT.upgradeAssistant], [EFFECT.refreshAnyAssistant],
            ],
            [
                [EFFECT.gainFear], [EFFECT.draw1],
            ],
            [
                [EFFECT.gainFear], [EFFECT.gainJewel],
            ],
            [
                [EFFECT.draw1, EFFECT.discoverLostCity], [EFFECT.draw1],
            ]
        ],
        fields: [
            /* 1 */
            [
                {
                    effectSlots: [0, 0, 0, 0],
                    cost: [EFFECT.loseExplore, EFFECT.loseText, EFFECT.loseText],
                    size: FIELD_SIZE["1.5"],
                },
                {
                    effectSlots: [0, 0, 0, 0],
                    cost: [EFFECT.loseJewel],
                    size: FIELD_SIZE["1.5"],
                },
            ],
            /* 2 */
            [
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseExplore, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseWeapon, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1"],
                },
            ],
            /* 3 */
            [
                {
                    effectSlots: [0, 0, 0, 1],
                    cost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1.5"],
                },
                {
                    effectSlots: [0, 0, 0, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseJewel],
                    size: FIELD_SIZE["1.5"],
                },
            ],
            /* 4 */
            [

                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseSlottableRelic],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 5 */
            [
                {
                    effectSlots: [0, 0, 0, 1],
                    cost: [EFFECT.loseWeapon, EFFECT.loseWeapon],
                    size: FIELD_SIZE["1.5"],
                },
                {
                    effectSlots: [0, 0, 0, 1],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1.5"],
                },
            ],
            /* 6 */
            [

                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["1"],
                },
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseExplore, EFFECT.loseText, EFFECT.loseText, EFFECT.loseText],
                    size: FIELD_SIZE["2"],
                },
            ],
            /* 7 */
            [

                {
                    effectSlots: [0, 0, 1, 1],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseWeapon],
                    size: FIELD_SIZE["3"],
                },
            ],
            /* 8 */
            [
                {
                    effectSlots: [1, 1, 1, 1],
                    cost: [EFFECT.loseExplore, EFFECT.loseText, EFFECT.loseJewel],
                    size: FIELD_SIZE["3"],
                },
            ]
        ]
    }
});
