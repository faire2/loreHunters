import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";
import {cloneDeep} from "lodash";
import {IncomeTile} from "../legends/tiles/IncomeTile";
import {processEffects} from "../functions/processEffects";
import {handleIncome} from "../../server/serverFunctions";
import {removeCard} from "../functions/cardManipulationFuntions";
import {CARD_STATE, CARD_TYPE, INCOME_LEVEL, INCOME_STATE, LOCATION_STATE, REWARD_TYPE} from "../functions/enums";
import Location from "../locations/Location";
import {removeExploredLocation} from "../locations/functions/locationFunctions";
import {replaceFirsUserJointLegendResource} from "../legends/legendsFunctions";
import {Legends2} from "../../data/legends.mjs";
import {exploreLocation} from "../locations/functions/exploreLocation";
import {Guardians} from "../../data/guardians";


export default function ChooseRewardModal() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showModal;
    const rewards = boardStateContext.modalData;
    const rewardType = rewards.length > 0 ? rewards[0].type : null;
    let tPlayerState = cloneDeep(boardStateContext.playerState);
    let tStore = cloneDeep(boardStateContext.store);
    let tLocations = cloneDeep(boardStateContext.locations);
    let tLegends = cloneDeep(boardStateContext.legends);
    const numOfPlayers = boardStateContext.numOfPlayers;
    if (showModal) {
        console.debug("Rewards modal opened. Rewards:");
        console.debug(rewards);
    }
    const containerStyle = {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    };

    const rewardStyle = {
        fontSize: "6vw",
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        color: "grey",
        height: "7vw",
    };

    function getElement(reward) {
        let element = null;
        switch (rewardType) {
            case (REWARD_TYPE.card):
                element = <Card card={reward}/>;
                break;
            case REWARD_TYPE.addAssistant:
            case REWARD_TYPE.removeAssistant:
                element = <IncomeTile income={reward}/>;
                break;
            case REWARD_TYPE.legendFieldEffects:
            case REWARD_TYPE.effectsArr:
                element = reward.effectsText;
                break;
            case REWARD_TYPE.location:
                element = <Location location={reward}/>;
                break;
            case null:
                break;
            default:
                console.log("Element type could not be identified at getElement: ");
                console.log(rewardType);
        }
        return element;
    }

    function handleClickOnReward(reward, index) {
        let effects = [];
        let finishRound = false;
        switch (rewardType) {
            case REWARD_TYPE.card:
                if (reward.type === CARD_TYPE.goalCard) {
                    tPlayerState.victoryCards.push(reward);
                    tStore.expeditions.splice(index, 1);
                } else {
                    // all effects send reward card to hand
                    reward.state = CARD_STATE.inHand;
                    tPlayerState = removeCard(reward, tPlayerState);
                    tPlayerState.hand.push(reward);
                }
                break;
            case REWARD_TYPE.addAssistant:
                reward.state = INCOME_STATE.ready;
                tPlayerState.incomes.push(reward);
                if (reward.level === INCOME_LEVEL.silver) {
                    if (tStore.incomes1Deck.length > 0) {
                        tStore.incomes1Offer.splice(index, 1, tStore.incomes1Deck[0]);
                        tStore.incomes1Deck.splice(0, 1);
                    } else {
                        tStore.incomes1Offer.splice(index, 1);
                    }
                } else {
                    if (tStore.incomes2Deck.length > 0) {
                        tStore.incomes2Offer.splice(index - tStore.incomes1Offer.length, 1, tStore.incomes2Deck[0]);
                        tStore.incomes2Deck.splice(0, 1);
                    } else {
                        tStore.incomes2Offer.splice(index, 1, 0);
                    }
                    // if gold assistant was gained, we have to remove a silver one he has replaced
                    let silverAssistants = [];
                    for (let assistant of tPlayerState.incomes){
                        if (assistant.level === INCOME_LEVEL.silver) {
                            silverAssistants.push(assistant);
                        }
                    }
                    rewards.push({type: REWARD_TYPE.removeAssistant, data: silverAssistants});
                }
                tPlayerState = handleIncome(tPlayerState, reward);
                break;
            case REWARD_TYPE.removeAssistant:
                let assistantIndex = null;
                for (let i = 0; i < tPlayerState.incomes.length; i++) {
                    if (tPlayerState.incomes[i].id === reward.id) {
                        assistantIndex = i;
                    }
                }
                tPlayerState.incomes.splice(assistantIndex, 1);
                    break;
            case REWARD_TYPE.effectsArr:
                const effectsResult = processEffects(null, null, tPlayerState, effects, null, null, null, null);
                if (effectsResult.processedAllEffects) {
                    tPlayerState = effectsResult.tPlayerState;
                    finishRound = effectsResult.finishRound;
                } else {
                    console.log("Effects could not be processed in handleClickOnReward");
                    console.log(reward);
                }
                break;
            case REWARD_TYPE.legendFieldEffects:
                const legendEffectsResult = processEffects(null, null, tPlayerState, [reward.effects], null, null, null, null);
                if (legendEffectsResult.processedAllEffects) {
                    const fieldPosition = rewards[0].params;
                    tPlayerState = legendEffectsResult.tPlayerState;
                    const jsxLegend = Legends2[tLegends[fieldPosition.legendIndex].id];
                    const field = replaceFirsUserJointLegendResource(reward.effects, jsxLegend.fields[fieldPosition.columnIndex][fieldPosition.fieldIndex],
                        numOfPlayers);
                    tLegends[fieldPosition.legendIndex].fields[fieldPosition.columnIndex][fieldPosition.fieldIndex] = field;
                    console.log(Legends2);
                }
                break;
            case REWARD_TYPE.location:
                const locationPositionsObj = rewards[0].params;
                let location = reward;
                location.index = locationPositionsObj.index;
                location.line = locationPositionsObj.line;
                location.state = LOCATION_STATE.explored;
                const explorationResult = exploreLocation(tPlayerState, tLocations, tStore, location,
                    boardStateContext.round);
                if (explorationResult) {
                    location.guardian = Guardians[tLocations.guardianKeys[0]];
                    tLocations.guardianKeys.splice(0, 1);
                    location.state = LOCATION_STATE.guarded;
                    tLocations[locationPositionsObj.line][locationPositionsObj.index] = location;
                    tPlayerState = explorationResult.playerState;
                    tPlayerState.availableAdventurers -= 1;
                    location.adventurers.push(tPlayerState.playerIndex);
                    const locationResult = processEffects(null, null, tPlayerState, location.effects,
                        null, null, null, null);
                    tPlayerState = locationResult.tPlayerState;
                    tLocations = removeExploredLocation(location, explorationResult.locations);
                    tStore = explorationResult.store;
                    /*rewards.push(explorationResult.modalRewardData[0]);*/
                }
                break;
            default:
                console.log("Element type could not be identified at getElement: ");
                console.log(rewardType);
        }
        const moreRewardsToProcess = rewards.length > 1;
        boardStateContext.handleReward(tPlayerState, tStore, tLocations, tLegends, moreRewardsToProcess);
    }
    return (
        <Modal show={showModal} onHide={null} dialogClassName={"customModal"}>
            <Modal.Header>
                <Modal.Title>Choose your boon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={containerStyle}>
                    {rewards.length > 0 && rewards[0].data.map((reward, i) =>
                        <div style={rewardStyle} onClick={() => handleClickOnReward(reward, i)} key={i}>
                            {getElement(reward)}
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}