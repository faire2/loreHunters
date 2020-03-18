import {CARD_STATE, CARD_TYPE, ITEMS} from "../../data/cards";
import {addCardToStore, destroyCard, drawCards} from "./CardManipulationFuntions";
import {EFFECT} from "../../data/effects";
import cloneDeep from 'lodash/cloneDeep';
import {payForTravelIfPossible} from "../locations/payForTravelIfPossible";

export function processEffects(tCard, cardIndex, originalPlayersState, effects, toBeRemoved, originalStore, location, originalLocations) {
    console.log("Processing effects");
    console.log(effects);
    let tPlayerState = cloneDeep(originalPlayersState);
    let tStore = cloneDeep(originalStore);
    let tLocations = cloneDeep(originalLocations);
    let tActiveEffects = cloneDeep(tPlayerState.activeEffects);
    let processedAllEffects = true;


    if (tCard !== null) {
        tCard.state = CARD_STATE.active
    }
    exitLoopFromSwitch();

    // eslint-disable-next-line no-unused-vars
    function exitLoopFromSwitch() {
        for (let effect of effects) {
            console.log("Resolving effect: " + effect);
            switch (effect) {
                /*case EFFECT.refreshAdventurer:
                case EFFECT.refreshAllAdventurers:*/
                case EFFECT.buyItemWithDiscount3:
                case EFFECT.discardFor2Cards:
                case EFFECT.discardFor2Jewels:
                case EFFECT.defeatGuardian:
                case EFFECT.destroyCard:
                case EFFECT.destroyGuardian:
                case EFFECT.drawFromDiscard:
                case EFFECT.gainItemToHand:
                case EFFECT.gainArtifact:
                case EFFECT.payTouseOccupiedLocation:
                case EFFECT.removeGuardian:
                case EFFECT.uptrade:
                case EFFECT.useItemOnMarket:
                case EFFECT.useYourLocation:
                case EFFECT.useArtifactOnMarket:
                    tActiveEffects.push(effect);
                    break;

                case EFFECT.useAdjacentEmptyLocation:
                    tActiveEffects.push(EFFECT.markOwnLocation);
                    tActiveEffects.push(effect);
                    break;

                case EFFECT.moveAdvToEmptyLocation:
                    tActiveEffects.push(EFFECT.return);
                    tActiveEffects.push(effect);
                    break;

                case EFFECT.discard:
                    let tEffects = [...effects];
                    tEffects.splice(0, 1);
                    tActiveEffects.push(effect);
                    tActiveEffects.splice(1, 0, [...tEffects]);
                    return;

                case EFFECT.defeatThisGuardian:
                    if (tCard.type === CARD_TYPE.guardian) {
                        tCard.points = tCard.cost;  /* victory points for defeating guardian are stored in costs */
                        tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                        tPlayerState.destroyedCards[tPlayerState.destroyedCards.length - 1].state = CARD_STATE.defeatedGuardian;
                    }
                    break;

                case EFFECT.destroyThisCard:
                    tPlayerState = destroyCard(tCard);
                    break;

                case EFFECT.destroyThisCardToDefeatAGuardan:
                    if (tCard.state === CARD_STATE.inHand) {
                        tPlayerState = destroyCard(tCard.state, cardIndex, tPlayerState);
                        tActiveEffects.push(EFFECT.defeatGuardian);
                    }
                    break;


                case EFFECT.draw1:
                    tPlayerState = drawCards(1, tPlayerState);
                    break;

                case EFFECT.draw2:
                    tPlayerState = drawCards(2, tPlayerState);
                    break;

                case EFFECT.drawFromDrawDeck:
                    tActiveEffects.push(effect);
                    tPlayerState.hand.splice(cardIndex, 1);
                    /* hand is stored in activeEffects to be retrieved later */
                    tActiveEffects.splice(1, 0, tPlayerState.hand);
                    tPlayerState.hand = tPlayerState.drawDeck;
                    break;

                case EFFECT.draw2ForGuardian:
                    let isGuardian = false;
                    for (const card of tPlayerState.hand) {
                        if (card.type === CARD_TYPE.guardian) {
                            isGuardian = true
                        }
                    }
                    if (isGuardian) {
                        drawCards(2, tPlayerState)
                    }
                    break;

                case EFFECT.gainAdventurerForThisRound:
                    tPlayerState.availableAdventurers += 1;
                    break;

                case EFFECT.gainCoin:
                    tPlayerState.resources.coins += 1;
                    break;

                case EFFECT.gainCoinForLegends:
                    // todo legends
                    break;

                case EFFECT.gainCoinsIfLast:
                    if (tPlayerState.hand.length === 1) {
                        tPlayerState.resources.coins += 2
                    }
                    break;

                case EFFECT.gainExplore:
                    tPlayerState.resources.explore += 1;
                    break;

                case EFFECT.gainExploreForGuardians:
                    // todo guardians must go to destroyed cards when destroyed!
                    let destroyedGuardians = 0;
                    for (const card of tPlayerState.destroyedCards) {
                        destroyedGuardians = card.type === CARD_TYPE.guardian ? destroyedGuardians + 1 : destroyedGuardians;
                    }
                    destroyedGuardians = destroyedGuardians > 4 ? 4 : destroyedGuardians;
                    tPlayerState.resources.coins += destroyedGuardians;
                    break;

                case EFFECT.gainExploreForShinys:
                    tPlayerState.resources.explore += tPlayerState.resources.shinies < 5 ? tPlayerState.resources.shinies : 4;
                    break;

                case EFFECT.gainFear:
                    tPlayerState.discardDeck.push(ITEMS.fear);
                    break;

                case EFFECT.gainJeep:
                    tPlayerState.resources.jeep += 1;
                    break;

                case EFFECT.gainJewel:
                    tPlayerState.resources.jewels += 1;
                    break;

                case EFFECT.gainPlane:
                    tPlayerState.resources.plane += 1;
                    break;

                case EFFECT.gainShiny:
                    tPlayerState.resources.shinies += 1;
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

                case EFFECT.loseWalk:
                case EFFECT.loseJeep:
                case EFFECT.loseShip:
                case EFFECT.losePlane:
                    const travelResults = payForTravelIfPossible(tPlayerState, null, effect);
                    if (travelResults.enoughResources) {
                        tPlayerState = travelResults.tPlayerState;
                    } else {
                        processedAllEffects = false;
                        return;
                    }
                    break;

                case EFFECT.progress:
                    //todo legends;
                    break;

                case EFFECT.progressForFree:
                    //todo legends;
                    break;

                case EFFECT.revealItemBuyWithDiscount2:
                    tActiveEffects.push(effect);
                    tStore = addCardToStore(CARD_TYPE.item, tStore);
                    break;

                case EFFECT.revealArtifactBuyWithDiscount2:
                    tActiveEffects.push(effect);
                    tStore = addCardToStore(CARD_TYPE.artifact, tStore);
                    break;

                default:
                    console.log("HandleCardEffect didn't recognize effect: " + effect);
                    console.log(effects);
            }
        }
    }

    if (!processedAllEffects) {
        console.log("Some effects could not be processed in processEffects");
        return {
            tPlayerState: originalPlayersState, tStore: originalStore, tLocations: originalLocations
        }
    } else if (tCard !== null) {
        tCard.state = CARD_STATE.active
    }

    tPlayerState.activeEffects = tActiveEffects;
    return {tPlayerState: tPlayerState, tStore: tStore, tLocations: tLocations};
}
