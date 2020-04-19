import React from "react";
import {EFFECT} from "./effects";
import {
    Coin, DefeatedGuardian,
    DestroyCard,
    Draw1Card,
    Draw2Cards,
    Explore,
    Jewel,
    Plane,
    Text, Treasure,
    Uptrade,
    Weapon
} from "../components/Symbols";

const style = {
    width: "100%",
    height: "auto",
    bottom: 0,
};

export const FIELD_SIZE = Object.freeze({
    1: 1,
    2: 2,
    3: 3
})

export const Legends = Object.freeze({
    legend1: {
        id: "legend1",
        victoryPoints: [1, 3, 5, 8, 12, 17, 20, 20],
        fields: [
            [
                {
                    effects: [],
                    effectsText: [],
                    cost: [EFFECT.loseText, EFFECT.loseWeapon],
                    costText: [<Text/>, <Weapon/>],
                    size: FIELD_SIZE["2"],
                },
                {
                    effects: [],
                    effectsText: [],
                    cost: [EFFECT.loseJewel],
                    costText: [<Jewel/>],
                    size: FIELD_SIZE["1"],
                }
            ],
            [
                {
                    effects: [EFFECT.firstGainsCoin],
                    effectsText: [<Coin/>],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    costText: [<Text/>, <Jewel/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.firstGainsExplore],
                    effectsText: [<Explore/>],
                    cost: [EFFECT.loseCoin, EFFECT.loseJewel],
                    costText: [<Coin/>, <Jewel/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.firstGainsExplore],
                    effectsText: [<Explore/>],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseText, EFFECT.loseText],
                    costText: [<Coin/>,<Text/>,<Text/>,<Text/>],
                    size: FIELD_SIZE["1"],
                },
            ],
            [

                {
                    effects: [EFFECT.destroyCard],
                    effectsText: [<DestroyCard/>],
                    cost: [EFFECT.loseWeapon, EFFECT.loseJewel],
                    costText: [<Weapon/>, <Jewel/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.uptrade],
                    effectsText: [<Uptrade/>],
                    cost: [EFFECT.loseText, EFFECT.loseWeapon, EFFECT.loseWeapon],
                    costText: [<Text/>, <Weapon/>, <Weapon/>],
                    size: FIELD_SIZE["2"],
                },
            ],
            [

                {
                    effects: [EFFECT.firstGainsCoin],
                    effectsText: [<Coin/>],
                    cost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseWeapon],
                    costText: [<Text/>,<Text/>,<Weapon/>],
                    size: FIELD_SIZE["2"],
                },
                {
                    effects: [EFFECT.firstGainsExplore],
                    effectsText: [<Explore/>],
                    cost: [EFFECT.loseCoin, EFFECT.loseJewel],
                    costText: [<Coin/>, <Jewel/>],
                    size: FIELD_SIZE["1"],
                },
            ],
            [

                {
                    effects: [EFFECT.gainPlane],
                    effectsText: [<Plane/>],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    costText: [<Text/>, <Jewel/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.destroyCard],
                    effectsText: [<DestroyCard/>],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseWeapon],
                    costText: [<Coin/>, <Text/>, <Weapon/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.draw1],
                    effectsText: [<Draw1Card/>],
                    cost: [EFFECT.loseCoin, EFFECT.loseWeapon],
                    costText: [<Coin/>, <Weapon/>],
                    size: FIELD_SIZE["1"],
                },
            ],
            [

                {
                    effects: [EFFECT.firstGainsCoin, EFFECT.firstGainsExplore],
                    effectsText: [<Coin/>, <Explore/>],
                    cost: [EFFECT.loseJewel, EFFECT.loseJewel],
                    costText: [<Jewel/>, <Jewel/>],
                    size: FIELD_SIZE["3"],
                },
            ],
            [

                {
                    effects: [EFFECT.draw1, EFFECT.draw1],
                    effectsText: [<Draw2Cards/>],
                    cost: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseJewel],
                    costText: [<Text/>, <Text/>, <Jewel/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.defeatGuardian],
                    effectsText: [<DefeatedGuardian/>],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseText, EFFECT.loseWeapon],
                    costText: [<Coin/>, <Text/>, <Text/>, <Weapon/>],
                    size: FIELD_SIZE["2"],
                },
            ],
            [

                {
                    effects: [EFFECT.gainPlaceholder],
                    effectsText: [<Treasure/>],
                    cost: [EFFECT.loseWeapon, EFFECT.loseJewel],
                    costText: [<Weapon/>, <Jewel/>],
                    size: FIELD_SIZE["3"],
                }
            ]
        ]
    }
});
