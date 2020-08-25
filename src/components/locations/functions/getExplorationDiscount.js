import {EFFECT} from "../../../data/effects";
import {processTravelDiscount} from "./payForTravelIfPossible";

export function getExplorationDiscount(discount, explorationCostEffects, playerState) {
    let tExplorationEffects = [];
    let exploreDiscount = 0;
    if (discount === EFFECT.exploreAnyLocationWithDiscount3) {
        exploreDiscount = 3;
    } else if (discount === EFFECT.exploreAnyLocationWithDiscount2) {
        exploreDiscount = 2;
    }

    // we check the effect and either just decrease discount counter or (if no discount is left for that effect type) we push it to new array
    for (let effect of explorationCostEffects) {
        if (effect === EFFECT.loseExplore && exploreDiscount > 0) {
            exploreDiscount -= 1;
        } else {
            tExplorationEffects.push(effect);
        }
    }

debugger
    // process travel discount
    if ([EFFECT.placeToBrownLocation, EFFECT.placeToGreenLocation, EFFECT.exploreAnyLocationWithDiscount3,
        EFFECT.placeToBasicLocationActivateTwice, EFFECT.exploreAnyLocationWithDiscount2].includes(playerState.activeEffects[0])) {
        tExplorationEffects = processTravelDiscount(tExplorationEffects, 1, playerState);
        playerState.activeEffects.splice(0, 1);
    } else if ([EFFECT.placeToBasicLocationDiscount2].includes(playerState.activeEffects[0])) {
        tExplorationEffects = processTravelDiscount(tExplorationEffects, 2, playerState);
        playerState.activeEffects.splice(0, 1);
    }

    return tExplorationEffects;
}