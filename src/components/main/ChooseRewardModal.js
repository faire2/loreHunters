import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";
import {cloneDeep} from "lodash";
import {Assistant} from "../legends/tiles/Assistant";
import {processEffects} from "../functions/processEffects";
import {handleIncome} from "../../server/serverFunctions";
import {removeCard} from "../functions/cardManipulationFuntions";
import {
    ASSISTANT,
    ASSISTANT_LEVEL,
    ASSISTANT_STATE,
    CARD_STATE,
    CARD_TYPE,
    LOCATION_STATE,
    RELIC,
    REWARD_TYPE
} from "../functions/enums";
import Location from "../locations/Location";
import {removeExploredLocation} from "../locations/functions/locationFunctions";
import {replaceFirsUserJointLegendResource} from "../legends/functions/legendsFunctions";
import {Legends} from "../../data/legends.mjs";
import {exploreLocation} from "../locations/functions/exploreLocation";
import {Guardians} from "../../data/guardians";
import {BronzeRelic, GoldRelic, SilverRelic} from "../Symbols";
import {JsxFromEffects} from "../JsxFromEffects";
import {EFFECT} from "../../data/effects";


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
        fontSize: "4vw",
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
            case REWARD_TYPE.gainAssistant:
            case REWARD_TYPE.removeAssistant:
            case REWARD_TYPE.refreshAssistant:
                element = <Assistant income={reward}/>;
                break;
            case REWARD_TYPE.legendFieldEffects:
            case REWARD_TYPE.effectsArr:
                element = <JsxFromEffects effectsArray={reward}/>;
                break;
            case REWARD_TYPE.location:
                element = <Location location={reward}/>;
                break;
            case REWARD_TYPE.upgradeRelic:
                if (reward === RELIC.bronze) {
                    element = <BronzeRelic/>;
                } else if (reward === RELIC.silver) {
                    element = <SilverRelic/>
                } else if (reward === RELIC.gold) {
                    element = <GoldRelic/>
                } else {
                    console.error("Unable to determine relic for element in RewardsModal: " + reward)
                }
                break;
            case REWARD_TYPE.guardian:
                element = <div>{reward}</div>;
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
            case REWARD_TYPE.gainAssistant:
                reward.state = ASSISTANT_STATE.ready;
                tPlayerState.assistants.push(reward);
                if (rewards[0].params === ASSISTANT.silver) {
                    if (tStore.assistantSilverDeck.length > 0) {
                        tStore.assistantSilverOffer.splice(index, 1, tStore.assistantSilverDeck[0]);
                        tStore.assistantSilverDeck.splice(0, 1);
                    } else {
                        tStore.assistantSilverOffer.splice(index, 1);
                    }
                } else if (rewards[0].params === ASSISTANT.gold) {
                    if (tStore.assistantGoldDeck.length > 0) {
                        tStore.assistantGoldOffer.splice(index, 1, tStore.assistantGoldDeck[0]);
                        tStore.assistantGoldDeck.splice(0, 1);
                    } else {
                        tStore.assistantGoldOffer.splice(index, 1);
                    }
                }
                tPlayerState = handleIncome(tPlayerState, reward);
                break;
            case REWARD_TYPE.addAssistant:
                reward.state = ASSISTANT_STATE.ready;
                tPlayerState.assistants.push(reward);
                if (reward.level === ASSISTANT_LEVEL.silver) {
                    if (tStore.assistantSilverDeck.length > 0) {
                        tStore.assistantSilverOffer.splice(index, 1, tStore.assistantSilverDeck[0]);
                        tStore.assistantSilverDeck.splice(0, 1);
                    } else {
                        tStore.assistantSilverOffer.splice(index, 1);
                    }
                } else {
                    if (tStore.assistantGoldDeck.length > 0) {
                        tStore.assistantGoldOffer.splice(index - tStore.assistantSilverOffer.length, 1, tStore.assistantGoldDeck[0]);
                        tStore.assistantGoldDeck.splice(0, 1);
                    } else {
                        tStore.assistantGoldOffer.splice(index, 1, 0);
                    }
                    // if gold assistant was gained, we have to remove a silver one he has replaced
                    let silverAssistants = [];
                    for (let assistant of tPlayerState.assistants) {
                        if (assistant.level === ASSISTANT_LEVEL.silver) {
                            silverAssistants.push(assistant);
                        }
                    }
                    rewards.push({type: REWARD_TYPE.removeAssistant, data: silverAssistants});
                }
                tPlayerState = handleIncome(tPlayerState, reward);
                break;
            case REWARD_TYPE.removeAssistant:
                let assistantIndex = null;
                for (let i = 0; i < tPlayerState.assistants.length; i++) {
                    if (tPlayerState.assistants[i].id === reward.id) {
                        assistantIndex = i;
                    }
                }
                tPlayerState.assistants.splice(assistantIndex, 1);
                break;
            case REWARD_TYPE.refreshAssistant:
                for (let spentAssistant of tPlayerState.assistants) {
                    if (spentAssistant.id === reward.id) {
                        spentAssistant.state = ASSISTANT_STATE.ready;
                    }
                }
                break;
            case REWARD_TYPE.upgradeRelic:
                if (reward === RELIC.bronze) {
                    tPlayerState.resources.bronzeRelics += 1;
                } else if (reward === RELIC.silver) {
                    tPlayerState.resources.silverRelics += 1;
                } else if (reward === RELIC.gold) {
                    tPlayerState.resources.goldRelics += 1;
                } else {
                    console.error("Unable to recognize relic type. Upgrade is not possible:")
                    console.log(reward);
                }
                break;
            case REWARD_TYPE.effectsArr:
                const effectsResult = processEffects(null, null, tPlayerState, reward, null, null, null, null);
                if (effectsResult.processedAllEffects) {
                    tPlayerState = effectsResult.tPlayerState;
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
                    const jsxLegend = Legends[tLegends[fieldPosition.legendIndex].id];
                    tLegends[fieldPosition.legendIndex].fields[fieldPosition.columnIndex][fieldPosition.fieldIndex]
                        = replaceFirsUserJointLegendResource(reward.effects, jsxLegend.fields[fieldPosition.columnIndex]
                            [fieldPosition.fieldIndex], numOfPlayers);
                    console.log(Legends);
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
            case REWARD_TYPE.guardian:
                tPlayerState.defeatedGuardians = tPlayerState.defeatedGuardians.filter(guardianId => !guardianId);
                switch (rewards[0].params) {
                    case EFFECT.gainCoinsAndJewelForGuardian:
                        tPlayerState.resources.coins += 1;
                        tPlayerState.resources.jewels += 1;
                        break;
                    default: console.error("Unable to determine reward key in guardian reward params!" + rewards[0].params);
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
        <Modal show={showModal} onHide={() => boardStateContext.toggleRewardsModalVisibility(false)} dialogClassName={"customModal"}>
            <Modal.Header closeButton>
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