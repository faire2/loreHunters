import React from "react";
import {EFFECT} from "./effects";
import legend1Image from "../img/legends/legend2.png"
import legend2Image from "../img/legends/legend1.png"

const style = {
    width: "100%",
    height: "auto",
    bottom: 0,
};

export const Legends = Object.freeze({
    legend1: {
        id: "legend1",
        effects: [
            [EFFECT.loseText, EFFECT.loseWeapon],
            [EFFECT.loseText, EFFECT.loseJewel, EFFECT.gainCoin],
            [EFFECT.loseWeapon, EFFECT.loseWeapon, EFFECT.incomeText],
            [EFFECT.loseText, EFFECT.loseText, EFFECT.loseText, EFFECT.loseJewel, EFFECT.gainExpeditionCard],
            [EFFECT.loseText, EFFECT.loseText, EFFECT.loseWeapon, EFFECT.loseWeapon, EFFECT.incomeAdventurer],
            [EFFECT.loseWeapon, EFFECT.loseJewel],
            [EFFECT.loseText, EFFECT.loseText, EFFECT.loseJewel, EFFECT.gainTreasure]
        ],
        graphic: <img src={legend1Image} style={style}/>,
        points: [3, 6, 7, 7, 9, 15, 15]
    },
    legend2: {
        id: "legend2",
        effects: [
            [EFFECT.loseJewel],
            [EFFECT.loseWeapon, EFFECT.loseWeapon, EFFECT.gainExplore],
            [EFFECT.loseText, EFFECT.loseText, EFFECT.loseText, EFFECT.incomeCoin],
            [EFFECT.loseText, EFFECT.loseText, EFFECT.loseWeapon, EFFECT.loseJewel, EFFECT.gainExpeditionCard],
            [EFFECT.loseJewel, EFFECT.loseJewel, EFFECT.incomeCard],
            [EFFECT.loseText, EFFECT.loseWeapon, EFFECT.loseWeapon],
            [EFFECT.loseWeapon, EFFECT.loseJewel, EFFECT.gainTreasure],
        ],
        graphic: <img src={legend2Image} style={style}/>,
        points: [3, 6, 6, 7, 9, 15, 15]
    }
});
