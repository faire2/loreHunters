import {LOCATIONS, TRANSPORT_TYPE} from "../../data/locations";
import {EFFECT} from "../../data/effects";
import {LOCATION_LINE} from "../functions/initialStateFunctions";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../../data/idLists";
import {processEffects} from "../functions/processEffects";
import {Coin, Explore, Jeep, Ship} from "../Symbols";
import {
    BgrBasic,
    BgrBasicDouble,
    BgrBrown2,
    BgrBrown3,
    BgrBrownUnexplored,
    BgrGreen2,
    BgrGreen3,
    BgrGreenUnexplored, BgrLostCity
} from "./locationsImages";
import React from "react";

export function payForTravelIfPossible(tPlayerState, location, effect) {
    const resources = tPlayerState.resources;
    let transportType = null;
    let transportCost = null;

    if (location !== null) {
        transportType = location.useCost.transportType;
        transportCost = location.useCost.amount;
    } else {
        switch (effect) {
            case EFFECT.loseWalk:
                transportType = TRANSPORT_TYPE.walk;
                transportCost = 1;
                break;
            case EFFECT.loseJeep:
                transportType = TRANSPORT_TYPE.jeep;
                transportCost = 1;
                break;
            case EFFECT.loseShip:
                transportType = TRANSPORT_TYPE.ship;
                transportCost = 1;
                break;
            case EFFECT.losePlane:
                transportType = TRANSPORT_TYPE.plane;
                transportCost = 1;
                break;
            default:
                console.log("Unknown mode of transport for guardian card in payForTravelIfPossible: " + effect);
        }
    }
    let enoughResources = false;

    switch (transportType) {
        case TRANSPORT_TYPE.walk:
            if (resources.walk + resources.jeep + resources.ship + resources.plane >= transportCost) {
                enoughResources = true;
                resources.walk -= transportCost;
                if (resources.walk < 0) {
                    resources.jeep += resources.walk;
                    resources.walk = 0;
                    if (resources.jeep < 0) {
                        resources.ship += resources.jeep;
                        resources.jeep = 0;
                        if (resources.ship < 0) {
                            resources.plane += resources.ship;
                            resources.ship = 0;
                        }
                    }
                }
            }
            break;
        case
        TRANSPORT_TYPE.jeep:
            if (resources.jeep + resources.plane >= transportCost) {
                enoughResources = true;
                resources.jeep -= transportCost;
                if (resources.jeep < 0) {
                    resources.plane += resources.jeep;
                    resources.jeep = 0;
                }
            }
            break;
        case
        TRANSPORT_TYPE.ship:
            if (resources.ship + resources.plane >= transportCost) {
                enoughResources = true;
                resources.ship -= transportCost;
                if (resources.ship < 0) {
                    resources.plane += resources.ship;
                    resources.ship = 0;
                }
            }
            break;
        case
        TRANSPORT_TYPE.plane:
            if (resources.plane >= transportCost) {
                enoughResources = true;
                resources.plane -= transportCost;
            }
            break;
        default:
            console.log("Unknown transportation type in payForTravelIfPossible: " + transportType);
            console.log(location);
    }
    console.log("**Travel check - has enough resources for travel? " + enoughResources);
    return {enoughResources: enoughResources, tPlayerState: tPlayerState};
}

export function isLocationAdjancentToAdventurer(location, locationLine, locations, playerState) {
    const playerIndex = playerState.playerIndex;
    const locationPosition = getPositionInLocationLine(location, locationLine, locations);
    const locationData = {locationPosition: locationPosition, locationLine: locationLine, locations: locations};
    const isFirst = locationPosition === 0;
    const isLast = locationPosition + 1 === locations[locationLine].length;
    return checkOwnLine(locationData, playerIndex, isFirst, isLast) || checkPreviousLine(locationData, playerIndex, isFirst, isLast)
        || checkNextLine(locationData, playerIndex, isFirst, isLast);
}

export function getPositionInLocationLine(location, locationLine, locations) {
    for (let i = 0; i < locations[locationLine].length; i++) {
        if (locations[locationLine][i].id === location.id) {
            return i;
        }
    }
    console.log("Unable to find location position in getPositionInLocationLIne, returning -1");
    return -1;
}

function checkOwner(locations, checkedLine, checkedLocationPosition, playerIndex) {
    const checkedLocation = locations[checkedLine][checkedLocationPosition];
    return checkedLocation.owner === playerIndex;
}

function checkOwnLine(locationData, playerIndex, isFirst, isLast) {
    console.log("*** CHECKING OWN LINE ***");
    const locations = locationData.locations;
    const line = locationData.locationLine;
    if (!isFirst) {
        if (checkOwner(locations, line, locationData.locationPosition - 1, playerIndex) === true) {
            return true
        }
    }
    if (!isLast) {
        if (checkOwner(locations, line, locationData.locationPosition + 1, playerIndex) === true) {
            return true
        }
    }
    return false;
}

function checkPreviousLine(locationData, playerIndex, isFirst, isLast) {
    console.log("*** CHECKING PREVIOUS LINE ***");
    const locations = locationData.locations;
    const line = locationData.locationLine;
    const position = locationData.locationPosition;
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
    console.log("*** CHECKING NEXT LINE ***");
    const locations = locationData.locations;
    const line = locationData.locationLine;
    const position = locationData.locationPosition;

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
    location.state = LOCATION_STATE.occupied;
    location.owner = playerState.playerIndex;
    const effectsResult = processEffects(null, null, playerState, LOCATIONS[location.id].effects,
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
            tLocation.state = LOCATION_STATE.occupied;
            tLocation.owner = playerIndex;
        }
    }
    return tLocations;
}

export function processExplorationDiscount(discount, explorationCostEffects) {
    let tExplorationEffects = [];
    let exploreDiscount = discount === EFFECT.exploreAnyLocationWithDiscount4 ? 3 : 2;
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

export function getExplorationCost(location, playerState, exploreDiscount) {
    let exploreCost = null;

    if (location.type === LOCATION_TYPE.brown) {
        if (location.level === LOCATION_LEVEL["2"]) {
            exploreCost = [EFFECT.loseJeep, EFFECT.loseCoin, EFFECT.loseExplore, EFFECT.loseExplore];
        } else if (location.level === LOCATION_LEVEL["3"]) {
            exploreCost = [EFFECT.loseJeep, EFFECT.loseCoin, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
        }
    } else if (location.type === LOCATION_TYPE.green) {
        if (location.level === LOCATION_LEVEL["2"]) {
            exploreCost = [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
        } else if (location.level === LOCATION_LEVEL["3"]) {
            exploreCost = [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.loseExplore];
        }
    } else if (location.type === LOCATION_TYPE.basic) {
        /*exploreCostText = null;*/
    } else if (location.type === LOCATION_TYPE.lostCity) {
        exploreCost = [EFFECT.hasDiscoveredLostCity];
    }

    if (exploreDiscount) {
        exploreCost = processExplorationDiscount(playerState.activeEffects[0], exploreCost);
    }
    return exploreCost;
}