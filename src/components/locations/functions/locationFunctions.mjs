import {Locations} from "../../../data/locations.mjs";
import {EFFECT} from "../../../data/effects.mjs";
import {processEffects} from "../../functions/processEffects.mjs";
import {LOCATION_LEVEL, LOCATION_LINE, LOCATION_TYPE} from "../../functions/enums.mjs";
import {getExplorationDiscount} from "./getExplorationDiscount";

export function isLocationAdjancentToAdventurer(location, locations, playerState) {
    const playerIndex = playerState.playerIndex;
    const locationData = {locationIndex: location.index, locationLine: location.line, locations: locations};
    const isFirst = location.index === 0;
    const isLast = location.index + 1 === locations[location.line].length;
    return checkOwnLine(locationData, playerIndex, isFirst, isLast) || checkPreviousLine(locationData, playerIndex, isFirst, isLast)
        || checkNextLine(locationData, playerIndex, isFirst, isLast);
}

/*export function getPositionInLocationLine(location, locationLine, locations) {
    for (let i = 0; i < locations[locationLine].length; i++) {
        if (locations[locationLine][i].id === location.id) {
            return i;
        }
    }
    console.log("Unable to find location position in getPositionInLocationLIne, returning -1");
    return -1;
}*/

function checkOwner(locations, checkedLine, checkedLocationPosition, playerIndex) {
    const checkedLocation = locations[checkedLine][checkedLocationPosition];
    return checkedLocation.adventurers.includes(playerIndex);
}

function checkOwnLine(locationData, playerIndex, isFirst, isLast) {
    console.log("*** CHECKING OWN LINE " + locationData.locationLine + "***");
    const locations = locationData.locations;
    const line = locationData.locationLine;
    if (!isFirst) {
        if (checkOwner(locations, line, locationData.locationIndex - 1, playerIndex) === true) {
            return true
        }
    }
    if (!isLast) {
        if (checkOwner(locations, line, locationData.locationIndex + 1, playerIndex) === true) {
            return true
        }
    }
    return false;
}

function checkPreviousLine(locationData, playerIndex, isFirst, isLast) {
    console.log("*** CHECKING PREVIOUS LINE " + locationData.locationLine + "***");
    const locations = locationData.locations;
    const line = locationData.locationLine;
    const position = locationData.locationIndex;
    if (line === LOCATION_LINE.line2) {
        if (checkOwner(locations, LOCATION_LINE.line1, position, playerIndex)) {
            return true;
        }
        if (checkOwner(locations, LOCATION_LINE.line1, position + 1, playerIndex)) {
            return true;
        }
    } else if (line === LOCATION_LINE.line3) {
        if (!isFirst) {
            if (checkOwner(locations, LOCATION_LINE.line2, position - 1, playerIndex)) {
                return true;
            }
        }
        if (checkOwner(locations, LOCATION_LINE.line2, position, playerIndex)) {
            return true;
        }
    } else if (line === LOCATION_LINE.line4) {
        if (checkOwner(locations, LOCATION_LINE.line3, position, playerIndex)) {
            return true;
        }
        if (!isLast && checkOwner(locations, LOCATION_LINE.line3, position + 1, playerIndex)) {
            return true;
        }
    } else {
        console.log("Unable to process line in checkPreviousLine: " + line);
    }
    return false;
}

function checkNextLine(locationData, playerIndex, isFirst, isLast) {
    console.log("*** CHECKING NEXT LINE " + locationData.locationLine + "***");
    const locations = locationData.locations;
    const line = locationData.locationLine;
    const position = locationData.locationIndex;

    if (line === LOCATION_LINE.line1) {
        if (!isFirst) {
            if (checkOwner(locations, LOCATION_LINE.line2, position - 1, playerIndex)) {
                return true;
            }
        }
        if (!isLast) {
            if (checkOwner(locations, LOCATION_LINE.line2, position, playerIndex)) {
                return true;
            }
        }
    } else if (line === LOCATION_LINE.line2) {
        if (checkOwner(locations, LOCATION_LINE.line3, position, playerIndex)) {
            return true;
        }
        if (!isLast && checkOwner(locations, LOCATION_LINE.line3, position + 1, playerIndex)) {
            return true;
        }
    } else if (line === LOCATION_LINE.line3 && locations[LOCATION_LINE.line4]) {
        if (!isFirst && locations[LOCATION_LINE.line4][position + 1] !== "empty") {
            if (checkOwner(locations, LOCATION_LINE.line2, position - 1, playerIndex)) {
                return true;
            }
        }
        if (!isLast && locations[LOCATION_LINE.line4][position + 1] !== "empty") {
            if (checkOwner(locations, LOCATION_LINE.line2, position, playerIndex)) {
                return true;
            }
        }
    } else {
        console.log("Unable to process line in checkNextLine: " + line);
    }
    return false;
}

export function areLinesAdjacent(line1, line2) {
    const lineKeys = Object.keys(LOCATION_LINE);
    const index1 = lineKeys.indexOf(line1);
    const index2 = lineKeys.indexOf(line2);
    return (Math.abs(index1 - index2) === 1);
}

export function resolveRelocation(locationLine, locationIndex, playerState, locations, store) {
    const location = locations[locationLine][locationIndex];
    location.adventurers.push(playerState.playerIndex);
    location.owner = playerState.playerIndex;
    const effectsResult = processEffects(null, null, playerState, Locations[location.id].effects, store, location, locations);
    return {playerState: effectsResult.tPlayerState, locations: effectsResult.tLocations, store: effectsResult.tStore}
}

export function getLocationIndex(locationLine, locationId) {
    for (let i = 0; i < locationLine.length; i++) {
        if (locationLine[i].id === locationId) {
            return i
        }
    }
}

export function occupyLocation(tLocations, locationId, locationLine, playerIndex) {
    for (let tLocation of tLocations[locationLine]) {
        if (tLocation.id === locationId) {
            tLocation.adventurers.push(playerIndex);
        }
    }
    return tLocations;
}

export function getExplorationCost(locationType, locationLevel, exploreDiscount, playerState) {
    let exploreCost = null;

    switch (locationType) {
        case LOCATION_TYPE.brown:
        case LOCATION_TYPE.emptyBrownLocation:
            if (locationLevel === LOCATION_LEVEL["2"]) {
                exploreCost = [EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, ];
            } else if (locationLevel === LOCATION_LEVEL["3"]) {
                exploreCost = [EFFECT.loseJeep, EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            }
            break;
        case LOCATION_TYPE.green:
        case LOCATION_TYPE.emptyGreenLocation:
            if (locationLevel === LOCATION_LEVEL["2"]) {
                exploreCost = [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, ];
            } else if (locationLevel === LOCATION_LEVEL["3"]) {
                exploreCost = [EFFECT.loseShip, EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            }
            break;
        case LOCATION_TYPE.undetermined:
            if (locationLevel === LOCATION_LEVEL["2"]) {
                exploreCost = [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, ];
            } else if (locationLevel === LOCATION_LEVEL["3"]) {
                exploreCost = [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            }
            break;
            // todo remove - this was used when lost city was a location
            /*case LOCATION_TYPE.lostCity:
            exploreCost = [EFFECT.canActivateLostCity];
            break;*/
        case LOCATION_TYPE.basic:
        case LOCATION_TYPE.emptyLocation:
            exploreCost = [];
            break;
        default:
        console.warn("Unable to recognize location type.");
    }

    if (exploreDiscount) {
        exploreCost = getExplorationDiscount(playerState.activeEffects[0], exploreCost);
    }

    return exploreCost;
}

export function removeExploredLocation(location, locations) {
    //todo rewrite for unified locatins (location type checking is redundant)
    if (location.type === LOCATION_TYPE.green) {
        if (location.level === LOCATION_LEVEL["2"]) {
            locations.level2Locations.splice(0, 1);
        } else if (location.level === LOCATION_LEVEL["3"]) {
            locations.level3Locations.splice(0, 1);
        } else {
            console.warn("Unable to determine location level:" + location.level);
        }
    } else if (location.type === LOCATION_TYPE.brown) {
        if (location.level === LOCATION_LEVEL["2"]) {
            locations.level2Locations.splice(0, 1);
        } else if (location.level === LOCATION_LEVEL["3"]) {
            locations.level3Locations.splice(0, 1);
        } else {
            console.warn("Unable to determine location level:" + location.level);
        }
    } else {
        console.warn("Unable to determine location type:" + location.type);
    }
    return locations;
}

export function updateLocations(location, tLocations) {
    tLocations[location.line][location.index] = location;
    return tLocations;
}

export function isPlayerInLocation(tLocation, tPlayerState) {
    for (let adventurer of tLocation.adventurers) {
        if (adventurer === tPlayerState.playerIndex){
            return true;
        }
    }
    return false;
}

export function removePlayerTokenFromLocation(tLocation, tPlayerState) {
    tLocation.adventurers = tLocation.adventurers.filter(adventurer => !tPlayerState.playerIndex === adventurer);
    return tLocation;
}