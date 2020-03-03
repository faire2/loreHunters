import React, {useContext, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {CARD_TYPE, CARDS} from "./data/cards";
import CardsArea from "./components/main/CardsArea";
import {PlayerStateContext, StoreContext} from "./Contexts";
import Resources from "./components/resources/Resources";
import Store from "./components/store/Store";

function App() {
    const [playerState, setPlayerState] = useState(getInitialPlayerState);
    const [items, setItems] = useState(getInitialItemsState);
    const [round, setRound] = useState(1);

    const playersContext = useContext(PlayerStateContext);
    const storeContext = useContext(StoreContext);

    console.log("Initial player's state:");
    console.log(playerState);
    console.log("Initial items' store:");
    console.log(items.itemsStore);

    return (
        <div className="App">
            <StoreContext.Provider value={{
                storeItems: items.itemsStore,
                storeItemsDeck: items.itemsDeck
            }}>
                <PlayerStateContext.Provider value={{
                    playerState: playerState
                }}>
                    <Store/>
                    <CardsArea/>
                    <Resources/>
                </PlayerStateContext.Provider>
            </StoreContext.Provider>
        </div>
    )
}

export const RES = Object.freeze({
    arms: "armaments",
    texts: "texts",
    jewels: "jewels",
    gold: "gold",
    explore: "explore"
});

export const GLOBAL_VARS = Object.freeze({
    initialHandSize: 5,
    initialCards: [CARDS.fear, CARDS.fear, CARDS.coin, CARDS.coin, CARDS.explore, CARDS.explore],
    storeSize: 5,
});

function getInitialPlayerState() {
    let playerState = {
        resources: {
            texts: 0,
            weapons: 0,
            jewels: 0,
            coins: 2,
            explore: 0,
        },
        hand: {},
        drawDeck: {},
        discardDeck: {},
        playedCards: {},
        activeCards: {}
    };

    const initialCards = shuffleArray(GLOBAL_VARS.initialCards);

    const cardsSetup = drawCards(initialCards, GLOBAL_VARS.initialHandSize);

    playerState.hand = cardsSetup.drawCards;
    playerState.drawDeck = cardsSetup.deck;
    return playerState;
}

function getInitialItemsState() {
    /* all items, each item is represented only once! */
    let items = shuffleArray(Object.keys(CARDS).map(key => {
            return CARDS[key]
    }));
    items = items.filter(card => card.type !== CARD_TYPE.basic);

    let itemsSetup = drawCards(items, GLOBAL_VARS.storeSize);
    console.log("Initial items' state:");
    console.log(itemsSetup);
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}

export default App;
