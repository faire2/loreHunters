import {CARD_TYPE, DIRECTION} from "../functions/enums.mjs";
import {addCardToStore} from "../functions/cardManipulationFuntions.mjs";

export function takeArtifactFromStore(states, automatonState, direction, cardType) {
    console.log("AUTOMATON: Taking " + cardType + " from " + direction);
    let cardsPoints = [];
    const storeCards = cardType === CARD_TYPE.artifact ? states.store.artifactsOffer : states.store.itemsOffer;
    for (let i = 0; i < storeCards.length; i++) {
        cardsPoints.push(storeCards[i].points);
    }
    const maxValue = Math.max(...cardsPoints);

    // we want either first or last card of that value, depending on the direction
    const cardIndex = direction === DIRECTION.left ? cardsPoints.indexOf(maxValue) : cardsPoints.lastIndexOf(maxValue);

    // add that card to the automaton's victory cards
    automatonState.victoryCards.push(storeCards[cardIndex]);

    // remove it from the store and replenish it
    if (cardType === CARD_TYPE.artifact) {
        states.store.artifactsOffer.splice(cardIndex, 1);
        states.store = addCardToStore(CARD_TYPE.artifact, states.store);
    } else {
        states.store.itemsOffer.splice(cardIndex, 1);
        states.store = addCardToStore(CARD_TYPE.item, states.store);
    }


    // replenish the store
    return {states: states, automatonState: automatonState}
}