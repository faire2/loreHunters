import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {CARD_STATE, CARD_TYPE, ITEMS} from "./data/cards";
import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import Resources, {RESOURCES} from "./components/resources/Resources";
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
import {processEffects} from "./components/functions/processEffects";
import LocationsArea from "./components/main/LocationsArea";
import {LOCATION_STATE, TRANSPORT_TYPE} from "./data/locations";
import {processActiveEffect} from "./components/functions/processActiveEffects";
import {processCardBuy} from "./components/functions/processCardBuy";
import {payForTravelIfPossible} from "./components/locations/checkTravelCostAndPayForTravel";
import {EFFECT} from "./data/effects";

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


    /** CARD EFFECTS **/
    function handleClickOnCardEffect(effects, cardIndex) {
        let tPlayerState = {...playerState};
        let tActiveEffects = [...activeEffects];
        let tStore = {...store};
        const tcard = tPlayerState.hand[cardIndex];
        console.log("Handling card effects: ");
        console.log(effects);
        console.log(tcard);

        if (tcard.type === CARD_TYPE.item || tcard.type === CARD_TYPE.basic ||
            (tcard.type === CARD_TYPE.artifact && tPlayerState.resources.texts > 0)) {
            const effectsResult = processEffects(tcard, cardIndex, tPlayerState, effects, tActiveEffects, tStore, null, null);
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

            /* if the card is an artifact, pay for the use */
            if (tcard.type === CARD_TYPE.artifact) {
                tPlayerState.resources.texts -= 1;
            }

            if (tActiveEffects.length > 0) {
                setActiveEffects(tActiveEffects)
            }
            setPlayerState(tPlayerState);
            setStore(tStore);
        }
    }

    /** LOCATION EFFECTS **/
    function handleClickOnLocation(effects, location) {
        console.log("Clicked on location");
        let tPlayerState = {...playerState};
        const resources = tPlayerState.resources;
        if (activeEffects.length > 0) {
            const effectResult = processActiveEffect(null, null, {...location}, tPlayerState,
                [...activeEffects], {...store}, [...locations]);
            tPlayerState = effectResult.tPlayerState;
            setPlayerState(tPlayerState);
            const tActiveEffects = effectResult.tActiveEffects;
            setActiveEffects(tActiveEffects)
            const tLocation = effectResult.tLocation;
            let tLocations = [...locations];
            tLocations.splice(location.index, 1, tLocation);
            setLocations(tLocations);
        } else {
            switch (location.state) {
                case LOCATION_STATE.unexplored:
                    if (resources.explore >= location.exploreCost.explore
                        && resources.coins >= location.exploreCost.coins) {
                        resources.coins -= location.exploreCost.coins;
                        resources.explore -= location.exploreCost.explore;

                        /* todo guardians player can choose between tLocation benefits and guardian benefits */
                        const effectsResult = processEffects(null, null,{...playerState}, effects,
                            [...activeEffects], {...store}, location, {...locations});
                        /* costs are only coins and explore => we only need to update playerState */
                        setPlayerState(effectsResult.tPlayerState);
                        setActiveEffects(effectsResult.tActiveEffects);
                        setStore(effectsResult.tStore);
                        setLocations(effectsResult.tLocations);
                    }
                    let tLocation = {...locations[location.index]};
                    tLocation.state = LOCATION_STATE.explored;
                    let tLocations = [...locations];
                    tLocations.splice(location.index, 1, tLocation);
                    setLocations(tLocations);
                    break;
                case LOCATION_STATE.explored:
                    const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                    if (travelCheckResults.enoughResources) {
                        tPlayerState = travelCheckResults.tPlayerState;
                        tPlayerState.availableAdventurers -= 1;
                        const effectsResult = processEffects(null, null, tPlayerState, effects, [...activeEffects],
                            {...store}, location, [...locations]);
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
                    console.log("Unknown tLocation state in handleClickOnLocation: " + location.state);
                    console.log(location);
            }
        }
    }

    /** HANDLE ACTIVE EFFECTS **/
    function handleActiveEffectClickOnCard(card, cardIndex) {
        const effectProcessResults = processActiveEffect(card, cardIndex, null, {...playerState},
            [...activeEffects], {...store}, [...locations]);
        const tPlayerState = effectProcessResults.tPlayerState;
        const tActiveEffects = effectProcessResults.tActiveEffects;
        const tStore = effectProcessResults.tStore;
        const tLocations = effectProcessResults.tLocations;
        setActiveEffects(tActiveEffects);
        setPlayerState(tPlayerState);
        setStore(tStore);
        setLocations(tLocations);
    }

    /** HANDLE CLICK ON RESOURCE **/
    function handleClickOnResource(resource) {
        if (activeEffects[0] === EFFECT.uptrade && playerState.resources[resource] > 0) {
            const tPlayerState = {...playerState};
            let resources = tPlayerState.resources;
            const tActiveEffects = [...activeEffects];
            switch (resource) {
                case RESOURCES.texts:
                    resources.texts -= 1;
                    resources.weapons += 1;
                    break;
                case RESOURCES.weapons:
                    resources.weapons -= 1;
                    resources.jewels += 1;
                    break;
                case RESOURCES.JEWELS:
                    resources.jewels -= 1;
                    resources.shiny += 1;
                    break;
                case RESOURCES.SHINIES:
                    resources.shiny -= 1;
                    resources.texts += 3;
                    break;
                default:
                    console.log("Unknown resource in handleClickOnResource: " + resource);
            }
            tActiveEffects.splice(0, 1);
            setPlayerState(tPlayerState);
            setActiveEffects(tActiveEffects);
        }
    }

    /** BUY A CARD **/
    function handleCardBuy(card, cardIndex) {
        console.log("Buying card: " + card.cardName);
        const buyResult = processCardBuy(card, cardIndex, {...playerState}, [...activeEffects],
            {...store}, [...locations]);
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

    /** END OF ROUND **/
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
            if (tPlayerState.drawDeck.length > 0) {
                tPlayerState = addCardToHand(tPlayerState.drawDeck[0], playerState);
                tPlayerState.drawDeck.splice(0, 1);
            }
        }

        /* handle store changes */
        let tStore = {...store};
        if (tStore.offer.length > 0) {
            tStore.offer.splice(tStore.offer.length - round, 1, tStore.artifactsDeck[0]);
            tStore.artifactsDeck.splice(0, 1);
            setStore(tStore);
        }

        /* return adventurers */
        let tLocations = [];
        for (let location of locations) {
            let tLocation = {...location};
            if (location.state === LOCATION_STATE.occupied) {
                tLocation.state = LOCATION_STATE.explored
            }
            tLocations.push(tLocation);
        }
        setLocations(tLocations);
        tPlayerState.availableAdventurers = GLOBAL_VARS.adventurers;

        /* reset transport resources */
        tPlayerState.resources.walk = 0;
        tPlayerState.resources.jeep = 0;
        tPlayerState.resources.ship = 0;
        tPlayerState.resources.plane = 0;

        setPlayerState(tPlayerState);
        setActiveEffects([]);
        setRound(round + 1);
        console.log("*** END OF ROUND ***");
    }

    return (
        <div className="App">
            <BoardStateContext.Provider value={{
                storeOffer: store.offer,
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
                    <Resources handleClickOnResource={handleClickOnResource}/>
                    <Store/>
                    <LocationsArea/>
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
    initialCards: [ITEMS.fear, ITEMS.fear, ITEMS.coin, ITEMS.coin, ITEMS.explore, ITEMS.explore],
    storeSize: 5,
    adventurers: 2,
});

export const BOARD_STATE = Object.freeze({
    buyItem: "buy an item"
});

export default App;
