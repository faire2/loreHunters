import React from "react";
import {TRANSPORT_TYPE} from "../../data/locations";
import {EFFECT} from "../../data/effects";

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

    console.log("Transport type: " + transportType);
    console.log("Transport cost: " + transportCost);

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
            console.log("Unknown transportation type in payForTravelIfPossible: " + transportCost);
            console.log(location);
    }
    console.log("**Travel check - has enough resources for travel? " + enoughResources);
    return {enoughResources: enoughResources, tPlayerState: tPlayerState};
}