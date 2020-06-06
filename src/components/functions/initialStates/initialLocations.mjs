import {LOCATION_IDs} from "../../../data/idLists.mjs";
import {LOCATION_LINE} from "./initialStateFunctions";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../lists";
import {shuffleArray} from "../cardManipulationFuntions";

/* INITIAL LOCATIONS */
export function getInitialLocations(numOfPlayers) {
    let locations = LOCATION_IDs;
    const locationKeys = shuffleArray(Object.keys(locations));

    /* we need to get the right number of green and brown locations of each location level according to n of players */
    let level1 = [];
    let level2Green = [];
    let level3Green = [];
    let level2Brown = [];
    let level3Brown = [];
    let level3LostCity = [];

    for (let i = 0; i < locationKeys.length; i++) {
        let location = locations[locationKeys[i]];
        location.state = LOCATION_STATE.explored;
        switch (location.level) {
            case LOCATION_LEVEL["1"]:
                level1.push(location);
                break;
            case LOCATION_LEVEL["2"]:
                if (location.type === LOCATION_TYPE.brown) {
                    level2Brown.push(location);
                } else if (location.type === LOCATION_TYPE.green) {
                    level2Green.push(location);
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            case LOCATION_LEVEL["3"]:
                if (location.type === LOCATION_TYPE.brown) {
                    level3Brown.push(location);
                } else if (location.type === LOCATION_TYPE.green) {
                    level3Green.push(location);
                } else if (location.type === LOCATION_TYPE.lostCity) {
                    level3LostCity.push(location);
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            default:
                console.log("Unable to process location level in getInitialLocations: " + locations[locationKeys[i]]);
        }
    }

    const line1 = level1;
    for (let location of line1) {
        location.line = LOCATION_LINE.line1;
    }
    const line2 = [LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation];
    for (let location of line2) {
        location.line = LOCATION_LINE.line2;
    }
    const line3 = [LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation];
    for (let location of line3) {
        location.line = LOCATION_LINE.line3;
    }    const line4 = [LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation, LOCATION_IDs.emptyLocation];
    for (let location of line4) {
        location.line = LOCATION_LINE.line4;
    }
    return {
        line1: line1,
        line2: line2,
        line3: line3,
        line4: line4,
        level2Brown: level2Brown,
        level2Green: level2Green,
        level3Brown: level3Brown,
        level3Green: level3Green,
        lostCity: level3LostCity
    };
}
