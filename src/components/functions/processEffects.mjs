import {addCardToStore, drawCards, removeCard} from "./cardManipulationFuntions.mjs";
import {EFFECT} from "../../data/effects.mjs";
import cloneDeep from 'lodash/cloneDeep.js';
import {ASSISTANT, ASSISTANT_LEVEL, ASSISTANT_STATE, CARD_STATE, CARD_TYPE, LOCATION_STATE, REWARD_TYPE} from "./enums";
import {getAssistantsChoice} from "./incomesFunctions";
import {updateLocations} from "../locations/functions/locationFunctions";
import {getRelicsForUpgrade} from "./effectsFunctions/getRelicsForUpgrade";
import {payForTravelIfPossible} from "../locations/functions/payForTravelIfPossible";
import {getLogLegend} from "../main/logger";
import {shuffleArray} from "./cardManipulationFuntions";
import {ITEMS} from "../../data/cards.mjs";

export function processEffects(tCard, cardIndex, originalPlayersState, effects, originalStore, location, originalLocations,
                               originalLegend) {
    console.log("Processing effects");
    console.log(effects);
    let tPlayerState = cloneDeep(originalPlayersState);
    let tStore = cloneDeep(originalStore);
    let tLocations = cloneDeep(originalLocations);
    let tActiveEffects = cloneDeep(tPlayerState.activeEffects);
    let tLegend = cloneDeep(originalLegend);
    let processedAllEffects = true;
    let showRewardsModal = false;
    let rewardsData = {type: REWARD_TYPE.card, data: []};
    // used to store failed effect
    let lastEffect = null;
    exitLoopFromSwitch();

    // eslint-disable-next-line no-unused-vars
    function exitLoopFromSwitch() {
        for (let effect of effects) {
            let cardsToDraw;
            let rewardsArr = [];
            console.log("Resolving effect: " + effect);
            lastEffect = effect;
            switch (effect) {
                case EFFECT.activateOccupiedLocation:
                case EFFECT.buyItemWithDiscount3:
                case EFFECT.buyItemWithDiscount2:
                case EFFECT.defeatGuardianOnOwnedLocation:
                case EFFECT.defeatGuardianOnOwnOrEmptyLocation:
                case EFFECT.destroyCard:
                case EFFECT.destroyCardInStore:
                case EFFECT.exploreAnyLocationWithDiscount2:
                case EFFECT.exploreAnyLocationWithDiscount3:
                case EFFECT.gainArtifact:
                case EFFECT.gainItem:
                case EFFECT.gainItemOfValue:
                case EFFECT.gainRewardLevel:
                case EFFECT.gain2ItemsFor1Exiled:
                case EFFECT.buyWithDiscount1:
                case EFFECT.buyWithDiscount2:
                case EFFECT.gainExpeditionCard:
                case EFFECT.gainItemToHand:
                case EFFECT.gainResourceFromAdjacentLocation:
                case EFFECT.moveGuardianOut:
                case EFFECT.markLocation:
                case EFFECT.payToUseOccupiedLocation:
                case EFFECT.placeAnywhere:
                case EFFECT.placeToBasicLocationActivateTwice:
                case EFFECT.placeToBrownLocation:
                case EFFECT.placeToGreenLocation:
                case EFFECT.placeToBasicLocationDiscount2:
                case EFFECT.progressWithWeapon:
                case EFFECT.progressWithTexts:
                case EFFECT.progressWithJewel:
                case EFFECT.progressWithSecondToken:
                case EFFECT.removeGuardian:
                case EFFECT.returnAdventurer:
                case EFFECT.uptrade:
                case EFFECT.useItemOnMarket:
                case EFFECT.activateYourLocation:
                case EFFECT.activateAdjacentLocation:
                case EFFECT.activateEmptyL2Location:
                case EFFECT.activateEmptyL1Location:
                case EFFECT.activateL1Location:
                case EFFECT.activateL2Location:
                case EFFECT.activateThisLocationAgain:
                case EFFECT.useArtifactOnMarket:
                    tActiveEffects.push(effect);
                    break;

                case EFFECT.moveAdvToEmptyLocation:
                    tActiveEffects.push(EFFECT.removeAdventurer);
                    tActiveEffects.push(EFFECT.moveAdvToEmptyLocation);
                    break;

                case EFFECT.moveAdvToL1L2Location:
                    tActiveEffects.push(EFFECT.removeAdventurer);
                    tActiveEffects.push(EFFECT.moveAdvToL1L2Location);
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

                case EFFECT.activateTopL2Location:
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [tLocations.level2Locations[0].effects],
                    };
                    tLocations.level2Locations.push(tLocations.level2Locations[0]);
                    tLocations.level2Locations.splice(0, 1);
                    showRewardsModal = true;
                    break;

                case EFFECT.activateTopL3Location:
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [tLocations.level3Locations[0].effects],
                    };
                    tLocations.level3Locations.push(tLocations.level3Locations[0]);
                    tLocations.level3Locations.splice(0, 1);
                    showRewardsModal = true;
                    break;

                case EFFECT.activate2L1Locations:
                    tActiveEffects.push(EFFECT.activateL1Location);
                    tActiveEffects.push(EFFECT.activateL1Location);
                    break;

                case EFFECT.activateLesserAssistantFromOffer:
                    for (let assistant of tStore.assistantsOffer) {
                        rewardsArr.push(assistant.silverEffects);
                    }
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: rewardsArr,
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.activateStrongerAssistantFromOffer:
                    for (let assistant of tStore.assistantsOffer) {
                        rewardsArr.push(assistant.goldEffects);
                    }
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: rewardsArr,
                    };
                    showRewardsModal = true;
                    break;

                // positive effects hidden behind the discard are stored in activeEffects
                case EFFECT.discard:
                    if (tPlayerState.hand.length > 0) {
                        tActiveEffects.push(effect);
                        let tEffects = [];
                        const discardIndex = effects.indexOf(EFFECT.discard);
                        // if we have more effects to process, we hide them to active effects
                        if (discardIndex < effects.length - 1) {
                            for (let i = discardIndex + 1; i < effects.length; i++) {
                                tEffects.push(effects[i]);
                            }
                            // we store effects behind active effect: discard - and retrieve them later
                            tActiveEffects.splice(tActiveEffects.length, 0, [...tEffects]);
                            // if discard leads to defeat of guardian, we need to remember the card
                            tActiveEffects.splice(tActiveEffects.length, 0, {location: location});
                        }
                        return;
                    } else {
                        processedAllEffects = false;
                        console.log("Discard could not been procesed - not enough cards.");
                        return;
                    }

                case EFFECT.defeatThisGuardian:
                    if (location) {
                        if (location.state === LOCATION_STATE.guarded) {
                            tPlayerState.defeatedGuardians.push(location.guardian.id);
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
                    if (tCard) {
                        tPlayerState = removeCard(tCard, tPlayerState, tStore);
                    }
                    break;

                case EFFECT.destroyThisCardToDefeatAGuardan:
                    if (tCard && tCard.state === CARD_STATE.inHand) {
                        tPlayerState = removeCard(tCard, tPlayerState, tStore);
                        tActiveEffects.push(EFFECT.defeatGuardianOnOwnedLocation);
                    }
                    break;

                // if a player reaches lost city during research of a legend, we set that location state accordingly
                // additionaly he can choose from array of effects set on legend initialization
                case EFFECT.discoverLostCity:
                    tPlayerState.canActivateLostCity = true;
                    let effectsArr = [];
                    for (let effect of tLegend.lostCityEffects) {
                        effectsArr.push([effect]);
                    }
                    rewardsData = {
                        type: REWARD_TYPE.legendLostCityEffects,
                        data: effectsArr,
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.drawFromBottom:
                    if (tPlayerState.drawDeck.length > 0) {
                        const bottomCard = tPlayerState.drawDeck[tPlayerState.drawDeck.length - 1];
                        tPlayerState = removeCard(bottomCard, tPlayerState, tStore);
                        tPlayerState.hand.push(bottomCard);
                        tPlayerState.hand[tPlayerState.hand.length - 1].state = CARD_STATE.inHand;
                    }
                    break;

                case EFFECT.draw2FromBottomKeep1:
                    for (let i = 0; i < 2; i++) {
                        if (tPlayerState.drawDeck.length > 0) {
                            rewardsArr.push(tPlayerState.drawDeck[tPlayerState.drawDeck.length - 1]);
                            tPlayerState.drawDeck.splice(tPlayerState.drawDeck.length - 1, 1);
                        }
                    }
                    rewardsData = {
                        type: REWARD_TYPE.drawCard,
                        data: rewardsArr,
                    };
                    showRewardsModal = true;
                    break;

                //if player has not discovered lost city we will return negative state - currently redundant
                case EFFECT.canActivateLostCity:
                    if (!tPlayerState.placeholder) {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.draw1:
                    tPlayerState = drawCards(1, tPlayerState);
                    break;

                case EFFECT.draw2:
                    tPlayerState = drawCards(2, tPlayerState);
                    break;

                case EFFECT.draw2keep1:
                    cardsToDraw = tPlayerState.drawDeck.length > 2 ? 3 : tPlayerState.drawDeck.length;
                    rewardsArr = [];
                    for (let i = 0; i < cardsToDraw; i++) {
                        rewardsArr.push(tPlayerState.drawDeck[i]);
                    }
                    tPlayerState.drawDeck.splice(0, cardsToDraw);
                    rewardsData = {
                        type: REWARD_TYPE.drawCard,
                        data: rewardsArr,
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.draw3keep1:
                    cardsToDraw = tPlayerState.drawDeck.length > 2 ? 3 : tPlayerState.drawDeck.length;
                    rewardsArr = [];
                    for (let i = 0; i < cardsToDraw; i++) {
                        rewardsArr.push(tPlayerState.drawDeck[i]);
                    }
                    tPlayerState.drawDeck.splice(0, cardsToDraw);
                    rewardsData = {
                        type: REWARD_TYPE.drawCard,
                        data: rewardsArr,
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.draw2keep1stack1:
                    cardsToDraw = tPlayerState.drawDeck.length > 1 ? 2 : tPlayerState.drawDeck.length;
                    rewardsArr = [];
                    for (let i = 0; i < cardsToDraw; i++) {
                        rewardsArr.push(tPlayerState.drawDeck[i]);
                    }
                    rewardsData = {
                        type: REWARD_TYPE.drawStackDiscardCard,
                        data: rewardsArr
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.draw3keep1stack1:
                    cardsToDraw = tPlayerState.drawDeck.length > 2 ? 3 : tPlayerState.drawDeck.length;
                    rewardsArr = [];
                    for (let i = 0; i < cardsToDraw; i++) {
                        rewardsArr.push(tPlayerState.drawDeck[i]);
                    }
                    rewardsData = {
                        type: REWARD_TYPE.drawStackDiscardCard,
                        data: rewardsArr
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

                case EFFECT.exploreAnyLocationWithBaloon:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [
                            [EFFECT.placeAnywhere],
                            [EFFECT.destroyThisCard, EFFECT.exploreAnyLocationWithDiscount3]
                        ],
                        params: tCard,
                    };
                    break;

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

                case EFFECT.gainAdventurerForThisRound:
                    tPlayerState.availableAdventurers += 1;
                    break;

                case EFFECT.gainDestroyedItem:
                    // destroy rightmost item and replace it for a new one
                    tStore.destroyedCards.push(tStore.itemsOffer[tStore.itemsOffer.length - 1]);
                    tStore.itemsOffer.splice(tStore.itemsOffer.length - 1, 1, tStore.itemsDeck[0]);
                    // choose from destroyed items
                    rewardsData = {
                        type: REWARD_TYPE.chooseDestroyedCard,
                        data: tStore.destroyedCards,
                    };
                    showRewardsModal = true;
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

                case EFFECT.gainCoinExploreOrPassForExtraExplore:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.gainAction],
                            [EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.finishRound]
                        ]
                    };
                    break;

                case EFFECT.gain2TextsOrPassAndJewel:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainText, EFFECT.gainText],
                            [EFFECT.gainJewel, EFFECT.finishRound]
                        ]
                    };
                    break;

                case EFFECT.gain2PlanesOr2Coins:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainCoin, EFFECT.gainCoin],
                            [EFFECT.gainPlane, EFFECT.gainPlane]
                        ]
                    };
                    break;

                case EFFECT.gainJeepOrExplore:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainJeep],
                            [EFFECT.gainExplore]
                        ]
                    };
                    break;

                case EFFECT.gainShipOrExplore:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainShip],
                            [EFFECT.gainExplore]
                        ]
                    };
                    break;

                case EFFECT.gain2JeepsOrCoinExplore:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainJeep, EFFECT.gainJeep],
                            [EFFECT.gainCoin, EFFECT.gainExplore]
                        ]
                    };
                    break;

                case EFFECT.gain2ShipsOrCoinExplore:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainShip, EFFECT.gainShip],
                            [EFFECT.gainCoin, EFFECT.gainExplore]
                        ]
                    };
                    break;

                case EFFECT.gainItemOrExplores:
                    showRewardsModal = true;
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr, data: [
                            [EFFECT.gainItem],
                            [EFFECT.gainExplore, EFFECT.gainExplore]
                        ]
                    };
                    break;

                case EFFECT.gainCoinAndExploresForGuardians:
                    let defeatedGuardians = 0;
                    // eslint-disable-next-line no-unused-vars
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
                        };
                        showRewardsModal = true;
                        break;
                    }
                    break;

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
                    // eslint-disable-next-line no-unused-vars
                    for (const guardian of tPlayerState.defeatedGuardians) {
                        guardians += 1;
                    }

                    // search locations that include both player's adventurer and a guardian
                    for (let location of tLocations.line1) {
                        if (location.adventurers.includes(tPlayerState.playerIndex) && location.state === LOCATION_STATE.guarded) {
                            guardians += 1;
                        }
                    }
                    for (let location of tLocations.line2) {
                        if (location.adventurers.includes(tPlayerState.playerIndex) && location.state === LOCATION_STATE.guarded) {
                            guardians += 1;
                        }
                    }
                    for (let location of tLocations.line3) {
                        if (location.adventurers.includes(tPlayerState.playerIndex) && location.state === LOCATION_STATE.guarded) {
                            guardians += 1;
                        }
                    }
                    for (let location of tLocations.line4) {
                        if (location.adventurers.includes(tPlayerState.playerIndex) && location.state === LOCATION_STATE.guarded) {
                            guardians += 1;
                        }
                    }

                    guardians = guardians > 4 ? 4 : guardians;
                    tPlayerState.resources.explore += guardians;
                    break;

                case EFFECT.gainExploreForRelics:
                    let allRelics = tPlayerState.resources.bronzeRelics + tPlayerState.resources.silverRelics
                        + tPlayerState.resources.goldRelics + tPlayerState.resources.slottableRelics;
                    for (let relic of tPlayerState.relics) {
                        if (relic) {
                            allRelics += 1
                        }
                    }
                    tPlayerState.resources.explore += allRelics > 3 ? 3 : allRelics;
                    break;

                case EFFECT.gainExploreForPlacedAdventurers:
                    let allAdventurers = 0;
                    for (let location of tLocations.line1) {
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            allAdventurers += 1;
                        }
                    }
                    for (let location of tLocations.line2) {
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            allAdventurers += 1;
                        }
                    }
                    for (let location of tLocations.line3) {
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            allAdventurers += 1;
                        }
                    }
                    for (let location of tLocations.line4) {
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            allAdventurers += 1;
                        }
                    }
                    tPlayerState.resources.explore += allAdventurers;
                    break;

                case EFFECT.gainFear:
                    tPlayerState.activeCards.push({...ITEMS.fear});
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

                case EFFECT.gainWeaponOrJewel:
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [[EFFECT.gainWeapon], [EFFECT.gainJewel]],
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.gainPlaneOrCoin:
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [[EFFECT.gainPlane], [EFFECT.gainCoin]],
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.gainJeepOrCoin:
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [[EFFECT.gainJeep], [EFFECT.gainCoin]],
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.gainShipOrCoin:
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [[EFFECT.gainShip], [EFFECT.gainCoin]],
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.gainBronzeRelic:
                    tPlayerState.resources.bronzeRelics += 1;
                    break;

                case EFFECT.gain2ResearchBonuses:
                    // prepare first token reward for each researched column
                    const legend = getLogLegend();
                    const columnIndex = legend.positions[tPlayerState.playerIndex][0].columnIndex;
                    const rewardEffects = [];
                    if (columnIndex != null) {
                        for (let i = 0; i < columnIndex + 1; i++) {
                            rewardEffects.push(legend.columnRewards[i][0]);
                        }
                        rewardsData = {
                            type: REWARD_TYPE.legendColumnEffects,
                            data: rewardEffects,
                            params: 1,
                        };
                        showRewardsModal = true;
                    }
                    break;

                case EFFECT.gainRandomGoldRelicEffect:
                    let goldRelicEffects = shuffleArray(cloneDeep(tStore.goldRelicEffects));
                    // terrible hack, currently only working for cards
                    tActiveEffects.push(EFFECT.resolveAdditionalEffects);
                    tActiveEffects.push(goldRelicEffects[0]);
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

                case EFFECT.loseSlottableRelic:
                    if (tPlayerState.resources.slottableRelics > 0) {
                        tPlayerState.resources.slottableRelics -= 1;
                    } else {
                        processedAllEffects = false;
                        return
                    }
                    break;

                // higher form of transport can be used to pay for a lower one
                case EFFECT.loseWalk:
                case EFFECT.loseJeep:
                case EFFECT.loseShip:
                case EFFECT.losePlane:
                    let tempLocation = location ? location : null;
                    const travelResults = payForTravelIfPossible(tPlayerState, tempLocation, effect);
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
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.gainGoldAssistant:
                    rewardsData = {
                        type: REWARD_TYPE.gainAssistant,
                        data: getAssistantsChoice(tPlayerState, tStore, ASSISTANT.gold),
                        params: ASSISTANT.gold
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.gainAssistantFromLegend:
                    rewardsData = {
                        type: REWARD_TYPE.gainAssistantFromLegend,
                        data: [tStore.assistantsInLegendOffer[0], tStore.assistantsInLegendOffer[1]],
                        params: ASSISTANT.gold
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.upgradeAssistant:
                    const assistents = getAssistantsChoice(tPlayerState, tStore, ASSISTANT.upgrade);
                    if (assistents.length > 0) {
                        rewardsData = {
                            type: REWARD_TYPE.upgradeAssistant,
                            data: assistents
                        };
                        showRewardsModal = true;
                    }
                    break;

                case EFFECT.exchangeAssistant:
                    rewardsData = {
                        type: REWARD_TYPE.removeAssistant,
                        data: tPlayerState.assistants,
                        params: REWARD_TYPE.gainAssistant
                    };
                    showRewardsModal = true;
                    break;


                case EFFECT.gainOrUpgradeRelic:
                    if (tPlayerState.resources.bronzeRelics === 0 && tPlayerState.resources.silverRelics === 0 && tPlayerState.resources.goldRelics === 0) {
                        //if player has no relics, he gains one
                        tPlayerState.resources.bronzeRelics += 1;
                    } else {
                        rewardsData = {type: REWARD_TYPE.upgradeRelic, data: getRelicsForUpgrade(tPlayerState)};
                        showRewardsModal = true;
                    }
                    break;

                case EFFECT.progressWithTextsOrWeapon:
                    rewardsData = {
                        type: REWARD_TYPE.effectsArr,
                        data: [[EFFECT.progressWithTexts], [EFFECT.progressWithWeapon]],
                    };
                    showRewardsModal = true;
                    break;

                case EFFECT.protectFromFear:
                    tPlayerState.longEffects.push(effect);
                    break;

                case EFFECT.replaceItemsInStore:
                    const storeItems = tStore.itemsOffer.length;
                    let newItems = [];
                    for (let i = 0; i < storeItems; i++) {
                        if (tStore.itemsDeck.length > 0) {
                            newItems.push(tStore.itemsDeck[0]);
                            tStore.itemsDeck.splice(0, 1);
                        }
                    }
                    tStore.itemsOffer = newItems;
                    break;

                case EFFECT.refreshSilverAssistant:
                    let silverAssistants = [];
                    for (const assistant of tPlayerState.assistants) {
                        if (assistant.level === ASSISTANT_LEVEL.silver && assistant.state === ASSISTANT_STATE.spent) {
                            silverAssistants.push(cloneDeep(assistant));
                        }
                    }
                    if (silverAssistants.length > 0) {
                        rewardsData = {type: REWARD_TYPE.refreshAssistant, data: silverAssistants};
                        showRewardsModal = true;
                    } else {
                        console.log("No assistants to be refreshed.");
                    }
                    break;

                case EFFECT.refreshAnyAssistant:
                    let assistants = [];
                    for (const assistant of tPlayerState.assistants) {
                        if (assistant.state === ASSISTANT_STATE.spent) {
                            assistants.push(cloneDeep(assistant));
                        }
                    }
                    if (assistants.length > 0) {
                        rewardsData = {type: REWARD_TYPE.refreshAssistant, data: assistants};
                        showRewardsModal = true;
                    } else {
                        console.log("No assistants to be refreshed.");
                    }
                    break;

                case EFFECT.refreshAllAssistants:
                    // refresh all assistants
                    for (let assistant of tPlayerState.assistants) {
                        assistant.state = ASSISTANT_STATE.ready;
                    }
                    break;

                case EFFECT.refreshRelic:
                    for (let i = tPlayerState.relics.length - 1; i > - 1; i--) {
                        if (tPlayerState.relics[i] !== null) {
                            tPlayerState.resources.slottableRelics += 1;
                            tPlayerState.relics[i] = null;
                            break;
                        }
                    }
                    break;

                case EFFECT.returnAllAdventurers:
                    for (let location of tLocations.line1) {
                        // if location includes player's adventurer's, remove them
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            location.adventurers.splice(location.adventurers.findIndex(number => number === tPlayerState.playerIndex), 1);
                        }
                    }
                    for (let location of tLocations.line2) {
                        // if location includes player's adventurer's, remove them
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            location.adventurers.splice(location.adventurers.findIndex(number => number === tPlayerState.playerIndex), 1);
                        }
                    }
                    for (let location of tLocations.line3) {
                        // if location includes player's adventurer's, remove them
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            location.adventurers.splice(location.adventurers.findIndex(number => number === tPlayerState.playerIndex), 1);
                        }
                    }
                    for (let location of tLocations.line4) {
                        // if location includes player's adventurer's, remove them
                        if (location.adventurers.includes(tPlayerState.playerIndex)) {
                            location.adventurers.splice(location.adventurers.findIndex(number => number === tPlayerState.playerIndex), 1);
                        }
                    }
                    break;

                case
                EFFECT.revealItemBuyWithDiscount3:
                    tActiveEffects.push(effect);
                    tStore = addCardToStore(CARD_TYPE.item, tStore);
                    break;

                case
                EFFECT.revealArtifactBuyWithDiscount3:
                    tActiveEffects.push(effect);
                    tStore = addCardToStore(CARD_TYPE.artifact, tStore);
                    break;

                case
                EFFECT.unlockCard:
                    let cardToUnlock = tPlayerState.activeCards[cardIndex];
                    cardToUnlock.state = CARD_STATE.inHand;
                    tPlayerState.hand.push(cardToUnlock);
                    tPlayerState.activeCards.splice(cardIndex, 1);
                    break;

                case EFFECT.arrow:
                    // effect only exists for graphical purpose
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
            tLegend: tLegend,
            processedAllEffects: processedAllEffects,
            failedEffect: lastEffect,
        }
    }
    tPlayerState.activeEffects = tActiveEffects;
    console.log("All effects processed");
    return {
        tPlayerState: tPlayerState,
        tStore: tStore,
        tLocations: tLocations,
        tLegend: tLegend,
        processedAllEffects: processedAllEffects,
        showRewardsModal: showRewardsModal,
        rewardsData: rewardsData,
    };
}