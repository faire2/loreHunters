import {FIELD_SIZE} from "../../../data/legends";
import {EFFECT} from "../../../data/effects";
import {processEffects} from "../../functions/processEffects";
import {addLogEntry} from "../../main/logger";
import {ACTION_TYPE} from "../../functions/enums";
import {checkTokenColumns, getDiscountForProgress} from "./legendsFunctions";

export function processLegend(legend, columnIndex, fieldIndex, effects, tPlayerState, tStore, tLocations) {
    const field = legend.fields[columnIndex][fieldIndex];
    const playerIndex = tPlayerState.playerIndex;
    const positions = legend.positions[playerIndex];
    const previousColumnIndex = columnIndex - 1;
    let canPlaceToken = [false, false];
    let isFirstToken = null;
    let tokenIndex;
    let previousColumnPositions = [[false, false, false],[false, false, false]];
    if (columnIndex === 0) {
        // if first column was clicked we check if the player has any null column position
        for (let i = 0; i < positions.length; i++) {
            if (positions[i].columnIndex === null) {
                canPlaceToken[i] = true;
                tokenIndex = i;
                break;
            }
        }
    } else {
        // if not we check if player has any token in previous column
        tokenIndex = checkTokenColumns(positions, columnIndex - 1)
        if (tokenIndex >= 0) {

            // prepare array of present positions in previous column, e.g. size 3 column = [true, true, true]
            for (let i = 0; i < positions.length; i++) {
                if (positions[i].columnIndex === previousColumnIndex) {
                    if (positions[i].fieldIndex === 0) {
                        switch (legend.fields[previousColumnIndex][0].size) {
                            case FIELD_SIZE["1"]:
                                previousColumnPositions[i] = [true, previousColumnPositions[i][1], previousColumnPositions[i][2]];
                                break;
                            case FIELD_SIZE["1.5"]:
                            case FIELD_SIZE["2"]:
                                previousColumnPositions[i] = [true, true, previousColumnPositions[i][2]];
                                break;
                            case FIELD_SIZE["3"]:
                                previousColumnPositions[i] = [true, true, true];
                                break;
                            default:
                                console.warn("Unable to determine field size in previousColumnPositions");
                        }
                        // index 1 can in fact be real index 1 (if previous field size is 0) or 2 (if previous field size is 1)
                    } else if (positions[i].fieldIndex === 1 && (legend.fields[previousColumnIndex][0].size === FIELD_SIZE["1"]
                        || legend.fields[previousColumnIndex][0].size === FIELD_SIZE["1.5"])) {
                        switch (legend.fields[previousColumnIndex][1].size) {
                            case FIELD_SIZE["1"]:
                                previousColumnPositions[i] = [previousColumnPositions[i][0], true, previousColumnPositions[i][2]];
                                break;
                            case FIELD_SIZE["1.5"]:
                            case FIELD_SIZE["2"]:
                                previousColumnPositions[i] = [previousColumnPositions[i][0], true, true];
                                break;
                            default:
                                console.warn("Unable to determine field size in previousColumnPositions");
                        }
                    } else if (positions[i].fieldIndex === 1 && legend.fields[previousColumnIndex][0].size === FIELD_SIZE["2"]) {
                        switch (legend.fields[previousColumnIndex][1].size) {
                            case FIELD_SIZE["1"]:
                                previousColumnPositions[i] = [previousColumnPositions[i][0], previousColumnPositions[i][1], true];
                                break;
                            default:
                                console.warn("Unable to determine field size in previousColumnPositions");
                        }
                    } else if (positions[i].fieldIndex === 2) {
                        switch (legend.fields[previousColumnIndex][2].size) {
                            case FIELD_SIZE["1"]:
                                previousColumnPositions[i] = [previousColumnPositions[i][0], previousColumnPositions[i][1], true];
                                break;
                            default:
                                console.warn("Unable to determine field size in previousColumnPositions");
                        }
                    }
                }
            }

            // we check position of the field that was clicked in relation to array of true positions in previous column
            if (fieldIndex === 0) {
                switch (legend.fields[columnIndex][0].size) {
                    case FIELD_SIZE["1"]:
                        canPlaceToken[0] = previousColumnPositions[0][0];
                        canPlaceToken[1] = previousColumnPositions[1][0];
                        break;
                    case FIELD_SIZE["1.5"]:
                    case FIELD_SIZE["2"]:
                        canPlaceToken[0] = previousColumnPositions[0][0] || previousColumnPositions[0][1];
                        canPlaceToken[1] = previousColumnPositions[1][0] || previousColumnPositions[1][1];
                        break;
                    case FIELD_SIZE["3"]:
                        canPlaceToken[0] = previousColumnPositions[0][0] || previousColumnPositions[0][1] || previousColumnPositions[0][2];
                        canPlaceToken[1] = previousColumnPositions[1][0] || previousColumnPositions[1][1] || previousColumnPositions[1][2];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
            } else if (fieldIndex === 1 && (legend.fields[columnIndex][0].size === FIELD_SIZE["1"]
                || legend.fields[columnIndex][0].size === FIELD_SIZE["1.5"])) {
                switch (legend.fields[columnIndex][1].size) {
                    case FIELD_SIZE["1"]:
                        canPlaceToken[0] = previousColumnPositions[0][1];
                        canPlaceToken[1] = previousColumnPositions[1][1];
                        break;
                    case FIELD_SIZE["1.5"]:
                    case FIELD_SIZE["2"]:
                        canPlaceToken[0] = previousColumnPositions[0][1] || previousColumnPositions[0][2];
                        canPlaceToken[1] = previousColumnPositions[1][1] || previousColumnPositions[1][2];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
            } else if (fieldIndex === 1 && legend.fields[columnIndex][0].size === FIELD_SIZE["2"]) {
                switch (legend.fields[columnIndex][1].size) {
                    case FIELD_SIZE["1"]:
                        canPlaceToken[0] = previousColumnPositions[0][2];
                        canPlaceToken[1] = previousColumnPositions[1][2];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
            } else if (fieldIndex === 2) {
                switch (legend.fields[columnIndex][2].size) {
                    case FIELD_SIZE["1"]:
                        canPlaceToken[0] = previousColumnPositions[0][2];
                        canPlaceToken[1] = previousColumnPositions[1][2];
                        break;
                    default:
                        console.warn("Unable to determine field size in previousColumnPositions");
                }
            }
        }
    }

    // we know have to check that second token is behind
    const isSecondTokenBehind = columnIndex > 0 ? positions[1].columnIndex < positions[0].columnIndex
        : true;

    if (canPlaceToken.includes(true)) {
        const activeEffect = tPlayerState.activeEffects[0];
        if ([EFFECT.progressWithTexts, EFFECT.progressWithTextsOrWeapon, EFFECT.progressWithWeapon, EFFECT.progressWithJewel,
            EFFECT.progressWithSecondToken, EFFECT.progress].includes(activeEffect)) {
            effects = getDiscountForProgress(effects, activeEffect, isFirstToken);
            tPlayerState.activeEffects.splice(0, 1);
        }
        const rewardsData = []
        let effectsResult = processEffects(null, null, tPlayerState, effects, tStore, null, tLocations);
        if (effectsResult.showRewardsModal) {
            rewardsData.push(effectsResult.rewardsData);
        }
        let tokenPlaced = false;

        // if effects were processed (price was paid) place the token
        if (effectsResult.processedAllEffects) {
            if (columnIndex > 0) {
                for (let i = 0; i < positions.length; i++) {
                    if (positions[i].columnIndex === columnIndex - 1) {
                        let correctToken = false;
                        switch (field.size) {
                            case FIELD_SIZE["3"]:
                                correctToken = true
                                break;
                            // eslint-disable-next-line no-fallthrough
                            case FIELD_SIZE["2"]:
                            case FIELD_SIZE["1.5"]:
                                if (fieldIndex === 0) {
                                    if (previousColumnPositions[i][0] || previousColumnPositions[i][1]) {
                                        correctToken = true;
                                    }
                                } else if (fieldIndex === 1) {
                                    if (previousColumnPositions[i][1] || previousColumnPositions[i][2]) {
                                        correctToken = true;
                                    }
                                } else {
                                    console.error("Invalid field index and size combination in processLegends.")
                                }
                                break;
                            // eslint-disable-next-line no-fallthrough
                            case FIELD_SIZE["1"]:
                                if (previousColumnPositions[i][fieldIndex]) {
                                    correctToken = true;
                                }
                                break;
                            default:
                                console.log("Unable to process field size in handleClickOnLegend: " + field.size);
                        }
                        if (correctToken && (i === 0 || isSecondTokenBehind)) {
                            positions[i].columnIndex = columnIndex;
                            positions[i].fieldIndex = fieldIndex;
                            tokenPlaced = true;
                            break;
                        }
                    }
                }
            } else {
                for (let position of positions) {
                    if (position.columnIndex === null && position.fieldIndex === null) {
                        position.columnIndex = columnIndex;
                        position.fieldIndex = fieldIndex;
                        tokenPlaced = true;
                        break;
                    }
                }
            }

            if (!tokenPlaced) {
                return false
            }

            // if player reached the lost city, we push him into extra points array
            if (columnIndex === 7) {
                legend.lostCityPlayers.push(playerIndex);
            }

            // each column has a reward for both first and second token - we have stored token index previously
            const columnRewards = legend.columnRewards[columnIndex][tokenIndex];
            const rewardsResult = processEffects(null, null, effectsResult.tPlayerState, columnRewards, tStore, null, null);
            tPlayerState = rewardsResult.tPlayerState;
            if (rewardsResult.showRewardsModal) {
                rewardsData.push(rewardsResult.rewardsData);
            }

            addLogEntry(tPlayerState, ACTION_TYPE.researches, {
                column: columnIndex,
                field: fieldIndex
            }, effects);
            legend.positions[playerIndex] = positions;
            tPlayerState.actions = effectsResult.tPlayerState.actions -= 1;
            return {
                tPlayerState: tPlayerState,
                tLegend: legend,
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
        console.debug("Unable to place token in 'check token columns'");
    }
    return false
}