import React from 'react';
import {EFFECT} from "../../data/effects.mjs";
import {addCardToDiscardDeck, addCardToHand, removeCard} from "./cardManipulationFuntions.mjs";
import {processEffects} from "./processEffects.mjs";
import {processCardBuy} from "./processCardBuy";
import {GUARDIAN_IDs, LOCATION_IDs} from "../../data/idLists";
import {
    areLinesAdjacent,
    getLocationIndex,
    isLocationAdjancentToAdventurer,
    resolveRelocation
} from "../locations/locationFunctions";
import {Jewel, Text, Weapon} from "../Symbols";
import {gainLockedResourceBack} from "./processEffects";
import {CARD_STATE, CARD_TYPE, LOCATION_LEVEL, LOCATION_LINE, LOCATION_STATE, REWARD_TYPE} from "./enums";

export function processActiveEffect(tCard, cardIndex, tLocation, tPlayerState, toBeRemoved, tStore, tLocations, initiateRewardsModal) {
    const activeEffect = tPlayerState.activeEffects[0];
    let processGuardian = false;
    console.debug("Processing active effects: ");
    console.debug(tPlayerState.activeEffects);
    switch (activeEffect) {
        /* When active effect deals with card in store */
        // todo gain artifact allows to buy multiple artifacts
        case EFFECT.buyItemWithDiscount3:
        case EFFECT.buyWithDiscount1:
        case EFFECT.gainItem:
        case EFFECT.gainItemToHand:
        case EFFECT.gainArtifact:
        case EFFECT.gainArtifactForExplore:
        case EFFECT.revealArtifactBuyWithDiscount:
        case EFFECT.revealItemBuyWithDiscount2:
            const buyResults = processCardBuy(tCard, cardIndex, tPlayerState, tPlayerState.activeEffects, tStore, tLocations);
            tPlayerState = buyResults.tPlayerState;
            tStore = buyResults.tStore;
            tPlayerState.activeEffects = buyResults.tPlayerState.activeEffects;
            processGuardian = buyResults.processGuardian;
            break;

        case EFFECT.activateOccupiedLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.occupied
                && (tLocation.level !== LOCATION_LEVEL["3"] || tPlayerState.resources.coins > 0)) {
                let effects = tLocation.effects;
                if (LOCATION_IDs[tLocation.id].level === LOCATION_LEVEL["3"]) {
                    effects.push(EFFECT.loseCoin)
                }
                const effectsResult = processEffects(null, null, tPlayerState, effects, null, tStore, null, tLocations, null)
                tPlayerState = effectsResult.tPlayerState;
                tPlayerState.activeEffects.splice(0, 1);
            }
            break;

        case EFFECT.activateYourLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.occupied && tLocation.owner === tPlayerState.playerIndex) {
                const effectsResult = processEffects(null, null, tPlayerState, tLocation.effects, null,
                    tStore, tLocation, tLocations, null);
                tPlayerState = effectsResult.tPlayerState;
                tLocations = effectsResult.tLocations;
                tPlayerState.activeEffects = effectsResult.tPlayerState.activeEffects;
                tStore = effectsResult.tStore;
                tPlayerState.activeEffects.splice(0, 1);
            }
            break;
        case EFFECT.activateAdjacentLocation:
            if (tLocation && tLocation.level !== LOCATION_LEVEL["3"] && isLocationAdjancentToAdventurer(tLocation, tLocation.line, tLocations, tPlayerState)) {
                const effectsResult = processEffects(null, null, tPlayerState, tLocation.effects, null,
                    tStore, tLocation, tLocations, null);
                tPlayerState = effectsResult.tPlayerState;
                tLocations = effectsResult.tLocations;
                tPlayerState.activeEffects = effectsResult.tPlayerState.activeEffects;
                tStore = effectsResult.tStore;
                tPlayerState.activeEffects.splice(0, 1);
            }
            break;

        case EFFECT.activateEmptyL1Location:
            if (tLocation && tLocation.level === LOCATION_LEVEL["1"] && tLocation.state === "explored") {
                const effectsResult = processEffects(null, null, tPlayerState, tLocation.effects, null,
                    tStore, tLocation, tLocations, null);
                tPlayerState = effectsResult.tPlayerState;
                tLocations = effectsResult.tLocations;
                tPlayerState.activeEffects = effectsResult.tPlayerState.activeEffects;
                tStore = effectsResult.tStore;
                tPlayerState.activeEffects.splice(0, 1);
            }
            break;

        case EFFECT.discard:
            if (tCard && tCard.state === CARD_STATE.inHand) {
                tPlayerState = addCardToDiscardDeck(tCard, tPlayerState);
                tPlayerState.hand.splice(cardIndex, 1);
                const effectsResults = processEffects(null, null, tPlayerState, tPlayerState.activeEffects[1], tPlayerState.activeEffects, tStore, null, null);
                tPlayerState = effectsResults.tPlayerState;
                tPlayerState.activeEffects = [];
            }
            break;

        case EFFECT.defeatGuardian:
            if (tCard !== null && tCard.type === CARD_TYPE.guardian) {
                tPlayerState.victoryCards.push(GUARDIAN_IDs[tCard.id]);
                tPlayerState.victoryCards[tPlayerState.victoryCards.length - 1].state = CARD_STATE.victoryCards;
                tPlayerState = removeCard(tCard, tPlayerState);
                if (tCard.state === CARD_STATE.active) {
                    let lockEffects = gainLockedResourceBack(tCard.locked, []);
                    const effectsResult = processEffects(tCard, cardIndex, tPlayerState, lockEffects,
                        null, tStore, null, null, null);
                    tPlayerState = effectsResult.tPlayerState;
                    tStore = effectsResult.tStore;
                }
                tPlayerState.activeEffects.splice(0, 1);
            }
            break;

        case EFFECT.destroyCard:
            if (tCard !== null && (tCard.state === CARD_STATE.inHand || tCard.state === CARD_STATE.discard
                || tCard.state === CARD_STATE.active) && tCard.type !== CARD_TYPE.guardian) {
                tPlayerState = removeCard(tCard, tPlayerState);
                tCard.state = CARD_STATE.destroyed;
                tPlayerState.destroyedCards.push(tCard);
                const effectsResults = processEffects(null, null, tPlayerState, tPlayerState.activeEffects[1], tPlayerState.activeEffects, tStore, null, null);
                tPlayerState = effectsResults.tPlayerState;
                tPlayerState.activeEffects.splice(0, 2);
                break;
            }
            break;

        case EFFECT.drawFromDiscard:
            tPlayerState = addCardToHand(tCard, tPlayerState);
            tPlayerState.discardDeck.splice(cardIndex, 1);
            tPlayerState.activeEffects.splice(0, 1);
            break;

        case EFFECT.exploreAnyLocationWithDiscount3:
        case EFFECT.exploreAnyLocationWithDiscount4:
            // effect is processed in location exploration
            break;

        case EFFECT.gainCoinsAndJewelForGuardianVP:
            if (tCard !== null && tCard.type === CARD_TYPE.guardian) {
                /* we have the actual hand stored in active effects */
                const effectsArray = [EFFECT.gainJewel];
                // cost stores VP for guardians until they are defeated
                for (let i = 0; i < tCard.cost; i++) {
                    effectsArray.push(EFFECT.gainCoin);
                }
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, effectsArray, null,
                    null, null, null, null);
                tPlayerState = effectsResult.tPlayerState;
                tPlayerState.hand = tPlayerState.activeEffects[1];
                tPlayerState.activeEffects.splice(0, 2);
            }
            break;

        case EFFECT.gainDiscoveryBonus:
            if (tCard !== null && tCard.type === CARD_TYPE.guardian) {
                /* we have the actual hand stored in active effects */
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, tCard.discoveryEffect, null,
                    null, null, null, null);
                tPlayerState = effectsResult.tPlayerState;
                tPlayerState.hand = tPlayerState.activeEffects[1];
                tPlayerState.activeEffects.splice(0, 2);
            }
            break;

        case EFFECT.gainResourceFromAdjacentLocation:
            if (tLocation.state === LOCATION_STATE.explored) {
                if (isLocationAdjancentToAdventurer(tLocation, tLocation.line, tLocations, tPlayerState)) {
                    const rewards = [];
                    for (let effect of tLocation.effects) {
                        let alreadyPresent = false;
                        for (let i = 0; i < rewards.length; i++) {
                            if (rewards[i].effects[0] === effect) {
                                alreadyPresent = true;
                                break;
                            }
                        }

                        if (!alreadyPresent) {
                            switch (effect) {
                                case EFFECT.gainText:
                                    rewards.push({effects: [EFFECT.gainText], effectsText: <Text/>});
                                    break;
                                case EFFECT.gainWeapon:
                                    rewards.push({effects: [EFFECT.gainWeapon], effectsText: <Weapon/>});
                                    break;
                                case EFFECT.gainJewel:
                                    rewards.push({effects: [EFFECT.gainJewel], effectsText: <Jewel/>});
                                    break;
                                default: // do nothing
                            }
                        }
                    }
                    tPlayerState.activeEffects.splice(0, 1);
                    initiateRewardsModal([{type: REWARD_TYPE.effectsArr, data: rewards}]);
                }
            }
            break;

        case EFFECT.return:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.occupied) {
                tPlayerState.availableAdventurers += 1;
                tLocation.state = LOCATION_STATE.explored;
                tPlayerState.activeEffects.splice(0, 1);
                if (tPlayerState.activeEffects[0] === EFFECT.moveAdvToEmptyLocation) {
                    /* we have to remember the original location - it may not be used for deploy */
                    tPlayerState.activeEffects.splice(1, 0, tLocation);
                }
            }
            break;

        case EFFECT.markOwnLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.occupied) {
                tPlayerState.activeEffects.splice(2, 0, tLocation);
                tPlayerState.activeEffects.splice(0, 1);
            }
            break;

        case EFFECT.moveAdvToEmptyAdjacentLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.explored && tLocation.level !== LOCATION_LEVEL["3"]) {
                let isAdjacent = false;
                const firstLine = tPlayerState.activeEffects[1].firstLocationLine;
                const firstIndex = tPlayerState.activeEffects[1].firstLocationIndex;
                const secondLine = tLocation.line;
                let secondIndex = getLocationIndex(tLocations[secondLine], tLocation.id);
                // both locations are in same line
                if (firstLine === tLocation.line) {
                    if (Math.abs(firstIndex - secondIndex) === 1) {
                        isAdjacent = true;
                    }
                    // check that locations are in adjacent lines
                } else if (areLinesAdjacent(firstLine, secondLine)) {
                    const difference = firstIndex - secondIndex;
                    if (firstLine === LOCATION_LINE.line1 || firstLine === LOCATION_LINE.line3) {
                        if (difference === 1 || difference === 0) {
                            isAdjacent = true;
                        }
                    } else if (firstLine === LOCATION_LINE.line2 || firstLine === LOCATION_LINE.line4) {
                        if (difference === -1 || difference === 0) {
                            isAdjacent = true
                        }
                    }
                }
                if (isAdjacent) {
                    tPlayerState.activeEffects.splice(0, 2);
                    const result = resolveRelocation(secondLine, secondIndex, tPlayerState, tLocations, tStore);
                    tPlayerState = result.playerState;
                    tLocations = result.locations;
                    tStore = result.store;
                }

            }
            break;

        case EFFECT.progressWithJewel:
            break;

        /* checks if the clicked location is not the same as the location from which the adv. was removed earlier */
        case EFFECT.moveAdvToEmptyLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.explored && tLocation.id !== tPlayerState.activeEffects[1]
                && tLocation.level !== LOCATION_LEVEL["3"]) {
                /* we have to remove original location id from the activeAffects array */
                tPlayerState.activeEffects.splice(0, 2);
                let line = tLocation.line;
                let locationIndex = getLocationIndex(tLocations[line], tLocation.id);
                const result = resolveRelocation(line, locationIndex, tPlayerState, tLocations, tStore)
                tPlayerState = result.playerState;
                tLocations = result.locations;
                tStore = result.store;
            }
            break;


        case EFFECT.useAdjacentEmptyLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.explored && tLocation.index !== tPlayerState.activeEffects[1].index) {
                /* we have to remove original location from the activeAffects array */
                tPlayerState.activeEffects.splice(0, 2);
                const effectsResult = processEffects(null, null, tPlayerState, tLocation.effects,
                    tPlayerState.activeEffects, tStore, tLocations)
                tPlayerState = effectsResult.tPlayerState;
                tLocations = effectsResult.tLocations;
                tPlayerState.activeEffects = effectsResult.tActiveEffects;
                tStore = effectsResult.tStore;
            }
            break;

        case EFFECT.removeAdventurer:
            if (tLocation !== null && tLocation.owner === tPlayerState.playerIndex) {
                let locationToChange;
                for (let checkedLocation of tLocations[tLocation.line]) {
                    if (checkedLocation.id === tLocation.id) {
                        locationToChange = checkedLocation;
                    }
                }
                locationToChange.state = LOCATION_STATE.explored;
                locationToChange.owner = null;
                tPlayerState.activeEffects.splice(0, 1);
                if (tPlayerState.activeEffects[0] === EFFECT.moveAdvToEmptyAdjacentLocation) {
                    // we store the location to check for adjacency later
                    let firstLocationLine = locationToChange.line;
                    let firstLocationIndex = tLocations[firstLocationLine].indexOf(locationToChange);
                    tPlayerState.activeEffects.splice(1, 0, {
                        firstLocationLine: firstLocationLine,
                        firstLocationIndex: firstLocationIndex
                    })
                } else if (tPlayerState.activeEffects[0] === EFFECT.moveAdvToEmptyLocation) {
                    // we store the location id to check for identity later
                    tPlayerState.activeEffects.splice(1, 0, tLocation.id);
                }
            }
            break;


        case EFFECT.useItemOnMarket:
            console.log("HERE");
            if (tCard.type === CARD_TYPE.item && tCard.state === CARD_STATE.inStore) {
                console.log("HERE2");
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, tCard.effects, null, null, null);
                tPlayerState = effectsResult.tPlayerState;
                tPlayerState.activeEffects.splice(0, 1);
                /* when the effect was processed, the card state was changed to active, which is wrong*/
                tCard.state = CARD_STATE.inStore;
            }
            break;

        case EFFECT.useArtifactOnMarket:
            if (tCard.type === CARD_TYPE.artifact && tCard.state === CARD_STATE.inStore) {
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, tCard.effects, tPlayerState.activeEffects, null, null);
                tPlayerState = effectsResult.tPlayerState;
                tPlayerState.activeEffects.splice(0, 1);
                /* when the effect was processed, the card was marked as active, which is wrong*/
                tCard.state = CARD_STATE.inStore;
            }
            break;

        case EFFECT.payToUseOccupiedLocation:
            if (tLocation.state === LOCATION_STATE.occupied && tPlayerState.resources.coins > 0) {
                const effectsResult = processEffects(null, cardIndex, tPlayerState, tLocation.effects, tPlayerState.activeEffects,
                    tStore, tLocation, tLocations);
                tPlayerState = effectsResult.tPlayerState;
                tPlayerState.activeEffects = effectsResult.tPlayerState.activeEffects;
                tStore = effectsResult.tStore;
                tLocations = effectsResult.tLocations;
                tPlayerState.activeEffects.splice(0, 1);
                tPlayerState.resources.coins -= 1;
            }
            break;

        default:
            console.log("Cannot process active effect " + tPlayerState.activeEffects[0] + " on card: " + tCard.cardName
                + " with state " + tCard.state);
    }
    return {
        tPlayerState: tPlayerState,
        tLocations: tLocations,
        tStore: tStore,
        processGuardian: processGuardian,
    }
}
