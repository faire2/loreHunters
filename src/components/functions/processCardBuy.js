import {EFFECT} from "../../data/effects";
import {CARD_STATE, CARD_TYPE} from "../../data/cards";
import {addCardToStore} from "./CardManipulationFuntions";
import {processEffects} from "./processEffects";

export function processCardBuy(card, cardIndex, tPlayerState, toBeRemoved, tStore, tLocations) {
    const activeEffect = tPlayerState.activeEffects[0];
    const tActiveEffects = tPlayerState.activeEffects;

    /* Fishing Rod discount effect */
    if (activeEffect === EFFECT.revealItemBuyWithDiscount2) {
        card.cost = card.cost  >= 2 ? card.cost - 2 : 0;
    }
    
    /* Amulet of Charm effect */
    if (activeEffect === EFFECT.buyItemWithDiscount3) {
        card.cost = card.cost >= 3  ? card.cost - 3 : 0;
    }

    /* Compass effect */
    if (activeEffect === EFFECT.revealArtifactBuyWithDiscount2) {
        card.cost = card.cost >= 2 ? card.cost - 2 : 0;
    }

    /* Bag effect */
    if (activeEffect === EFFECT.gainItemToHand && card.type === CARD_TYPE.item) {
        card.cost = 0;
    }

    /* Whip effect */
    if (activeEffect === EFFECT.gainArtifact && card.type === CARD_TYPE.artifact) {
        card.cost = 0;
    }

    /* we check that we can buy the item */
    if (card.type === CARD_TYPE.item && card.cost <= tPlayerState.resources.coins) {

        /* if we revealed extra item and it was not bought we must discard it */
        if ((activeEffect === EFFECT.revealItemBuyWithDiscount2 || activeEffect === EFFECT.revealArtifactBuyWithDiscount2)
            && cardIndex !== tStore.offer.length + 1) {
            tStore.itemsOffer.splice(tStore.offer.length - 1);
        }

        /* we remove bought card and replace it with next from the store deck */
        tStore.itemsOffer.splice(cardIndex, 1);
        tStore = addCardToStore(card.type, tStore);

        /* we pay the cost and add the card to discard deck or to hand */
        card.state = CARD_STATE.discard;
        if (activeEffect === EFFECT.gainItemToHand) {
            tPlayerState.hand.push(card);
        } else {
            tPlayerState.discardDeck.push(card);
        }

        tPlayerState.resources.coins -= card.cost;
        tPlayerState.actions -= 1;
    } else if (card.type === CARD_TYPE.artifact && card.cost <= tPlayerState.resources.explore) {
        tStore.artifactsOffer.splice(cardIndex, 1);
        tStore = addCardToStore(card.type, tStore);
        card.state = CARD_STATE.discard;
        tPlayerState.discardDeck.push(card);
        tPlayerState.resources.explore -= card.cost;
        tPlayerState.actions -= 1;
        console.log("HERE ");

        /* the artifact effect applies when artifact is bought */
        const effectsResult = processEffects(card, cardIndex, tPlayerState, card.effects, null, null, null);
        tPlayerState = effectsResult.tPlayerState;
    } else {
        console.log("Card could not be bought: ");
        console.log(card);
    }

    if (activeEffect === EFFECT.gainItemToHand || activeEffect === EFFECT.revealItemBuyWithDiscount2
        || activeEffect === EFFECT.gainArtifact || activeEffect === EFFECT.revealArtifactBuyWithDiscount2) {
        tActiveEffects.splice(0, 1);
    }

    return {tPlayerState: tPlayerState, tStore: tStore}
}