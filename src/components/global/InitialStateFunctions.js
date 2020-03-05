import {shuffleArray} from "../cards/CardManipulationFuntions";
import {CARD_STATE, CARD_TYPE, CARDS} from "../../data/cards";
import {GLOBAL_VARS} from "../../App";

export function getInitialPlayerState() {
    let playerState = {
        resources: {
            coins: 2,
            explore: 0,
            texts: 0,
            weapons: 0,
            jewels: 0,
            shiny: 0
        },
        hand: [],
        activeCard: false,
        drawDeck: [],
        discardDeck: [],
        playedCards: [],
        destroyedCards: []
    };

    const initialCards = shuffleArray(GLOBAL_VARS.initialCards);

    const cardsSetup = drawCards(initialCards, GLOBAL_VARS.handSize);
    for (let card of cardsSetup.drawCards) {
        card.state = CARD_STATE.inHand;
    }

    playerState.hand = cardsSetup.drawCards;
    playerState.drawDeck = cardsSetup.deck;
    return playerState;
}

export function getInitialStoreItems() {
    /* all items, each item is represented only once! */
    let items = shuffleArray(Object.keys(CARDS).map(key => {
        return CARDS[key]
    }));
    items = items.filter(card => card.type !== CARD_TYPE.basic);

    let itemsSetup = drawCards(items, GLOBAL_VARS.storeSize);
    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {itemsStore: itemsSetup.drawCards, itemsDeck: itemsSetup.deck}

}

function drawCards(deck, cardsToDraw) {
    const drawCards = [];
    for (let i = 0; i < cardsToDraw; i++) {
        const rnPosition = getRandomNumber(deck.length - 1, 1);
        drawCards.push(deck[rnPosition]);
        deck.splice(rnPosition, 1);
    }
    return {deck: deck, drawCards: drawCards}
}

function getRandomNumber(size) {
    const rNum = Math.floor(Math.random() * (size)) + 1;
    return rNum;
}