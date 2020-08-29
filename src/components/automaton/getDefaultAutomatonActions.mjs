import {automatonActions} from "../functions/constants.mjs";
import {shuffleArray} from "../functions/cardManipulationFuntions.mjs";
import {AUTOMATON_DIFFICULTY} from "../functions/enums.mjs";
import cloneDeep from "lodash/cloneDeep.js";

export function getDefaultAutomatonActions(automatonDifficulty) {
    let actions = cloneDeep(shuffleArray(automatonActions));
    let easyActions = 5 - automatonDifficulty;
    for (let i = 0; i < actions.length; i++) {
        if (easyActions > 0 && actions[i].difficulty !== AUTOMATON_DIFFICULTY.fixed) {
            easyActions--;
            actions[i].difficulty = AUTOMATON_DIFFICULTY.easy;
        } else if (easyActions === 0 && actions[i].difficulty !== AUTOMATON_DIFFICULTY.fixed) {
            actions[i].difficulty = AUTOMATON_DIFFICULTY.hard;
        }
    }
    return shuffleArray(actions);
}