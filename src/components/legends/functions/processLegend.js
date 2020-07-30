import {FIELD_SIZE, Legends} from "../../../data/legends";
import {EFFECT} from "../../../data/effects";
import {processEffects} from "../../functions/processEffects";
import {addLogEntry} from "../../main/logger";
import {ACTION_TYPE} from "../../functions/enums";
import {checkTokenColumns, getDiscountForProgress} from "./legendsFunctions";

export function processLegend(legends, legendIndex, columnIndex, fieldIndex, effects, tPlayerState, tStore, tLocations) {
    const legend = Legends[legends[legendIndex].id];
    const field = legend.fields[columnIndex][fieldIndex];

    const playerIndex = tPlayerState.playerIndex;
    const positions = legends[legendIndex].positions[playerIndex];
    const previousColumnIndex = columnIndex - 1;
    let canPlaceToken = false;
    let isFirstToken = null;
    const prevPositions = [];
    let tokenIndex;

    if (columnIndex === 0) {
        // if first column was clicked we check if the player has any null column position
        for (let i = 0; i < positions.length; i++) {
            if (positions[i].columnIndex === null) {
                canPlaceToken = true;
                tokenIndex = i;
                break;
            }
        }
    } else {
        // if not we check if player has any token in previous column
        tokenIndex = checkTokenColumns(positions, columnIndex - 1)
        if (tokenIndex >= 0) {
            const previousColumn = legend.fields[columnIndex - 1];

            // prepare positions in previous column as if there were three elements
            // first index is always 0
            prevPositions.push(0);
            // second position can be 0 or 1
            let tempIndex = previousColumn[0].size === FIELD_SIZE["1"] ? 1 : 0;
            prevPositions.push(tempIndex);
            // third position has three possibilities
            if (previousColumn[0].size === FIELD_SIZE["1"]) {
                tempIndex = previousColumn[1].size === FIELD_SIZE["1"] ? 2 : 1;
            } else {
                tempIndex = previousColumn[0].size === FIELD_SIZE["2"] ? 1 : 0;
            }
            prevPositions.push(tempIndex);

            // we need to check that second token does not overtake the first one
            const firstTokenColumn = positions[0].columnIndex;
            if (field.size === 1) {
                for (let i = 0; i < positions.length; i++) {
                    if (legend.fields[columnIndex][0].size === FIELD_SIZE["2"]) {
                        if (positions[i].columnIndex === previousColumnIndex && positions[i].fieldIndex === prevPositions[fieldIndex + 1]) {
                            if (i === 0 || columnIndex <= firstTokenColumn) {
                                canPlaceToken = true;
                                break;
                            } else {
                                console.log("Unable to place token - second token would overtake the first one")
                            }
                        }
                    } else {
                        if (positions[i].columnIndex === previousColumnIndex && positions[i].fieldIndex === prevPositions[fieldIndex]) {
                            if (i === 0 || columnIndex <= firstTokenColumn) {
                                canPlaceToken = true;
                                break;
                            } else {
                                console.log("Unable to place token - second token would overtake the first one")
                            }
                        }
                    }
                    isFirstToken = i === 0;
                }
            } else if (field.size === 2) {
                for (let i = 0; i < positions.length; i++) {
                    if ((positions[i].columnIndex === previousColumnIndex && positions[i].fieldIndex === prevPositions[fieldIndex])
                        || (positions[i].columnIndex === previousColumnIndex && positions[i].fieldIndex === prevPositions[fieldIndex + 1])) {
                        if (i === 0 || columnIndex <= firstTokenColumn) {
                            canPlaceToken = true;
                            break;
                        } else {
                            console.log("Unable to place token - second token would overtake the first one")
                        }
                    }
                    isFirstToken = i === 0;
                }
            } else if (field.size === 3) {
                for (let i = 0; i < positions.length; i++) {
                    if ((positions[i].columnIndex === previousColumnIndex && positions[i].fieldIndex === prevPositions[fieldIndex])
                        || (positions[i].columnIndex === previousColumnIndex && positions[i].fieldIndex === prevPositions[fieldIndex + 1])
                        || (positions[i].columnIndex === previousColumnIndex && positions[i].fieldIndex === prevPositions[fieldIndex + 2])) {
                        if (i === 0 || columnIndex <= firstTokenColumn) {
                            canPlaceToken = true;
                            break;
                        } else {
                            console.log("Unable to place token - second token would overtake the first one")
                        }
                    }
                    isFirstToken = i === 0;
                }
            }
        }
    }
    if (canPlaceToken) {
        const activeEffect = tPlayerState.activeEffects[0];
        if ([EFFECT.progressWithTexts, EFFECT.progressWithTextsOrWeapon, EFFECT.progressWithWeapon, EFFECT.progressWithJewel,
            EFFECT.progressWithSecondToken, EFFECT.progress].includes(activeEffect)) {
            effects = getDiscountForProgress(effects, activeEffect, isFirstToken);
            tPlayerState.activeEffects.splice(0, 1);
        }
        const rewardsData = []
        let effectsResult = processEffects(null, null, tPlayerState, effects,
            null, tStore, null, tLocations);
        if (effectsResult.showRewardsModal) {
            rewardsData.push(effectsResult.rewardsData);
        }

        // if effects were processed (price was paid) place the token
        if (effectsResult.processedAllEffects) {
            if (columnIndex > 0) {
                for (let position of positions) {
                    if (position.columnIndex === columnIndex - 1) {
                        let correctToken = false;
                        switch (field.size) {
                            case FIELD_SIZE["3"]:
                                if (position.fieldIndex === prevPositions[fieldIndex] + 2) {
                                    correctToken = true
                                }
                            // eslint-disable-next-line no-fallthrough
                            case FIELD_SIZE["2"]:
                                if (position.fieldIndex === prevPositions[fieldIndex] + 1) {
                                    correctToken = true
                                }
                            // eslint-disable-next-line no-fallthrough
                            case FIELD_SIZE["1"]:
                                if (legend.fields[columnIndex][fieldIndex - 1] && legend.fields[columnIndex][fieldIndex - 1].size === FIELD_SIZE["2"]) {
                                    if (position.fieldIndex === prevPositions[fieldIndex + 1]) {
                                        correctToken = true
                                    }
                                } else {
                                    if (position.fieldIndex === prevPositions[fieldIndex]) {
                                        correctToken = true
                                    }
                                }
                                break;
                            default:
                                console.log("Unable to process field size in handleClickOnLegend: " + field.size);
                        }
                        if (correctToken) {
                            position.columnIndex = columnIndex;
                            position.fieldIndex = fieldIndex;
                            break;
                        }
                    }
                }
            } else {
                for (let position of positions) {
                    if (position.columnIndex === null && position.fieldIndex === null) {
                        position.columnIndex = columnIndex;
                        position.fieldIndex = fieldIndex;
                        break;
                    }
                }
            }

            // if player reached the lost city, we push him into extra points array
            if (columnIndex === 7) {
                legend.lostCityPlayers.push(playerIndex);
                debugger
            }

            // each column has a reward for both first and second token - we have stored token index previously
            const columnRewards = legend.columnRewards[columnIndex][tokenIndex];
            const rewardsResult = processEffects(null, null, effectsResult.tPlayerState, columnRewards,
                null, tStore, null, null);
            tPlayerState = rewardsResult.tPlayerState;
            if (rewardsResult.showRewardsModal) {
                rewardsData.push(rewardsResult.rewardsData);
            }

            addLogEntry(tPlayerState, ACTION_TYPE.researches, {column: columnIndex, field: fieldIndex}, effects);
            legends[legendIndex].positions[playerIndex] = positions;
            effectsResult.tPlayerState.actions = effectsResult.tPlayerState.actions -= 1;
            return {
                tPlayerState: tPlayerState,
                tLegends: legends,
                tStore: tStore,
                tLocations: tLocations,
                positions: positions,
                rewardsData: rewardsData,
                showRewardsModal: rewardsData.length > 0,
            }
        } else {
            console.debug("Unable to pay the price to advance in research");
        }
    } else {
        console.debug("Unable to place token in check token columns");
    }
    return false
}