/* INITIAL Legends2 */
import {GLOBAL_VARS,} from "../../../data/idLists.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";
import {Legends2} from "../../../data/legends.mjs";

export function getInitialLegends(numOfPlayers) {
    const legendsKeys = shuffleArray(Object.keys(Legends2));
    const legends = [Legends2[legendsKeys[0]]];
    for (let legend of legends) {
        legend.positions = [];
        for (let i = 0; i < numOfPlayers; i++) {
            let playerArr = [];
            let tokenPosition = {columnIndex: null, fieldIndex: null};
            for (let i = 0; i < GLOBAL_VARS.numOfLegendTokens; i++) {
                playerArr.push(tokenPosition);
            }
            legend.positions.push(playerArr);
        }
    }
    return legends;
}