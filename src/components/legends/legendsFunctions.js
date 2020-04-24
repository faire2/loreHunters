import {EFFECT} from "../../data/effects";
import {FIELD_SIZE, Legends2} from "../../data/legends2";
import {processEffects} from "../functions/processEffects";
import {cloneElement} from "react";
import {cloneDeep} from "lodash";

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

export function getIsRewardDue(columnIndex, positions) {
    if (columnIndex === 0) {
        for (let position of positions) {
            if (position.columnIndex === null) {
                return false
            }
        }
    } else {
        for (let position of positions) {
            if (position.columnIndex < columnIndex || position.columnIndex === null) {
                return false
            }
        }
    }
    return true
}

export function processLegend(legends, legendIndex, columnIndex, fieldIndex, boons, playerState, store, locations) {
    const jsxLegend = Legends2[legends[legendIndex].id]
    const field = jsxLegend.fields[columnIndex][fieldIndex];

    const playerIndex = playerState.playerIndex;
    const positions = legends[legendIndex].positions[playerIndex];
    const previousColumnIndex = columnIndex - 1;
    let canPlaceToken = false;
    const prevPositions = [];

    // if first column was clicked we check if the player has any null column position
    if (columnIndex === 0) {
        for (let position of positions) {
            if (position.columnIndex === null) {
                canPlaceToken = true;
                break;
            }
        }
        // if not we check if player has any token in previous column
    } else if (positions[0].columnIndex === columnIndex - 1 || positions[1].columnIndex === columnIndex - 1) {
        const previousColumn = jsxLegend.fields[columnIndex - 1];

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
        console.log(prevPositions);

        if (field.size === 1) {
            for (let position of positions) {
                if (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex]) {
                    canPlaceToken = true;
                    break;
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
    if (canPlaceToken) {
        const activeEffect = playerState.activeEffects[0];
        const tPlayerState = cloneDeep(playerState);
        let cost = [...jsxLegend.fields[columnIndex][fieldIndex].cost];
        let effects = [...cost, ...boons]
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
                            case FIELD_SIZE["2"]:
                                if (position.fieldIndex === prevPositions[fieldIndex] + 1) {
                                    correctToken = true
                                }
                            case FIELD_SIZE["1"]:
                                if (position.fieldIndex === prevPositions[fieldIndex]) {
                                    correctToken = true
                                }
                                break
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
            legends[legendIndex].positions[playerIndex] = positions;
            effectsResult.tPlayerState.actions = effectsResult.tPlayerState.actions -= 1;
            return {tPlayerState: effectsResult.tPlayerState, tLegends: legends, tStore: store, tLocations: locations, positions: positions}
        }
    }
    return false
}