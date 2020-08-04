import {EFFECT} from "../../../data/effects";

export function getExplorationDiscount(discount, explorationCostEffects) {
    let tExplorationEffects = [];
    let exploreDiscount = 0;
    if (discount === EFFECT.exploreAnyLocationWithDiscount3) {
        exploreDiscount = 3;
    } else if (discount === EFFECT.exploreAnyLocationWithDiscount2) {
        exploreDiscount = 2;
    }
    // eslint-disable-next-line no-unused-vars
    let transportDiscount = 1;
    for (let effect of explorationCostEffects) {
        if (effect === EFFECT.loseExplore && exploreDiscount > 0) {
            exploreDiscount -= 1;
        } else if (transportDiscount > 0 && (effect === EFFECT.loseJeep || effect === EFFECT.loseShip)) {
            transportDiscount -= 1;
        } else {
            tExplorationEffects.push(effect);
        }
    }
    return tExplorationEffects;
}