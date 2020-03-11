import {EFFECT} from "../../data/effects";
import {CARD_STATE, CARD_TYPE} from "../../data/cards";
import {addCardToStore} from "./CardManipulationFuntions";
import {processEffects} from "./processEffects";

export function processCardBuy(card, cardIndex, tPlayerState, tActiveEffects, tStore, tLocations) {
    const activeEffect = tActiveEffects[0];

    /* Fishing Rod discount effect */
    if (activeEffect === EFFECT.revealItemBuyWithDiscount) {
        card.cost -= card - 3 >= 0 ? card.cost : 0;
    }
    
    /* Amulet of Charm effect */
    if (activeEffect === EFFECT.buyItemWithDiscount3) {
        card.cost -= card - 3 >= 0 ? card.cost : 0;
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
        if (activeEffect === EFFECT.revealItemBuyWithDiscount && cardIndex !== tStore.offer.length + 1) {
            tStore.offer.splice(tStore.offer.length - 1);
        }

        /* we remove bought card and replace it with next from the store deck */
        tStore.offer.splice(cardIndex, 1);
        tStore = addCardToStore(card.type, tStore);

        /* we pay the cost and add the card to discard deck or to hand */
        card.state = CARD_STATE.discard;
        if (activeEffect === EFFECT.gainItemToHand) {
            tPlayerState.hand.push(card);
        } else {
            tPlayerState.discardDeck.push(card);
        }

        tPlayerState.resources.coins -= card.cost;
        if (activeEffect === EFFECT.gainItemToHand || activeEffect === EFFECT.revealItemBuyWithDiscount
            || activeEffect === EFFECT.gainArtifact) {
            tActiveEffects.splice(0, 1);
        }
    } else if (card.type === CARD_TYPE.artifact && card.cost <= tPlayerState.resources.explore) {
        tStore.offer.splice(cardIndex, 1);
        tStore = addCardToStore(card.type, tStore);
        card.state = CARD_STATE.discard;
        tPlayerState.discardDeck.push(card);
        tPlayerState.resources.explore -= card.cost;

        /* the artifact effect applies when artifact is bought */
        const effectsResult = processEffects(card, tPlayerState, card.effects, tActiveEffects, null, null);
        tPlayerState = effectsResult.tPlayerState;
        tActiveEffects = effectsResult.tActiveEffects;
    } else {
        console.log("Card could not be bought: ");
        console.log(card);
    }
    return {tPlayerState: tPlayerState, tStore: tStore, tActiveEffects: tActiveEffects}
}