import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {CARD_STATE, CARD_TYPE, CARDS, EFFECT} from "./data/cards";
import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import Resources from "./components/resources/Resources";
import Store from "./components/store/Store";
import {Controls} from "./components/main/Controls";

function App() {
    const [playerState, setPlayerState] = useState(getInitialPlayerState);
    const [tempState, setTempState] = useState({});
    const [store, setStore] = useState(getInitialStoreItems);
    /*const [round, setRound] = useState(1);*/
    /*const [boardState, setBoardState] = useState();*/
    const [activeEffects, setActiveEffects] = useState([]);

    console.log("Player's state:");
    console.log(playerState);
    console.log("Store's state:");
    console.log(store.itemsStore);
    console.log("Active effects:");
    console.log(activeEffects);


    function handleCardEffect(effects, cardIndex) {
        console.log("Handle effects: ");
        console.log(effects);
        console.log(playerState);
        console.log("really");
        let tPlayerState = {...playerState};
        const tActiveEffects = [...activeEffects];
        const tcard = tPlayerState.hand[cardIndex];

        tcard.state = CARD_STATE.active;
        for (let effect of effects) {
            switch (effect) {


                case EFFECT.buyArtifact:
                    // todo artifact
                    break;

                case EFFECT.travelWalk:
                case EFFECT.travelJeep:
                case EFFECT.travelShip:
                case EFFECT.travelPlane:
                case EFFECT.destroyCard:
                case EFFECT.drawFromDiscard:
                case EFFECT.gainItemToHand:
                case EFFECT.destroyGuardian:
                case EFFECT.removeGuardian:
                    tActiveEffects.push(effect);
                    break;

                case EFFECT.destroyThisCard:
                    tcard.state = CARD_STATE.destroyed;
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
                    addCardToStore(CARD_TYPE.item);
                    break;

                default:
                    console.log("HandleCardEffect didn't recognize effect: " + effect);
                    console.log(effects);
            }
        }
        if (tActiveEffects.length > 0) {
            setActiveEffects(tActiveEffects)
        }

        setPlayerState(tPlayerState);

        /* if we have an active card, we move it to discard or to destroyed cards */
        const activeCard = tPlayerState.activeCard;
        if (activeCard !== false) {
            if (tcard.state !== CARD_STATE.destroyed) {
                tPlayerState.discardDeck.push(activeCard)
            } else {
                tPlayerState.destroyedCards.push(activeCard)
            }
        }

        /* we make the played card to be the active one... */
        tPlayerState.activeCard = tcard;

        /* ...and remove it from the hand */
        tPlayerState.hand.splice(cardIndex, 1);
        console.log("Active card: " + tPlayerState.activeCard.cardName);
        setPlayerState(tPlayerState);
    }

    function handleActiveEffectClickOnCard(card, cardIndex) {
        let tPlayerState = {...playerState};
        const activeEffect = activeEffects[0];
        if (activeEffect === EFFECT.travelWalk || activeEffect === EFFECT.travelPlane || activeEffect === EFFECT.travelShip
            || activeEffect === EFFECT.travelJeep || activeEffect === EFFECT.return || activeEffect === EFFECT.useYourLocation
            || activeEffect === EFFECT.useEmptyLocation || activeEffect === EFFECT.useOpponentsLocation) {
            // todo locations - probably do nothing
        } else {
            switch (activeEffect) {
                case EFFECT.destroyGuardian:
                case EFFECT.destroyCard:
                    tPlayerState.destroyedCards.push(card.state = CARD_STATE.destroyed);
                    if (activeEffect === EFFECT.destroyGuardian) {
                        //todo guardian: defeat effect should be implemented here
                    }
                    tPlayerState = destroyCard(card.state, cardIndex, tPlayerState);
                    break;
                case EFFECT.drawFromDiscard:
                    tPlayerState = addCardToHand(card, tPlayerState);
                    tPlayerState.discardDeck.splice(cardIndex, 1);
                    break;
                default:
                    console.log("Cannot process active effect " + activeEffect + " on card: " + card.cardName
                        + " with state " + card.state);
            }
        }
        setPlayerState(tPlayerState);
    }

    function destroyCard(cardState, cardIndex, tPlayerState) {
        switch (cardState) {
            case CARD_STATE.inHand:
                tPlayerState.hand.splice(cardIndex, 1);
                break;
            case CARD_STATE.active:
                tPlayerState.activeCard = false;
                break;
            case CARD_STATE.discard:
                tPlayerState.discardDeck.splice(cardIndex, 1);
                break;
            case CARD_STATE.inStore:
            case CARD_STATE.destroyed:
                break;
            default:
                console.log("Cannot process state " + cardState + " while removing card.");
        }
        return tPlayerState;
    }

    function handleCardBuy(card, cardIndex) {
        console.log("Buying card: " + card.cardName);
        const tPlayerState = {...playerState};
        const activeEffect = activeEffects[0];
        const tActiveEffects = [...activeEffects];
        const isActiveRevealItemWithDiscount = activeEffect === EFFECT.revealItemBuyWithDiscount;

        /* Fishing Rod discount effect */
        if (isActiveRevealItemWithDiscount) {
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

        if (card.type === CARD_TYPE.item && card.cost <= tPlayerState.resources.coins) {
            const tStore = {...store};

            /* if we revealed extra item and it was not bought we must discard it */
            if (isActiveRevealItemWithDiscount && cardIndex !== tStore.itemsStore.length + 1) {
                tStore.itemsStore.splice(tStore.itemsStore.length - 1);
            }

            /* we remove bought card and replace it with next from the store deck */
            tStore.itemsStore.splice(cardIndex, 1);
            if (!isActiveRevealItemWithDiscount) addCardToStore(card.type);
            setStore(tStore);

            /* we pay the cost and add the card to discard deck or to hand */
            card.state = CARD_STATE.discard;
            if (activeEffect === EFFECT.gainItemToHand) {
                tPlayerState.hand.push(card);
            } else {
                tPlayerState.discardDeck.push(card);
            }
            
            if (activeEffect === EFFECT.gainItemToHand || activeEffect === EFFECT.revealItemBuyWithDiscount)
            
            tPlayerState.resources.coins -= card.cost;
            setPlayerState(tPlayerState);
            setActiveEffects(tActiveEffects);
        } else {
            console.log("Card could not be bought: " + card);
        }
    }

    function drawCards(cardsNum, tPlayerState) {
        let drawDeck = tPlayerState.drawDeck;
        let discardDeck = tPlayerState.discardDeck;
        for (let i = 0; i < cardsNum; i++) {
            console.log("tPlayerState: ");
            console.log(tPlayerState);
            if (drawDeck === 0) {
                tPlayerState = addDiscardToDrawDeck(tPlayerState);
            }
            tPlayerState = addCardToHand(drawDeck[0], tPlayerState);
            discardDeck.splice(0, 1);
        }
        return tPlayerState;
    }

    function cancelEffect(effect) {
        setActiveEffects([]);
    }

    function addCardToStore(cardType) {
        let tCard = "";
        if (cardType === CARD_TYPE.item) {
            tCard = store.itemsDeck[0];
            store.itemsDeck.splice(0, 1);
        } else if (cardType === CARD_TYPE.artifact) {
            //todo implement
        } else {
            console.log("Unknown card type in addCardToStore: " + cardType);
        }
        tCard.state = CARD_STATE.inStore;
        const tStore = {...store};
        tStore.itemsStore.push(tCard);
        setStore(tStore);
        console.log(store);
    }

    function addCardToHand(card, tPlayerState) {
        card.state = CARD_STATE.inHand;
        tPlayerState.hand.push(card);
        return tPlayerState
    }

    function addCardToDiscardDeck(card, tPlayersState) {
        card.state = CARD_STATE.discard;
        tPlayersState.discardDeck.push(card);
        return tPlayersState;
    }

    function addDiscardToDrawDeck(tPlayerState) {
        tPlayerState.discardDeck = shuffleArray(tPlayerState.discardDeck);
        console.log("discard: ");
        console.log(tPlayerState.discardDeck);
        tPlayerState.drawDeck = [...tPlayerState.discardDeck];

        for (let card of tPlayerState.drawDeck) {
            card.state = CARD_STATE.drawDeck;
        }
        tPlayerState.discardDeck = [];
        return tPlayerState;
    }

    function handleEndRound() {
        let tPlayerState = playerState;

        /* remove active card */
        if (tPlayerState.activeCard !== false) {
            tPlayerState.discardDeck.push(tPlayerState.activeCard);
            tPlayerState.activeCard = false;
        }

        /* discard the hand */
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
        console.log("*** END OF ROUND ***");
    }

    return (
        <div className="App">
            <BoardStateContext.Provider value={{
                storeItems: store.itemsStore,
                storeItemsDeck: store.itemsDeck,
                activeEffects: activeEffects,
                setActiveEffects: setActiveEffects,
                handleCardEffect: handleCardEffect,
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

function getInitialPlayerState() {
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

function getInitialStoreItems() {
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}

export default App;
