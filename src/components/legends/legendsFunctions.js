import {EFFECT} from "../../data/effects";
import {processEffects} from "../functions/processEffects";
import {cloneDeep} from "lodash";
import {addLogEntry} from "../main/logger";
import {ACTION_TYPE} from "../functions/enums";
import {Coin, Explore, Map} from "../Symbols";
import React from "react";
import {FIELD_SIZE, Legends2} from "../../data/legends.mjs";
import {GLOBAL_VARS} from "../../data/idLists";

export function getDiscountForProgress(effects, activeEffect) {
    if (activeEffect === EFFECT.progressWithTexts) {
        effects = getFilteredEffects(effects, EFFECT.loseText, 2);
    } else if (activeEffect === EFFECT.progressWithWeapon) {
        effects = getFilteredEffects(effects, EFFECT.loseWeapon, 1);
    } else if (activeEffect === EFFECT.progressWithJewel) {
        effects = getFilteredEffects(effects, EFFECT.loseJewel, 1);
    }
    return effects;

    function getFilteredEffects(effects, checkedEffect, amount) {
        let resultEffects = [];
        let i = 0;
        for (let effect of effects) {
            if (!(effect === checkedEffect && i < amount)) {
                resultEffects.push(effect);
            } else {
                i++
            }
        }
        return resultEffects;
    }
}

export function processLegend(legends, legendIndex, columnIndex, fieldIndex, effects, playerState, store, locations) {
    const legend = Legends2[legends[legendIndex].id];
    const field = legend.fields[columnIndex][fieldIndex];

    const playerIndex = playerState.playerIndex;
    const positions = legends[legendIndex].positions[playerIndex];
    const previousColumnIndex = columnIndex - 1;
    let canPlaceToken = false;
    const prevPositions = [];
    let tokenIndex;

    // if first column was clicked we check if the player has any null column position
    if (columnIndex === 0) {
        for (let position of positions) {
            if (position.columnIndex === null) {
                canPlaceToken = true;
                break;
            }
        }
        // if not we check if player has any token in previous column
    } else {
        tokenIndex = checkTokenColumns(positions, columnIndex - 1)
        if (tokenIndex) {
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
            if (field.size === 1) {
                for (let position of positions) {
                    if (legend.fields[columnIndex][0].size === FIELD_SIZE["2"]) {
                        if (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex + 1]) {
                            canPlaceToken = true;
                            break;
                        }
                    } else {
                        if (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex]) {
                            canPlaceToken = true;
                            break;
                        }
                    }
                }
            } else if (field.size === 2) {
                for (let position of positions) {
                    if ((position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex])
                        || (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex + 1])) {
                        canPlaceToken = true;
                        break
                    }
                }
            } else if (field.size === 3) {
                for (let position of positions) {
                    if ((position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex])
                        || (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex + 1])
                        || (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex + 2])) {
                        canPlaceToken = true;
                        break
                    }
                }
            }
        }
    }
    if (canPlaceToken) {
        const activeEffect = playerState.activeEffects[0];
        let tPlayerState = cloneDeep(playerState);
        if (activeEffect === EFFECT.progressWithTexts || activeEffect === EFFECT.progressWithWeapon
            || activeEffect === EFFECT.progressWithJewel) {
            effects = getDiscountForProgress(effects, activeEffect);
            tPlayerState.activeEffects.splice(0, 1);
        }
        let effectsResult = processEffects(null, null, tPlayerState, effects,
            null, store, null, locations);

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

            // each column has a reward for both first and second token - we have stored token index previously
            const columnRewards = legend.columnRewards.columnIndex.tokenIndex;
            const rewardsResult = processEffects(null, null, tPlayerState, columnRewards,
                null, null, null, null);
            tPlayerState = rewardsResult.tPlayerState


            addLogEntry(tPlayerState, ACTION_TYPE.researches, {column: columnIndex, field: fieldIndex}, effects);
            legends[legendIndex].positions[playerIndex] = positions;
            effectsResult.tPlayerState.actions = effectsResult.tPlayerState.actions -= 1;
            return {
                tPlayerState: effectsResult.tPlayerState,
                tLegends: legends,
                tStore: store,
                tLocations: locations,
                positions: positions,
                rewardsData: effectsResult.rewardsData,
                showRewardsModal: effectsResult.showRewardsModal
            }
        } else {
            console.debug("Unable to pay the price to advance in research");
        }
    } else {
        console.debug("Unable to place token in check token columns");
    }
    return false
}

// returns index of token that is in correct position
function checkTokenColumns(positions, targetColumn) {
    let i;
    let tokenInTargetColumn = false;
    for (i = 0; i < GLOBAL_VARS.numOfLegendTokens; i++) {
        if (positions[i].columnIndex === targetColumn) {
            tokenInTargetColumn = true;
        }
    }
    if (tokenInTargetColumn) {
        // if token is not the first one we have to check that the first one is farther up on the legend
        if (i === 0 || (positions[0].columnIndex > positions[1].columnIndex)) {
            return i;
        }
    }
    return false;
}

export function removeFirstUserLegendResource(boon, field, numOfPlayers) {
    if (numOfPlayers === 4 && field.effects4p) {
        field.effects4p.splice(field.effects4p.indexOf(boon), 1);
        console.log("Removed legend field effect for 4 players: " + boon);
    } else if (numOfPlayers === 3 && field.effects3p) {
        field.effects3p.splice(field.effects3p.indexOf(boon), 1);
        console.log("Removed legend field effect for 3 players: " + boon);
    } else if (numOfPlayers === 2 && field.effects2p) {
        field.effects2p.splice(field.effects2p.indexOf(boon), 1);
        console.log("Removed legend field effect for 2 players: " + boon);
    } else {
        field.effects.splice(field.effects.indexOf(boon), 1);
        console.log("Removed legend field effect for 4 players: " + boon);
    }
    return field;
}

// if there are three joint effects, everything has to be abstracted!
export function replaceFirsUserJointLegendResource(usedBoon, field, numOfPlayers) {
    const jointBoon = field.effects[0];
    const effects = getBoonReplacement(jointBoon, usedBoon);

    if (numOfPlayers === 4 && field.effects4p) {
        const index = field.effects4p.indexOf(jointBoon);
        field.effects4p.splice(index, 1, effects);
        console.log("Removed legend field effect for 4 players: " + usedBoon);
    } else if (numOfPlayers === 3 && field.effects3p) {
        const index = field.effects3p.indexOf(jointBoon);
        field.effects3p.splice(index, 1, effects);
        console.log("Removed legend field effect for 3 players: " + usedBoon);
    } else if (numOfPlayers === 2 && field.effects2p) {
        const index = field.effects2p.indexOf(jointBoon);
        field.effects2p.splice(index, 1, effects);
        console.log("Removed legend field effect for 2 players: " + usedBoon);
    } else {
        const index = field.effects.indexOf(jointBoon);
        field.effects.splice(index, 1, effects);
        console.log("Removed legend field effect for 1 player: " + usedBoon);
    }
    return field;
}

function getBoonReplacement(jointBoon, usedBoon) {
    if (jointBoon === EFFECT.gainExploreOrMapIfFirst) {
        if (usedBoon === EFFECT.gainExplore) {
            return EFFECT.gainMapIfFirst;
        } else if (usedBoon === EFFECT.gainMap) {
            return EFFECT.gainExploreIfFirst;
        } else {
            console.error("Could not process used effect: " + usedBoon);
        }
    } else if (jointBoon === EFFECT.gainCoinOrExploreIfFirst) {
        if (usedBoon === EFFECT.gainCoin) {
            return EFFECT.gainExploreIfFirst;
        } else if (usedBoon === EFFECT.gainExplore) {
            return EFFECT.gainCoinIfFirst;
        } else {
            console.error("Could not process used effect: " + usedBoon);
        }
    } else {
        console.error("Could not process joint effect: " + jointBoon);
    }
}

export function getLegendFieldBoons(field, numOfPlayers) {
    if (numOfPlayers === 4 && field.effects4p) {
        console.log("Returning legend field boons for 4 players: " + field.effects4p);
        return field.effects4p.effects;
    } else if (numOfPlayers === 3 && field.effects3p) {
        console.log("Returning legend field boons for 3 players: " + field.effects3p);
        return field.effects3p.effects;
    } else if (numOfPlayers === 2 && field.effects2p) {
        console.log("Returning legend field boons for 2 players: " + field.effects2p);
        return field.effects2p.effects;
    } else {
        console.log("Returning basic legend field boons: " + field.effects);
        return field.effects;
    }
}

export function getJointBoons(boon) {
    if (boon.includes(EFFECT.gainExploreOrMapIfFirst)) {
        return [{effects: EFFECT.gainExplore, effectsText: <Explore/>}, {effects: EFFECT.gainMap, effectsText: <Map/>}];
    } else if (boon.includes(EFFECT.gainCoinOrExploreIfFirst)) {
        return [{effects: EFFECT.gainCoin, effectsText: <Coin/>}, {
            effects: EFFECT.gainExplore,
            effectsText: <Explore/>
        }];
    } else {
        console.log("Unable to process joint boons: " + boon);
    }
}