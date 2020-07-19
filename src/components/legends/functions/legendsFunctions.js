import {EFFECT} from "../../../data/effects";
import {Coin, Explore, Map} from "../../Symbols";
import React from "react";
import {GLOBAL_VARS} from "../../../data/idLists";

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

// returns index of token that is in correct position
export function checkTokenColumns(positions, targetColumn) {
    let i;
    let tokenInTargetColumn = false;
    for (i = 0; i < GLOBAL_VARS.numOfLegendTokens; i++) {
        if (positions[i].columnIndex === targetColumn) {
            tokenInTargetColumn = true;
            break;
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

export function getBoonReplacement(jointBoon, usedBoon) {
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

// effects are now random and contained in one array = todo remove
/*export function getLegendFieldBoons(field, numOfPlayers) {
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
}*/

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