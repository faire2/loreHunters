import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cloneDeep from 'lodash/cloneDeep';

import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import ResourcesArea from "./components/resources/ResourcesArea";
import Store from "./components/store/Store";
import {Controls} from "./components/main/Controls";
import {processEffects} from "./components/functions/processEffects.mjs";
import LocationsArea from "./components/locations/LocationsArea";
import {processActiveEffect} from "./components/functions/processActiveEffects";
import {processCardBuy} from "./components/functions/processCardBuy";
import {EFFECT} from "./data/effects.mjs";
import ChooseRewardModal from "./components/rewardsModal/ChooseRewardModal";
import {socket} from "./server/socketConnection";
import BottomSlidingPanel from "./components/main/BottomSlidingPanel";
import {RelicsArea} from "./components/relics/RelicsArea";
import {LegendsArea} from "./components/legends/LegendsArea";
import {processUptrade} from "./components/resources/resourcesFunctions";
import {ShowModalButton} from "./components/main/ShowModalButton";
import {useHistory} from "react-router-dom";
import {OpponentPlayArea} from "./components/main/OpponentPlayArea";
import {addLogEntry, gameLog, setGameLog, setLogLegends} from "./components/main/logger";
import RightSlidingPanel from "./components/main/RightSlidingPanel";
import Spinner from "react-bootstrap/Spinner";
import TopSlidingPanel from "./components/main/TopSlidingPanel";
import {processLocation} from "./components/locations/functions/processLocation";
import {
    ACTION_TYPE,
    ASSISTANT_STATE,
    CARD_STATE,
    CARD_TYPE,
    LCL_STORAGE,
    RELIC,
    REWARD_TYPE,
    TRANSMISSIONS
} from "./components/functions/enums";
import LeftSlidingPanel from "./components/main/LeftSlidingPanel";
import {handleGuardianArrival} from "./components/functions/guardians/handleGuardianArrival";
import {processLegend} from "./components/legends/functions/processLegend";

function GameBoard(props) {
    console.log("** render **");

    /** GAME STATES **/
    const [roomName, setRoomName] = useState(null);
    const [playerIndex, setPlayerIndex] = useState(null);
    const [playerState, setPlayerState] = useState(null);
    const [playerStates, setPlayerStates] = useState(null);
    const [legends, setLegends] = useState(null);
    const [locations, setLocations] = useState(null);
    const [store, setStore] = useState(null);
    const [round, setRound] = useState(null);
    const [previousPlayer, setPreviousPlayer] = useState(null);
    const [isActivePlayer, setIsActivePlayer] = useState(null);
    const [numOfPlayers, setNumOfPlayers] = useState(null);
    const [statesLoading, setStatesLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        /** TRANSMISSIONS **/
        socket.on(TRANSMISSIONS.stateUpdate, states => {
            console.log("received states from server");
            console.log(states);
            const tPlayerIndex = playerIndex ? playerIndex : parseInt(localStorage.getItem(LCL_STORAGE.playerIndex), 10);
            setPlayerStates(states.playerStates);
            setPlayerState(states.playerStates[tPlayerIndex]);
            setStore(states.store);
            setLocations(states.locations);
            setLegends(states.legends);
            setRound(states.round);
            setIsActivePlayer(states.activePlayer === tPlayerIndex);
            setPreviousPlayer(states.previousPlayer);
            setNumOfPlayers(states.numOfPlayers);
            setLogLegends(states.legends);
            setGameLog(states.gameLog);
            setStatesLoading(false);
        });

        socket.on(TRANSMISSIONS.scoringStates, data => {
            console.log("Rerouting to scoring page");
            history.push({pathname: "/scoring", data: data})
        });

        /** INITIAL SETUP **/
        if (props.location.data) {
            console.log("Setting initial game data.");
            const roomName = props.location.data.room.states.roomName;
            const states = props.location.data.room.states;
            const playerIndex = props.location.data.playerIndex;
            setRoomName(roomName);
            setPlayerIndex(playerIndex);
            setPlayerState(states.playerStates[playerIndex]);
            setLegends(states.legends);
            setLocations(states.locations);
            setStore(states.store);
            setRound(states.round);
            setPreviousPlayer(states.previousPlayer);
            setIsActivePlayer(states.activePlayer === playerIndex);
            setNumOfPlayers(states.numOfPlayers);
            setStatesLoading(false);

            setLogLegends(states.legends);
            setGameLog(states.gameLog);
            console.log("game log updated with initial data");
            localStorage.setItem(LCL_STORAGE.roomName, roomName);
            localStorage.setItem(LCL_STORAGE.playerIndex, playerIndex);
        } else if (localStorage.getItem(LCL_STORAGE.roomName)) {
            console.log("Requesting for game data after reload");
            setRoomName(localStorage.getItem(LCL_STORAGE.roomName));
            const playerIndex = parseInt(localStorage.getItem(LCL_STORAGE.playerIndex), 10);
            console.log("setting player index to: " + playerIndex);
            setPlayerIndex(playerIndex);
            socket.emit(TRANSMISSIONS.sendGameStates, {
                roomName: localStorage.getItem(LCL_STORAGE.roomName),
                playerIndex: playerIndex
            });
        } else {
            // else reroute to login page
            console.log("No game data available, rerouting to login page");
            history.push({pathname: "/", data: {}});
        }

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [history, playerIndex, props.location.data]);

    function handleKeyPress(e) {
        if (e.keyCode === 32 || e.keyCode === 40) {
            setExtendBottomPanel(value => !value);
        } else if (e.keyCode === 39) {
            e.preventDefault();
            setExtendRightPanel(value => !value);
        } else if (e.keyCode === 38) {
            e.preventDefault();
            setExtendTopPanel(value => !value);
        } else if (e.keyCode === 37) {
            e.preventDefault();
            setExtendLeftPanel(value => !value);
        }
    }

    /*useEffect(() => {
        if (playerState && playerState.firstTurn && isActivePlayer) {
            let tStore = store;
            playerState.firstTurn = false;
            initiateRewardsModal({type: REWARD_TYPE.card, data: [tStore.expeditions[0], tStore.expeditions[1]]});
            tStore.expeditions.splice(0, 2);
            setStore(tStore);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActivePlayer]);*/

    // extending panels contain controls and information areas
    const [extendTopPanel, setExtendTopPanel] = useState(false);
    const [extendRightPanel, setExtendRightPanel] = useState(false);
    const [extendBottomPanel, setExtendBottomPanel] = useState(false);
    const [extendLeftPanel, setExtendLeftPanel] = useState(false);

    // rewards are an array with objects describing values: {type: ..., data: [{effects: ..., effectsText: ...}, ...]
    const [rewardsModalData, setRewardsModalData] = useState([]);
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    // toasts for feedback messages
    const [toastMessages, setToastMessages] = useState([]);
    function addToastMessage(message) {
        setToastMessages(oldMessages => [...oldMessages, message]);
    }

    /** INITIATE REWARDS MODAL **/
    function initiateRewardsModal(rewardsData) {
        console.log("Rewards data: ");
        console.log(rewardsData);
        let tRewardsModalData = cloneDeep(rewardsModalData);
        // rewards can come as a reward object or as an array ofa reward objects
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
    function handleRewards(tPlayerState, tStore, tLocations, tLegends, moreRewardsToProcess) {
        if (!moreRewardsToProcess || tPlayerState.finishedRound) {
            setRewardsModalData([]);
            setShowRewardsModal(false);
            setIsModalActive(false);
        } else {
            const tRewardsModalData = cloneDeep(rewardsModalData);
            tRewardsModalData.splice(0, 1);
            setRewardsModalData(tRewardsModalData);
        }
        //if an effect finished player's turn, end the turn
        if (tPlayerState.finishedRound) {
            addLogEntry(playerState, ACTION_TYPE.finishesRound, null, null);
            console.log("finishing round");
            socket.emit(TRANSMISSIONS.finishedRound, {
                roomName: roomName,
                playerState: tPlayerState,
                store: tStore,
                locations: locations,
                legends: legends,
                gameLog: gameLog
            });
        }
        setPlayerState(tPlayerState)
        setLocations(tLocations);
        setLegends(tLegends);
        setStore(tStore);
    }

    function toggleRewardsModalVisibility(boolean) {
        if (boolean === true || boolean === false) {
            setShowRewardsModal(boolean);
        }
    }

    /** CARD EFFECTS **/
    function handleClickOnCardEffect(effects, cardIndex, costsAction, tCard) {
        let tPlayerState = cloneDeep(playerState);
        let tStore = cloneDeep(store);
        let tLocations = cloneDeep(locations);
        console.log("Handling card effects: " + tCard.cardName);
        console.log(effects);

        let hasResourceForArtifact = false;
        let hasAction = !costsAction || tPlayerState.actions > 0;
        if (tCard.type === CARD_TYPE.artifact) {
            // artifact can be played for free as a transport or for a text
            hasResourceForArtifact = !costsAction || tPlayerState.resources.texts > 0;
        }

        if (isActivePlayer) {
            if ((tCard.type === CARD_TYPE.item || tCard.type === CARD_TYPE.basic || tCard.type === CARD_TYPE.guardian ||
                (tCard.type === CARD_TYPE.artifact && hasResourceForArtifact)) && hasAction) {
                if (tCard.state === CARD_STATE.inHand || tCard.state === undefined) {
                    tPlayerState.activeCards.push(tCard);
                    tCard.state = CARD_STATE.active;
                    tPlayerState.hand.splice(cardIndex, 1);
                }
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, effects, tStore, null, tLocations);
                tPlayerState = effectsResult.tPlayerState;
                tLocations = effectsResult.tLocations;
                tStore = effectsResult.tStore;

                /* if the card is an artifact and effect is not a transport, pay for the use */
                if (tCard.type === CARD_TYPE.artifact && costsAction) {
                    tPlayerState.resources.texts -= 1;
                }

                /* if card use costs an action (= card is not used as a transport) we spend it */
                if (costsAction) {
                    tPlayerState.actions -= 1;
                }

                /* some card need rewards modal window to choose between possible effects */
                if (effectsResult.showRewardsModal) {
                    initiateRewardsModal(effectsResult.rewardsData);
                }

                /* terrible hack */
                if (tPlayerState.activeEffects[0] === EFFECT.resolveAdditionalEffects) {
                    const effectsResult = processEffects(null, null, tPlayerState, tPlayerState.activeEffects[1],
                        tStore, null, tLocations);
                    tPlayerState = effectsResult.tPlayerState;
                    tLocations = effectsResult.tLocations;
                    tStore = effectsResult.tStore;
                    tPlayerState.activeEffects.splice(0, 2);
                }

                setPlayerState(tPlayerState);
                setLocations(tLocations);
                setStore(tStore);
                addLogEntry(tPlayerState, costsAction ? ACTION_TYPE.playsCard : ACTION_TYPE.playsCardWithoutAction,
                    tCard.id, null);
            }
        } else {
            console.log("Card action could not be processed - player has no actions.");
        }
    }

    /** LOCATION EFFECTS **/
    function handleClickOnLocation(location, resolveGuardian) {
        if (isActivePlayer && !showRewardsModal) {
            console.log("Clicked on location " + location.id);
            const locationResult = processLocation(cloneDeep(playerState), cloneDeep(store), cloneDeep(locations), cloneDeep(location), setRewardsModal, resolveGuardian);
            if (locationResult) {
                if (locationResult.playerState) {
                    setPlayerState(locationResult.playerState);
                }
                if (locationResult.locations) {
                    setLocations(locationResult.locations);
                }
                if (locationResult.store) {
                    setStore(locationResult.store);
                }
            }
        }
    }

    /*/!** HANDLE BONUS **!/
    function handleClickOnBonusAction(effects) {
        if (isActivePlayer) {
            if (playerState.activeEffects.length > 0) {
                if (playerState.activeEffects[0] === EFFECT.activate2dockActions) {
                    effects = effects.filter((effect) => effect !== EFFECT.loseCoin);
                    const effectProcessResults = processEffects(null, null, cloneDeep(playerState), effects, cloneDeep(store), null, cloneDeep(locations));
                    let tPlayerState = effectProcessResults.tPlayerState;
                    tPlayerState.activeEffects.splice(0, 1);
                    setPlayerState(tPlayerState);
                    setStore(effectProcessResults.tStore);
                    setLocations(effectProcessResults.tLocations);
                    addLogEntry(playerState, ACTION_TYPE.usesBonusAction, null, effects)
                }
            } else {
                const effectProcessResults = processEffects(null, null, cloneDeep(playerState), effects, cloneDeep(store), null, cloneDeep(locations));
                setPlayerState(effectProcessResults.tPlayerState);
                setStore(effectProcessResults.tStore);
                setLocations(effectProcessResults.tLocations);
                addLogEntry(playerState, ACTION_TYPE.usesBonusAction, null, effects)
            }
        }
    }*/

    /** HANDLE CLICK ON LEGEND **/
    function handleClickOnLegend(legendIndex, columnIndex, fieldIndex) {
        if (isActivePlayer && (playerState.actions > 0 || playerState.activeEffects.length > 0)) {
            let tLegends = cloneDeep(legends);
            const field = tLegends[legendIndex].fields[columnIndex][fieldIndex];
            const boon = field.effects[0];
            const effects = [...field.cost];
            if (boon) {
                effects.push(boon);
            }
            // first we process effects to see whether player has enough resources
            const legendResult = processLegend(cloneDeep(legends), legendIndex, columnIndex, fieldIndex, effects,
                cloneDeep(playerState), cloneDeep(store), cloneDeep(locations));
            if (legendResult) {
                const tStore = legendResult.tStore;
                const rewardsData = [];
                // some cards need rewards modal window to choose between possible effects
                if (legendResult.showRewardsModal) {
                    if (Array.isArray(legendResult.rewardsData)) {
                        for (let result of legendResult.rewardsData) {
                            rewardsData.push(result);
                        }
                    } else {
                        rewardsData.push(legendResult.rewardsData);
                    }
                }
                tLegends = legendResult.tLegends;

                // all rewards are one time now = todo remove
                /*// resources that can only be used once have to be removed now...
                if (boon.includes(EFFECT.gainCoinIfFirst) || boon.includes(EFFECT.gainExploreIfFirst) || boon.includes(EFFECT.gainMapIfFirst)) {
                    tLegends[legendIndex].fields[columnIndex][fieldIndex] = removeFirstUserLegendResource(boon, field, numOfPlayers);
                }
                // ...but if the resource involves a choice, it is processed in the reward modal
                if (boon.includes(EFFECT.gainCoinOrExploreIfFirst) || boon.includes(EFFECT.gainExploreOrMapIfFirst)) {
                    rewardsData.push({
                        type: REWARD_TYPE.legendFieldEffects, data: getJointBoons(boon),
                        params: {legendIndex: legendIndex, columnIndex: columnIndex, fieldIndex: fieldIndex}
                    });
                }*/

                if (boon) {
                    tLegends[legendIndex].fields[columnIndex][fieldIndex].effects.splice(0, 1);
                }

                if (rewardsData.length > 0) {
                    initiateRewardsModal(rewardsData);
                }
                setPlayerState(legendResult.tPlayerState);
                setLocations(legendResult.tLocations);
                setLegends(tLegends);
                setStore(tStore);
                setLogLegends(legendResult.tLegends);
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
                setPlayerState(processUptrade(tPlayerState, resource));
            }
        }
    }

    /** HANDLE CLICK ON INCOME TILE **/
    function handleClickOnAssistantTile(effects, incomeId) {
        const assistantResult = processEffects(null, null, cloneDeep(playerState), effects, cloneDeep(store), null, cloneDeep(locations));
        if (assistantResult.processedAllEffects) {
            let tPlayerState = assistantResult.tPlayerState;

            // set assistan to spent state
            for (let asssistant of tPlayerState.assistants) {
                if (asssistant.id === incomeId) {
                    asssistant.state = ASSISTANT_STATE.spent
                }
            }

            setPlayerState(tPlayerState);
            setLocations(assistantResult.tLocations);
            setStore(assistantResult.tStore);
            if (assistantResult.showRewardsModal) {
                initiateRewardsModal(assistantResult.rewardsData);
            }
            addLogEntry(tPlayerState, ACTION_TYPE.usesAssistant, incomeId, effects);
        }
    }

    /** HANDLE CLICK ON RELIC **/
    function handleClickOnRelic(slotIndex) {
        let tPlayersState = cloneDeep(playerState);
        if (!tPlayersState.relics[slotIndex] && tPlayersState.resources.bronzeRelics + tPlayersState.resources.silverRelics
            + tPlayersState.resources.goldRelics > 0) {
            const rewards = [[EFFECT.loseCoin, EFFECT.arrow, EFFECT.gainJewel], [EFFECT.gainWeapon], [EFFECT.gainText, EFFECT.gainText],
                [EFFECT.gainCoin, EFFECT.gainExplore], [EFFECT.draw1]];
            initiateRewardsModal([{type: REWARD_TYPE.effectsArr, data: rewards}]);
            if (tPlayersState.resources.bronzeRelics > 0) {
                tPlayersState.resources.bronzeRelics -= 1;
                tPlayersState.relics[slotIndex] = RELIC.bronze;
            } else if (tPlayersState.resources.silverRelics > 0) {
                tPlayersState.resources.silverRelics -= 1;
                tPlayersState.relics[slotIndex] = RELIC.silver;
            } else if (tPlayersState.resources.goldRelics > 0) {
                tPlayersState.resources.goldRelics -= 1;
                tPlayersState.relics[slotIndex] = RELIC.gold;
            }
            setPlayerState(tPlayersState);
            addLogEntry(tPlayersState, ACTION_TYPE.placesRelic, null, "undetermined");
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

    /** HANDLE LOST CITY **/
    function handleLostCity(tPlayerstate, tStore, relicRewards, params) {
        setPlayerState(tPlayerstate);
        setStore(tStore);
        if (relicRewards.length > 0) {
            initiateRewardsModal({type: REWARD_TYPE.relicWithEffects, data: relicRewards, params: params});
        }
        setExtendRightPanel(false);
    }

    /** CANCEL EFFECTS **/
    function cancelEffects() {
        let tPlayerState = cloneDeep(playerState);
        if (tPlayerState.activeEffects[0] === EFFECT.revealItemBuyWithDiscount3) {
            const tStore = cloneDeep(store);
            tStore.itemsOffer.splice(tStore.itemsOffer.length - 1);
            setStore(tStore);
        }
        if (tPlayerState.activeEffects[0] === EFFECT.revealArtifactBuyWithDiscount3) {
            const tStore = cloneDeep(store);
            tStore.itemsOffer.splice(tStore.itemsOffer.length - 1);
            setStore(tStore);
        }
        tPlayerState.activeEffects.splice(0, 1);
        setPlayerState(tPlayerState);
    }

    /** UNDO / RESET TURN **/
    function undo() {
        setExtendTopPanel(false);
        socket.emit(TRANSMISSIONS.resetTurn, roomName);
    }

    /** REVERT TO PREVIOUS TURN **/
    function revert() {
        setExtendTopPanel(false);
        socket.emit(TRANSMISSIONS.revert, roomName)
    }

    /** SET NEXT PLAYER **/
    if (playerState && playerState.actions < 1 && playerState.activeEffects.length === 0 && !isModalActive
        && !playerState.finishedRound) {
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
            console.log("** finishing turn **")
            socket.emit(TRANSMISSIONS.nextPlayer, {
                roomName: roomName,
                playerState: tPlayerState,
                store: store,
                locations: locations,
                legends: legends,
                gameLog: gameLog,
            });
            setPlayerState(tPlayerState);
        } else {
            let tPlayerState = cloneDeep(playerState);
            tPlayerState.finishedRound = false;
            setPlayerState(tPlayerState);
            handleEndRound();
        }
    }

    function handleEndRound() {
        if (isActivePlayer) {
            addLogEntry(playerState, ACTION_TYPE.finishesRound, null, null);
            console.log("** finishing round **");
            socket.emit(TRANSMISSIONS.finishedRound, {
                roomName: roomName,
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
        legends: legends,
        locations: locations,
        modalData: rewardsModalData,
        numOfPlayers: numOfPlayers,
        playerState: playerState,
        playerIndex: playerIndex,
        setLegends: setLegends,
        showModal: showRewardsModal,
        setShowRewardsModal: setShowRewardsModal,
        store: store,
        round: round,
        handleCardEffect: handleClickOnCardEffect,
        handleCardBuy: handleCardBuy,
        handleActiveEffectClickOnCard: handleActiveEffectClickOnCard,
        handleClickOnLocation: handleClickOnLocation,
        handleReward: handleRewards,
        handleClickOnLegend: handleClickOnLegend,
        handleClickOnAssistantTile: handleClickOnAssistantTile,
        initiateRewardsModal: initiateRewardsModal,
        toggleRewardsModalVisibility: toggleRewardsModalVisibility,
        toastMessages: toastMessages,
        setToastMessages: setToastMessages,
    };

    const playerStateContextValues = {
        playerState: playerState,
        playerStates: playerStates,
        store: store,
        isActivePlayer: isActivePlayer,
        previousPlayer: previousPlayer,
        round: round,
        numOfPlayers: numOfPlayers,
        handleEndRound: handleEndRound,
        nextPlayer: nextPlayer,
        handleClickOnResource: handleClickOnResource,
        handleClickOnRelic: handleClickOnRelic,
        handleLostCity: handleLostCity,
        cancelEffects: cancelEffects,
        undo: undo,
        revert: revert,
    };

    const gameBoardElements =
        <div>
            <LocationsArea/>
            <div style={{marginLeft: "3vw"}}>
                {/*<BonusActions handleClickOnBonus={handleClickOnBonusAction}/>*/}
                <Store/>
            </div>
            <CardsArea/>
            <LegendsArea/>
            <ResourcesArea/>
            <RelicsArea/>
            <Controls/><br/>
            <OpponentPlayArea/>
            <TopSlidingPanel extendPanel={extendTopPanel}/>
            <BottomSlidingPanel extendPanel={extendBottomPanel} setExtendPanel={setExtendBottomPanel}/>
            <RightSlidingPanel extendPanel={extendRightPanel}/>
            <LeftSlidingPanel extendPanel={extendLeftPanel}/>
            <ShowModalButton showModal={toggleRewardsModalVisibility}/>
            <ChooseRewardModal/>
        </div>;

    return (
        <div className="App">
            <BoardStateContext.Provider value={boardStateContextValues}>
                <PlayerStateContext.Provider value={playerStateContextValues}>
                    {statesLoading ? <StatesSpinner/> : gameBoardElements}
                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
        </div>
    )
}

export default GameBoard;

export const StatesSpinner = () =>
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh"}}>
        <Spinner animation="grow" variant="primary"/>
    </div>;