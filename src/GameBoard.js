import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cloneDeep from 'lodash/cloneDeep';

import CardsArea from "./components/main/CardsArea";
import {BoardStateContext, PlayerStateContext} from "./Contexts";
import Resources, {RESOURCES} from "./components/resources/Resources";
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
    CARDS_ACTIONLESS,
    CARD_STATE,
    CARD_TYPE,
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
import {processIncomeTile} from "./components/functions/processEffects";
import {ExtendPanelButton} from "./components/main/ExtendPanelButton";
import {useHistory} from "react-router-dom";

function GameBoard() {
    const [playerState, setPlayerState] = useState(emptyPlayerState);
    const [round, setRound] = useState(1);
    const [store, setStore] = useState(null);
    const [locations, setLocations] = useState(null);
    const [legends, setLegends] = useState(null);
    const [isActivePlayer, setIsActivePlayer] = useState(false);
    const history = useHistory();

    // rewards are an array with objects describing values: {effects: ..., effectsText: ...}
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [rewardsModalData, setRewardsModalData] = useState([]
    );

    const [showChooseExpeditionModal, setShowChooseExpeditionModal] = useState(false);
    const [chooseExpeditionModalData, setChooseExpeditionModalData] = useState([]);

    const [extendBottomPanel, setExtendBottomPanel] = useState(false);

    useEffect(() => {
        socket.on(TRANSMISSIONS.getStates, states => {
            console.log("received initial states from server");
            console.log(states);
            if (states.playerState.firstTurn) {
                let store = states.store;
                const expeditionsArr = [store.expeditions[0], store.expeditions[1]];
                store.expeditions.splice(0, 2);
                setChooseExpeditionModalData(expeditionsArr);
                setShowChooseExpeditionModal(true);
                states.playerState.firstTurn = false;
            }

            setPlayerState(states.playerState);
            setStore(states.store);
            setLocations(states.locations);
            setLegends(states.legends);
            console.log("Legends2: ");
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

        socket.on(TRANSMISSIONS.scoringStates, data => {
            console.log("Rerouting to scoring page");
            history.push({pathname: "/scoring", data: data})
        })
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    });

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

        if (isActivePlayer && (!costsAction || playerState.actions > 0)) {
            if (tCard.type === CARD_TYPE.item || tCard.type === CARD_TYPE.basic || tCard.type === CARD_TYPE.guardian ||
                (tCard.type === CARD_TYPE.artifact && tPlayerState.resources.texts > 0)) {
                if (tCard.state === CARD_STATE.inHand) {
                    tPlayerState.activeCards.push(tCard);
                    tCard.state = CARD_STATE.active
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
                        if (isLocationAdjancentToAdventurer(location, locationLine, tLocations, tPlayerState)) {
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
                                    [...guardian.discoveryEffect, ...guardian.discoveryEffect2]

                                setRewardsModalData([{effects: location.effects, effectsText: location.effectsImage},
                                    {effects: guardianEffects, effectsText: guardianText}]);
                                // guardian is moved to player's discard
                                tPlayerState.resources.shinies += 1;
                                tPlayerState.discardDeck.push(store.guardians[0]);
                                tPlayerState.discardDeck[tPlayerState.discardDeck.length - 1].state = CARD_STATE.discard;
                                store.guardians.splice(0, 1);

                                setShowRewardsModal(true);

                            }
                        }
                        break;
                    case
                    LOCATION_STATE.explored:
                        const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                        if (travelCheckResults.enoughResources && tPlayerState.actions > 0 && tPlayerState.availableAdventurers > 0) {
                            tPlayerState = travelCheckResults.tPlayerState;
                            tPlayerState.availableAdventurers -= 1;
                            tPlayerState.actions -= 1;
                            const effectsResult = processEffects(null, null, tPlayerState, effects, null,
                                {...store}, location, {...locations});
                            setPlayerState(effectsResult.tPlayerState);
                            let tLocations = occupyLocation(cloneDeep(locations), location.id, locationLine, tPlayerState.playerIndex);
                            setLocations(tLocations);
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
        if (isActivePlayer && playerState.actions > 0) {
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
                            tStore.expeditions.splice(0, 2);
                            setChooseExpeditionModalData(expeditionsArr);
                            setShowChooseExpeditionModal(true);
                        } else if (columnIndex === 0) {
                            const incomeArr = [store.incomes1Offer[0], store.incomes1Offer[1]];
                            tStore.incomes1Offer.splice(0, 2);
                            setChooseExpeditionModalData(incomeArr);
                            setShowChooseExpeditionModal(true);
                        } else if (columnIndex === 2) {
                            const incomeArr = [store.incomes2Offer[0], store.incomes2Offer[1]];
                            tStore.incomes2Offer.splice(0, 2);
                            setChooseExpeditionModalData(incomeArr);
                            setShowChooseExpeditionModal(true);
                        }
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
    function handleLegendReward(idElement, isGoalCard) {
        setShowChooseExpeditionModal(false);
        setChooseExpeditionModalData([]);
        let tPlayerState = cloneDeep(playerState);
        if (isGoalCard) {
            tPlayerState.victoryCards.push(idElement);
        } else {
            idElement.state = INCOME_STATE.ready;
            tPlayerState.incomes.push(idElement);
            tPlayerState = handleIncomes(tPlayerState);
        }
        setPlayerState(tPlayerState)
    }

    /** HANDLE ACTIVE EFFECTS **/
    function handleActiveEffectClickOnCard(card, cardIndex) {
        if (isActivePlayer) {
            const effectProcessResults = processActiveEffect(card, cardIndex, null, cloneDeep(playerState),
                null, {...store}, {...locations}, setRewardsModal);
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
        if (tPlayersState.relics[effectIndex]) {
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
                    cloneDeep(store), {...locations});
                const tPlayerState = buyResult.tPlayerState;
                const tStore = buyResult.tStore;
                if (card.type === CARD_TYPE.artifact && card.isGuarded) {
                    tPlayerState.discardDeck.push(store.guardians[0]);
                    tStore.guardians.splice(0, 1);
                }
                setPlayerState(cloneDeep(tPlayerState));
                setStore(tStore);
            }
        }
    }

    function cancelEffect(effect) {
    }

    /** SET NEXT PLAYER **/

    if (playerState.actions === 0 && playerState.activeEffects.length === 0) {
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
        handleCardEffect: handleClickOnCardEffect,
        handleCardBuy: handleCardBuy,
        handleActiveEffectClickOnCard: handleActiveEffectClickOnCard,
        handleClickOnLocation: handleClickOnLocation,
        handleLocationExploredReward: handleLocationExploredReward,
        handleClickOnLegend: handleClickOnLegend,
        handleExpeditionReward: handleLegendReward,
        handleClickOnIncomeTile: handleClickOnIncomeTile
    }

    const playerStateContextValues = {
        playerState: playerState,
        isActivePlayer: isActivePlayer,
        handleEndRound: handleEndRound,
        nextPlayer: nextPlayer,
        handleClickOnResource: handleClickOnResource,
        handleClickOnRelic: handleClickOnRelic,
    }

    return (
        <div className="App">
            <BoardStateContext.Provider value={boardStateContextValues}>
                <PlayerStateContext.Provider value={playerStateContextValues}>
                    <LegendsArea/>
                    <Resources/>
                    <RelicsArea/>
                    <LocationsArea/>
                    <BottomSlidingPanel extendPanel={extendBottomPanel} setExtendPanel={setExtendBottomPanel}/>
                    <div style={{marginLeft: "3vw"}}>
                        <BonusActions handleClickOnBonus={handleClickOnBonusAction}/>
                        <Store/>
                    </div>
                    <CardsArea/>
                    <Controls/><br/>
                    <ChooseRewardModal/>
                    <ChooseLegendRewardModal/>
                    <ExtendPanelButton setExtendPanel={setExtendBottomPanel} extendPanel={extendBottomPanel}/>
                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
        </div>
    )
}

export default GameBoard;