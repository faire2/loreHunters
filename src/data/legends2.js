import React from "react";
import {EFFECT} from "./effects";
import {
    Coin, DefeatedGuardian,
    DestroyCard,
    Draw1Card,
    Draw2Cards,
    Explore,
    Jewel,
    Blimp,
    Text, Treasure,
    Uptrade,
    Weapon, AdventurerToken
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

export const Legends2 = Object.freeze({
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
                    effects: [EFFECT.gainPlane, EFFECT.gainPlane],
                    effectsText: [<Blimp/>, <Blimp/>],
                    cost: [EFFECT.loseText, EFFECT.loseJewel],
                    costText: [<Text/>, <Jewel/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.gainAdventurerForThisRound],
                    effectsText: [<div style={{width: "1.5vw", margin: "0 auto"}}> <AdventurerToken/> </div>],
                    effectsText: [<div style={{width: "1.5vw", margin: "0 auto"}}> <AdventurerToken/> </div>],
                    cost: [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseWeapon],
                    costText: [<Coin/>, <Text/>, <Weapon/>],
                    size: FIELD_SIZE["1"],
                },
                {
                    effects: [EFFECT.draw1, EFFECT.destroyCard],
                    effectsText: [<Draw1Card/>, <DestroyCard/>],
                    cost: [EFFECT.lockWeapon, EFFECT.loseWeapon],
                    costText: [<Weapon/>, <Weapon/>],
                    size: FIELD_SIZE["1"],
                },
            ],
            [

                {
                    effects: [EFFECT.firstGainsCoin, EFFECT.gainCoin, EFFECT.gainCoin],
                    effectsText: [<Coin/>, <Coin/>, <Coin/>],
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
