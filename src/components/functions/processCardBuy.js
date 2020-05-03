import {EFFECT} from "../../data/effects.mjs";
import {addCardToStore, getIdCard} from "./cardManipulationFuntions.mjs";
import {processEffects} from "./processEffects.mjs";
import {CARD_STATE, CARD_TYPE} from "../../data/idLists";

export function processCardBuy(card, cardIndex, tPlayerState, toBeRemoved, tStore, tLocations) {
    const activeEffect = tPlayerState.activeEffects[0];
    // if artifact comes with guardian, we need to process it
    let processGuardian = false;

    /* Fishing Rod discount effect */
    if (activeEffect === EFFECT.revealItemBuyWithDiscount2) {
        card.cost = card.cost  >= 3 ? card.cost - 3 : 0;
    }
    
    /* Amulet of Charm effect */
    if (activeEffect === EFFECT.buyItemWithDiscount3) {
        card.cost = card.cost >= 3  ? card.cost - 3 : 0;
    }

    /* Compass effect */
    if (activeEffect === EFFECT.revealArtifactBuyWithDiscount) {
        card.cost = card.cost >= 3 ? card.cost - 3 : 0;
    }

    /* Discount income effect */
    if (activeEffect === EFFECT.buyWithDiscount1) {
        card.cost -= 1;
    }

    /* Bag effect */
    if (activeEffect === EFFECT.gainItemToHand && card.type === CARD_TYPE.item) {
        card.cost = 0;
    }

    /* Whip effect */
    if (activeEffect === EFFECT.gainArtifact && card.type === CARD_TYPE.artifact) {
        card.cost = 0;
    }

    if (activeEffect === EFFECT.gainItem && card.type === CARD_TYPE.item) {
        card.cost = 0;
    }

    /* we check that we can buy the item */
    if (card.type === CARD_TYPE.item && card.cost <= tPlayerState.resources.coins) {
        /* if we revealed extra item and it was not bought we must discard it */
        if (activeEffect === EFFECT.revealItemBuyWithDiscount2) {
            tStore.itemsOffer.splice(tStore.itemsOffer.length - 1);
            if (cardIndex !== tStore.itemsOffer.length) {
                tStore.itemsOffer.splice(cardIndex, 1);
                tStore = addCardToStore(card.type, tStore);
            }
        } else {
            /* we remove bought card and replace it with next from the store deck */
            tStore.itemsOffer.splice(cardIndex, 1);
            tStore = addCardToStore(card.type, tStore);
        }
        /* we pay the cost and add the card to discard deck or to hand */
        card.state = CARD_STATE.discard;
        if (activeEffect === EFFECT.gainItemToHand) {
            tPlayerState.hand.push(getIdCard(card));
            tPlayerState.hand[tPlayerState.hand.length - 1].state = CARD_STATE.inHand;
        } else {
            tPlayerState.discardDeck.push(getIdCard(card));
        }

        tPlayerState.resources.coins -= card.cost;
        tPlayerState.actions -= 1;
    } else if (card.type === CARD_TYPE.artifact && card.cost <= tPlayerState.resources.explore) {
        if (activeEffect === EFFECT.revealArtifactBuyWithDiscount) {
            tStore.artifactsOffer.splice(tStore.artifactsOffer.length - 1);
            if (cardIndex !== tStore.artifactsOffer.length) {
                tStore.artifactsOffer.splice(cardIndex, 1);
                tStore = addCardToStore(card.type, tStore);
            }
        } else {
            tStore.artifactsOffer.splice(cardIndex, 1);
            tStore = addCardToStore(card.type, tStore);
        }
        tPlayerState.activeCards.push(getIdCard(card));
        tPlayerState.activeCards[tPlayerState.activeCards.length - 1].state = CARD_STATE.active;
        tPlayerState.resources.explore -= card.cost;
        tPlayerState.actions -= 1;

        /* the artifact effect applies when artifact is bought */
        const effectsResult = processEffects(card, cardIndex, tPlayerState, card.effects, null, null, null);
        tPlayerState = effectsResult.tPlayerState;

        if (card.isGuarded) {processGuardian = true}
    } else {
        console.log("Card could not be bought: ");
        console.log(card);
    }
    if (activeEffect === EFFECT.gainItemToHand || activeEffect === EFFECT.revealItemBuyWithDiscount2
        || activeEffect === EFFECT.gainArtifact || activeEffect === EFFECT.revealArtifactBuyWithDiscount ||
        activeEffect === EFFECT.buyWithDiscount1 || activeEffect === EFFECT.gainItem) {
        tPlayerState.activeEffects.splice(0, 1);
    }
    return {tPlayerState: tPlayerState, tStore: tStore, processGuardian: processGuardian}
}