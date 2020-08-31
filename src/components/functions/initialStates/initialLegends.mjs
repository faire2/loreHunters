/* INITIAL Legends2 */
import {GLOBAL_VARS,} from "../../../data/idLists.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";
import {EFFECT} from "../../../data/effects.mjs";
import {Legends} from "../../../data/legends.mjs";

export function getInitialLegend(numOfPlayers, legendId, automatonLevel) {
    let legend = Legends[legendId];
    legend.positions = [];

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

    // add legend effects for exploring the lost city
    const lostCityEffectSlots = automatonLevel > 0 ? numOfPlayers + 1 : numOfPlayers;
    let lostCityEffects = [];
    for (let i = 0; i < lostCityEffectSlots; i++) {
        lostCityEffects.push(tLegendEffects[0]);
        tLegendEffects = tLegendEffects.shift();
    }
    legend.lostCityEffects = lostCityEffects;

    // automaton is always the fifth player
    numOfPlayers = automatonLevel > 0 ? 5 : numOfPlayers;

    // add player token positions
    for (let i = 0; i < numOfPlayers; i++) {
        let playerArr = [];
        let tokenPosition = {columnIndex: null, fieldIndex: null};
        for (let i = 0; i < GLOBAL_VARS.numOfLegendTokens; i++) {
            playerArr.push(tokenPosition);
        }
        legend.positions.push(playerArr);
    }

    return legend;
}

const legendEffects = [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore,
    EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyCard, EFFECT.destroyCard, EFFECT.destroyCard,
    EFFECT.draw1, EFFECT.draw1, EFFECT.draw1, EFFECT.uptrade, EFFECT.uptrade, EFFECT.uptrade,
    EFFECT.gainText, EFFECT.gainText, EFFECT.gainText];