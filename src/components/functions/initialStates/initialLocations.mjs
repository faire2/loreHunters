import {LOCATION_LEVEL, LOCATION_LINE, LOCATION_STATE, LOCATION_TYPE} from "../enums.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {Locations} from "../../../data/locations.mjs";
import {Guardians} from "../../../data/guardians.mjs";

/* INITIAL Locations */
export function getInitialLocations(numOfPlayers) {
    const locationKeys = shuffleArray(Object.keys(Locations));
    const guardianKeys = shuffleArray(Object.keys(Guardians));

    // find lvl 1 locations to use later
    let level1locations = [];
    let level2locations = [];
    let level3locations = [];

    for (let locationKey of locationKeys) {
        let location = Locations[locationKey];
        switch (location.type) {
            case LOCATION_TYPE.basic:
                level1locations.push(location);
                break;
            /*case LOCATION_TYPE.green:
            case LOCATION_TYPE.brown:*/
            case LOCATION_TYPE.undetermined:
                if (location.level === LOCATION_LEVEL["2"]) {
                    level2locations.push(location);
                } else if (location.level === LOCATION_LEVEL["3"]) {
                    level3locations.push(location);
                }
                break;
            default:
                console.log("Location not sorted: " + location.id);
        }
    }

    /*let level1 = [];
    let level2Green = [];
    let level3Green = [];
    let level2Brown = [];
    let level3Brown = [];*/
    let level3LostCity = [];

    /*const lineLocationMaximum = 4;*/

    for (let i = 0; i < locationKeys.length; i++) {
        let location = Locations[locationKeys[i]];
        location.state = LOCATION_TYPE.basic === location.type ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;

        // slots describe how many players can be using the location at once
        location.slots = LOCATION_TYPE.basic === location.type ? 2 : 1;

        // every location has array to hold adventurers
        location.adventurers = [];
    }

    let line1 = [cloneDeep(Locations.emptyBrownLocation2), level1locations[0], level1locations[1], level1locations[2],
        cloneDeep(Locations.emptyGreenLocation2)];
    line1 = setLocationIndexAndLine(LOCATION_LINE.line1, line1)

    let line2 = [cloneDeep(Locations.emptyBrownLocation2), level1locations[3], level1locations[4], cloneDeep(Locations.emptyGreenLocation2)];
    line2 = setLocationIndexAndLine(LOCATION_LINE.line2, line2)

    let line3 = [cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyGreenLocation2),
        cloneDeep(Locations.emptyGreenLocation2)];
    line3 = setLocationIndexAndLine(LOCATION_LINE.line3, line3)

    let line4 = [cloneDeep(Locations.emptyBrownLocation3), cloneDeep(Locations.emptyBrownLocation3), cloneDeep(Locations.emptyGreenLocation3),
        cloneDeep(Locations.emptyGreenLocation3)];
    line4 = setLocationIndexAndLine(LOCATION_LINE.line4, line4)

    return {
        line1: line1,
        line2: line2,
        line3: line3,
        line4: line4,
        /*level2Brown: level2Brown,
        level2Green: level2Green,
        level3Brown: level3Brown,
        level3Green: level3Green,*/
        level2Locations: level2locations,
        level3Locations: level3locations,
        lostCity: level3LostCity,
        guardianKeys: guardianKeys
    };
}

// generates empty locations for lvl 2 empty locations
function getEmptyLocations(locationLine, numberOfLocations) {
    let greenLocationsArr = [];
    let brownLocationsArr = [];

    for (let i = 0; i < numberOfLocations / 2; i++) {
        greenLocationsArr.push(cloneDeep(Locations.emptyGreenLocation2));
        brownLocationsArr.push(cloneDeep(Locations.emptyBrownLocation2));
    }
    let emptyLocationsArr = [...greenLocationsArr, ...brownLocationsArr];

    /*let emptyLocationsArr = [];
    for (let i = 0; i < numberOfLocations; i++) {
        emptyLocationsArr.push(cloneDeep(Locations.emptyLocation));
    }*/

    for (let i = 0; i < emptyLocationsArr.length; i++) {
        emptyLocationsArr[i].index = i;
        emptyLocationsArr[i].line = locationLine;
        emptyLocationsArr[i].state = LOCATION_STATE.unexplored;
    }
    return emptyLocationsArr;
}

function setLocationIndexAndLine(locationLine, locations) {
    for (let i = 0; i < locations.length; i++) {
        locations[i].line = locationLine;
        locations[i].index = i;
    }
    return locations
}