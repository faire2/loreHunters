import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cloneDeep from 'lodash/cloneDeep';

import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import ResourcesArea, {RESOURCES} from "./components/resources/ResourcesArea";
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
import {
    CARD_STATE,
    CARD_TYPE,
    CARDS_ACTIONLESS,
    INCOME_LEVEL,
    INCOME_STATE,
    LOCATION_IDs,
    LOCATION_LEVEL,
    LOCATION_STATE,
    TRANSMISSIONS
} from "./data/idLists";
import {socket} from "./server/socketConnection";
import {BonusActions} from "./components/bonuses/BonusActions";
import BottomSlidingPanel from "./components/main/BottomSlidingPanel";
import {getPositionInLocationLine, occupyLocation} from "./components/locations/locationFunctions";
import {GUARDIANS} from "./data/cards";
import {getIsRewardDue, processLegend} from "./components/legends/legendsFunctions";
import ChooseLegendRewardModal from "./components/legends/ChooseLegendRewardModal";
import {RelicsArea} from "./components/relics/RelicsArea";
import {LegendsArea} from "./components/legends/LegendsArea";
import {handleIncomes} from "./server/serverFunctions";
import {processUptrade} from "./components/resources/resourcesFunctions";
import {handleGuardianArrival, processIncomeTile} from "./components/functions/processEffects";
import {ExtendPanelButton} from "./components/main/ExtendPanelButton";
import {useHistory} from "react-router-dom";
import {OpponentPlayArea} from "./components/main/OpponentPlayArea";

function GameBoard(props) {
    const history = useHistory();
    if (!props.location.data) {
        history.push({pathname: "/", data: {}});
    }
    const initialRoom = props.location.data.room;
    const initialStates = props.location.data.room.states;
    const initialIndex = props.location.data.playerIndex;
    const numOfPlayers = initialRoom.numOfPlayers;

    const [playerState, setPlayerState] = useState(initialStates.playerStates[initialIndex]);
    const [round, setRound] = useState(initialStates.round);
    const [store, setStore] = useState(initialStates.store);
    const [locations, setLocations] = useState(initialStates.locations);
    const [legends, setLegends] = useState(initialStates.legends);
    const [previousPlayer, setPreviousPlayer] = useState(0);
    const [isActivePlayer, setIsActivePlayer] = useState(initialIndex === initialStates.activePlayer);

    const emptyPlayerStates = [];
    for (let i = 0; i < numOfPlayers; i++) {
        emptyPlayerStates.push(emptyPlayerState)
    }
    const [playerStates, setPlayerStates] = useState(emptyPlayerStates);

    // rewards are an array with objects describing values: {effects: ..., effectsText: ...}
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [rewardsModalData, setRewardsModalData] = useState([]);
    const [showChooseExpeditionModal, setShowChooseExpeditionModal] = useState(false);
    const [chooseExpeditionModalData, setChooseExpeditionModalData] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);

    const [extendBottomPanel, setExtendBottomPanel] = useState(false);
    useEffect(() => {

        /*socket.on(TRANSMISSIONS.getStates, states => {
            console.log("received initial states from server");
            console.log(states);


            setPlayerState(states.playerState);
            setPlayerStates(states.playerStates);
            setStore(states.store);
            setLocations(states.locations);
            setLegends(states.legends);
            setRound(states.round);
            setIsActivePlayer(states.isActivePlayer);
            setPreviousPlayer(states.previousPlayer);
        });*/

        socket.on(TRANSMISSIONS.stateUpdate, states => {
            console.log("received states from server");
            console.log(states);
            setPlayerStates(states.playerStates);
            setPlayerState(states.playerStates[initialIndex]);
            setStore(states.store);
            setLocations(states.locations);
            setLegends(states.legends);
            setRound(states.round);
            setIsActivePlayer(states.activePlayer === initialIndex);
            setPreviousPlayer(states.previousPlayer);
        });

        socket.on(TRANSMISSIONS.scoringStates, data => {
            console.log("Rerouting to scoring page");
            history.push({pathname: "/scoring", data: data})
        })
    }, [history, initialIndex, playerState.firstTurn, store]);

    useEffect(() => {
        if (playerState.firstTurn && isActivePlayer) {
            let tStore = store;
            playerState.firstTurn = false;
            const expeditionsArr = [tStore.expeditions[0], tStore.expeditions[1]];
            tStore.expeditions.splice(0, 2);
            setStore(tStore);
            setChooseExpeditionModalData(expeditionsArr);
            setShowChooseExpeditionModal(true);
        }}, [isActivePlayer]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    });

   /* useEffect(() => {
        socket.emit(TRANSMISSIONS.sendGameStates, {username: props.location.data.username, room: props.);
    })*/

    function handleKeyPress(e) {
        if (e.keyCode === 32) {
            setExtendBottomPanel(value => !value)
        }
    }

    /** CARD EFFECTS **/
    function handleClickOnCardEffect(effects, cardIndex, costsAction, tCard) {
        let tPlayerState = cloneDeep(playerState);
        let tStore = cloneDeep(store);
        console.log("Handling card effects: " + tCard.cardName);
        console.log(effects);

        let isAllowed = false;
        if (tCard.type === CARD_TYPE.artifact) {
            isAllowed = !costsAction || tPlayerState.resources.texts > 0
        }

        if (isActivePlayer && (!costsAction || playerState.actions > 0)) {
            if (tCard.type === CARD_TYPE.item || tCard.type === CARD_TYPE.basic || tCard.type === CARD_TYPE.guardian ||
                (tCard.type === CARD_TYPE.artifact && isAllowed)) {
                if (tCard.state === CARD_STATE.inHand || tCard.state === undefined) {
                    tPlayerState.activeCards.push(tCard);
                    tCard.state = CARD_STATE.active;
                    tPlayerState.hand.splice(cardIndex, 1);
                }
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, effects, null, tStore, null, null);
                tPlayerState = effectsResult.tPlayerState;
                if (tCard.type !== CARD_TYPE.basic && costsAction && effectsResult.processedAllEffects
                    && !CARDS_ACTIONLESS.includes(tCard.id)) {
                    tPlayerState.actions -= 1;
                }
                tStore = effectsResult.tStore;

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
            // explore any location with discount is processed during location exploration
            if (tPlayerState.activeEffects.length > 0 && tPlayerState.activeEffects[0] !== EFFECT.exploreAnyLocationWithDiscount4) {
                const effectResult = processActiveEffect(null, null, {...location}, tPlayerState,
                    null, {...store}, tLocations, setRewardsModal);
                console.log("finished processing");
                setPlayerState(effectResult.tPlayerState);
                setLocations(effectResult.tLocations);
                setStore(effectResult.tStore);
            } else {
                switch (location.state) {
                    case LOCATION_STATE.unexplored:
                        const exploreAnywhereWithDiscount = playerState.activeEffects[0] === EFFECT.exploreAnyLocationWithDiscount4;
                        if (exploreAnywhereWithDiscount) {tPlayerState.activeEffects.splice(0)}
                        if (isLocationAdjancentToAdventurer(location, locationLine, tLocations, tPlayerState) || exploreAnywhereWithDiscount) {
                            const resources = tPlayerState.resources;

                            let exploreCost = location.exploreCost.explore;
                            if (exploreAnywhereWithDiscount) {
                                exploreCost = exploreCost < 5 ? 0 : exploreCost - 4;
                            }
                            const coinsCost = location.exploreCost.coins;
                            const enoughResources = resources.explore >= exploreCost && resources.coins >= coinsCost
                                && (tPlayerState.actions > 0 || exploreAnywhereWithDiscount);

                            if (enoughResources) {
                                resources.coins -= coinsCost;
                                resources.explore -= exploreCost;
                                tPlayerState.actions -= exploreAnywhereWithDiscount ? 0 : 1;

                                const locationPosition = getPositionInLocationLine(location, locationLine, locations);
                                tLocations[locationLine][locationPosition].state = LOCATION_STATE.explored;

                                setLocations(tLocations);
                                // player can choose between effect of location and discovery effect of next guardian
                                const guardian = GUARDIANS[store.guardians[0].id];
                                const locationLevel = LOCATION_IDs[location.id].level;
                                // guardian effects are different when location level is 2 and 3
                                const guardianText = locationLevel === LOCATION_LEVEL["2"] ? guardian.discoveryTextRow :
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}>{guardian.discoveryTextRow}{guardian.discoveryTextRow2}</div>;
                                const guardianEffects = locationLevel === LOCATION_LEVEL["2"] ? guardian.discoveryEffect :
                                    [...guardian.discoveryEffect, ...guardian.discoveryEffect2];

                                tPlayerState.resources.shinies += 1;
                                // guardian is moved to player's discard
                                const guardianResults = handleGuardianArrival(tPlayerState, cloneDeep(store), round);
                                setStore(guardianResults.tStore);
                                setPlayerState(guardianResults.tPlayerState);
                                setRewardsModalData([{effects: location.effects, effectsText: location.effectsImage},
                                    {effects: guardianEffects, effectsText: guardianText}]);
                                setShowRewardsModal(true);
                                setIsModalActive(true);
                            }
                        }
                        break;
                    case
                    LOCATION_STATE.explored:
                        const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                        if (travelCheckResults.enoughResources && tPlayerState.actions > 0 && tPlayerState.availableAdventurers > 0) {
                            const effectsResult = processEffects(null, null, travelCheckResults.tPlayerState, effects, null,
                                {...store}, location, {...locations});
                            if (effectsResult.processedAllEffects) {
                                tPlayerState = effectsResult.tPlayerState;
                                tPlayerState.availableAdventurers -= 1;
                                tPlayerState.actions -= 1;
                                setPlayerState(tPlayerState);
                                let tLocations = occupyLocation(cloneDeep(locations), location.id, locationLine, tPlayerState.playerIndex);
                                setLocations(tLocations);
                            } else {
                                console.log("Some effects were not processed. Location could not be used.");
                            }
                        }
                        break;
                    case
                    LOCATION_STATE.occupied:
                        console.log("Location is occupied.");
                        break;
                    default:
                        console.log("Unknown tLocation state in handleClickOnLocation: " + location.state);
                        console.log(location);
                }
            }
        }
    }

    /** HANDLE MODAL EXPLORE **/
    function handleLocationExploredReward(effects) {
        const effectsResult = processEffects(null, null, cloneDeep(playerState), effects,
            null, cloneDeep(store), null, cloneDeep(locations));
        /* costs are only coins and explore => we only need to update playerState */
        setPlayerState(effectsResult.tPlayerState);
        setLocations(effectsResult.tLocations);
        setStore(effectsResult.tStore);
        setShowRewardsModal(false);
        setIsModalActive(false);
    }


    /** HANDLE BONUS **/
    function handleClickOnBonusAction(effects) {
        if (isActivePlayer) {
            const effectProcessResults = processEffects(null, null, cloneDeep(playerState), effects,
                null, cloneDeep(store), null, cloneDeep(locations));
            setPlayerState(effectProcessResults.tPlayerState);
            setStore(effectProcessResults.tStore);
            setLocations(effectProcessResults.tLocations);
        }
    }

    /** HANDLE CLICK ON LEGEND **/
    function handleClickOnLegend(legendIndex, columnIndex, fieldIndex, boons) {
        if (isActivePlayer && (playerState.actions > 0 || playerState.activeEffects.length > 0)) {
            const legendResult = processLegend(cloneDeep(legends), legendIndex, columnIndex, fieldIndex, boons,
                cloneDeep(playerState), cloneDeep(store), cloneDeep(locations))
            if (legendResult) {
                const tStore = legendResult.tStore;
                // first four columns award extra rewards when all player's tokens reach them
                if (columnIndex < 4) {
                    const isRewardDue = getIsRewardDue(columnIndex, legendResult.positions);
                    if (isRewardDue) {
                        if (columnIndex === 1 || columnIndex === 3) {
                            const expeditionsArr = [store.expeditions[0], store.expeditions[1]];
                            setChooseExpeditionModalData(expeditionsArr);
                        } else if (columnIndex === 0) {
                            const incomeArr = [store.incomes1Offer[0], store.incomes1Offer[1]];
                            setChooseExpeditionModalData(incomeArr);
                        } else if (columnIndex === 2) {
                            const incomeArr = [store.incomes2Offer[0], store.incomes2Offer[1]];
                            setChooseExpeditionModalData(incomeArr);
                        }
                        setShowChooseExpeditionModal(true);
                        setIsModalActive(true);
                    }
                }
                setPlayerState(legendResult.tPlayerState);
                setLocations(legendResult.tLocations);
                setLegends(legendResult.tLegends);
                setStore(tStore);
                return legendResult.tLegends;
            }
        }
    }

    /** HANDLE LEGEND REWARD MODAL **/
    function handleLegendReward(idElement, isGoalCard, index) {
        setShowChooseExpeditionModal(false);
        setIsModalActive(false);
        setChooseExpeditionModalData([]);
        let tPlayerState = cloneDeep(playerState);
        let tStore = cloneDeep(store);
        if (isGoalCard) {
            tPlayerState.victoryCards.push(idElement);
            tStore.expeditions.push(tStore[index]);
            tStore.expeditions.splice(0, 2);
        } else {
            idElement.state = INCOME_STATE.ready;
            tPlayerState.incomes.push(idElement);
            if (idElement.level === INCOME_LEVEL.silver) {
                tStore.incomes1Offer.splice(index, 1, tStore.incomes1Deck[0]);
                tStore.incomes1Deck.splice(0, 1);
            } else {
                tStore.incomes2Offer.splice(index, 1, tStore.incomes1Deck[0]);
                tStore.incomes2Deck.splice(0, 1);
            }
            tPlayerState = handleIncomes(tPlayerState);
        }
        setPlayerState(tPlayerState);
        setStore(tStore);
    }

    /** HANDLE ACTIVE EFFECTS **/
    function handleActiveEffectClickOnCard(card, cardIndex) {
        if (isActivePlayer) {
            const effectProcessResults = processActiveEffect(card, cardIndex, null, cloneDeep(playerState),
                null, {...store}, {...locations}, setRewardsModal);
            if (effectProcessResults.processGuardian) {
                const guardianResult = handleGuardianArrival(effectProcessResults.tPlayerState, effectProcessResults.tStore,
                    round);
                effectProcessResults.tPlayerState = guardianResult.tPlayerState;
                effectProcessResults.tStore = guardianResult.tStore;
            }
            setPlayerState(effectProcessResults.tPlayerState);
            setStore(effectProcessResults.tStore);
            setLocations(effectProcessResults.tLocations);
        }
    }

    /** HANDLE CLICK ON RESOURCE **/
    function handleClickOnResource(resource) {
        if (isActivePlayer) {
            const tPlayerState = cloneDeep(playerState);
            console.log("Handling click on resource: " + resource);
            if (playerState.activeEffects[0] === EFFECT.uptrade && playerState.resources[resource] > 0) {
                tPlayerState.activeEffects.splice(0, 1);
                setPlayerState(processUptrade(tPlayerState, resource));
            } else if (playerState.activeEffects[0] === EFFECT.progressWithTextsOrWeapon
                && (resource === RESOURCES.TEXTS || resource === RESOURCES.WEAPONS)) {
                if (resource === RESOURCES.TEXTS) {
                    tPlayerState.activeEffects.splice(0, 1, EFFECT.progressWithTexts);
                } else {
                    tPlayerState.activeEffects.splice(0, 1, EFFECT.progressWithWeapon);
                }
                setPlayerState(tPlayerState);
            }
        }
    }

    /** HANDLE CLICK ON INCOME TILE **/
    function handleClickOnIncomeTile(effects, incomeId) {
        setPlayerState(processIncomeTile(effects, incomeId, cloneDeep(playerState)))
    }

    /** HANDLE CLICK ON RELIC **/
    function handleClickOnRelic(effects, effectIndex) {
        let tPlayersState = cloneDeep(playerState);
        if (tPlayersState.relics[effectIndex] && tPlayersState.resources.shinies > 0) {
            let effectsResult = processEffects(null, null, tPlayersState, effects, null,
                cloneDeep(store), null, cloneDeep(locations), null);
            tPlayersState = effectsResult.tPlayerState;
            tPlayersState.relics[effectIndex] = false;
            tPlayersState.resources.shinies -= 1;
            setPlayerState(effectsResult.tPlayerState);
        }
    }

    /** BUY A CARD **/
    function handleCardBuy(card, cardIndex) {
        if (isActivePlayer) {
            console.log("Buying card: " + card.cardName + " with effect: " + card.effects);
            if (playerState.actions > 0) {
                const buyResult = processCardBuy(card, cardIndex, cloneDeep(playerState), null,
                    cloneDeep(store), round);
                let tPlayerState = buyResult.tPlayerState;
                let tStore = buyResult.tStore;
                if (buyResult.processGuardian) {
                    const guardianResult = handleGuardianArrival(tPlayerState, tStore, round);
                    tPlayerState = guardianResult.tPlayerState;
                    tStore = guardianResult.tStore;
                }
                setPlayerState(cloneDeep(tPlayerState));
                setStore(tStore);
            }
        }
    }

    /*function cancelEffect(effect) {
    }*/

    /** SET NEXT PLAYER **/

    if (playerState.actions < 1 && playerState.activeEffects.length === 0 && !isModalActive) {
        nextPlayer();
    }

    function nextPlayer() {
        if (isActivePlayer) {
            let tPlayerState = cloneDeep(playerState);
            // used to trigger goal reward modal at the beginning of the game
            if (tPlayerState.firstTurn) {
                tPlayerState.firstTurn = false
            }
            tPlayerState.actions = 1;
            tPlayerState.activeEffects = [];
            socket.emit(TRANSMISSIONS.nextPlayer, {
                roomName: initialRoom.name,
                playerState: tPlayerState,
                store: store,
                locations: locations,
                legends: legends
            });
            setPlayerState(tPlayerState);
        }
    }

    /** END OF ROUND **/
    function handleEndRound() {
        if (isActivePlayer) {
            console.log("finishing round");
            socket.emit(TRANSMISSIONS.finishedRound, {
                roomName: initialRoom.name,
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

    const boardStateContextValues = {
        playerState: playerState,
        playerIndex: playerState.playerIndex,
        store: store,
        legends: legends,
        setLegends: setLegends,
        locations: locations,
        activeEffects: playerState.activeEffects,
        showModal: showRewardsModal,
        modalData: rewardsModalData,
        showChooseExpeditionModal: showChooseExpeditionModal,
        chooseExpeditionModalData: chooseExpeditionModalData,
        round: round,
        numOfPlayers: numOfPlayers,
        handleCardEffect: handleClickOnCardEffect,
        handleCardBuy: handleCardBuy,
        handleActiveEffectClickOnCard: handleActiveEffectClickOnCard,
        handleClickOnLocation: handleClickOnLocation,
        handleLocationExploredReward: handleLocationExploredReward,
        handleClickOnLegend: handleClickOnLegend,
        handleExpeditionReward: handleLegendReward,
        handleClickOnIncomeTile: handleClickOnIncomeTile
    };

    const playerStateContextValues = {
        playerState: playerState,
        playerStates: playerStates,
        isActivePlayer: isActivePlayer,
        previousPlayer: previousPlayer,
        round: round,
        numOfPlayers: numOfPlayers,
        handleEndRound: handleEndRound,
        nextPlayer: nextPlayer,
        handleClickOnResource: handleClickOnResource,
        handleClickOnRelic: handleClickOnRelic,
    };

    return (
        <div className="App">
            <BoardStateContext.Provider value={boardStateContextValues}>
                <PlayerStateContext.Provider value={playerStateContextValues}>
                    <LocationsArea/>
                    <div style={{marginLeft: "3vw"}}>
                        <BonusActions handleClickOnBonus={handleClickOnBonusAction}/>
                        <Store/>
                    </div>
                    <CardsArea/>
                    <LegendsArea/>
                    <ResourcesArea/>
                    <RelicsArea/>
                    <Controls/><br/>
                    <OpponentPlayArea/>
                    <BottomSlidingPanel extendPanel={extendBottomPanel} setExtendPanel={setExtendBottomPanel}/>
                    <ChooseRewardModal/>
                    <ChooseLegendRewardModal/>
                    <ExtendPanelButton setExtendPanel={setExtendBottomPanel} extendPanel={extendBottomPanel}/>
                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
        </div>
    )
}

export default GameBoard;