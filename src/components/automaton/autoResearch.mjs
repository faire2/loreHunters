import {DIRECTION} from "../functions/enums.mjs";
import {getPreviousColumnPositions} from "../legends/functions/getPreviousColumnPositions.mjs";
import {getCanPlaceTokens} from "../legends/functions/getCanPlaceTokens.mjs";

export function autoResearch(states, automatonState, direction) {
    console.log("AUTOMATON: researching legend from " + direction);
    const legend = states.legend;

    // automaton is always the fifth player
    let positions = legend.positions[4];

    if (positions[0].columnIndex === null) {
        // if automaton's token is not yet placed, we place it to first or last field of a given column
        if (direction === DIRECTION.left) {
            positions[0].columnIndex = 0;
            positions[0].fieldIndex = 0;
        } else if (direction === DIRECTION.right) {
            positions[0].columnIndex = 0;
            positions[0].fieldIndex = legend.fields[0].length - 1;
        } else {
            console.error("Unable to process direction in autoResearch: " + direction);
        }
    } else if (positions[0].columnIndex < 7) {
        // describes which position do the tokens really hold in current column
        // automaton only uses on token, but the process assumes two
        let currentRealColumnPositions = [[false, false, false], [false, false, false]];
        let canPlaceToken = [false, false];
        let previousColumnIndex = positions[0].columnIndex;
        currentRealColumnPositions = getPreviousColumnPositions(legend, currentRealColumnPositions, positions, previousColumnIndex);
        let columnIndex = positions[0].columnIndex + 1;
        let fieldIndex;
        if (direction === DIRECTION.left) {
            fieldIndex = 0;
            while (fieldIndex < legend.fields[columnIndex].length) {
                canPlaceToken = getCanPlaceTokens(canPlaceToken, legend, fieldIndex, columnIndex, currentRealColumnPositions);
                // if we can place the token to this spot, we break, set position and clear possible boons
                if (canPlaceToken[0]) {
                    positions[0].columnIndex = columnIndex;
                    positions[0].fieldIndex = fieldIndex;
                    legend.fields[columnIndex][fieldIndex].effects = [];
                    break;
                }
                fieldIndex++
            }
        } else if (direction === DIRECTION.right) {
            fieldIndex = legend.fields[columnIndex].length - 1;
            while (fieldIndex > -1) {
                canPlaceToken = getCanPlaceTokens(canPlaceToken, legend, fieldIndex, columnIndex, currentRealColumnPositions);
                // if we can place the token to this spot, we break, set position and clear possible boons
                if (canPlaceToken[0]) {
                    positions[0].columnIndex = columnIndex;
                    positions[0].fieldIndex = fieldIndex;
                    legend.fields[columnIndex][fieldIndex].effects = [];
                    break;
                }
                fieldIndex--
            }
        } else {
            console.error("Unable to process direction in autoResearch: " + direction);
        }
        if (!canPlaceToken[0]) {
            console.error("Automaton was unable to place a token!");
        } else if (columnIndex === 7) {
            legend.lostCityPlayers.push(4);
            if (legend.lostCityEffects.length > 0) {
                legend.lostCityEffects.splice(1, 0);
            }
        }
    } else {
        // if token is already in the 8th column, add a silver statue
        automatonState.silverRelics += 1;
    }
    return {states: states, automatonState: automatonState}
}