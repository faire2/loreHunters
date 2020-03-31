import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cloneDeep from 'lodash/cloneDeep';


import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import Resources from "./components/resources/Resources";
import Store from "./components/store/Store";
import {Controls} from "./components/main/Controls";
import {
    addCardToDiscardDeck,
    addCardToHand,
    addDiscardToDrawDeck
} from "./components/functions/cardManipulationFuntions";
import getInitialPlayerStates, {
    emptyPlayerState,
    getInitialLocations,
    getInitialStoreItems,
    GLOBAL_VARS
} from "./components/functions/initialStateFunctions";
import {processEffects} from "./components/functions/processEffects";
import LocationsArea from "./components/main/LocationsArea";
import {processActiveEffect} from "./components/functions/processActiveEffects";
import {processCardBuy} from "./components/functions/processCardBuy";
import {EFFECT} from "./data/effects";
import ModalDialogue from "./components/main/Modal";
import {payForTravelIfPossible} from "./components/locations/payForTravelIfPossible";
import {CARD_STATE, CARD_TYPE, LOCATION_STATE, TRANSMISSIONS} from "./data/idLists";
import {socket} from "./server/socketConnection";

function App() {
    const [playerStates, setPlayerStates] = useState(getInitialPlayerStates);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({location: null, guardian: null});
    const [testData, setTestData] = useState(null);

    const [playerState, setPlayerState] = useState(emptyPlayerState);

    /*const [tempState, setTempState] = useState({});*/
    const [round, setRound] = useState(1);
    const [store, setStore] = useState(getInitialStoreItems);
    const [locations, setLocations] = useState(getInitialLocations());

    useEffect( () => {
        socket.on(TRANSMISSIONS.getState, playerState => {
            console.log("received player's state from server");
            console.log(playerState);
            setPlayerState(playerState);
        })
    }, []);

    function handleEmission() {
        console.log("emmitting");
        socket.emit("test", "test message");
    }

    console.log("*** player state ***");
    console.log(playerState);

    /*console.log("Player's state:");
    console.log(playerState);
    console.log("Store's state:");
    console.log(store.itemsStore);
    console.log("Active effects:");
    console.log(activeEffects);
    console.log("Locations:");
    console.log(locations);*/


    /** CARD EFFECTS **/
    function handleClickOnCardEffect(effects, cardIndex, isTravel) {
        let tPlayerState = cloneDeep(playerState);
        let tStore = cloneDeep(store);
        const tcard = tPlayerState.hand[cardIndex];
        console.log("Handling card effects: ");
        console.log(effects);
        console.log(tcard);

        if (tcard.type === CARD_TYPE.item || tcard.type === CARD_TYPE.basic ||
            (tcard.type === CARD_TYPE.artifact && tPlayerState.resources.texts > 0)) {
            const effectsResult = processEffects(tcard, cardIndex, tPlayerState, effects, null, tStore, null, null);

            tPlayerState = effectsResult.tPlayerState;
            if (tcard.type !== CARD_TYPE.basic && !isTravel) {
                tPlayerState.actions -= 1;
            }
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

            setPlayerState(tPlayerState);
            setStore(tStore);
        }
    }

    /** LOCATION EFFECTS **/
    function handleClickOnLocation(effects, location) {
        console.log("Clicked on location");
        let tPlayerState = cloneDeep(playerState);
        const resources = tPlayerState.resources;
        if (tPlayerState.activeEffects.length > 0) {
            const effectResult = processActiveEffect(null, null, {...location}, tPlayerState,
                [...tPlayerState.activeEffects], {...store}, {...locations});
            tPlayerState = effectResult.tPlayerState;
            tPlayerState.activeEffects = effectResult.tActiveEffects;
            setPlayerState(tPlayerState);
            const tLocation = effectResult.tLocation;
            let tLocations = {...locations};
            tLocations.splice(location.index, 1, tLocation);
            setLocations(tLocations);
            nextPlayer()
        } else {
            switch (location.state) {
                case LOCATION_STATE.unexplored:
                    if (resources.explore >= location.exploreCost.explore
                        && resources.coins >= location.exploreCost.coins && playerState.actions > 0) {
                        resources.coins -= location.exploreCost.coins;
                        resources.explore -= location.exploreCost.explore;

                        /* todo guardians player can choose between tLocation benefits and guardian benefits */
                        tPlayerState = cloneDeep(playerState);
                        tPlayerState.actions -= 1;
                        setPlayerState(tPlayerState);

                        let tLocation = {...locations[location.index]};
                        tLocation.state = LOCATION_STATE.explored;
                        let tLocations = {...locations};
                        tLocations.splice(location.index, 1, tLocation);
                        setLocations(tLocations);
                        setModalData({location: location, guardian: playerState.guardians[0]});
                        setShowModal(true);
                    }
                    break;
                case LOCATION_STATE.explored:
                    const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                    if (travelCheckResults.enoughResources && tPlayerState.actions > 0) {
                        tPlayerState = travelCheckResults.tPlayerState;
                        tPlayerState.availableAdventurers -= 1;
                        tPlayerState.actions -= 1;
                        const effectsResult = processEffects(null, null, tPlayerState, effects, null,
                            {...store}, location, {...locations});
                        setPlayerState(effectsResult.tPlayerState);

                        let tLocation = {...locations[location.index]};
                        tLocation.state = LOCATION_STATE.occupied;
                        let tLocations = {...locations};
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
        const effectProcessResults = processActiveEffect(card, cardIndex, null, cloneDeep(playerState),
            null, {...store}, {...locations});
        const tPlayerState = effectProcessResults.tPlayerState;
        const tStore = effectProcessResults.tStore;
        const tLocations = effectProcessResults.tLocations;
        setPlayerState(tPlayerState);
        setStore(tStore);
        setLocations(tLocations);
    }

    /** HANDLE CLICK ON RESOURCE **/
    function handleClickOnResource(resource) {
        console.log("Handling click on resources with resource: " + resource);
        if (playerState.activeEffects[0] === EFFECT.uptrade && playerState.resources[resource] > 0) {
            const tPlayerState = cloneDeep(playerState);
            let resources = tPlayerState.resources;
            const tActiveEffects = tPlayerState.activeEffects;
            /* todo fix should work with RESOURCES..., but doesn't */
            switch (resource) {
                case "texts":
                    resources.texts -= 1;
                    resources.weapons += 1;
                    break;
                case "weapons":
                    resources.weapons -= 1;
                    resources.jewels += 1;
                    break;
                case "jewels":
                    resources.jewels -= 1;
                    resources.shinies += 1;
                    break;
                case "shinies":
                    console.log("HERE");
                    resources.shinies -= 1;
                    resources.texts += 3;
                    break;
                default:
                    console.log("Unknown resource in handleClickOnResource: " + resource);
            }
            tActiveEffects.splice(0, 1);
            setPlayerState(tPlayerState);
        }
    }

    /** BUY A CARD **/
    function handleCardBuy(card, cardIndex) {
        console.log("Buying card: " + card.cardName + " with effect: " + card.effects);
        if (playerState.actions > 0) {
            const buyResult = processCardBuy(card, cardIndex, cloneDeep(playerState), null,
                cloneDeep(store), {...locations});
            const tPlayerState = buyResult.tPlayerState;
            const tStore = buyResult.tStore;

            setPlayerState(cloneDeep(tPlayerState));
            setStore(tStore);
            console.log("playerstate after buying: ");
            console.log(playerState[playerIndex]);
        }
    }

    function cancelEffect(effect) {

    }

    /** SET NEXT PLAYER **/
    function nextPlayer() {
        /* looks for a player that has not yet finished */
        console.log("PLAYER " + (playerIndex + 1) + " passing action.");
        console.log(playerState);
        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        while (nextPlayerIndex !== playerIndex) {
            console.log("Has player " + (nextPlayerIndex + 1) + " finished round? " + playerStates[nextPlayerIndex].finishedRound);
            if (!playerStates[nextPlayerIndex].finishedRound) {
                setPlayerIndex(nextPlayerIndex);
                console.log("PASSING ACTION TO PLAYER " + (nextPlayerIndex + 1));
                break;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0
        }
        let tPlayerState = cloneDeep(playerState);
        tPlayerState.actions = 1;
        setPlayerState(tPlayerState);
    }

    /** HANDLE NEW LOCATION EXPLORE **/
    function handleLocationExploredReward(effects) {
        console.log("here");
        const effectsResult = processEffects(null, null, cloneDeep(playerState), effects,
            null, cloneDeep(store), null, cloneDeep(locations));
        /* costs are only coins and explore => we only need to update playerState */
        let tPlayerState = effectsResult.tPlayerState;
        tPlayerState.discardDeck.push(tPlayerState.guardians[0]);
        tPlayerState.guardians.splice(0, 1);
        setPlayerState(effectsResult.tPlayerState);
        setLocations(effectsResult.tLocations);
        setStore(effectsResult.tStore);
        setShowModal(false);
    }

    /** END OF ROUND **/
    function handleEndRound() {
        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        let haveAllFinished = true;
        while (playerIndex !== nextPlayerIndex) {
            if (!playerStates[nextPlayerIndex].finishedRound) {
                haveAllFinished = false;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0;
        }

        if (haveAllFinished) {

            /* handle store changes */
            let tStore = {...store};
            if (tStore.itemsOffer.length > 0) {
                tStore.itemsOffer.splice(tStore.itemsOffer.length - round, 1, tStore.artifactsDeck[0]);
                tStore.artifactsDeck.splice(0, 1);
                setStore(tStore);
            }

            /* remove adventurers from locations */
            let tLocations = [];
            for (let location of locations) {
                let tLocation = {...location};
                if (location.state === LOCATION_STATE.occupied) {
                    tLocation.state = LOCATION_STATE.explored
                }
                tLocations.push(tLocation);
            }
            setLocations(tLocations);

            /* reset player states */
            let tPlayerStates = [];
            for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
                let tPlayerState = cloneDeep(playerStates[i]);
                tPlayerState.availableAdventurers = GLOBAL_VARS.adventurers;

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
                        const result = addCardToHand(tPlayerState.drawDeck[0], cloneDeep(tPlayerState));
                        tPlayerState = cloneDeep(result);

                        tPlayerState.drawDeck.splice(0, 1);
                    }
                }

                /* reset transport resources */
                tPlayerState.resources.walk = 0;
                tPlayerState.resources.jeep = 0;
                tPlayerState.resources.ship = 0;
                tPlayerState.resources.plane = 0;

                /* reset active effects */
                tPlayerState.activeEffects = [];

                tPlayerState.actions = 1;

                tPlayerState.finishedRound = false;
                tPlayerStates.push(tPlayerState);
            }
            setPlayerStates(tPlayerStates);

            setRound(round + 1);
            console.log("*** END OF ROUND ***");
        } else {
            let tPlayerState = {...playerState};
            tPlayerState.finishedRound = true;
            setPlayerState(tPlayerState);
            nextPlayer();
        }
    }

    return (
        <div className="App">
            <BoardStateContext.Provider value={{
                store: store,
                activeEffects: playerState.activeEffects,
                handleCardEffect: handleClickOnCardEffect,
                handleCardBuy: handleCardBuy,
                handleActiveEffectClickOnCard: handleActiveEffectClickOnCard,
                locations: locations,
                handleClickOnLocation: handleClickOnLocation,
                playerIndex: playerIndex,
                showModal: showModal,
                modalData: modalData,
                handleLocationExploredReward: handleLocationExploredReward,
            }}>
                <PlayerStateContext.Provider value={{
                    playerState: playerState,
                    activeEffects: playerState.activeEffects,
                    cancelEffect: cancelEffect,
                    handleEndRound: handleEndRound,
                    nextPlayer: nextPlayer,
                }}>
                    <Resources handleClickOnResource={handleClickOnResource}/>
                    <Store/>
                    <LocationsArea/>
                    <CardsArea/>
                    <div className="d-inline-flex flex-row text-center">
                        Actions: {playerState.actions}
                        <Controls/>
                        {playerState.activeEffects[0]}
                        {testData}
                        <button onClick={() => handleEmission()}>Handle emission</button>
                    </div>
                    <ModalDialogue/>
                    {testData}
                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
        </div>
    )
}

export default App;