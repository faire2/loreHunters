import {EFFECT} from "../../data/effects";
import {processActiveEffect} from "../functions/processActiveEffects";
import {LOCATION_IDs} from "../../data/idLists";
import {
    getExplorationCost,
    getLocationsForExploration,
    isLocationAdjancentToAdventurer,
    occupyLocation,
    payForTravelIfPossible
} from "./locationFunctions";
import {handleGuardianArrival, processEffects} from "../functions/processEffects";
import {GUARDIANS} from "../../data/cards";
import {addLogEntry} from "../main/logger";
import React from "react";
import {cloneDeep} from "lodash";
import {ACTION_TYPE, LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE, REWARD_TYPE} from "../functions/enums";

export function handleLocation(playerState, store, locations, location, round, initiateRewardsModal) {
    // Resolve active effect - exploration discount is processed during exploration itself
    if (playerState.activeEffects.length > 0 && (playerState.activeEffects[0] !== EFFECT.exploreAnyLocationWithDiscount4
        && playerState.activeEffects[0] !== EFFECT.exploreAnyLocationWithDiscount3)) {
        const effectResult = processActiveEffect(null, null, {...location}, playerState,
            null, {...store}, locations, initiateRewardsModal);
        console.log("finished processing active effects in location");
        return {playerState: effectResult.playerState, locations: effectResult.locations, store: effectResult.store};
    } else {
        switch (location.state) {
            case LOCATION_STATE.unexplored:
                const exploreDiscount = hasPlayerExplorationDiscount(playerState);
                //if user clicked on empty location, give back choice modal with relevant locations
                if (location.type === LOCATION_TYPE.emptyBrownLocation || location.type === LOCATION_TYPE.emptyGreenLocation) {
                    if (isLocationAdjancentToAdventurer(location, locations, playerState) || exploreDiscount) {
                        console.log("Looking for suitable locations");
                        let suitableLocations = getLocationsForExploration(playerState, locations, exploreDiscount, location.type);
                        if (suitableLocations && suitableLocations.length > 0) {
                            let locationsForModal = [{
                                type: REWARD_TYPE.location, data: suitableLocations,
                                params: {line: location.line, index: location.index}
                            }];
                            initiateRewardsModal(locationsForModal);
                        } else {
                            console.log("No suitable locations available for exploration");
                        }
                    } else {
                        console.log("Unexplored location is not adjacent. Exploration not started.");
                    }
                    //if user clicked on a location in exploration modal, exploration is triggered from there
                }
                return false;
            case LOCATION_STATE.explored:
                const travelCheckResults = payForTravelIfPossible(playerState, location);
                if (travelCheckResults.enoughResources && playerState.actions > 0 && playerState.availableAdventurers > 0) {
                    const effectsResult = processEffects(null, null, travelCheckResults.tPlayerState, location.effects, null,
                        {...store}, location, {...locations});
                    if (effectsResult.processedAllEffects) {
                        console.log("Location effects have been processed.");
                        playerState = effectsResult.tPlayerState;
                        playerState.availableAdventurers -= 1;
                        playerState.actions -= 1;
                        let tLocations = occupyLocation(cloneDeep(locations), location.id, location.line, playerState.playerIndex);
                        locations = tLocations;
                        addLogEntry(playerState, ACTION_TYPE.activatesLocation, location.id, location.effects);
                        return ({playerState: playerState, locations: locations});
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
    return false;
}

export function exploreLocation(playerState, locations, store, location, round) {
    const exploreDiscount = hasPlayerExplorationDiscount(playerState);
    if (exploreDiscount) {
        playerState.activeEffects.splice(0)
    }
    // get exploration cost & process discount
    const exploreCostEffects = getExplorationCost(location.type, location.level, exploreDiscount, playerState);
    // process the cost
    const explorationCostResult = processEffects(null, null, playerState, exploreCostEffects,
        null, null, location, null);
    if (explorationCostResult.processedAllEffects) {
        playerState = explorationCostResult.tPlayerState;
        // if exploration discount active effect is present the action has already been substracted
        playerState.actions -= exploreDiscount ? 0 : 1;
        playerState.resources.relics += 1;

        // mark location as explored
        locations[location.line][location.index].state = LOCATION_STATE.explored;

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

        // guardian is moved to player's discard
        const guardianResults = handleGuardianArrival(playerState, cloneDeep(store), round);
        playerState = guardianResults.tPlayerState;
        store = guardianResults.tStore;
        addLogEntry(playerState, ACTION_TYPE.exploresLocation, location.id,
            exploreCostEffects);
        return ({
            playerState: playerState, store: store, locations: locations, modalRewardData: [{
                type: REWARD_TYPE.effectsArr,
                data: [{effects: location.effects, effectsText: location.effectsText},
                    {effects: guardianEffects, effectsText: guardianText}]
            }]
        })
    } else {
        console.error("Not enough resources to explore location - inconsistency with location choice!");
        return false
    }
}

function hasPlayerExplorationDiscount(playerState) {
    return playerState.activeEffects[0] === EFFECT.exploreAnyLocationWithDiscount3
        || playerState.activeEffects[0] === EFFECT.exploreAnyLocationWithDiscount4;
}