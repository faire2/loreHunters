import React from 'react';
import {EFFECT} from "../../data/effects.mjs";
import {addCardToDiscardDeck, addCardToHand, destroyCard, getIdCard} from "./cardManipulationFuntions.mjs";
import {processEffects} from "./processEffects.mjs";
import {processCardBuy} from "./processCardBuy";
import {payForTravelIfPossible} from "../locations/locationFunctions.mjs";
import {CARD_STATE, CARD_TYPE, LOCATION_IDs, LOCATION_STATE} from "../../data/idLists";
import {shuffleArray} from "./initialStateFunctions";
import {isLocationAdjancentToAdventurer} from "../locations/locationFunctions";
import {Coin, Explore, Jewel, Text, Weapon} from "../Symbols";

export function processActiveEffect(tCard, cardIndex, tLocation, tPlayerState, toBeRemoved, tStore, tLocations, setRewardsModal) {
    let tActiveEffects = tPlayerState.activeEffects;
    console.log(tActiveEffects);
    console.log("Resolving active effect: " + tActiveEffects[0]);
    switch (tActiveEffects[0]) {

        /* When active effect deals with card in store */
        // todo gain artifact allows to buy multiple artifacts
        case EFFECT.buyItemWithDiscount3:
        case EFFECT.gainItem:
        case EFFECT.gainItemToHand:
        case EFFECT.gainArtifact:
        case EFFECT.gainArtifactForExplore:
        case EFFECT.revealArtifactBuyWithDiscount2:
        case EFFECT.revealItemBuyWithDiscount2:
            const buyResults = processCardBuy(tCard, cardIndex, tPlayerState, tActiveEffects, tStore, tLocations);
            tPlayerState = buyResults.tPlayerState;
            tStore = buyResults.tStore;
            tActiveEffects = buyResults.tActiveEffects;
            break;

        case EFFECT.discard:
            if (tCard.state === CARD_STATE.inHand) {
                tPlayerState = addCardToDiscardDeck(tCard, tPlayerState);
                tPlayerState.hand.splice(cardIndex, 1);
                const effectsResults = processEffects(null, null, tPlayerState, tActiveEffects[1], tActiveEffects, tStore, null, null);
                tActiveEffects.splice(0, 2);
                tPlayerState = effectsResults.tPlayerState;
            }
            break;

        case EFFECT.defeatGuardian:
            if (tCard.type === CARD_TYPE.guardian) {
                tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                //todo guardian: defeat effect should be implemented here
            }
            break;

        //todo - didn't work properly with card in discard pile
        case EFFECT.destroyCard:
            if (tCard !== null) {
                tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                tCard.state = CARD_STATE.destroyed;
                tPlayerState.destroyedCards.push(tCard);
                tActiveEffects.splice(0, 1);
                break;
            }
            break;

        case EFFECT.destroyGuardian:
            if (tCard !== null && tCard.type === CARD_TYPE.guardian) {
                tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                //todo guardian: defeat effect should be implemented here
            }
            break;

        case EFFECT.drawFromDiscard:
            tPlayerState = addCardToHand(tCard, tPlayerState);
            tPlayerState.discardDeck.splice(cardIndex, 1);
            tActiveEffects.splice(0, 1);
            break;

        case EFFECT.drawFromDrawDeck:
            if (tCard.state === CARD_STATE.drawDeck) {
                console.log("HERE");
                /* we have the actual hand stored in active effects */
                tPlayerState.hand = tActiveEffects[1];
                tPlayerState.drawDeck = shuffleArray(tPlayerState.drawDeck);
                tCard.state = CARD_STATE.inHand;
                tPlayerState.hand.push(getIdCard(tCard));
                tActiveEffects.splice(0, 2);
                for (let i = 0; i < tPlayerState.drawDeck.length; i++) {
                    if (tPlayerState.drawDeck[i].id === tCard.id) {
                        tPlayerState.drawDeck.splice(i, 1);
                    }
                }
                /*tPlayerState.drawDeck = tPlayerState.drawDeck;*/
            }
            break;

        case EFFECT.exploreLocationWithDiscount2:
            if (tLocation !== null) {
                // todo location implement
            }
            break;

        case EFFECT.gainResourceFromAdjacent:
            if (tLocation.state === LOCATION_STATE.explored) {
                const isAdjacent = isLocationAdjancentToAdventurer(tLocation, tLocation.line, tLocations, tPlayerState);
                if (isAdjacent) {
                    const rewards = [];
                    for (let effect of tLocation.effects) {
                        debugger;
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
                    tActiveEffects.splice(0, 1);
                    setRewardsModal(rewards);
                }
            }
            break;

        /* checks if the clicked location is not the same as the location from which the adv. was removed earlier */
        case EFFECT.moveAdvToEmptyLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.explored && tLocation.index !== tActiveEffects[1].index) {
                const travelCheckResults = payForTravelIfPossible(tPlayerState, tLocation);
                if (travelCheckResults.enoughResources) {
                    tPlayerState = travelCheckResults.tPlayerState;
                    tPlayerState.availableAdventurers -= 1;
                    tLocation.state = LOCATION_STATE.occupied;
                    /* we have to remove original location from the activeAffects array */
                    tActiveEffects.splice(0, 2);
                    const effectsResult = processEffects(null, cardIndex, tPlayerState, tLocation.effects, tActiveEffects, tStore, tLocations)
                    tPlayerState = effectsResult.tPlayerState;
                    tLocations = effectsResult.tLocations;
                    tActiveEffects = effectsResult.tActiveEffects;
                    tStore = effectsResult.tStore;
                }
            }
            break;

        case EFFECT.return:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.occupied) {
                tPlayerState.availableAdventurers += 1;
                tLocation.state = LOCATION_STATE.explored;
                tActiveEffects.splice(0, 1);
                if (tActiveEffects[0] === EFFECT.moveAdvToEmptyLocation) {
                    /* we have to remember the original location - it may not be used for deploy */
                    tActiveEffects.splice(1, 0, tLocation);
                }
            }
            break;

        case EFFECT.markOwnLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.occupied) {
                tActiveEffects.splice(2, 0, tLocation);
                tActiveEffects.splice(0, 1);
            }
            break;

        case EFFECT.useAdjacentEmptyLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.explored && tLocation.index !== tActiveEffects[1].index) {
                /* we have to remove original location from the activeAffects array */
                tActiveEffects.splice(0, 2);
                const effectsResult = processEffects(null, null, tPlayerState, tLocation.effects,
                    tActiveEffects, tStore, tLocations)
                tPlayerState = effectsResult.tPlayerState;
                tLocations = effectsResult.tLocations;
                tActiveEffects = effectsResult.tActiveEffects;
                tStore = effectsResult.tStore;
            }
            break;

        case EFFECT.useYourLocation:
            if (tLocation !== null && tLocation.state === LOCATION_STATE.occupied) {
                const effectsResult = processEffects(null, null, tPlayerState, tLocation.effects,
                    tActiveEffects, tStore, tLocations)
                tPlayerState = effectsResult.tPlayerState;
                tLocations = effectsResult.tLocations;
                tActiveEffects = effectsResult.tActiveEffects;
                tStore = effectsResult.tStore;
                tActiveEffects.splice(0, 1);
            }
            break;

        case EFFECT.useItemOnMarket:
            console.log("HERE");
            if (tCard.type === CARD_TYPE.item && tCard.state === CARD_STATE.inStore) {
                console.log("HERE2");
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, tCard.effects, null, null, null);
                tPlayerState = effectsResult.tPlayerState;
                tActiveEffects.splice(0, 1);
                /* when the effect was processed, the card state was changed to active, which is wrong*/
                tCard.state = CARD_STATE.inStore;
            }
            break;

        case EFFECT.useArtifactOnMarket:
            if (tCard.type === CARD_TYPE.artifact && tCard.state === CARD_STATE.inStore) {
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, tCard.effects, tActiveEffects, null, null);
                tPlayerState = effectsResult.tPlayerState;
                tActiveEffects.splice(0, 1);
                /* when the effect is processed, the card is marked as active, which is wrong*/
                tCard.state = CARD_STATE.inStore;
            }
            break;

        case EFFECT.payTouseOccupiedLocation:
            if (tLocation.state === LOCATION_STATE.occupied && tPlayerState.resources.coins > 0) {
                const effectsResult = processEffects(null, cardIndex, tPlayerState, tLocation.effects, tActiveEffects,
                    tStore, tLocation, tLocations);
                tPlayerState = effectsResult.tPlayerState;
                tActiveEffects = effectsResult.tActiveEffects;
                tStore = effectsResult.tStore;
                tLocations = effectsResult.tLocations;
                tActiveEffects.splice(0, 1);
                tPlayerState.resources.coins -= 1;
            }
            break;

        default:
            console.log("Cannot process active effect " + tActiveEffects[0] + " on card: " + tCard.cardName
                + " with state " + tCard.state);
    }

    return {
        tPlayerState: tPlayerState,
        tLocations: tLocations,
        tStore: tStore
    }
}
