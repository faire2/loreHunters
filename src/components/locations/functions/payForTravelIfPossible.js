import {EFFECT} from "../../../data/effects";
import {LOCATION_TYPE} from "../../functions/enums";

export function payForTravelIfPossible(tPlayerState, location, effect) {
    const resources = tPlayerState.resources;
    let enoughResources = true;
    let failedEffect;

    // effect can either come from location or can be given directly
    let effects = effect ? [effect] : location.travelCost;

    // we pay extra transport for every other adventurer also deployed to this location
    for (let adventurer of location.adventurers) {
        effects = [...effects, ...effects];
    }

    // check for active effect with travel discount
    if ([EFFECT.placeToBrownLocation, EFFECT.placeToGreenLocation, EFFECT.exploreAnyLocationWithDiscount3,
        EFFECT.placeToBasicLocationActivateTwice, EFFECT.exploreAnyLocationWithDiscount2].includes(tPlayerState.activeEffects[0])) {
        effects = processTravelDiscount(effects, 1, tPlayerState);
        tPlayerState.activeEffects.splice(0, 1);
    } else if ([EFFECT.placeToBasicLocationDiscount2].includes(tPlayerState.activeEffects[0]) && location.type === LOCATION_TYPE.basic) {
        effects = processTravelDiscount(effects, 2, tPlayerState);
        tPlayerState.activeEffects.splice(0, 1);
    }

    if (tPlayerState.longEffects.includes(EFFECT.infinitePlanes)) {
        for (let i = 0; i < effects.length; i++) {
            effects.splice(i, 1, EFFECT.loseWalk);
        }
    }

    for (let effect of effects) {
        switch (effect) {
            case EFFECT.loseWalk:
                if (resources.walk > 0) {
                    resources.walk -= 1;
                    break;
                } else if (resources.jeep > 0 && resources.jeep > resources.ship) {
                    resources.jeep -= 1;
                } else if (resources.ship > 0) {
                    resources.ship -= 1;
                } else if (resources.plane > 0) {
                    resources.plane -= 1;
                } else {
                    enoughResources = false;
                    failedEffect = effect;
                }
                break;
            case EFFECT.loseJeep:
                if (resources.jeep > 0) {
                    resources.jeep -= 1;
                } else if (resources.plane > 0) {
                    resources.plane -= 1;
                } else {
                    enoughResources = false;
                    failedEffect = effect;
                }
                break;
            case EFFECT.loseShip:
                if (resources.ship > 0) {
                    resources.ship -= 1;
                } else if (resources.plane > 0) {
                    resources.plane -= 1;
                } else {
                    enoughResources = false;
                    failedEffect = effect;
                }
                break;
            case EFFECT.losePlane:
                if (resources.plane > 0) {
                    resources.plane -= 1;
                } else {
                    enoughResources = false;
                    failedEffect = effect;
                }
                break;
            default:
                console.log("Unknown transportation effect in payForTravelIfPossible: " + effect);
                console.log(location);
        }
    }

    // in case we have to allow player to activate the same location again
    if (tPlayerState.activeEffects[0] === EFFECT.placeToBasicLocationActivateTwice) {
        tPlayerState.activeEffects.push(EFFECT.activateThisLocationAgain);
        tPlayerState.activeEffects.push(location.id);
    }


    console.log("**Travel check - has enough resources for travel? " + enoughResources);
    return {enoughResources: enoughResources, tPlayerState: tPlayerState, failedEffect: failedEffect};
}

export function processTravelDiscount(effects, discount, tPlayerState) {
    // check if all effects are same
    let firstEffect = effects[0];
    let areAllEffectsSame = true;
    for (let effect of effects) {
        if (effect !== firstEffect && effect !== EFFECT.loseExplore) {
            areAllEffectsSame = false;
            break;
        }
    }

    if (areAllEffectsSame) {
        for (let i = 0; i < discount; i++) {
            if (effects.length > 0) {
                effects.splice(0, 1);
            } else {
                return [];
            }
        }
        return effects;
    } else {
        for (let i = 0; i < discount; i++) {
            // create array of different effects
            let differentEffects = [];
            for (let effect of effects) {
                if (!differentEffects.includes(effect) && effect !== EFFECT.loseExplore) {
                    differentEffects.push(effect);
                }
            }

            if (effects.length > 0) {
                // create array of how much different resources player has
                let differentEffectsResources = [];
                for (let i = 0; i < differentEffects.length; i++) {
                    switch (differentEffects[i]) {
                        case EFFECT.loseWalk:
                            differentEffectsResources.push(tPlayerState.resources.walk);
                            break;
                        case EFFECT.loseJeep:
                            differentEffectsResources.push(tPlayerState.resources.jeep);
                            break;
                        case EFFECT.loseShip:
                            differentEffectsResources.push(tPlayerState.resources.ship);
                            break;
                        case EFFECT.losePlane:
                            differentEffectsResources.push(tPlayerState.resources.plane);
                            break;
                        default:
                            console.error("Unable to recognize travel type effect in payForTravelIfPossible: " + differentEffects[i]);
                    }
                }

                // determine which resource number is lowest
                const minResourceNumber = Math.min(...differentEffectsResources);

                // find first such a number (loseWalk should be first effect in the array)
                const resourceIndex = differentEffectsResources.indexOf(minResourceNumber);

                // get the effect we want to remove
                const effectToRemove = differentEffects[resourceIndex];

                // and remove it
                const effectIndex = effects.indexOf(effectToRemove);
                effects.splice(effectIndex, 1);
            } else {
                return [];
            }
        }
        return effects;
    }
}