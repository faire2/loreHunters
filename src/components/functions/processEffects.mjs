import {addCardToStore, drawCards, removeCard} from "./cardManipulationFuntions.mjs";
import {EFFECT} from "../../data/effects.mjs";
import cloneDeep from 'lodash/cloneDeep.js';
import {ITEM_IDs} from "../../data/idLists.mjs";
import React from "react";
import {ASSISTANT, ASSISTANT_STATE, CARD_STATE, CARD_TYPE, LOCATION_STATE, REWARD_TYPE} from "./enums";
import {getAssistantsChoice} from "./incomesFunctions";
import {updateLocations} from "../locations/functions/locationFunctions";
import {getRelicsForUpgrade} from "./effectsFunctions/getRelicsForUpgrade";
import {payForTravelIfPossible} from "../locations/functions/payForTravelIfPossible";

export function processEffects(tCard, cardIndex, originalPlayersState, effects, toBeRemoved, originalStore, location,
                               originalLocations) {
    console.log("Processing effects");
    console.log(effects);
    let tPlayerState = cloneDeep(originalPlayersState);
    let tStore = cloneDeep(originalStore);
    let tLocations = cloneDeep(originalLocations);
    let tActiveEffects = cloneDeep(tPlayerState.activeEffects);
    let processedAllEffects = true;
    let showRewardsModal = false;
    let rewardsData = {type: REWARD_TYPE.card, data: []};
    exitLoopFromSwitch();

    // eslint-disable-next-line no-unused-vars
    function exitLoopFromSwitch() {
        for (let effect of effects) {
            console.log("Resolving effect: " + effect);
            switch (effect) {
                case EFFECT.activateOccupiedLocation:
                case EFFECT.buyItemWithDiscount3:
                case EFFECT.defeatGuardianOnOwnedLocation:
                case EFFECT.defeatGuardianOnOwnOrEmptyLocation:
                case EFFECT.destroyCard:
                case EFFECT.drawFromDiscard:
                case EFFECT.exploreAnyLocationWithDiscount3:
                case EFFECT.exploreAnyLocationWithDiscount4:
                case EFFECT.gainArtifact:
                case EFFECT.gainItem:
                case EFFECT.gainRewardLevel:
                case EFFECT.buyWithDiscount1:
                case EFFECT.gainExpeditionCard:
                case EFFECT.gainItemToHand:
                case EFFECT.gainResourceFromAdjacentLocation:
                case EFFECT.payToUseOccupiedLocation:
                case EFFECT.placeToBasicLocation:
                case EFFECT.placeToBrownLocation:
                case EFFECT.placeToGreenLocation:
                case EFFECT.progressWithJewel:
                case EFFECT.progressWithTextsOrWeapon:
                case EFFECT.progressWithSecondToken:
                case EFFECT.removeGuardian:
                case EFFECT.return:
                case EFFECT.uptrade:
                case EFFECT.useItemOnMarket:
                case EFFECT.activateYourLocation:
                case EFFECT.activateAdjacentLocation:
                case EFFECT.activateEmptyL2Location:
                case EFFECT.activateEmptyL1Location:
                case EFFECT.useArtifactOnMarket:
                    tActiveEffects.push(effect);
                    break;

                case EFFECT.moveAdvToEmptyLocation:
                    tActiveEffects.push(EFFECT.removeAdventurer);
                    tActiveEffects.push(EFFECT.moveAdvToEmptyLocation);
                    break;

                case EFFECT.moveAdvToL1Location:
                    tActiveEffects.push(EFFECT.removeAdventurer);
                    tActiveEffects.push(EFFECT.moveAdvToL1Location);
                    break;

                case EFFECT.activate2dockActions:
                    // two actions = two effects
                    tActiveEffects.push(effect);
                    tActiveEffects.push(effect);
                    break;

                // positive effects hidden behind the discard are stored in activeEffects
                case EFFECT.discard:
                    if (tPlayerState.hand.length > 0) {

                        let tEffects = [];
                        const discardIndex = effects.indexOf(EFFECT.discard);
                        for (let i = discardIndex + 1; i < effects.length; i++) {
                            tEffects.push(effects[i]);
                        }
                        tActiveEffects.push(effect);
                        // we store effects behind active effect: discard - and retrieve them later
                        tActiveEffects.splice(tActiveEffects.length, 0, [...tEffects]);
                        // if discard leads to defeat of guardian, we need to remember the card
                        tActiveEffects.splice(tActiveEffects.length, 0, {location: location});
                        return;
                    } else {
                        processedAllEffects = false;
                        console.log("Discard could not been procesed - not enough cards.");
                        return;
                    }

                // this code was for defeating a guardian represented by card
                /*case EFFECT.defeatThisGuardian:
                    if (tCard) {
                        if (tCard.type === CARD_TYPE.guardian) {
                            tPlayerState.victoryCards.push(GUARDIAN_IDs[tCard.id]);
                            tPlayerState = removeCard(tCard, tPlayerState);
                            tPlayerState.victoryCards[tPlayerState.victoryCards.length - 1].state = CARD_STATE.victoryCards;
                        }
                        // if card is null, we may have stored the guard in evaluating discard effect of the guardian card
                    } else if (tActiveEffects[2]) {
                        tCard = tActiveEffects[2].card;
                        cardIndex = tActiveEffects[2].position;
                        tPlayerState.victoryCards.push(GUARDIAN_IDs[tCard.id]);
                        tPlayerState = removeCard(tCard, tPlayerState);
                        tPlayerState.victoryCards[tPlayerState.victoryCards.length - 1].state = CARD_STATE.victoryCards;
                        tActiveEffects.splice(0, 3);
                    }
                    break;*/

                case EFFECT.defeatThisGuardian:
                    if (location) {
                        if (location.state === LOCATION_STATE.guarded) {
                            tPlayerState.defeatedGuardians.push(location.guardian.id)
                            location.guardian = null;
                            location.state = LOCATION_STATE.explored;
                            tLocations = updateLocations(location, tLocations);
                        } else {
                            console.warn("Location was not guarded!")
                        }
                    } else {
                        console.log("No location found in the function, unable to defeat guardian.")
                    }
                    break;

                case EFFECT.destroyCardMandatory:
                    let tEffects = [];
                    const effectsIndex = effects.indexOf(EFFECT.destroyCardMandatory);
                    for (let i = effectsIndex + 1; i < effects.length; i++) {
                        tEffects.push(effects[i]);
                    }
                    tActiveEffects.push(effect);
                    const activeEffectsIndex = tActiveEffects.indexOf(effect);
                    tActiveEffects.splice(activeEffectsIndex + 1, 0, [...tEffects]);
                    return;

                case EFFECT.destroyThisCard:
                    if (tCard !== null) {
                        tPlayerState = removeCard(tCard, tPlayerState);
                    }
                    break;

                case EFFECT.destroyThisCardToDefeatAGuardan:
                    if (tCard.state === CARD_STATE.inHand) {
                        tPlayerState = removeCard(tCard, tPlayerState);
                        tActiveEffects.push(EFFECT.defeatGuardianOnOwnedLocation);
                    }
                    break;

                // if a player reaches lost city during research of a legend, we set that location state accordingly

                case EFFECT.discoverLostCity:
                    /*if (!tPlayerState.discoveredLostCity) {
                        tPlayerState.discoveredLostCity = true;
                        for (let locationLineKey of Object.keys(originalLocations)) {
                            for (let location of originalLocations[locationLineKey]) {
                                if (location.type === LOCATION_TYPE.lostCity && location.state === LOCATION_STATE.unexplored) {
                                    location.state = LOCATION_STATE.explored;
                                    // the lost city is activated too
                                    const cityEffects = Locations[location.id].effects;
                                    const cityResults = processEffects(null, null, tPlayerState, cityEffects,
                                        null, null, null, null);
                                    tPlayerState = cityResults.tPlayerState;
                                }
                            }
                        }
                    }
                    break;*/
                    tPlayerState.canActivateLostCity = true;
                    break;

                //if player has not discovered lost city we will return negative state - currently redundant
                case EFFECT.canActivateLostCity:
                    if (!tPlayerState.placeholder) {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.canActivateL3Location:
                    tPlayerState.canDiscoverL3Locations = true;
                    break;

                case EFFECT.draw1:
                    tPlayerState = drawCards(1, tPlayerState);
                    break;

                case EFFECT.draw2:
                    tPlayerState = drawCards(2, tPlayerState);
                    break;

                case EFFECT.draw3keep1:
                    const cardsToDraw = tPlayerState.drawDeck.length > 2 ? 3 : tPlayerState.drawDeck.length;
                    const rewardCards = [];
                    for (let i = 0; i < cardsToDraw; i++) {
                        rewardCards.push(tPlayerState.drawDeck[i]);
                    }
                    tPlayerState.drawDeck.splice(0, cardsToDraw);
                    rewardsData = {
                        type: REWARD_TYPE.card,
                        data: rewardCards,
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.drawFromDrawDeckOrDiscard:
                    rewardsData = {
                        type: REWARD_TYPE.card,
                        data: [...tPlayerState.discardDeck, ...tPlayerState.drawDeck]
                    };
                    showRewardsModal = true;
                    break;

                /*case EFFECT.draw2ForGuardian:
                    let isGuardian = false;
                    for (const card of tPlayerState.hand) {
                        if (card.type === CARD_TYPE.guardian) {
                            isGuardian = true
                        }
                    }
                    if (isGuardian) {
                        drawCards(2, tPlayerState)
                    }
                    break;*/

                /*case EFFECT.escapeGuardian:
                    if (tCard.type === CARD_TYPE.guardian) {
                        tPlayerState.destroyedCards.push(GUARDIAN_IDs[tCard.id]);
                        tPlayerState.activeCards.splice(cardIndex, 1);
                        tPlayerState = addCardToPlayedCards(cloneDeep(ITEM_IDs.fear), tPlayerState);
                    }
                    break;*/

                case EFFECT.finishRound:
                    tPlayerState.finishedRound = true;
                    break;

                case EFFECT.gainAction:
                    tPlayerState.actions += 1;
                    break;

                case EFFECT.gainCoinIfFirst:
                    tPlayerState.resources.coins += 1;
                    break;

                case EFFECT.gainExploreIfFirst:
                    tPlayerState.resources.explore += 1;
                    break;

                case EFFECT.gainMapIfFirst:
                    tPlayerState.resources.maps += 1;
                    break;

                case EFFECT.gainCoinOrExploreIfFirst:
                case EFFECT.gainExploreOrMapIfFirst:
                    // effects are processed in rewards modal
                    break;

                case EFFECT.gainMap:
                    tPlayerState.resources.maps += 1;
                    break;

                /*case EFFECT.gainDiscoveryBonus:
                    tActiveEffects.push(effect);
                    /!* hand is stored in activeEffects to be retrieved later *!/
                    tActiveEffects.splice(1, 0, tPlayerState.hand);
                    let newHand = [];
                    for (let card of tPlayerState.victoryCards) {
                        if (card.type === CARD_TYPE.guardian) {
                            newHand.push(card);
                        }
                    }
                    tPlayerState.hand = newHand;
                    break;*/

                case EFFECT.gainAdventurerForThisRound:
                    tPlayerState.availableAdventurers += 1;
                    break;

                case EFFECT.gainCoin:
                    tPlayerState.resources.coins += 1;
                    break;

                case EFFECT.gain2CoinsOrPassAnd3:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainAction],
                            [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.finishRound]
                        ]
                    };
                    break;

                case EFFECT.gainCoinAndExploresForGuardians:
                    let defeatedGuardians = 0;
                    for (let guardian of tPlayerState.defeatedGuardians) {
                        defeatedGuardians += 1;
                    }
                    defeatedGuardians = defeatedGuardians > 3 ? 3 : defeatedGuardians;
                    tPlayerState.resources.explore += 1;
                    tPlayerState.resources.coins += defeatedGuardians;
                    break;

                case EFFECT.gainCoinsAndJewelForGuardian:
                    tPlayerState.resources.coins += 2;
                    if (tPlayerState.defeatedGuardians.length > 0) {
                        rewardsData = {
                            type: REWARD_TYPE.guardian,
                            data: tPlayerState.defeatedGuardians,
                            params: effect
                        }
                        showRewardsModal = true;
                        break;
                    }

                /*case EFFECT.gainCoinsIfLast:
                    if (tPlayerState.hand.length === 1) {
                        tPlayerState.resources.coins += 2
                    }
                    break;*/

                case EFFECT.gainExplore:
                    tPlayerState.resources.explore += 1;
                    break;

                case EFFECT.gainExploreForGuardians:
                    let guardians = 0;
                    for (const guardian of tPlayerState.defeatedGuardians) {
                        guardians += 1;
                    }
                    /*for (const card of tPlayerState.activeCards) {
                        guardians = card.type === CARD_TYPE.guardian ? guardians + 1 : guardians;
                    }*/
                    guardians = guardians > 4 ? 4 : guardians;
                    tPlayerState.resources.explore += guardians;
                    break;

                case EFFECT.gainExploreForRelics:
                    let allRelics = tPlayerState.resources.relics;
                    for (let relic of tPlayerState.relics) {
                        if (!relic) {
                            allRelics += 1
                        }
                    }
                    tPlayerState.resources.explore += allRelics > 3 ? allRelics : 3;
                    break;

                case EFFECT.gainFear:
                    tPlayerState.activeCards.push({...ITEM_IDs.fear});
                    tPlayerState.activeCards[tPlayerState.activeCards.length - 1].state = CARD_STATE.played;
                    break;

                case EFFECT.gainJeep:
                    tPlayerState.resources.jeep += 1;
                    break;

                case EFFECT.gainJewel:
                    tPlayerState.resources.jewels += 1;
                    break;

                case EFFECT.gainPlaceholder:
                    tPlayerState.placeholder = 1;
                    break;

                case EFFECT.gainPlane:
                    tPlayerState.resources.plane += 1;
                    break;

                case EFFECT.infinitePlanes:
                    tPlayerState.longEffects.push(effect);
                    break;

                case EFFECT.gainRelic:
                    tPlayerState.resources.relics += 1;
                    break;

                case EFFECT.gainShip:
                    tPlayerState.resources.ship += 1;
                    break;

                case EFFECT.gainText:
                    tPlayerState.resources.texts += 1;
                    break;

                case EFFECT.gainWalk:
                    tPlayerState.resources.walk += 1;
                    break;

                case EFFECT.gainWeapon:
                    tPlayerState.resources.weapons += 1;
                    break;

                case EFFECT.gainBronzeRelic:
                    tPlayerState.resources.bronzeRelics += 1;
                    break;

                case EFFECT.loseAction:
                    tPlayerState.actions = tPlayerState.actions > 0 ? tPlayerState.actions - 1 : 0;
                    break;

                case EFFECT.loseAdventurer:
                    if (tPlayerState.availableAdventurers > 0) {
                        tPlayerState.availableAdventurers -= 1;
                    } else {
                        processedAllEffects = false;
                    }
                    break;

                case EFFECT.loseCoin:
                    if (tPlayerState.resources.coins > 0) {
                        tPlayerState.resources.coins -= 1;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.loseExplore:
                    if (tPlayerState.resources.explore > 0) {
                        tPlayerState.resources.explore -= 1;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.loseMap:
                    if (tPlayerState.resources.maps > 0) {
                        tPlayerState.resources.maps -= 1;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.loseText:
                    if (tPlayerState.resources.texts > 0) {
                        tPlayerState.resources.texts -= 1;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.loseWeapon:
                    if (tPlayerState.resources.weapons > 0) {
                        tPlayerState.resources.weapons -= 1;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.loseJewel:
                    if (tPlayerState.resources.jewels > 0) {
                        tPlayerState.resources.jewels -= 1;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                // higher form of transport can be used to pay for a lower one
                case EFFECT.loseWalk:
                case EFFECT.loseJeep:
                case EFFECT.loseShip:
                case EFFECT.loseBlimp:
                    const travelResults = payForTravelIfPossible(tPlayerState, null, effect);
                    if (travelResults.enoughResources) {
                        tPlayerState = travelResults.tPlayerState;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.gainSilverAssistant:
                    rewardsData = {
                        type: REWARD_TYPE.gainAssistant,
                        data: getAssistantsChoice(tPlayerState, tStore, ASSISTANT.silver),
                        params: ASSISTANT.silver
                    }
                    showRewardsModal = true;
                    break;

                case EFFECT.gainGoldAssistant:
                    rewardsData = {
                        type: REWARD_TYPE.gainAssistant,
                        data: getAssistantsChoice(tPlayerState, tStore, ASSISTANT.gold),
                        params: ASSISTANT.gold
                    }
                    showRewardsModal = true;
                    break;

                case EFFECT.gainOrUpgradeAssistant:
                    rewardsData = {
                        type: REWARD_TYPE.addAssistant,
                        data: getAssistantsChoice(tPlayerState, tStore, ASSISTANT.upgrade)
                    }
                    showRewardsModal = true;
                    break;

                case EFFECT.gainOrUpgradeRelic:
                    if (tPlayerState.resources.relics === 0 && tPlayerState.resources.silverRelics === 0 && tPlayerState.resources.goldRelics === 0) {
                        //if player has no relics, he gains one
                        tPlayerState.resources.relics += 1;
                    } else {
                        rewardsData = {type: REWARD_TYPE.upgradeRelic, data: getRelicsForUpgrade(tPlayerState)};
                        showRewardsModal = true;
                    }
                    break;

                case EFFECT.protectFromFear:
                    tPlayerState.longEffects.push(effect);
                    break;

                case EFFECT.refreshAsistant:
                    const spentAssistants = [];
                    const assistantClones = cloneDeep(tPlayerState.assistants)
                    for (let assistant of assistantClones) {
                        if (assistant.state === ASSISTANT_STATE.spent) {
                            assistant.state = ASSISTANT_STATE.ready
                            spentAssistants.push(assistant);
                        }
                    }
                    if (spentAssistants.length > 0) {
                        rewardsData = {type: REWARD_TYPE.refreshAssistant, data: spentAssistants};
                        showRewardsModal = true;
                    } else {
                        console.log("No spent assistant to refresh");
                    }
                    break;

                case

                EFFECT.refreshRelic:
                    for (let i = 0; i < tPlayerState.relics.length; i++) {
                        if (tPlayerState.relics[i] === false) {
                            tPlayerState.relics[i] = true;
                            break;
                        }
                    }
                    break;

                case
                EFFECT.revealItemBuyWithDiscount3
                :
                    tActiveEffects.push(effect);
                    tStore = addCardToStore(CARD_TYPE.item, tStore);
                    break;

                case
                EFFECT.revealArtifactBuyWithDiscount3
                :
                    tActiveEffects.push(effect);
                    tStore = addCardToStore(CARD_TYPE.artifact, tStore);
                    break;

                case
                EFFECT.unlockCard
                :
                    let cardToUnlock = tPlayerState.activeCards[cardIndex];
                    cardToUnlock.state = CARD_STATE.inHand;
                    tPlayerState.hand.push(cardToUnlock);
                    tPlayerState.activeCards.splice(cardIndex, 1);
                    break;

                default:
                    console.log("HandleCardEffect didn't recognize effect: " + effect);
                    console.log(effects);
            }
        }
    }

    if (!processedAllEffects) {
        console.log("Some effects could not be processed in processEffects:");
        console.log(effects);
        return {
            tPlayerState: originalPlayersState,
            tStore: originalStore,
            tLocations: originalLocations,
            processedAllEffects: processedAllEffects
        }
    }
    tPlayerState.activeEffects = tActiveEffects;
    console.log("All effects processed");
    return {
        tPlayerState: tPlayerState,
        tStore: tStore,
        tLocations: tLocations,
        processedAllEffects: processedAllEffects,
        showRewardsModal: showRewardsModal,
        rewardsData: rewardsData,
    };
}