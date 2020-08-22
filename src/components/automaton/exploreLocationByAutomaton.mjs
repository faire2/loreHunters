import {DIRECTION, LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../functions/enums.mjs";
import {Guardians} from "../../data/guardians.mjs";
import {getExploredLocationType} from "../locations/functions/getExploredLocationType.mjs";

export function exploreLocationByAutomaton(states, round, direction) {
    // we determine what location will be explored according to the round
    switch (round) {
        case 1:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyBrownLocation, LOCATION_LEVEL["2"], true, direction);
        case 2:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyGreenLocation, LOCATION_LEVEL["2"], false, direction);
        case 3:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyBrownLocation, LOCATION_LEVEL["2"], false, direction);
        case 4:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyGreenLocation, LOCATION_LEVEL["3"], true, direction);
        case 5:
            return findAndExploreLocation(states, LOCATION_TYPE.emptyBrownLocation, LOCATION_LEVEL["3"], false, direction);
        default:
            console.error("Unable to process round in exploreLocationByAutomaton: " + states.round);
    }
    return states
}

function findAndExploreLocation(states, locationType, locationLevel, addGuardian, direction) {
    const locations = states.locations;
    if (direction === DIRECTION.left) {
        for (let i = 0; i < locations.line4.length; i++) {
            let location = locations.line4[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        for (let i = 0; i < locations.line3.length; i++) {
            let location = locations.line3[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        for (let i = 0; i < locations.line2.length; i++) {
            let location = locations.line2[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        for (let i = 0; i < locations.line1.length; i++) {
            let location = locations.line1[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        return states;
    } else if (direction === DIRECTION.right) {
        for (let i = locations.line4.length-1; i > -1; i--) {
            let location = locations.line4[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        for (let i = locations.line3.length-1; i > -1; i--) {
            let location = locations.line3[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        for (let i = locations.line2.length-1; i > -1; i--) {
            let location = locations.line2[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        for (let i = locations.line1.length-1; i > -1; i--) {
            let location = locations.line1[i];
            if (location.level === locationLevel && location.type === locationType && location.state === LOCATION_STATE.unexplored) {
                states.locations = exploreLocation(location, locations, locationType, locationLevel, addGuardian);
                return states;
            }
        }
        return states
    } else {
        console.error("Unable to determine direction in exploreLocationByAutomaton:" + direction)
    }
}

function exploreLocation(location, locations, locationType, locationLevel, addGuardian) {
    let newLocation;
    if (locationLevel === LOCATION_LEVEL["2"]) {
        newLocation = locations.level2Locations[0];
        locations.level2Locations.splice(0, 1);
    } else if (locationLevel === LOCATION_LEVEL["3"]) {
        newLocation = locations.level3Locations[0];
        locations.level3Locations.splice(0, 1);
    }
    // set location type and position, add automaton adventurer
    newLocation.type = getExploredLocationType(location);
    newLocation.line = location.line;
    newLocation.index = location.index;
    newLocation.adventurers.push(4);

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