import React, {useContext, useEffect, useState} from 'react';
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
import ChooseRewardModal from "./components/main/ChooseRewardModal";
import {isLocationAdjancentToAdventurer, payForTravelIfPossible} from "./components/locations/locationFunctions.mjs";
import {
    ACTION_TYPE,
    CARD_STATE,
    CARD_TYPE,
    CARDS_ACTIONLESS,
    LOCATION_IDs,
    LOCATION_LEVEL,
    LOCATION_STATE,
    REWARD_TYPE,
    TRANSMISSIONS
} from "./data/idLists";
import {socket} from "./server/socketConnection";
import {BonusActions} from "./components/bonuses/BonusActions";
import BottomSlidingPanel from "./components/main/BottomSlidingPanel";
import {
    getPositionInLocationLine,
    occupyLocation,
    processExplorationDiscount
} from "./components/locations/locationFunctions";
import {GUARDIANS} from "./data/cards";
import {getIsRewardDue, processLegend} from "./components/legends/legendsFunctions";
import {RelicsArea} from "./components/relics/RelicsArea";
import {LegendsArea} from "./components/legends/LegendsArea";
import {processUptrade} from "./components/resources/resourcesFunctions";
import {handleGuardianArrival, processIncomeTile} from "./components/functions/processEffects";
import {ExtendPanelButton} from "./components/main/ExtendPanelButton";
import {useHistory} from "react-router-dom";
import {OpponentPlayArea} from "./components/main/OpponentPlayArea";
import {addLogEntry, gameLog, setGameLog} from "./components/main/logger";

function GameBoard(props) {
    console.log("** render **");
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

    // rewards are an array with objects describing values: {type: ..., data: [{effects: ..., effectsText: ...}, ...]
    const [rewardsModalData, setRewardsModalData] = useState([]);
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    /** INITIATE REWARDS MODAL **/
    function initiateRewardsModal(rewardsData) {
        console.log("Rewards data: ");
        console.log(rewardsData);
        let tRewardsModalData = cloneDeep(rewardsModalData);
        // rewards can come as a reward object or as an array of reward objects
        if (Array.isArray(rewardsData)) {
            for (let reward of rewardsData) {
                tRewardsModalData.push(reward);
            }
        } else {
            tRewardsModalData.push(rewardsData);
        }
        setRewardsModalData(tRewardsModalData);
        setShowRewardsModal(true);
        setIsModalActive(true);
    }

    /** PROCESS REWARD MODAL **/
    function handleRewards(tPlayerState, tStore, finishRound, moreRewardsToProcess) {
        setPlayerState(tPlayerState);
        setStore(tStore);
        if (!moreRewardsToProcess) {
            setRewardsModalData([]);
            setShowRewardsModal(false);
            setIsModalActive(false);
        } else {
            const tRewardsModalData = cloneDeep(rewardsModalData);
            tRewardsModalData.splice(0, 1);
            setRewardsModalData(tRewardsModalData);
        }
        if (finishRound) {
            handleEndRound();
            // we have to avoid triggering passing round to next player call
            tPlayerState.activeEffects.push("finishing round");
        }
    }

    /** USE EFFECTS **/
    const [extendBottomPanel, setExtendBottomPanel] = useState(false);
    useEffect(() => {
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
            setGameLog(states.gameLog);
        });

        socket.on(TRANSMISSIONS.scoringStates, data => {
            console.log("Rerouting to scoring page");
            history.push({pathname: "/scoring", data: data})
        });

        socket.on("disconnect", reason => {
            console.log("Client disconnected: " + reason);
            history.push({pathname: "/", data: {}});
        })
    }, []);

    useEffect(() => {
        if (playerState.firstTurn && isActivePlayer) {
            let tStore = store;
            playerState.firstTurn = false;
            initiateRewardsModal({type: REWARD_TYPE.card, data: [tStore.expeditions[0], tStore.expeditions[1]]});
            tStore.expeditions.splice(0, 2);
            setStore(tStore);
        }
    }, [isActivePlayer]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    });

    useEffect(() => {
        setGameLog(initialStates.gameLog);
        console.log("game log updated with initial data");
    }, []);

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

                /* some card need rewards modal window to choose between possible effects */
                if (effectsResult.showRewardsModal) {
                    initiateRewardsModal(effectsResult.rewardsData);
                }

                setPlayerState(tPlayerState);
                setStore(tStore);
                addLogEntry(tPlayerState, costsAction ? ACTION_TYPE.playsCard : ACTION_TYPE.playsCardWithoutAction,
                    tCard.id, null);
            }
        } else {
            console.log("Card action could not be processed - player has no actions.");
        }
    }

    /** LOCATION EFFECTS **/
    function handleClickOnLocation(effects, exploreCostEffects, location, locationLine) {
        if (isActivePlayer) {
            console.log("Clicked on location " + location.id);
            let tPlayerState = cloneDeep(playerState);
            let tLocations = cloneDeep(locations);

            /* Resolve active effects */
            // explore any location with discount is processed during location exploration
            if (tPlayerState.activeEffects.length > 0 && (tPlayerState.activeEffects[0] !== EFFECT.exploreAnyLocationWithDiscount4
                && tPlayerState.activeEffects[0] !== EFFECT.exploreAnyLocationWithDiscount3)) {
                const effectResult = processActiveEffect(null, null, {...location}, tPlayerState,
                    null, {...store}, tLocations, setRewardsModal);
                console.log("finished processing active effects in location");
                setPlayerState(effectResult.tPlayerState);
                setLocations(effectResult.tLocations);
                setStore(effectResult.tStore);
            } else {
                switch (location.state) {
                    case LOCATION_STATE.unexplored:
                        console.log("Exloring location initialized.");
                        const exploreDiscount = playerState.activeEffects[0] === EFFECT.exploreAnyLocationWithDiscount3
                            ||playerState.activeEffects[0] === EFFECT.exploreAnyLocationWithDiscount4;
                        if (exploreDiscount) {
                            tPlayerState.activeEffects.splice(0)
                        }
                        if (isLocationAdjancentToAdventurer(location, locationLine, tLocations, tPlayerState) || exploreDiscount) {
                            if (exploreDiscount) {
                                exploreCostEffects = processExplorationDiscount(playerState.activeEffects[0], exploreCostEffects)
                            }
                            const explorationCostResult = processEffects(null, null, tPlayerState, exploreCostEffects,
                                null, null, location, null);
                            if (explorationCostResult.processedAllEffects) {
                                tPlayerState = explorationCostResult.tPlayerState;
                                tPlayerState.actions -= exploreDiscount ? 0 : 1;

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
                                initiateRewardsModal({
                                    type: REWARD_TYPE.effectsArr,
                                    data: [{effects: location.effects, effectsText: location.effectsText},
                                        {effects: guardianEffects, effectsText: guardianText}]
                                });
                                addLogEntry(tPlayerState, ACTION_TYPE.exploresLocation, location.id,
                                    exploreCostEffects);
                            } else {
                                console.log("Not enough resources to explore location.");
                            }
                        } else {
                            console.log("Location is not adjacent.");
                        }
                        break;
                    case
                    LOCATION_STATE.explored:
                        const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                        if (travelCheckResults.enoughResources && tPlayerState.actions > 0 && tPlayerState.availableAdventurers > 0) {
                            const effectsResult = processEffects(null, null, travelCheckResults.tPlayerState, effects, null,
                                {...store}, location, {...locations});
                            if (effectsResult.processedAllEffects) {
                                console.log("Location effects have been processed.");
                                tPlayerState = effectsResult.tPlayerState;
                                tPlayerState.availableAdventurers -= 1;
                                tPlayerState.actions -= 1;
                                setPlayerState(tPlayerState);
                                let tLocations = occupyLocation(cloneDeep(locations), location.id, locationLine, tPlayerState.playerIndex);
                                setLocations(tLocations);
                                addLogEntry(tPlayerState, ACTION_TYPE.activatesLocation, location.id, effects)
                            } else {
                                console.log("Some effects were not processed. Location could not be used.");
                            }
                        } else {
                            console.log("Location could not be used. Travel possible: " + travelCheckResults.enoughResources);
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

    /** HANDLE BONUS **/
    function handleClickOnBonusAction(effects) {
        if (isActivePlayer) {
            const effectProcessResults = processEffects(null, null, cloneDeep(playerState), effects,
                null, cloneDeep(store), null, cloneDeep(locations));
            setPlayerState(effectProcessResults.tPlayerState);
            setStore(effectProcessResults.tStore);
            setLocations(effectProcessResults.tLocations);
            addLogEntry(playerState, ACTION_TYPE.usesBonusAction, null, effects)
        }
    }

    /** HANDLE CLICK ON LEGEND **/
    function handleClickOnLegend(legendIndex, columnIndex, fieldIndex, boons) {
        if (isActivePlayer && (playerState.actions > 0 || playerState.activeEffects.length > 0)) {
            const legendResult = processLegend(cloneDeep(legends), legendIndex, columnIndex, fieldIndex, boons,
                cloneDeep(playerState), cloneDeep(store), cloneDeep(locations));
            if (legendResult) {
                const tStore = legendResult.tStore;
                const rewardsData = [];
                // first four columns award extra rewards when non-first player's tokens reach them
                const isRewardDue = getIsRewardDue(columnIndex, legendResult.positions);
                if (isRewardDue) {
                    if (columnIndex === 1) {
                        const expeditionsArr = [store.expeditions[0], store.expeditions[1]];
                        rewardsData.push({type: REWARD_TYPE.card, data: expeditionsArr});
                    } else if (columnIndex === 0) {
                        const incomeArr = [store.incomes1Offer[0], store.incomes1Offer[1]];
                        rewardsData.push({type: REWARD_TYPE.incomeToken, data: incomeArr});
                    } else if (columnIndex === 2) {
                        const incomeArr = [store.incomes2Offer[0], store.incomes2Offer[1]];
                        rewardsData.push({type: REWARD_TYPE.incomeToken, data: incomeArr});
                    }
                }
                /* some card need rewards modal window to choose between possible effects */
                if (legendResult.showRewardsModal) {
                    rewardsData.push(legendResult.rewardsData);
                }
                if (rewardsData.length > 0) {
                    initiateRewardsModal(rewardsData);
                }
                setPlayerState(legendResult.tPlayerState);
                setLocations(legendResult.tLocations);
                setLegends(legendResult.tLegends);
                setStore(tStore);
                return legendResult.tLegends;
            }
        }
    }

    /** HANDLE ACTIVE EFFECTS **/
    function handleActiveEffectClickOnCard(card, cardIndex) {
        if (isActivePlayer) {
            const effectProcessResults = processActiveEffect(card, cardIndex, null, cloneDeep(playerState),
                null, {...store}, {...locations}, initiateRewardsModal);
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
                && (resource === RESOURCES.texts || resource === RESOURCES.weapons)) {
                if (resource === RESOURCES.texts) {
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
        const tPlayerState = processIncomeTile(effects, incomeId, cloneDeep(playerState));
        setPlayerState(tPlayerState);
        addLogEntry(tPlayerState, ACTION_TYPE.usesAssistant, incomeId, effects);
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
            addLogEntry(tPlayersState, ACTION_TYPE.placesRelic, null, effects);
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

    /** CANCEL EFFECTS **/
    function cancelEffects() {
        let tPlayerState = cloneDeep(playerState);
        tPlayerState.activeEffects = [];
        setPlayerState(tPlayerState);
    }

    /** UNDO / RESET TURN **/
    function undo() {
        socket.emit(TRANSMISSIONS.resetTurn, initialRoom.name);
    }

    /** SET NEXT PLAYER **/
    if (playerState.actions < 1 && playerState.activeEffects.length === 0 && !isModalActive) {
        addLogEntry(playerState, ACTION_TYPE.endOfTurn, null, null);
        console.log("next player ");
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
                legends: legends,
                gameLog: gameLog,
            });
            setPlayerState(tPlayerState);
        }
    }

    /** END OF ROUND **/
    function handleEndRound() {
        if (isActivePlayer) {
            addLogEntry(playerState, ACTION_TYPE.finishesRound, null, null);
            console.log("finishing round");
            socket.emit(TRANSMISSIONS.finishedRound, {
                roomName: initialRoom.name,
                playerState: playerState,
                store: store,
                locations: locations,
                legends: legends,
                gameLog: gameLog
            });
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
        round: round,
        numOfPlayers: numOfPlayers,
        handleCardEffect: handleClickOnCardEffect,
        handleCardBuy: handleCardBuy,
        handleActiveEffectClickOnCard: handleActiveEffectClickOnCard,
        handleClickOnLocation: handleClickOnLocation,
        handleReward: handleRewards,
        handleClickOnLegend: handleClickOnLegend,
        handleClickOnIncomeTile: handleClickOnIncomeTile,
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
        cancelEffects: cancelEffects,
        undo: undo,
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
                    <ExtendPanelButton setExtendPanel={setExtendBottomPanel} extendPanel={extendBottomPanel}/>
                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
        </div>
    )
}

export default GameBoard;
