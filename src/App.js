import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cloneDeep from 'lodash/cloneDeep';

import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import Resources from "./components/resources/Resources";
import Store from "./components/store/Store";
import {Controls} from "./components/main/Controls";
import {emptyPlayerState} from "./components/functions/initialStateFunctions";
import {processEffects} from "./components/functions/processEffects.mjs";
import LocationsArea from "./components/locations/LocationsArea";
import {processActiveEffect} from "./components/functions/processActiveEffects";
import {processCardBuy} from "./components/functions/processCardBuy";
import {EFFECT} from "./data/effects.mjs";
import ChooseRewardModal from "./components/locations/LocationExplorationModal";
import {isLocationAdjancentToAdventurer, payForTravelIfPossible} from "./components/locations/locationFunctions.mjs";
import {CARD_TYPE, LOCATION_STATE, TRANSMISSIONS} from "./data/idLists";
import {socket} from "./server/socketConnection";
import {BonusActions} from "./components/bonuses/Bonuses";
import TopSlidingPanel from "./components/main/TopSlidingPanel";
import {getPositionInLocationLine} from "./components/locations/locationFunctions";
import {GUARDIANS} from "./data/cards";

function App() {
    const [playerState, setPlayerState] = useState(emptyPlayerState);
    const [round, setRound] = useState(1);
    const [store, setStore] = useState(null);
    const [locations, setLocations] = useState(null);
    const [legends, setLegends] = useState(null);
    const [isActivePlayer, setIsActivePlayer] = useState(false);

    // rewards are an array with objects describing values: {effects: ..., effectsText: ...}
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [rewardsModalData, setRewardsModalData] = useState([]
    );


    useEffect(() => {
        socket.on(TRANSMISSIONS.getStates, states => {
            console.log("received initial states from server");
            console.log(states);
            setPlayerState(states.playerState);
            setStore(states.store);
            setLocations(states.locations);
            setLegends(states.legends);
            console.log("LEGENDS: ");
            console.log(legends);
            setRound(states.round);
            setIsActivePlayer(states.isActivePlayer);
        });

        socket.on(TRANSMISSIONS.stateUpdate, states => {
            console.log("received states from server");
            console.log(states);
            setPlayerState(states.playerState);
            setStore(states.store);
            setLocations(states.locations);
            setLegends(states.legends);
            setRound(states.round);
            setIsActivePlayer(states.isActivePlayer);
        });

        socket.on(TRANSMISSIONS.testData, data => {
            console.log("*** TEST DATA ***");
            console.log(data);
        })
    }, []);

    /** CARD EFFECTS **/
    function handleClickOnCardEffect(effects, cardIndex, costsAction) {
        let tPlayerState = cloneDeep(playerState);
        let tStore = cloneDeep(store);
        const tCard = tPlayerState.hand[cardIndex];
        console.log("Handling card effects: " + tCard.cardName);
        console.log(effects);

        if (isActivePlayer && (!costsAction || playerState.actions > 0)) {
            console.log("costs action: " + costsAction);
            console.log(playerState.actions);
            if (tCard.type === CARD_TYPE.item || tCard.type === CARD_TYPE.basic ||
                (tCard.type === CARD_TYPE.artifact && tPlayerState.resources.texts > 0)) {
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, effects, null, tStore, null, null);

                tPlayerState = effectsResult.tPlayerState;
                if (tCard.type !== CARD_TYPE.basic && costsAction) {
                    tPlayerState.actions -= 1;
                }
                tStore = effectsResult.tStore;

                /* we push the played card the active cards area... */
                tPlayerState.activeCards.push(tCard);
                /* ...and remove it from the hand */
                tPlayerState.hand.splice(cardIndex, 1);

                /* if the card is an artifact and effect is not a transport, pay for the use */
                if (tCard.type === CARD_TYPE.artifact && costsAction) {
                    tPlayerState.resources.texts -= 1;
                }

                setPlayerState(tPlayerState);
                setStore(tStore);
            }
        }
    }

    /** LOCATION EFFECTS **/
    function handleClickOnLocation(effects, location, locationLine) {
        if (isActivePlayer) {
            console.log("Clicked on location");
            let tPlayerState = cloneDeep(playerState);
            let tLocations = cloneDeep(locations);

            /* Resolve active effects */
            if (tPlayerState.activeEffects.length > 0) {
                const effectResult = processActiveEffect(null, null, {...location}, tPlayerState,
                    null, {...store}, tLocations, setRewardsModal);
                console.log("finished processing");
                setPlayerState(effectResult.tPlayerState);
                setLocations(effectResult.tLocations);
                setStore(effectResult.tStore);
            } else {
                switch (location.state) {
                    case LOCATION_STATE.unexplored:
                        const canExplore = isLocationAdjancentToAdventurer(location, locationLine, tLocations, tPlayerState)
                        if (canExplore) {
                            const resources = tPlayerState.resources;
                            const enoughResources = resources.explore >= location.exploreCost.explore
                                && resources.coins >= location.exploreCost.coins && tPlayerState.actions > 0;
                            if (enoughResources) {
                                resources.coins -= location.exploreCost.coins;
                                resources.explore -= location.exploreCost.explore;
                                tPlayerState.actions -= 1;

                                const locationPosition = getPositionInLocationLine(location, locationLine, locations);
                                tLocations[locationLine][locationPosition].state = LOCATION_STATE.explored;

                                setPlayerState(tPlayerState);
                                setLocations(tLocations);
                                const guardian = GUARDIANS[store.guardians[0].id];
                                // player can choose between effect of location and discovery effect of next guardian
                                setRewardsModalData([{effects: location.effects, effectsText: location.effectsImage},
                                    {effects: guardian.discoveryEffect, effectsText: guardian.discoveryText}]);
                                // guardian is moved to player's discard
                                tPlayerState.discardDeck.push(store.guardians[0]);
                                store.guardians.splice(0, 1);

                                setShowRewardsModal(true);

                            }
                        }
                        break;
                    case
                    LOCATION_STATE.explored
                    :
                        const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                        if (travelCheckResults.enoughResources && tPlayerState.actions > 0) {
                            tPlayerState = travelCheckResults.tPlayerState;
                            tPlayerState.availableAdventurers -= 1;
                            tPlayerState.actions -= 1;
                            const effectsResult = processEffects(null, null, tPlayerState, effects, null,
                                {...store}, location, {...locations});
                            setPlayerState(effectsResult.tPlayerState);

                            let tLocations = cloneDeep(locations);
                            for (let tLocation of tLocations[locationLine]) {
                                if (tLocation.id === location.id) {
                                    tLocation.state = LOCATION_STATE.occupied;
                                    tLocation.owner = playerState.playerIndex;
                                }
                            }
                            setLocations(tLocations);
                        }
                        break;
                    case
                    LOCATION_STATE.occupied
                    :
                        console.log("Location is occupied.");
                        break;
                    default:
                        console.log("Unknown tLocation state in handleClickOnLocation: " + location.state);
                        console.log(location);
                }
            }
        }
    }

    /** HANDLE BONUS / LEGEND **/
    function handleClickOnField(effects) {
        if (isActivePlayer) {
            const effectProcessResults = processEffects(null, null, cloneDeep(playerState), effects,
                null, cloneDeep(store), null, cloneDeep(locations));
            setPlayerState(effectProcessResults.tPlayerState);
            setStore(effectProcessResults.tStore);
            setLocations(effectProcessResults.tLocations);
        }
    }

    /** HANDLE ACTIVE EFFECTS **/
    function handleActiveEffectClickOnCard(card, cardIndex) {
        if (isActivePlayer) {
            const effectProcessResults = processActiveEffect(card, cardIndex, null, cloneDeep(playerState),
                null, {...store}, {...locations}, setRewardsModal);
            const tPlayerState = effectProcessResults.tPlayerState;
            const tStore = effectProcessResults.tStore;
            const tLocations = effectProcessResults.tLocations;
            setPlayerState(tPlayerState);
            setStore(tStore);
            setLocations(tLocations);
        }
    }

    /** HANDLE CLICK ON RESOURCE **/
    function handleClickOnResource(resource) {
        if (isActivePlayer) {
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
    }

    /** BUY A CARD **/
    function handleCardBuy(card, cardIndex) {
        if (isActivePlayer) {
            console.log("Buying card: " + card.cardName + " with effect: " + card.effects);
            if (playerState.actions > 0) {
                const buyResult = processCardBuy(card, cardIndex, cloneDeep(playerState), null,
                    cloneDeep(store), {...locations});
                const tPlayerState = buyResult.tPlayerState;
                const tStore = buyResult.tStore;

                setPlayerState(cloneDeep(tPlayerState));
                setStore(tStore);
            }
        }
    }

    function cancelEffect(effect) {
    }

    /** HANDLE MODAL REWARD EXPLORE **/
    function handleLocationExploredReward(effects) {
        const effectsResult = processEffects(null, null, cloneDeep(playerState), effects,
            null, cloneDeep(store), null, cloneDeep(locations));
        /* costs are only coins and explore => we only need to update playerState */
        let tPlayerState = effectsResult.tPlayerState;
        setPlayerState(effectsResult.tPlayerState);
        setLocations(effectsResult.tLocations);
        setStore(effectsResult.tStore);
        setShowRewardsModal(false);
    }

    /** SET NEXT PLAYER **/
    function nextPlayer() {
        if (isActivePlayer) {
            let tPlayerState = cloneDeep(playerState);
            tPlayerState.actions = 1;
            tPlayerState.activeEffects = [];
            socket.emit(TRANSMISSIONS.nextPlayer, {
                playerState: tPlayerState,
                store: store,
                locations: locations,
                legends: legends
            })
            setPlayerState(tPlayerState);
        }
    }

    /** END OF ROUND **/
    function handleEndRound() {
        if (isActivePlayer) {
            console.log("finishing round");
            socket.emit(TRANSMISSIONS.finishedRound, {
                playerState: playerState,
                store: store,
                locations: locations,
                legends: legends
            })
        }
    }

    function setRewardsModal(rewards) {
        setRewardsModalData(rewards);
        setShowRewardsModal(true);
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
                playerIndex: playerState.playerIndex,
                showModal: showRewardsModal,
                modalData: rewardsModalData,
                handleLocationExploredReward: handleLocationExploredReward,
                legends: legends,
                handleClickOnField: handleClickOnField,
            }}>
                <PlayerStateContext.Provider value={{
                    playerState: playerState,
                    cancelEffect: cancelEffect,
                    handleEndRound: handleEndRound,
                    nextPlayer: nextPlayer,
                    handleClickOnResource: handleClickOnResource,
                }}>
                    <TopSlidingPanel/>
                    <Resources/>
                    <BonusActions handleClickOnBonus={handleClickOnField}/>
                    <Store/>
                    <LocationsArea/>
                    <CardsArea/>
                    <div className="d-inline-flex flex-row text-center">
                        <Controls/><br/>
                    </div>
                    <div>
                        {playerState.activeEffects[0]}
                        {isActivePlayer ? <p>Your turn! Actions: {playerState.actions}</p> :
                            <p>Wait for your turn...</p>}
                    </div>
                    <ChooseRewardModal/>
                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
        </div>
    )
}

export default App;