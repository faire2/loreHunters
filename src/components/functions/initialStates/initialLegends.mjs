/* INITIAL Legends2 */
import {GLOBAL_VARS,} from "../../../data/idLists.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";
import {Legends} from "../../../data/legends.mjs";
import {EFFECT} from "../../../data/effects.mjs";

export function getInitialLegends(numOfPlayers) {
    const legendsKeys = shuffleArray(Object.keys(Legends));
    const legends = [Legends[legendsKeys[0]]];
    for (let legend of legends) {
        legend.positions = [];
        // add player token positions
        for (let i = 0; i < numOfPlayers; i++) {
            let playerArr = [];
            let tokenPosition = {columnIndex: null, fieldIndex: null};
            for (let i = 0; i < GLOBAL_VARS.numOfLegendTokens; i++) {
                playerArr.push(tokenPosition);
            }
            legend.positions.push(playerArr);
        }
        // add random effects to fields, as defined by effectSlots in given fields
        let tLegendEffects = [...legendEffects];
        tLegendEffects = shuffleArray(tLegendEffects);
        for (let column of legend.fields) {
            for (let field of column) {
                field.effects = [];
                for (let i = 0; i < field.effectSlots[numOfPlayers - 1]; i++) {
                    if (tLegendEffects.length > 0) {
                        field.effects.push(tLegendEffects[0]);
                        tLegendEffects.splice(0, 1);
                    }
                }
            }
        }
    }

    return legends;
}

const legendEffects = [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore,
    EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyCard, EFFECT.destroyCard, EFFECT.draw1, EFFECT.draw1,
    EFFECT.gainText, EFFECT.gainText];