import {EFFECT} from "../../data/effects.mjs";
import {addCardToStore} from "./cardManipulationFuntions.mjs";
import {processEffects} from "./processEffects.mjs";
import {addLogEntry} from "../main/logger";
import {ACTION_TYPE, CARD_STATE, CARD_TYPE} from "./enums";

export function processCardBuy(card, cardIndex, tPlayerState, tStore, tLocations) {
    const activeEffect = tPlayerState.activeEffects[0];
    // if artifact comes with guardian, we need to process it
    let processGuardian = false;
    let showRewardsModal = false;
    let rewardsData = null;

    /* Fishing Rod discount effect */
    if (activeEffect === EFFECT.revealItemBuyWithDiscount3) {
        card.cost = card.cost  >= 3 ? card.cost - 3 : 0;
    }

    /* Bone hairpin effect */
    if (activeEffect === EFFECT.revealItemBuyWithDiscount3) {
        card.cost = card.cost  >= 2 ? card.cost - 2 : 0;
    }
    
    /* Amulet of Charm effect */
    if (activeEffect === EFFECT.buyItemWithDiscount3) {
        card.cost = card.cost >= 3  ? card.cost - 3 : 0;
    }

    /* Compass effect */
    if (activeEffect === EFFECT.revealArtifactBuyWithDiscount3) {
        card.cost = card.cost >= 3 ? card.cost - 3 : 0;
    }

    /* Discount income effect */
    if (activeEffect === EFFECT.buyWithDiscount1) {
        card.cost -= 1;
    }

    if (activeEffect === EFFECT.buyWithDiscount2) {
        card.cost -= 2;
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

    /* gain 2 items for 1 destroyed */
    if (card.type === CARD_TYPE.item && card.cost <= tPlayerState.activeEffects[1]) {
        card.cost = 0;
    }

    /* we check that we can buy the item */
    if (card.type === CARD_TYPE.item && card.cost <= tPlayerState.resources.coins) {
        /* if we revealed extra item and it was not bought we must discard it */
        if (activeEffect === EFFECT.revealItemBuyWithDiscount3) {
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
        if (activeEffect === EFFECT.gainItemToHand) {
            tPlayerState.hand.push(card);
            tPlayerState.hand[tPlayerState.hand.length - 1].state = CARD_STATE.inHand;
        } else if (activeEffect === EFFECT.gainItemToTop) {
            tPlayerState.drawDeck.splice(0, 0, card);
            tPlayerState.drawDeck[0].state = CARD_STATE.drawDeck;
        } else if (activeEffect === EFFECT.gainItem) {
            tPlayerState.drawDeck.push(card);
            tPlayerState.drawDeck[0].state = CARD_STATE.drawDeck;
        } else {
            tPlayerState.drawDeck.push(card);
            tPlayerState.drawDeck[tPlayerState.drawDeck.length - 1].state = CARD_STATE.drawDeck;
        }

        tPlayerState.resources.coins -= card.cost;
        tPlayerState.actions -= 1;
        addLogEntry(tPlayerState, ACTION_TYPE.buysItem, card.id, {coins: card.cost});
    } else if (card.type === CARD_TYPE.artifact && card.cost <= tPlayerState.resources.explore) {
        if (activeEffect === EFFECT.revealArtifactBuyWithDiscount3) {
            tStore.artifactsOffer.splice(tStore.artifactsOffer.length - 1);
            if (cardIndex !== tStore.artifactsOffer.length) {
                tStore.artifactsOffer.splice(cardIndex, 1);
                tStore = addCardToStore(card.type, tStore);
            }
        } else {
            tStore.artifactsOffer.splice(cardIndex, 1);
            tStore = addCardToStore(card.type, tStore);
        }
        tPlayerState.activeCards.push(card);
        tPlayerState.activeCards[tPlayerState.activeCards.length - 1].state = CARD_STATE.drawDeck;
        tPlayerState.resources.explore -= card.cost;
        tPlayerState.actions -= 1;

        /* the artifact effect applies when artifact is bought */
        const effectsResult = processEffects(card, cardIndex, tPlayerState, card.effects, tStore, null, tLocations);
        tPlayerState = effectsResult.tPlayerState;
        tLocations = effectsResult.tLocations;
        tStore = effectsResult.tStore;

        if (tPlayerState.activeEffects[0] === EFFECT.resolveAdditionalEffects) {
            const effectsResult = processEffects(null, null, tPlayerState, tPlayerState.activeEffects[1],
                tStore, null, tLocations);
            tPlayerState = effectsResult.tPlayerState;
            tStore = effectsResult.tStore;
            tPlayerState.activeEffects.splice(0, 2);
        }
        if (effectsResult.showRewardsModal) {
            showRewardsModal = true;
            rewardsData = effectsResult.rewardsData
        }

        // guardians are currently not cards, but part of location
        // if (card.isGuarded) {processGuardian = true}
        addLogEntry(tPlayerState, ACTION_TYPE.buysArtifact, card.id, {explore: card.cost});
    } else {
        console.log("Card could not be bought: ");
        console.log(card);
    }
    if (activeEffect === EFFECT.gainItemToHand || activeEffect === EFFECT.revealItemBuyWithDiscount3
        || activeEffect === EFFECT.gainArtifact || activeEffect === EFFECT.revealArtifactBuyWithDiscount3 ||
        activeEffect === EFFECT.buyWithDiscount1 || activeEffect === EFFECT.gainItem || activeEffect === EFFECT.buyWithDiscount2) {
        tPlayerState.activeEffects.splice(0, 1);
    }
    if (activeEffect === EFFECT.gainItemOfValue) {
        tPlayerState.activeEffects.splice(0, 2);
    }
    return {tPlayerState: tPlayerState, tLocations: tLocations, tStore: tStore, processGuardian: processGuardian, showRewardsModal, rewardsData}
}