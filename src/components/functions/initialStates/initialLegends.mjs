/* INITIAL Legends2 */
import {GLOBAL_VARS, LEGEND_IDS} from "../../../data/idLists.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";

export function getInitialLegends(numOfPlayers) {
    const legendsKeys = shuffleArray(Object.keys(LEGEND_IDS));
    const legends = [LEGEND_IDS[legendsKeys[0]]];
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
        legend.usage = [];
        for (let i = 0; i < 8; i++)
            legend.usage.push([0, 0, 0])
    }
    return legends;
}