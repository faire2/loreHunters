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
import TopSlidingPanel from "./components/main/TopSlidingPanel";
import {getPositionInLocationLine} from "./components/locations/locationFunctions";
import {GUARDIANS} from "./data/cards";
import {FIELD_SIZE, Legends} from "./data/legends";
import {getDiscountForProgress, getIsRewardDue} from "./components/legends/legendsFunctions";
import ChooseLegendRewardModal from "./components/legends/ChooseLegendRewardModal";
import {RelicsArea} from "./components/relics/RelicsArea";
import {LegendsArea} from "./components/legends/LegendsArea";
import {handleIncomes} from "./server/serverFunctions";

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

    const [showChooseExpeditionModal, setShowChooseExpeditionModal] = useState(false);
    const [chooseExpeditionModalData, setChooseExpeditionModalData] = useState([]);


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
    function handleClickOnCardEffect(effects, cardIndex, costsAction, tCard) {
        let tPlayerState = cloneDeep(playerState);
        let tStore = cloneDeep(store);
        console.log("Handling card effects: " + tCard.cardName);
        console.log(effects);

        if (isActivePlayer && (!costsAction || playerState.actions > 0)) {
            if (tCard.type === CARD_TYPE.item || tCard.type === CARD_TYPE.basic || tCard.type === CARD_TYPE.guardian ||
                (tCard.type === CARD_TYPE.artifact && tPlayerState.resources.texts > 0)) {
                if (tCard.state === CARD_STATE.inHand) {
                    /* we push the played card the active cards area... */
                    tPlayerState.activeCards.push(tCard);
                    tCard.state = CARD_STATE.active
                    /* ...and remove it from the hand */
                    tPlayerState.hand.splice(cardIndex, 1);
                }
                const effectsResult = processEffects(tCard, cardIndex, tPlayerState, effects, null, tStore, null, null);
                tPlayerState = effectsResult.tPlayerState;
                if (tCard.type !== CARD_TYPE.basic && costsAction && effectsResult.processedAllEffects) {
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
                                tPlayerState.discardDeck.push(store.guardians[0]);
                                tPlayerState.discardDeck[tPlayerState.discardDeck.length - 1].state = CARD_STATE.discard;
                                store.guardians.splice(0, 1);

                                setShowRewardsModal(true);

                            }
                        }
                        break;
                    case
                    LOCATION_STATE.explored
                    :
                        const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                        if (travelCheckResults.enoughResources && tPlayerState.actions > 0 && tPlayerState.availableAdventurers > 0) {
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
            const jsxLegend = Legends[legends[legendIndex].id]
            const field = jsxLegend.fields[columnIndex][fieldIndex];

            const playerIndex = playerState.playerIndex;
            const positions = legends[legendIndex].positions[playerIndex];
            const previousColumnIndex = columnIndex - 1;
            let canPlaceToken = false;
            const prevPositions = [];

            // if first column was clicked we check if the player has any null column position
            if (columnIndex === 0) {
                for (let position of positions) {
                    if (position.columnIndex === null) {
                        canPlaceToken = true;
                        break;
                    }
                }
                // if not we check if player has any token in previous column
            } else if (positions[0].columnIndex === columnIndex - 1 || positions[1].columnIndex === columnIndex - 1) {
                const previousColumn = jsxLegend.fields[columnIndex - 1];

                // prepare positions in previous column as if there were three elements
                // first index is always 0
                prevPositions.push(0);
                // second position can be 0 or 1
                let tempIndex = previousColumn[0].size === FIELD_SIZE["1"] ? 1 : 0;
                prevPositions.push(tempIndex);
                // third position has three possibilities
                if (previousColumn[0].size === FIELD_SIZE["1"]) {
                    tempIndex = previousColumn[1].size === FIELD_SIZE["1"] ? 2 : 1;
                } else {
                    tempIndex = previousColumn[0].size === FIELD_SIZE["2"] ? 1 : 0;
                }
                prevPositions.push(tempIndex);
                console.log(prevPositions);

                if (field.size === 1) {
                    for (let position of positions) {
                        if (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex]) {
                            canPlaceToken = true;
                            break;
                        }
                    }
                } else if (field.size === 2) {
                    for (let position of positions) {
                        if ((position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex])
                            || (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex + 1])) {
                            canPlaceToken = true;
                            break
                        }
                    }
                } else if (field.size === 3) {
                    for (let position of positions) {
                        if ((position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex])
                            || (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex + 1])
                            || (position.columnIndex === previousColumnIndex && position.fieldIndex === prevPositions[fieldIndex + 2])) {
                            canPlaceToken = true;
                            break
                        }
                    }
                }
            }
            if (canPlaceToken) {
                const activeEffect = playerState.activeEffects[0];
                let cost = [...jsxLegend.fields[columnIndex][fieldIndex].cost];
                let effects = [...cost, ...boons]
                if (activeEffect === EFFECT.progressWithTexts || activeEffect === EFFECT.progressWithWeapon
                    || activeEffect === EFFECT.progressWithJewel) {
                    effects = getDiscountForProgress(effects, activeEffect);
                }
                let effectsResult = processEffects(null, null, playerState, effects,
                    null, store, null, locations);

                // if effects were processed (price was paid) place the token
                if (effectsResult.processedAllEffects) {
                    if (columnIndex > 0) {
                        for (let position of positions) {
                            if (position.columnIndex === columnIndex - 1) {
                                let correctToken = false;
                                switch (field.size) {
                                    case FIELD_SIZE["3"]:
                                        if (position.fieldIndex === prevPositions[fieldIndex] + 2) {
                                            correctToken = true
                                        }
                                    case FIELD_SIZE["2"]:
                                        if (position.fieldIndex === prevPositions[fieldIndex] + 1) {
                                            correctToken = true
                                        }
                                    case FIELD_SIZE["1"]:
                                        if (position.fieldIndex === prevPositions[fieldIndex]) {
                                            correctToken = true
                                        }
                                        break
                                    default:
                                        console.log("Unable to process field size in handleClickOnLegend: " + field.size);
                                }
                                if (correctToken) {
                                    position.columnIndex = columnIndex;
                                    position.fieldIndex = fieldIndex;
                                    break;
                                }
                            }
                        }
                    } else {
                        for (let position of positions) {
                            if (position.columnIndex === null && position.fieldIndex === null) {
                                position.columnIndex = columnIndex;
                                position.fieldIndex = fieldIndex;
                                break;
                            }
                        }
                    }

                    effectsResult.tPlayerState.actions = effectsResult.tPlayerState.actions -= 1;

                    // first four columns award extra rewards when all tokens reach them
                    if (columnIndex < 4) {
                        const isRewardDue = getIsRewardDue(columnIndex, positions);
                        if (isRewardDue) {
                            if (columnIndex === 0 || columnIndex === 2) {
                                const expeditionsArr = [store.expeditions[0], store.expeditions[1]];
                                store.expeditions.splice(0, 2);
                                setChooseExpeditionModalData(expeditionsArr);
                                setShowChooseExpeditionModal(true);
                            } else if (columnIndex === 1) {
                                const incomeArr = [store.incomes1Offer[0], store.incomes1Offer[1]];
                                store.incomes1Offer.splice(0, 2);
                                setChooseExpeditionModalData(incomeArr);
                                setShowChooseExpeditionModal(true);
                            } else if (columnIndex === 3) {
                                const incomeArr = [store.incomes2Offer[0], store.incomes2Offer[1]];
                                store.incomes2Offer.splice(0, 2);
                                setChooseExpeditionModalData(incomeArr);
                                setShowChooseExpeditionModal(true);
                            }
                        }
                    }
                    setPlayerState(effectsResult.tPlayerState);
                    setLocations(effectsResult.tLocations);
                    setLegends(legends);
                    setStore(effectsResult.tStore);
                    return true
                }
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
            console.log("Handling click on resource: " + resource);
            if (playerState.activeEffects[0] === EFFECT.uptrade && playerState.resources[resource] > 0) {
                const tPlayerState = cloneDeep(playerState);
                let resources = tPlayerState.resources;
                const tActiveEffects = tPlayerState.activeEffects;
                if (resource === RESOURCES.TEXTS) {
                    resources.texts -= 1;
                    resources.weapons += 1;
                } else if (resource === RESOURCES.WEAPONS) {
                    resources.weapons -= 1;
                    resources.jewels += 1;
                } else if (resource === RESOURCES.JEWELS) {
                    resources.jewels -= 1;
                    resources.texts += 3;
                } else {
                    console.log("Unknown resource in handleClickOnResource: " + resource);
                }
                tActiveEffects.splice(0, 1);
                setPlayerState(tPlayerState);
            } else if (playerState.activeEffects[0] === EFFECT.progressWithTextsOrWeapon
                && (resource === RESOURCES.TEXTS || resource === RESOURCES.WEAPONS)) {
                const tPlayerState = cloneDeep(playerState);
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
        let tPlayerState = cloneDeep(playerState);
        for (let effect of effects) {
            switch (effect) {
                // this effects are handled automatically in end of round
                case EFFECT.gainAdventurerForThisRound:
                case EFFECT.gainCoin:
                case EFFECT.gainExplore:
                case EFFECT.gainText:
                case EFFECT.gainWeapon:
                    break;
                case EFFECT.draw1:
                case EFFECT.gainDiscountedBuy:
                case EFFECT.gainPlane:
                case EFFECT.uptrade:
                    const effectsResult = processEffects(null, null, tPlayerState, [effect], null,
                        cloneDeep(store), null, cloneDeep(locations), null);
                    tPlayerState = effectsResult.tPlayerState;

                    break;
                default:
                    console.log("Unable to process effect in handleClickOnIncomeTile: ");
                    console.log(effects);
            }
        }
        for (let income of tPlayerState.incomes) {
            if (income.id === incomeId) {
                income.state = INCOME_STATE.spent;
                break;
            }
        }
        setPlayerState(tPlayerState)
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
                    tPlayerState.discard.push(store.guardians[0]);
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
            }}>
                <PlayerStateContext.Provider value={{
                    playerState: playerState,
                    cancelEffect: cancelEffect,
                    handleEndRound: handleEndRound,
                    nextPlayer: nextPlayer,
                    handleClickOnResource: handleClickOnResource,
                }}>
                    <LegendsArea/>
                    <Resources/>
                    <RelicsArea/>
                    <LocationsArea/>
                    <TopSlidingPanel/>
                    <div style={{marginLeft: "3vw"}}>
                        <BonusActions handleClickOnBonus={handleClickOnBonusAction}/>
                        <Store/>
                        <CardsArea/>
                    </div>
                    <div className="d-inline-flex flex-row text-center">
                        <Controls/><br/>
                    </div>
                    <div>
                        {playerState.activeEffects[0]}
                        {isActivePlayer ? <p>Your turn! Actions: {playerState.actions}</p> :
                            <p>Wait for your turn...</p>}
                    </div>
                    <ChooseRewardModal/>
                    <ChooseLegendRewardModal/>

                </PlayerStateContext.Provider>
            </BoardStateContext.Provider>
        </div>
    )
}

export default App;