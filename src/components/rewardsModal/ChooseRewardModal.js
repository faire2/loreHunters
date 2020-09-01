import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";
import {cloneDeep} from "lodash";
import {processEffects} from "../functions/processEffects";
import {removeCard} from "../functions/cardManipulationFuntions";
import {
    ASSISTANT,
    ASSISTANT_LEVEL,
    ASSISTANT_STATE,
    CARD_STATE,
    CARD_TYPE,
    RELIC,
    REWARD_TYPE
} from "../functions/enums";
import {replaceFirsUserJointLegendResource} from "../legends/functions/legendsFunctions";
import {EFFECT} from "../../data/effects";
import {getRewardElement} from "./getRewardElement";


export default function ChooseRewardModal() {
    const boardStateContext = useContext(BoardStateContext);
    const showModal = boardStateContext.showModal;
    const rewards = boardStateContext.modalData;
    const rewardType = rewards.length > 0 ? rewards[0].type : null;
    let tPlayerState = cloneDeep(boardStateContext.playerState);
    let tStore = cloneDeep(boardStateContext.store);
    let tLocations = cloneDeep(boardStateContext.locations);
    let tLegend = cloneDeep(boardStateContext.legend);
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

    function handleClickOnReward(reward, index) {
        let rewardIndex;
        let cards;
        let params = rewards[0].params;
        switch (rewardType) {
            case REWARD_TYPE.card:
                if (reward.type === CARD_TYPE.goalCard) {
                    tPlayerState.victoryCards.push(reward);
                    tStore.expeditions.splice(index, 1);
                } else {
                    // all effects send reward card to hand
                    reward.state = CARD_STATE.inHand;
                    tPlayerState = removeCard(reward, tPlayerState, tStore);
                    tPlayerState.hand.push(reward);
                }
                break;
            case REWARD_TYPE.drawCard:
                let cardsToDiscard = rewards[0].data;
                rewardIndex = cardsToDiscard.findIndex(card => card.id === reward.id);
                cardsToDiscard.splice(rewardIndex, 1);
                for (let card of rewards[0].data) {
                    tPlayerState = removeCard(card, tPlayerState, tStore);
                }
                tPlayerState.activeCards = tPlayerState.activeCards.concat(cardsToDiscard);
                reward.state = CARD_STATE.inHand;
                tPlayerState.hand.push(reward);
                break;
            case REWARD_TYPE.drawStackDiscardCard:
                cards = rewards[0].data;
                // we remove the cards from draw deck
                tPlayerState.drawDeck.splice(0, cards.length);
                // first we choose a card to hand
                rewardIndex = cards.findIndex(card => card.id === reward.id);
                cards.splice(rewardIndex, 1);
                reward.state = CARD_STATE.inHand;
                tPlayerState.hand.push(reward);
                // copy remaining cards for new modal
                if (cards.length > 0) {
                    rewards.push({type: REWARD_TYPE.stackCardToDrawDeck, data: rewards[0].data});
                }
                break;
            case REWARD_TYPE.stackCardToDrawDeck:
                // then we choose one that goes to top of drawDeck
                cards = rewards[0].data;
                rewardIndex = cards.findIndex(card => card.id === reward.id);
                // reward goes to draw deck
                reward.state = CARD_STATE.drawDeck;
                tPlayerState.drawDeck.splice(0, 0, reward);
                if (cards.length > 1) {
                    // the remaining card goes to active cards
                    cards.splice(rewardIndex, 1);
                    let cardToDiscard = rewards[0].data[0];
                    cardToDiscard.state = CARD_STATE.active;
                    tPlayerState.activeCards.push(cardToDiscard)
                }
                break;
            case REWARD_TYPE.chooseDestroyedCard:
                tPlayerState.drawDeck.push(reward);
                tPlayerState.drawDeck[tPlayerState.drawDeck.length - 1].state = CARD_STATE.drawDeck;
                rewardIndex = tStore.destroyedCards.findIndex(card => card.id === reward.id);
                tStore.destroyedCards.splice(rewardIndex, 1);
                break;
            case REWARD_TYPE.gainAssistant:
                reward.state = ASSISTANT_STATE.ready;
                tPlayerState.assistants.push(reward);
                if (params === ASSISTANT.silver) {
                    if (tStore.assistantsDeck.length > 0) {
                        tStore.assistantsOffer.splice(index, 1, tStore.assistantsDeck[0]);
                        tStore.assistantsDeck.splice(0, 1);
                    } else {
                        tStore.assistantsOffer.splice(index, 1);
                    }
                }
                break;
            case REWARD_TYPE.gainAssistantFromLegend:
                reward.state = ASSISTANT_STATE.ready;
                tPlayerState.assistants.push(reward);
                if (tStore.assistantsInLegendDeck.length > 0) {
                    tStore.assistantsInLegendOffer.splice(index, 1, tStore.assistantsInLegendDeck[0]);
                    tStore.assistantsInLegendDeck.splice(0, 1);
                } else {
                    tStore.assistantsInLegendOffer.splice(index, 1);
                }
                break;
            case REWARD_TYPE.upgradeAssistant:
                for (let assistant of tPlayerState.assistants) {
                    if (reward.id === assistant.id) {
                        assistant.level = ASSISTANT_LEVEL.gold;
                        assistant.state = ASSISTANT_STATE.ready;
                    }
                }
                break;
            case REWARD_TYPE.removeAssistant:
                let assistantIndex = null;
                let assistant = null;
                for (let i = 0; i < tPlayerState.assistants.length; i++) {
                    if (tPlayerState.assistants[i].id === reward.id) {
                        assistantIndex = i;
                        assistant = tPlayerState.assistants[i];
                        assistant.state = ASSISTANT_STATE.ready;
                    }
                }
                tPlayerState.assistants.splice(assistantIndex, 1);
                // if removing assistant is part of exchanging him, we have to prepare new selection
                if (rewards[0].params === REWARD_TYPE.gainAssistant) {
                    let assistants = tStore.assistantsOffer;
                    for (let assistant of assistants) {
                        assistant.level = reward.level;
                    }
                    // we store assistant in the params to add it into the store later
                    rewards.push({
                        type: REWARD_TYPE.exchangeAssistant,
                        data: assistants,
                        params: assistant
                    });
                }
                break;
            case REWARD_TYPE.exchangeAssistant:
                reward.state = ASSISTANT_STATE.ready;
                tPlayerState.assistants.push(reward);
                for (let i = 0; i < tStore.assistantsOffer.length; i++) {
                    if (reward.id === tStore.assistantsOffer[i].id) {
                        tStore.assistantsOffer.splice(i, 1, rewards[0].params);
                    }
                    tStore.assistantsOffer[i].level = ASSISTANT_LEVEL.silver;
                }
                break;

            case REWARD_TYPE.refreshAssistant:
                for (let spentAssistant of tPlayerState.assistants) {
                    if (spentAssistant.id === reward.id) {
                        spentAssistant.state = ASSISTANT_STATE.ready;
                    }
                    // if the refreshed assistant is automatic, we immediately use it
                    /*if (AUTOMATIC_ASSISTANT_EFFECTS.includes(spentAssistant.id)) {
                        tPlayerState = handleIncome(tPlayerState, spentAssistant);
                        spentAssistant.state = ASSISTANT_STATE.spent;
                    }*/
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
            case REWARD_TYPE.relicWithEffects:
                const relicEffectsResult = processEffects(null, null, tPlayerState, reward, null, null, null);
                tPlayerState = relicEffectsResult.tPlayerState;
                if (params === RELIC.bronze) {
                    tPlayerState.resources.bronzeRelics += 1;
                } else if (params === RELIC.silver) {
                    tPlayerState.resources.silverRelics += 1;
                } else if (params === RELIC.gold) {
                    tPlayerState.resources.goldRelics += 1;
                } else {
                    console.error("Unable to determine type of relic with resource in RewardsModal: " + reward)
                }
                break;
            case REWARD_TYPE.effectsArr:
                // if we have a card in parameters, we set it
                let tCard = null;
                if (params) {
                    tCard = params;
                }
                const effectsResult = processEffects(tCard, null, tPlayerState, reward, tStore, null, null);
                if (effectsResult.processedAllEffects) {
                    tPlayerState = effectsResult.tPlayerState;
                    if (effectsResult.showRewardsModal) {
                        rewards.push(effectsResult.rewardsData);
                    }
                } else {
                    console.log("Effects could not be processed in handleClickOnReward");
                    console.log(reward);
                }
                break;
            case REWARD_TYPE.legendColumnEffects:
                // first process effects
                const columnEffectsResult = processEffects(null, null, tPlayerState, reward, null, null, null);
                if (columnEffectsResult.processedAllEffects) {
                    tPlayerState = columnEffectsResult.tPlayerState;
                } else {
                    console.log("Effects could not be processed in handleClickOnReward");
                    console.log(reward);
                }
                // then if there are at least 2 effects to be chosen prepare rest of rewards for second round
                if (rewards[0].data.length > 1 && rewards[0].params > 0) {
                    rewardIndex = rewards[0].data.findIndex(effect => effect === reward);
                    rewards[0].data.splice(rewardIndex, 1);
                    rewards[0].params = params - 1;
                    rewards.push(rewards[0]);
                }
                break;
            case REWARD_TYPE.legendFieldEffects:
                const legendEffectsResult = processEffects(null, null, tPlayerState, [reward.effects], null, null, null);
                if (legendEffectsResult.processedAllEffects) {
                    const fieldPosition = rewards[0].params;
                    tPlayerState = legendEffectsResult.tPlayerState;
                    tLegend[fieldPosition.legendIndex].fields[fieldPosition.columnIndex][fieldPosition.fieldIndex]
                        = replaceFirsUserJointLegendResource(reward.effects, tLegend.fields[fieldPosition.columnIndex]
                        [fieldPosition.fieldIndex], numOfPlayers);
                    console.log(tLegend);
                }
                break;
            case REWARD_TYPE.legendLostCityEffects:
                const lostCityEffectsResult = processEffects(null, null, tPlayerState, [reward.effects], null, null, null);
                if (lostCityEffectsResult.processedAllEffects) {
                    tLegend.lostCityEffects.splice(tLegend.lostCityEffects.indexOf(reward), 1);
                }
                break;
            case REWARD_TYPE.location:
                let location = reward;
                const locationResult = processEffects(null, null, tPlayerState, location.effects, tStore, location, tLocations);
                if (locationResult) {
                    tPlayerState = locationResult.tPlayerState;
                    tLocations = locationResult.tLocations;
                    tStore = locationResult.tStore;
                }

                break;
            case REWARD_TYPE.guardian:
                tPlayerState.defeatedGuardians = tPlayerState.defeatedGuardians.filter(guardianId => !guardianId);
                switch (rewards[0].params) {
                    case EFFECT.gainCoinsAndJewelForGuardian:
                        tPlayerState.resources.coins += 1;
                        tPlayerState.resources.jewels += 1;
                        break;
                    default:
                        console.error("Unable to determine reward key in guardian reward params!" + rewards[0].params);
                }
                break;
            default:
                console.log("Element type could not be identified at getElement: ");
                console.log(rewardType);
        }
        const moreRewardsToProcess = rewards.length > 1;
        boardStateContext.handleReward(tPlayerState, tStore, tLocations, tLegend, moreRewardsToProcess);
    }

    return (
        <Modal show={showModal} onHide={() => boardStateContext.toggleRewardsModalVisibility(false)}
               dialogClassName={"customModal"}>
            <Modal.Header closeButton>
                <Modal.Title>Choose your boon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={containerStyle}>
                    {rewards.length > 0 && rewards[0].data.map((reward, i) =>
                        <div style={rewardStyle} onClick={() => handleClickOnReward(reward, i)} key={i}>
                            {getRewardElement(reward, rewardType, rewards)}
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}