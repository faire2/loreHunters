import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {CARD_STATE, CARDS, ITEM_TRANSPORT} from "./data/cards";
import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import Resources from "./components/resources/Resources";
import Store from "./components/store/Store";
import {Controls} from "./components/main/Controls";
import {
    addCardToDiscardDeck,
    addCardToHand,
    addDiscardToDrawDeck
} from "./components/functions/CardManipulationFuntions";
import {
    getInitialLocations,
    getInitialPlayerState,
    getInitialStoreItems
} from "./components/functions/InitialStateFunctions";
import {processActiveEffect, processCardBuy, processEffects} from "./components/functions/EffectsFunctions";
import LocationsArea from "./components/main/LocationsArea";
import {LOCATION_STATE, TRANSPORT_TYPE} from "./data/locations";

function App() {
    const [playerState, setPlayerState] = useState(getInitialPlayerState);
    /*const [tempState, setTempState] = useState({});*/
    const [store, setStore] = useState(getInitialStoreItems);
    const [round, setRound] = useState(1);
    const [activeEffects, setActiveEffects] = useState([]);
    const [locations, setLocations] = useState(getInitialLocations());

    console.log("Player's state:");
    console.log(playerState);
    console.log("Store's state:");
    console.log(store.itemsStore);
    console.log("Active effects:");
    console.log(activeEffects);
    console.log("Locations:");
    console.log(locations);


    function handleClickOnCardEffect(effects, cardIndex) {
        let tPlayerState = {...playerState};
        let tActiveEffects = [...activeEffects];
        let tStore = {...store};
        const tcard = tPlayerState.hand[cardIndex];

        const effectsResult = processEffects(tcard, tPlayerState, effects, tActiveEffects, tStore);
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

    function handleClickOnLocation(effects, location) {
        let tPlayerState = {...playerState};
        const resources = tPlayerState.resources;
        switch (location.state) {
            case LOCATION_STATE.unexplored:
                if (resources.explore >= location.exploreCost.explore
                    && resources.coins >= location.exploreCost.coins) {
                    resources.coins -= location.exploreCost.coins;
                    resources.explore -= location.exploreCost.explore;

                    /* todo guardians player can choose between location benefits and guardian benefits */
                    const effectsResult = processEffects(null, {...playerState}, effects, [...activeEffects], {...store}, {...locations});
                    /* costs are only coins and explore => we only need to update playerState */
                    setPlayerState(effectsResult.tPlayerState);
                    if (effectsResult.tActiveEffects.length > 0) {
                        setActiveEffects(effectsResult.tActiveEffects)
                    }
                }
                let tLocation = {...locations[location.index]};
                tLocation.state = LOCATION_STATE.explored;
                let tLocations = [...locations];
                tLocations.splice(location.index, 1, tLocation);
                setLocations(tLocations);
                break;
            case LOCATION_STATE.explored:
                let enoughResources = false;
                const transportType = location.useCost.transportType;
                const transportCost = location.useCost.amount;
                switch (transportType) {
                    case TRANSPORT_TYPE.walk:
                        if (resources.walk + resources.jeep + resources.ship + resources.plane >= transportCost) {
                            enoughResources = true;
                            resources.walk -= transportCost;
                            if (resources.walk < 0) {
                                resources.jeep += resources.walk;
                                resources.walk = 0;
                                if (resources.jeep < 0) {
                                    resources.ship += resources.jeep;
                                    resources.jeep = 0;
                                    if (resources.ship < 0) {
                                        resources.plane += resources.ship;
                                        resources.ship = 0;
                                    }

                                }
                            }
                        }
                        break;
                    case
                    TRANSPORT_TYPE.jeep:
                        if (resources.jeep + resources.plane >= transportCost) {
                            enoughResources = true;
                            resources.jeep -= transportCost;
                            if (resources.jeep < 0) {
                                resources.plane += resources.jeep;
                                resources.jeep = 0;
                            }
                        }
                        break;
                    case
                    TRANSPORT_TYPE.ship:
                        if (resources.ship + resources.plane >= transportCost) {
                            enoughResources = true;
                            resources.ship -= transportCost;
                            if (resources.ship < 0) {
                                resources.plane += resources.ship;
                                resources.ship = 0;
                            }
                        }
                        break;
                    case
                    TRANSPORT_TYPE.plane:
                        if (resources.plane >= transportCost) {
                            enoughResources = true;
                            resources.plane -= transportCost;
                        }
                        break;
                    default:
                        console.log("Unknown transportation cost for using location in handleClickOnLocation: " + location.useCost.transportType);
                        console.log(location);
                }

                if (enoughResources === true) {
                    tPlayerState.availableAdventurers -= 1;
                    const effectsResult = processEffects(null, tPlayerState, effects, [...activeEffects], {...store}, [...locations]);
                    setPlayerState(effectsResult.tPlayerState);
                    setActiveEffects(effectsResult.tActiveEffects);

                    let tLocation = {...locations[location.index]};
                    tLocation.state = LOCATION_STATE.occupied;
                    let tLocations = [...locations];
                    tLocations.splice(location.index, 1, tLocation);
                    setLocations(tLocations);
                }
                break;
            case LOCATION_STATE.occupied:
                console.log("Location is occupied.");
                break;
            default:
                console.log("Unknown location state in handleClickOnLocation: " + location.state);
                console.log(location);
        }
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

        /* return adventurers */
        let tLocations = [];
        for (let location of locations) {
            let tLocation = {...location};
            if (location.state === LOCATION_STATE.occupied) {tLocation.state = LOCATION_STATE.explored};
            tLocations.push(tLocation);
        }
        setLocations(tLocations);

        tPlayerState.availableAdventurers = GLOBAL_VARS.adventurers;
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
                locations: locations,
                handleClickOnLocation: handleClickOnLocation,
            }}>
                <PlayerStateContext.Provider value={{
                    playerState: playerState,
                    activeEffects: activeEffects,
                    cancelEffect: cancelEffect,
                    handleEndRound: handleEndRound,
                }}>
                    <Resources/>
                    <div className="d-flex flex-row">
                        <Store/>
                        <LocationsArea/>
                    </div>
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
    adventurers: 2,
});

export const BOARD_STATE = Object.freeze({
    buyItem: "buy an item"
});

export default App;
