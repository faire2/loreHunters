import {processActiveEffect} from "../../functions/processActiveEffects";
import {getExploredLocationType, occupyLocation, removeExploredLocation} from "./locationFunctions";
import {processEffects} from "../../functions/processEffects";
import {addLogEntry} from "../../main/logger";
import {cloneDeep} from "lodash";
import {ACTION_TYPE, LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../../functions/enums";
import {exploreLocation} from "./exploreLocation";
import {Guardians} from "../../../data/guardians";
import {payForTravelIfPossible} from "./payForTravelIfPossible";
import {LOCATION_DISCOUNT_EFFECTS} from "../../functions/constants";

export function processLocation(tPlayerState, tStore, tLocations, location, initiateRewardsModal, resolveGuardian) {
    // Resolve active effect - exploration discount is processed during exploration itself
    if (tPlayerState.activeEffects.length > 0 && (!LOCATION_DISCOUNT_EFFECTS.includes(tPlayerState.activeEffects[0]))) {
        const effectResult = processActiveEffect(null, null, {...location}, tPlayerState,
            null, {...tStore}, tLocations, initiateRewardsModal);
        console.log("finished processing active effects in location");
        return {playerState: effectResult.tPlayerState, locations: effectResult.tLocations, store: effectResult.tStore};
    } else {
        switch (location.state) {
            case LOCATION_STATE.unexplored:
                //if user clicked on empty location, give back choice modal with relevant locations
                const locationsToExplore = [LOCATION_TYPE.emptyLocation, LOCATION_TYPE.emptyBrownLocation, LOCATION_TYPE.emptyGreenLocation];
                if (locationsToExplore.includes(location.type) && tPlayerState.availableAdventurers > 0) {
                    const explorationResult = exploreLocation(tPlayerState, tLocations, tStore, location);
                    if (!explorationResult.failedEffect) {
                        let tLocation;
                        if (location.level === LOCATION_LEVEL["2"]) {
                            tLocation = tLocations.level2Locations[0];
                            tLocations.level2Locations.splice(0,1);
                        } else {
                            tLocation = tLocations.level3Locations[0];
                            tLocations.level3Locations.splice(0,1);
                        }
                        tLocation.guardian = Guardians[tLocations.guardianKeys[0]];
                        tLocations.guardianKeys.splice(0, 1);
                        tLocation.state = LOCATION_STATE.guarded;
                        tLocation.type = getExploredLocationType(location);
                        tLocations[location.line][location.index] = tLocation;
                        tLocation.line = location.line;
                        tLocation.index = location.index;
                        tPlayerState = explorationResult.playerState;
                        tPlayerState.availableAdventurers -= 1;
                        tLocation.adventurers.push(tPlayerState.playerIndex);
                        const locationResult = processEffects(null, null, tPlayerState, tLocation.effects, null, null, null);
                        tPlayerState = locationResult.tPlayerState;
                        tLocations = removeExploredLocation(tLocation, explorationResult.locations);
                        tStore = explorationResult.store;
                        return {playerState: tPlayerState, locations: tLocations, store: tStore}
                    } else {
                        return ({failedTravel: true});
                    }
                }
                return false;
            case LOCATION_STATE.guarded:
            case LOCATION_STATE.explored:
                // if guardian was clicked player tries to defeat him
                if (resolveGuardian) {
                    if (location.adventurers.includes(tPlayerState.playerIndex)) {
                        const guardianReward = location.guardian.effects;
                        const effectsResult = processEffects(null, null, tPlayerState, location.guardian.defeatCost, null, location, tLocations);
                        if (effectsResult.processedAllEffects) {
                            // guardian was defeated
                            tPlayerState = effectsResult.tPlayerState;
                            tPlayerState.actions -= 1;
                            tPlayerState.guardianRewards.push(guardianReward);
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
                    if (location.slots.length > location.adventurers.length) {
                        const travelCheckResults = payForTravelIfPossible(tPlayerState, location);
                        if (!travelCheckResults.enoughResources) {
                            return ({failedTravel: true});
                        }
                        if (travelCheckResults.enoughResources && (tPlayerState.actions > 0 || tPlayerState.activeEffects.length > 0)
                            && tPlayerState.availableAdventurers > 0) {
                            let tPlayerState = travelCheckResults.tPlayerState;
                            const effectsResult = processEffects(null, null, travelCheckResults.tPlayerState, location.effects, {...tStore}, location, {...tLocations});
                            if (effectsResult.processedAllEffects) {
                                console.log("Location effects have been processed.");
                                tPlayerState = effectsResult.tPlayerState;
                                tPlayerState.availableAdventurers -= 1;
                                tPlayerState.actions -= 1;
                                if (LOCATION_DISCOUNT_EFFECTS.includes(tPlayerState.activeEffects[0])) {
                                    tPlayerState.activeEffects.splice(0, 1);
                                }
                                tLocations = occupyLocation(cloneDeep(tLocations), location.id, location.line, tPlayerState.playerIndex);
                                addLogEntry(tPlayerState, ACTION_TYPE.activatesLocation, location.id, location.effects);
                                return ({playerState: tPlayerState, locations: tLocations});
                            } else {
                                console.log("Some effects were not processed. Location could not be used.");
                            }
                        } else {
                            console.log("Location could not be used. Travel possible: " + travelCheckResults.enoughResources
                            + ". Available adventurers: " + tPlayerState.availableAdventurers);
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