import {CARD_STATE, CARD_TYPE} from "../../data/cards";
import {addCardToDiscardDeck, addCardToHand, addCardToStore, destroyCard, drawCards} from "./CardManipulationFuntions";
import {EFFECT} from "../../data/effects";

export function processEffects(tCard, tPlayerState, effects, tActiveEffects, tStore, tLocations) {
    if (tCard !== null) {tCard.state = CARD_STATE.active};
    for (let effect of effects) {
        console.log("Resolving effect: " + effect);
        switch (effect) {
            case EFFECT.buyArtifact:
                // todo artifact
                break;

            case EFFECT.discard:
            case EFFECT.destroyCard:
            case EFFECT.drawFromDiscard:
            case EFFECT.gainItemToHand:
            case EFFECT.destroyGuardian:
            case EFFECT.removeGuardian:
                tActiveEffects.push(effect);
                break;
            case EFFECT.destroyThisCard:
                tCard.state = CARD_STATE.destroyed;
                break;

            case EFFECT.draw1:
                tPlayerState = drawCards(1, tPlayerState);
                break;

            case EFFECT.draw2:
                tPlayerState = drawCards(2, tPlayerState);
                break;

            case EFFECT.gainCoin:
                tPlayerState.resources.coins += 1;
                break;

            case EFFECT.gainCoinForLegends:
                // todo legends
                break;

            case EFFECT.gainCoinsIfLast:
                if (tPlayerState.hand.length === 1) {
                    tPlayerState.resources.coins += 2
                }
                break;

            case EFFECT.gainExplore:
                tPlayerState.resources.explore += 1;
                break;

            case EFFECT.gainExploreForGuardians:
                // todo guardians must go to destroyed cards when destroyed!
                let destroyedGuardians = 0;
                for (const card of tPlayerState.destroyedCards) {
                    destroyedGuardians = card.type === CARD_TYPE.guardian ? destroyedGuardians + 1 : destroyedGuardians;
                }
                destroyedGuardians = destroyedGuardians > 4 ? 4 : destroyedGuardians;
                tPlayerState.resources.coins += destroyedGuardians;
                break;

            case EFFECT.gainExploreForShinys:
                tPlayerState.resources.coins += tPlayerState.resources.shiny;
                break;

            case EFFECT.gainText:
                tPlayerState.resources.texts += 1;
                break;

            case EFFECT.gainWeapon:
                tPlayerState.resources.weapons += 1;
                break;

            case EFFECT.gainJewel:
                tPlayerState.resources.jewels += 1;
                break;

            case EFFECT.gainShiny:
                tPlayerState.resources.shiny += 1;
                break;

            case EFFECT.gainWalk:
                tPlayerState.resources.walk += 1;
                break;

            case EFFECT.gainJeep:
                tPlayerState.resources.jeep += 1;
                break;

            case EFFECT.gainShip:
                tPlayerState.resources.ship += 1;
                break;

            case EFFECT.gainPlane:
                tPlayerState.resources.plane += 1;
                break;

            case EFFECT.loseCoin:
                tPlayerState.resources.coins -= 1;
                break;

            case EFFECT.loseExplore:
                tPlayerState.resources.explore -= 1;
                break;

            case EFFECT.loseText:
                tPlayerState.resources.texts -= 1;
                break;

            case EFFECT.loseWeapon:
                tPlayerState.resources.weapons -= 1;
                break;

            case EFFECT.loseJewel:
                tPlayerState.resources.jewels -= 1;
                break;

            case EFFECT.progress:
                //todo legends;
                break;
            case EFFECT.progressForFree:
                //todo legends;
                break;


            case EFFECT.revealItemBuyWithDiscount:
                tActiveEffects.push(effect);
                tStore = addCardToStore(CARD_TYPE.item, tStore);
                break;

            default:
                console.log("HandleCardEffect didn't recognize effect: " + effect);
                console.log(effects);
        }
    }
    console.log("returning active effect:");
    console.log(tActiveEffects);
    return {tPlayerState: tPlayerState, tActiveEffects: tActiveEffects, tStore: tStore};
}


export function processActiveEffect(card, cardIndex, tPlayerState, tActiveEffects) {
    console.log(tActiveEffects);
    if (tActiveEffects[0] === EFFECT.gainWalk || tActiveEffects[0] === EFFECT.gainPlane || tActiveEffects[0] === EFFECT.gainShip
        || tActiveEffects[0] === EFFECT.gainJeep || tActiveEffects[0] === EFFECT.return || tActiveEffects[0] === EFFECT.useYourLocation
        || tActiveEffects[0] === EFFECT.useEmptyLocation || tActiveEffects[0] === EFFECT.useOpponentsLocation) {
        // todo locations - probably do nothing
    } else {
        switch (tActiveEffects[0]) {
            case EFFECT.discard:
                tPlayerState = addCardToDiscardDeck(card, tPlayerState);
                tPlayerState.hand.splice(cardIndex, 1);
                break;
            case EFFECT.destroyGuardian:
            case EFFECT.destroyCard:
                tPlayerState = destroyCard(card.state, cardIndex, tPlayerState);
                card.state = CARD_STATE.destroyed;
                tPlayerState.destroyedCards.push(card);
                if (tActiveEffects[0] === EFFECT.destroyGuardian) {
                    //todo guardian: defeat effect should be implemented here
                }
                tActiveEffects.splice(0, 1);
                break;
            case EFFECT.drawFromDiscard:
                tPlayerState = addCardToHand(card, tPlayerState);
                tPlayerState.discardDeck.splice(cardIndex, 1);
                tActiveEffects.splice(0, 1);
                break;
            default:
                console.log("Cannot process active effect " + tActiveEffects[0] + " on card: " + card.cardName
                    + " with state " + card.state);
        }
    }
    return {tPlayerState: tPlayerState, tActiveEffects: tActiveEffects};
}

export function processCardBuy(card, cardIndex, tPlayerState, tActiveEffects, tStore) {
    const activeEffect = tActiveEffects[0];

    /* Fishing Rod discount effect */
    if (activeEffect === EFFECT.revealItemBuyWithDiscount) {
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

    /* we check that we can buy the item */
    if (card.type === CARD_TYPE.item && card.cost <= tPlayerState.resources.coins) {

        /* if we revealed extra item and it was not bought we must discard it */
        if (activeEffect === EFFECT.revealItemBuyWithDiscount && cardIndex !== tStore.itemsStore.length + 1) {
            tStore.itemsStore.splice(tStore.itemsStore.length - 1);
        }

        /* we remove bought card and replace it with next from the store deck */
        tStore.itemsStore.splice(cardIndex, 1);
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
    } else {
        console.log("Card could not be bought: ");
        console.log(card);
    }
    return {tPlayerState: tPlayerState, tStore: tStore, tActiveEffects: tActiveEffects}
}