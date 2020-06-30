import {EFFECT} from "../../../data/effects";
import {processActiveEffect} from "../../functions/processActiveEffects";
import {
    getLocationsForExploration,
    isLocationAdjancentToAdventurer,
    occupyLocation,
    payForTravelIfPossible
} from "./locationFunctions";
import {processEffects} from "../../functions/processEffects";
import {addLogEntry} from "../../main/logger";
import React from "react";
import {cloneDeep} from "lodash";
import {ACTION_TYPE, LOCATION_STATE, LOCATION_TYPE, REWARD_TYPE} from "../../functions/enums";
import {hasPlayerExplorationDiscount} from "./exploreLocation";

export function handleLocation(tPlayerState, tStore, tLocations, location, round, initiateRewardsModal, resolveGuardian) {
    // Resolve active effect - exploration discount is processed during exploration itself
    if (tPlayerState.activeEffects.length > 0 && (tPlayerState.activeEffects[0] !== EFFECT.exploreAnyLocationWithDiscount4
        && tPlayerState.activeEffects[0] !== EFFECT.exploreAnyLocationWithDiscount3)) {
        const effectResult = processActiveEffect(null, null, {...location}, tPlayerState,
            null, {...tStore}, tLocations, initiateRewardsModal);
        console.log("finished processing active effects in location");
        return {playerState: effectResult.playerState, locations: effectResult.locations, store: effectResult.store};
    } else {
        switch (location.state) {
            case LOCATION_STATE.unexplored:
                const exploreDiscount = hasPlayerExplorationDiscount(tPlayerState);
                //if user clicked on empty location, give back choice modal with relevant locations
                if (location.type === LOCATION_TYPE.emptyBrownLocation || location.type === LOCATION_TYPE.emptyGreenLocation) {
                    if (isLocationAdjancentToAdventurer(location, tLocations, tPlayerState) || exploreDiscount) {
                        console.log("Looking for suitable locations");
                        let suitableLocations = getLocationsForExploration(tPlayerState, tLocations, exploreDiscount, location.type);
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
            case LOCATION_STATE.guarded:
            case LOCATION_STATE.explored:
                // if guardian was clicked player tries to defeat him
                if (resolveGuardian) {
                    if (location.adventurers.includes(tPlayerState.playerIndex)) {
                        const effectsResult = processEffects(null, null, tPlayerState, location.guardian.effects,
                            null, null, location, tLocations);
                        if (effectsResult.processedAllEffects) {
                            // guardian was defeated
                            tPlayerState = effectsResult.tPlayerState;
                            tLocations = effectsResult.tLocations;
                            return ({playerState: tPlayerState, locations: tLocations});
                        } else {
                            // guardian was not defeated
                            console.log("Guardian could not be defeated. Effects:");
                            console.log(location.guardian.effects);
                            return false;
                        }
                    } else {
                        console.log("Player has not adventurer in this location and cannot fight its guardian")
                    }
                } else {
                    //otherwise location effects are processed
                    if (location.slots > location.adventurers.length) {
                        const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                        if (travelCheckResults.enoughResources && tPlayerState.actions > 0 && tPlayerState.availableAdventurers > 0) {
                            let tPlayerState = travelCheckResults.tPlayerState;
                            const effectsResult = processEffects(null, null, travelCheckResults.tPlayerState, location.effects, null,
                                {...tStore}, location, {...tLocations});
                            if (effectsResult.processedAllEffects) {
                                console.log("Location effects have been processed.");
                                tPlayerState = effectsResult.tPlayerState;
                                tPlayerState.availableAdventurers -= 1;
                                tPlayerState.actions -= 1;
                                tLocations = occupyLocation(cloneDeep(tLocations), location.id, location.line, tPlayerState.playerIndex);
                                addLogEntry(tPlayerState, ACTION_TYPE.activatesLocation, location.id, location.effects);
                                return ({playerState: tPlayerState, locations: tLocations});
                            } else {
                                console.log("Some effects were not processed. Location could not be used.");
                            }
                        } else {
                            console.log("Location could not be used. Travel possible: " + travelCheckResults.enoughResources);
                        }
                        break;
                    } else {
                        console.log("Location is full. Adventurer could not be added.");
                    }
                }
                break;
            default:
                console.log("Unknown tLocation state in handleClickOnLocation: " + location.state);
                console.log(location);
        }
    }
    return false;
}