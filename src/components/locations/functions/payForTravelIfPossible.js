import {EFFECT} from "../../../data/effects";
import {TRANSPORT_TYPE} from "../../../data/locations";
import {LOCATION_LEVEL, LOCATION_TYPE} from "../../functions/enums";

export function payForTravelIfPossible(tPlayerState, location, effect) {
    const resources = tPlayerState.resources;
    let transportType = null;
    let transportCost = null;


    if (location !== null && location.slots > location.adventurers.length) {
        // if we have location we determine travel cost
        if (location.type === LOCATION_TYPE.green) {
            transportType = TRANSPORT_TYPE.ship;
        } else if (location.type === LOCATION_TYPE.brown) {
            transportType = TRANSPORT_TYPE.jeep;
        } else if (location.type === LOCATION_TYPE.basic) {
            transportType = TRANSPORT_TYPE.walk;
        } else {console.error("Unable to determine location type: " + location.type)}

        if (location.level === LOCATION_LEVEL["2"] || location.level === LOCATION_LEVEL["1"]) {
            transportCost = 1;
        } else if (location.level === LOCATION_LEVEL["3"]) {
            transportCost = 2;
        } else {console.error("Unable to determine location level: " + location.level)}

        // we pay extra transport for every other adventurer deployed to this location
        transportCost += location.adventurers.length;
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
            case EFFECT.loseBlimp:
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