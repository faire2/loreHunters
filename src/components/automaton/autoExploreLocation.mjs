import {DIRECTION, LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../functions/enums.mjs";
import {Guardians} from "../../data/guardians.mjs";
import {getExploredLocationType} from "../locations/functions/getExploredLocationType.mjs";

export function autoExploreLocation(states, round, direction, automatonState) {
    console.log("AUTOMATON: exploring location from " + direction);
    // we determine what location will be explored according to the round
    switch (round) {
        case 1:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyBrownLocation, LOCATION_LEVEL.level1, true, direction, automatonState);
        case 2:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyGreenLocation, LOCATION_LEVEL.level1, false, direction, automatonState);
        case 3:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyBrownLocation, LOCATION_LEVEL.level1, true, direction, automatonState);
        case 4:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyGreenLocation, LOCATION_LEVEL.level2, false, direction, automatonState);
        case 5:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyBrownLocation, LOCATION_LEVEL.level2, false, direction, automatonState);
        default:
            console.error("Unable to process round in autoExploreLocation: " + states.round);
    }
    return {states: states, automatonState: automatonState};
}

function findAndExploreLocation(states, locationType, locationLevel, addGuardian, direction, automatonState) {
    const locations = states.locations;
    if (direction === DIRECTION.left) {
        const locationLines = [locations.line4, locations.line3, locations.line2, locations.line1];
        for (let y = 0; y < locationLines.length; y++) {
            for (let i = 0; i < locationLines[y].length; i++) {
                let location = locationLines[y][i];
                if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                    states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                    automatonState.relicEffects = automatonState.relicEffects.concat(location.relicEffects);
                    return {states: states, automatonState: automatonState};
                }
            }
        }
        return {states: states, automatonState: automatonState};
    } else if (direction === DIRECTION.right) {
        const locationLines = [locations.line1, locations.line2, locations.line3, locations.line4];
        for (let y = 0; y < locationLines.length; y++) {
            for (let i = locationLines[y].length - 1; i > -1; i--) {
                let location = locationLines[y][i];
                if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                    states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                    automatonState.relicEffects = automatonState.relicEffects.concat(location.relicEffects);
                    return {states: states, automatonState: automatonState};
                }
            }
        }
        return {states: states, automatonState: automatonState};
    } else {
        console.error("Unable to determine direction in autoExploreLocation:" + direction)
    }
}

function exploreLocation(location, locations, locationType, locationLevel, addGuardian) {
    let newLocation;
    if (locationLevel === LOCATION_LEVEL.level1) {
        newLocation = locations.level2Locations[0];
        locations.level2Locations.splice(0, 1);
    } else if (locationLevel === LOCATION_LEVEL.level2) {
        newLocation = locations.level3Locations[0];
        locations.level3Locations.splice(0, 1);
    }
    // set location type and position, add automaton adventurer
    newLocation.type = getExploredLocationType(location);
    newLocation.line = location.line;
    newLocation.index = location.index;
    newLocation.adventurers.push(4);
    newLocation.travelCost = location.travelCost;

    // add guardian if location should be guarded
    if (addGuardian) {
        newLocation.guardian = Guardians[locations.guardianKeys[0]];
        locations.guardianKeys.splice(0, 1);
        newLocation.state = LOCATION_STATE.guarded;
    } else {
        newLocation.state = LOCATION_STATE.explored;
    }
    locations[location.line][location.index] = newLocation;
    return locations;
}