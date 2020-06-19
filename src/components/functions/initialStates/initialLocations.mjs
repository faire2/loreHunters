import {LOCATION_IDs} from "../../../data/idLists.mjs";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE} from "../enums.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";
import {LOCATION_LINE} from "../enums.mjs";
import cloneDeep from "lodash/cloneDeep.js";

/* INITIAL LOCATIONS */
export function getInitialLocations(numOfPlayers) {
    let locations = LOCATION_IDs;
    const locationKeys = shuffleArray(Object.keys(locations));

    let level1 = [];
    let level2Green = [];
    let level3Green = [];
    let level2Brown = [];
    let level3Brown = [];
    let level3LostCity = [];

    const lineLocationMaximum = 4;

    for (let i = 0; i < locationKeys.length; i++) {
        let location = locations[locationKeys[i]];
        location.state = LOCATION_TYPE.basic === location.type ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;
        switch (location.level) {
            case LOCATION_LEVEL["1"]:
                location.line = LOCATION_LINE.line1;
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
    const line2 = getEmptyLocations(LOCATION_LINE.line2, lineLocationMaximum);
    const line3 = getEmptyLocations(LOCATION_LINE.line3, lineLocationMaximum);
    const line4 = getEmptyLocations(LOCATION_LINE.line4, lineLocationMaximum);

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

function getEmptyLocations(locationLine, numberOfLocations) {
    let greenLocationsArr = [];
    let brownLocationsArr = [];

    for (let i = 0; i < numberOfLocations / 2; i++) {
        greenLocationsArr.push(cloneDeep(LOCATION_IDs.emptyGreenLocation));
        brownLocationsArr.push(cloneDeep(LOCATION_IDs.emptyBrownLocation));
    }
    let emptyLocationsArr = [...greenLocationsArr, ...brownLocationsArr];
    for (let i = 0; i < emptyLocationsArr.length; i++) {
        emptyLocationsArr[i].index = i;
        emptyLocationsArr[i].line = locationLine;
        emptyLocationsArr[i].state = LOCATION_STATE.unexplored;
    }
    return emptyLocationsArr;
}