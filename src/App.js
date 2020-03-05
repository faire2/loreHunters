import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {CARD_STATE, CARDS} from "./data/cards";
import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import Resources from "./components/resources/Resources";
import Store from "./components/store/Store";
import {Controls} from "./components/main/Controls";
import {
    addCardToDiscardDeck,
    addCardToHand,
    addCardToStore,
    addDiscardToDrawDeck
} from "./components/cards/CardManipulationFuntions";
import {getInitialPlayerState, getInitialStoreItems} from "./components/global/InitialStateFunctions";
import {processActiveEffect, processCardBuy, processCardEffect} from "./components/cards/EffectsFunctions";

function App() {
    const [playerState, setPlayerState] = useState(getInitialPlayerState);
    /*const [tempState, setTempState] = useState({});*/
    const [store, setStore] = useState(getInitialStoreItems);
    const [round, setRound] = useState(1);
    /*const [boardState, setBoardState] = useState();*/
    const [activeEffects, setActiveEffects] = useState([]);

    console.log("Player's state:");
    console.log(playerState);
    console.log("Store's state:");
    console.log(store.itemsStore);
    console.log("Active effects:");
    console.log(activeEffects);


    function handleClickOnCardEffect(effects, cardIndex) {
        let tPlayerState = {...playerState};
        let tActiveEffects = [...activeEffects];
        let tStore = {...store};
        const tcard = tPlayerState.hand[cardIndex];

        const effectsResult = processCardEffect(tcard, tPlayerState, effects, tActiveEffects, tStore);
        tPlayerState = effectsResult.tPlayerState;
        tActiveEffects = effectsResult.tActiveEffects;
        tStore = effectsResult.tStore;

        /* if we have an active card, we move it to discard or to destroyed cards */
        const activeCard = tPlayerState.activeCard;


        if (activeCard !== false) {
            if (tcard.state !== CARD_STATE.destroyed) {
                tPlayerState.discardDeck.push(activeCard)
            } else {
                tPlayerState.destroyedCards.push(activeCard)
            }
        }

        /* we make the played card the active one... */
        tPlayerState.activeCard = tcard;

        /* ...and remove it from the hand */
        tPlayerState.hand.splice(cardIndex, 1);

        if (tActiveEffects.length > 0) {
            setActiveEffects(tActiveEffects)
        }
        setPlayerState(tPlayerState);
        setStore(tStore);
    }

    function handleActiveEffectClickOnCard(card, cardIndex) {
        const effectProcessResults = processActiveEffect(card, cardIndex, {...playerState}, [...activeEffects]);
        const tPlayerState = effectProcessResults.tPlayerState;
        const tActiveEffects = effectProcessResults.tActiveEffects;
        setActiveEffects(tActiveEffects);
        setPlayerState(tPlayerState);
    }

    function handleCardBuy(card, cardIndex) {
        console.log("Buying card: " + card.cardName);
        const buyResult = processCardBuy(card, cardIndex, {...playerState}, [...activeEffects], {...store});
        const tPlayerState = buyResult.tPlayerState;
        const tActiveEffects = buyResult.tActiveEffects;
        const tStore = buyResult.tStore;

        setPlayerState(tPlayerState);
        setActiveEffects(tActiveEffects);
        setStore(tStore);

    }

    function cancelEffect(effect) {
        setActiveEffects([]);
    }

    function handleEndRound() {
        let tPlayerState = playerState;

        /* remove active card */
        if (tPlayerState.activeCard !== false) {
            tPlayerState.discardDeck.push(tPlayerState.activeCard);
            tPlayerState.activeCard = false;
        }

        /* move cards from hand to discard */
        for (let card of tPlayerState.hand) {
            tPlayerState = addCardToDiscardDeck(card, tPlayerState);
            tPlayerState.hand = [];
        }

        /* draw a new hand */
        for (let i = 0; i < GLOBAL_VARS.handSize; i++) {
            if (tPlayerState.drawDeck.length === 0) {
                tPlayerState = addDiscardToDrawDeck(tPlayerState);
            }
            tPlayerState = addCardToHand(tPlayerState.drawDeck[0], playerState);
            tPlayerState.drawDeck.splice(0, 1);
        }
        setPlayerState(tPlayerState);
        setActiveEffects([]);
        setRound(round + 1);
        console.log("*** END OF ROUND ***");
    }

    return (
        <div className="App">
            <BoardStateContext.Provider value={{
                storeItems: store.itemsStore,
                storeItemsDeck: store.itemsDeck,
                activeEffects: activeEffects,
                setActiveEffects: setActiveEffects,
                handleCardEffect: handleClickOnCardEffect,
                handleCardBuy: handleCardBuy,
                handleActiveEffectClickOnCard: handleActiveEffectClickOnCard,
            }}>
                <PlayerStateContext.Provider value={{
                    playerState: playerState,
                    activeEffects: activeEffects,
                    cancelEffect: cancelEffect,
                    handleEndRound: handleEndRound,
                }}>
                    <Resources/>
                    <Store/>
                    <CardsArea/>
                    <Controls/>
                    {activeEffects[0]}
                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
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
    handSize: 5,
    initialCards: [CARDS.fear, CARDS.fear, CARDS.coin, CARDS.coin, CARDS.explore, CARDS.explore],
    storeSize: 5,
});

export const BOARD_STATE = Object.freeze({
    buyItem: "buy an item"
});

export default App;
