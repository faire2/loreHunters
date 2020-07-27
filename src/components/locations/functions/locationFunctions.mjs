import {Locations} from "../../../data/locations";
import {EFFECT} from "../../../data/effects";
import {processEffects} from "../../functions/processEffects";
import {LOCATION_LEVEL, LOCATION_LINE, LOCATION_TYPE, TRANSPORT_EFFECTS} from "../../functions/enums";

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
    const effectsResult = processEffects(null, null, playerState, Locations[location.id].effects,
        null, store, location, locations, null);
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
                exploreCost = [EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            } else if (locationLevel === LOCATION_LEVEL["3"]) {
                exploreCost = [EFFECT.loseJeep, EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            }
            break;
        case LOCATION_TYPE.green:
        case LOCATION_TYPE.emptyGreenLocation:
            if (locationLevel === LOCATION_LEVEL["2"]) {
                exploreCost = [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            } else if (locationLevel === LOCATION_LEVEL["3"]) {
                exploreCost = [EFFECT.loseShip, EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
            }
            break;
        case LOCATION_TYPE.undetermined:
            if (locationLevel === LOCATION_LEVEL["2"]) {
                exploreCost = [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, ];
            } else if (locationLevel === LOCATION_LEVEL["3"]) {
                exploreCost = [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
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
        exploreCost = processExplorationDiscount(playerState.activeEffects[0], exploreCost);
    }

    if (playerState && playerState.longEffects.includes(EFFECT.infinitePlanes)) {
        // noinspection JSObjectNullOrUndefined
        exploreCost = exploreCost.filter(effect => !TRANSPORT_EFFECTS.includes(effect))
    }

    return exploreCost;
}

export function processExplorationDiscount(discount, explorationCostEffects) {
    let tExplorationEffects = [];
    let exploreDiscount = discount === EFFECT.exploreAnyLocationWithDiscount4 ? 3 : 2;
    // eslint-disable-next-line no-unused-vars
    let transportDiscount = 1;
    for (let effect of explorationCostEffects) {
        if (effect === EFFECT.loseExplore && exploreDiscount > 0) {
            exploreDiscount -= 1;
        } else if (effect === EFFECT.loseJeep || effect === EFFECT.loseShip) {
            transportDiscount -= 1;
        } else {
            tExplorationEffects.push(effect);
        }
    }
    return tExplorationEffects;
}

export function getLocationsForExploration(playerState, locations, exploreDiscount, locationType) {
    // todo remove empty brown and green location parts if not necessary
    let locationsArr = [];
    if (locationType === LOCATION_TYPE.emptyBrownLocation) {
        const brown2CostEffects = getExplorationCost(LOCATION_TYPE.brown, LOCATION_LEVEL["2"], exploreDiscount, playerState);
        const brown2result = processEffects(null, null, playerState, brown2CostEffects, null,
            null, null, null);
        if (brown2result.processedAllEffects) {
            locationsArr.push(locations.level2Brown[0]);
            const brown3CostEffects = getExplorationCost(LOCATION_TYPE.brown, LOCATION_LEVEL["3"], exploreDiscount, playerState);
            const brown3result = processEffects(null, null, playerState, brown3CostEffects, null,
                null, null, null);
            if (brown3result.processedAllEffects && playerState.canDiscoverL3Locations) {
                locationsArr.push(locations.level3Brown[0]);
            }
        }
    } else if (locationType === LOCATION_TYPE.emptyGreenLocation) {
        const green2CostEffects = getExplorationCost(LOCATION_TYPE.green, LOCATION_LEVEL["2"], exploreDiscount, playerState);
        const green2result = processEffects(null, null, playerState, green2CostEffects, null,
            null, null, null);
        if (green2result.processedAllEffects) {
            locationsArr.push(locations.level2Green[0]);
            const green3CostEffects = getExplorationCost(LOCATION_TYPE.green, LOCATION_LEVEL["3"], exploreDiscount, playerState);
            const green3result = processEffects(null, null, playerState, green3CostEffects, null,
                null, null, null);
            if (green3result.processedAllEffects) {
                locationsArr.push(locations.level3Green[0]);
            }
        }
    } else if (locationType === LOCATION_TYPE.emptyLocation) {
        const location2Effects = getExplorationCost(LOCATION_TYPE.undetermined, LOCATION_LEVEL["2"], exploreDiscount, playerState);
        const location2Result = processEffects(null, null, playerState, location2Effects, null,
            null, null, null);
        if (location2Result.processedAllEffects) {
            locationsArr.push(locations.level2Locations[0]);
            const location3effects = getExplorationCost(LOCATION_TYPE.undetermined, LOCATION_LEVEL["3"], exploreDiscount, playerState);
            const location3result = processEffects(null, null, playerState, location3effects, null,
                null, null, null);
            if (location3result.processedAllEffects) {
                locationsArr.push(locations.level3Locations[0]);
            }
        }
    } else {
        console.error("Unable to determine type of empty location: " + locationType);
    }
    console.log("Returning locations suitable for exploration:");
    console.log(locationsArr);
    return locationsArr;
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

export function getExploredLocationType(exploredLocation) {
    switch (exploredLocation.type) {
        case LOCATION_TYPE.emptyBrownLocation:
            return LOCATION_TYPE.brown;
        case LOCATION_TYPE.emptyGreenLocation:
            return LOCATION_TYPE.green;
        default: console.warn("Unable to determine type of location!" + exploredLocation.type);
    }
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
    tLocation.adventurers = tLocation.adventurers.filter(adventurer => !tPlayerState.playerIndex === adventurer)
    return tLocation;
}