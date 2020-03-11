import {EFFECT} from "../../data/effects";
import {
    addCardToDiscardDeck,
    addCardToHand,
    addCardToStore,
    destroyCard, drawCards,
    shuffleArray
} from "./CardManipulationFuntions";
import {CARD_STATE, CARD_TYPE} from "../../data/cards";
import {LOCATION_STATE} from "../../data/locations";
import {processEffects} from "./processEffects";
import {payForTravelIfPossible} from "../locations/checkTravelCostAndPayForTravel";

export function processActiveEffect(tCard, cardIndex, tLocation, tPlayerState, tActiveEffects, tStore, tLocations) {
    console.log(tActiveEffects);
    if (tActiveEffects[0] === EFFECT.useYourLocation
        || tActiveEffects[0] === EFFECT.useEmptyLocation || tActiveEffects[0] === EFFECT.useOpponentsLocation) {
        // todo locations - probably do nothing
    } else {
        console.log("Resolving active effect: " + tActiveEffects[0]);
        switch (tActiveEffects[0]) {

            case EFFECT.discard:
                if (tCard.state === CARD_STATE.inHand) {
                    tPlayerState = addCardToDiscardDeck(tCard, tPlayerState);
                    tPlayerState.hand.splice(cardIndex, 1);
                }
                break;

            case EFFECT.discardFor2Cards:
                if (tCard.state === CARD_STATE.inHand) {
                    tPlayerState = addCardToDiscardDeck(tCard, tPlayerState);
                    tPlayerState.hand.splice(cardIndex, 1);
                    drawCards(2, tPlayerState);
                }
                break;

                case EFFECT.discardFor2Jewels:
                if (tCard.state === CARD_STATE.inHand) {
                    tPlayerState = addCardToDiscardDeck(tCard, tPlayerState);
                    tPlayerState.hand.splice(cardIndex, 1);
                    tPlayerState.resources.jewels += 2;
                }
                break;

            case EFFECT.defeatGuardian:
                if (tCard.type === CARD_TYPE.guardian) {
                    tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                    //todo guardian: defeat effect should be implemented here
                }
                break;

            case EFFECT.destroyGuardian:
                if (tCard !== null && tCard.type === CARD_TYPE.guardian) {
                    tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                    //todo guardian: defeat effect should be implemented here
                }
                break;

            case EFFECT.destroyCard:
                tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                tCard.state = CARD_STATE.destroyed;
                tPlayerState.destroyedCards.push(tCard);
                tActiveEffects.splice(0, 1);
                break;

            case EFFECT.drawFromDiscard:
                tPlayerState = addCardToHand(tCard, tPlayerState);
                tPlayerState.discardDeck.splice(cardIndex, 1);
                tActiveEffects.splice(0, 1);
                break;

            case EFFECT.drawFromDrawDeck:
                if (tCard.state === CARD_STATE.inHand) {
                    /* we have the actual hand stored in active effects */
                    tPlayerState.hand = tActiveEffects[1];
                    tPlayerState.drawDeck = shuffleArray(tPlayerState.drawDeck);
                    tPlayerState.hand.push(tCard);
                    tActiveEffects.splice(0, 2);
                    tPlayerState.drawDeck = tPlayerState.drawDeck.filter(card => card.name !== tCard.name);
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
                        const effectsResult = processEffects(null, tPlayerState, tLocation.effects, tActiveEffects, tStore, tLocations)
                        tPlayerState = effectsResult.tPlayerState;
                        tLocations = effectsResult.tLocations;
                        tActiveEffects = effectsResult.tActiveEffects;
                        tStore = effectsResult.tStore;
                    }
                }
                break;
            case EFFECT.useItemOnMarket:
                console.log("here");
                if (tCard.type === CARD_TYPE.item && tCard.state === CARD_STATE.inStore) {
                    const effectsResult = processEffects(tCard, tPlayerState, tCard.effects, null, null, null);
                    tPlayerState = effectsResult.tPlayerState;
                    tActiveEffects.splice(0, 1);
                    /* when the effect is processed, the card is marked as active, which is wrong*/
                    tCard.state = CARD_STATE.inStore;
                }
                break;
            case EFFECT.useArtifactOnMarket:
                if (tCard.type === CARD_TYPE.artifact && tCard.state === CARD_STATE.inStore) {
                    const effectsResult = processEffects(tCard, tPlayerState, tCard.effects, null, null, null);
                    tPlayerState = effectsResult.tPlayerState;
                    tActiveEffects.splice(0, 1);
                    /* when the effect is processed, the card is marked as active, which is wrong*/
                    tCard.state = CARD_STATE.inStore;
                }
                break;

            case EFFECT.payTouseOccupiedLocation:
                console.log("TLOCATION:");
                console.log(tLocation);
                if (tLocation.state === LOCATION_STATE.occupied && tPlayerState.resources.coins > 0) {
                    const effectsResult = processEffects(null, tPlayerState, tLocation.effects, tActiveEffects,
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
    }
    return {
        tPlayerState: tPlayerState,
        tActiveEffects: tActiveEffects,
        tLocation: tLocation,
        tLocations: tLocations,
        tStore: tStore
    };
}

