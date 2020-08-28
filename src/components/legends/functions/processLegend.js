import {FIELD_SIZE} from "../../../data/legends";
import {EFFECT} from "../../../data/effects";
import {processEffects} from "../../functions/processEffects";
import {addLogEntry} from "../../main/logger";
import {ACTION_TYPE} from "../../functions/enums";
import {checkTokenColumns, getDiscountForProgress} from "./legendsFunctions";
import {getPreviousColumnPositions} from "./getPreviousColumnPositions.mjs";
import {getCanPlaceTokens} from "./getCanPlaceTokens.mjs";

export function processLegend(legend, columnIndex, fieldIndex, effects, tPlayerState, tStore, tLocations) {
    const field = legend.fields[columnIndex][fieldIndex];
    const playerIndex = tPlayerState.playerIndex;
    const positions = legend.positions[playerIndex];
    const previousColumnIndex = columnIndex - 1;
    let isFirstToken = null;
    let tokenIndex;

    //previous positions will be used to calculate position in each of the field in column
    let previousColumnPositions = [];
    for (let position of positions) {
        previousColumnPositions.push([false, false, false]);
    }

    // can place token will be used to check possibility to place each tokens stored in positions
    let canPlaceTokens = [];
    for (let position of positions) {
        canPlaceTokens.push(false);
    }

    if (columnIndex === 0) {
        // if first column was clicked we check if the player has any null column position
        for (let i = 0; i < positions.length; i++) {
            if (positions[i].columnIndex === null) {
                canPlaceTokens[i] = true;
                tokenIndex = i;
                break;
            }
        }
    } else {
        // if not we check if player has any token in previous column
        tokenIndex = checkTokenColumns(positions, columnIndex - 1)
        if (tokenIndex >= 0) {

            // prepare array of present positions in previous column, e.g. size 3 column = [true, true, true]
            previousColumnPositions = getPreviousColumnPositions(legend, previousColumnPositions, positions, previousColumnIndex);

            // we check position of the field that was clicked in relation to array of true positions in previous column
            canPlaceTokens = getCanPlaceTokens(canPlaceTokens,legend, fieldIndex, columnIndex, previousColumnPositions);
        }
    }

    // we know have to check that second token is behind
    const isSecondTokenBehind = columnIndex > 0 ? positions[1].columnIndex < positions[0].columnIndex
        : true;

    if (canPlaceTokens.includes(true)) {
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