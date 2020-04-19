import {EFFECT} from "../../data/effects";

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