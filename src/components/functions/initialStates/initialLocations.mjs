import {LOCATION_LEVEL, LOCATION_LINE, LOCATION_STATE, LOCATION_TYPE, RELIC} from "../enums.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {Locations} from "../../../data/locations.mjs";
import {Guardians} from "../../../data/guardians.mjs";
import {relicEffects} from "../../../data/relicEffects.mjs";
import {LOCATION_SLOTS} from "../enums";

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

    // basic location slots are determined by number of players
    const basicLocationSlots = [
        [LOCATION_SLOTS.both, LOCATION_SLOTS.double, LOCATION_SLOTS.double, LOCATION_SLOTS.single, LOCATION_SLOTS.single],
        [LOCATION_SLOTS.both, LOCATION_SLOTS.double, LOCATION_SLOTS.double, LOCATION_SLOTS.single, LOCATION_SLOTS.single],
        [LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.double, LOCATION_SLOTS.single],
        [LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.both],
    ];

    for (let i = 0; i < locationKeys.length; i++) {
        let location = Locations[locationKeys[i]];
        location.state = LOCATION_TYPE.basic === location.type ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;

        // slots describe how many players can be using the location at once
        location.slots = LOCATION_TYPE.basic === location.type ? 2 : 1;

        // every location has array to hold adventurers
        location.adventurers = [];
    }

    relicEffects.bronze = shuffleArray(relicEffects.bronze);
    relicEffects.silver = shuffleArray(relicEffects.silver);

    let line1 = [level1locations[0], level1locations[1], level1locations[2], level1locations[3], level1locations[4]];
    line1 = setLocationIndexAndLine(LOCATION_LINE.line1, line1)

    let line2 = [cloneDeep(Locations.emptyBrownLocation2),  cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyGreenLocation2),
        cloneDeep(Locations.emptyGreenLocation2)];
    line2 = setLocationIndexAndLine(LOCATION_LINE.line2, line2)
    for (let location of line2) {
        location = setRelicEffects(location, RELIC.bronze);
    }

    let line3 = [cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyGreenLocation2),
        cloneDeep(Locations.emptyGreenLocation2)];
    line3 = setLocationIndexAndLine(LOCATION_LINE.line3, line3)
    for (let location of line3) {
        location = setRelicEffects(location, RELIC.bronze);
    }

    let line4 = [cloneDeep(Locations.emptyBrownLocation3), cloneDeep(Locations.emptyBrownLocation3), cloneDeep(Locations.emptyGreenLocation3),
        cloneDeep(Locations.emptyGreenLocation3)];
    line4 = setLocationIndexAndLine(LOCATION_LINE.line4, line4)
    for (let location of line4) {
        location = setRelicEffects(location, RELIC.silver);
    }

    return {
        line1: line1,
        line2: line2,
        line3: line3,
        line4: line4,
        level2Locations: level2locations,
        level3Locations: level3locations,
        guardianKeys: guardianKeys
    };
}

function setLocationIndexAndLine(locationLine, locations) {
    for (let i = 0; i < locations.length; i++) {
        locations[i].line = locationLine;
        locations[i].index = i;
    }
    return locations
}

function setRelicEffects(location, relicType) {
    if (relicType === RELIC.bronze) {
        location.relicEffects = relicEffects.bronze[0];
        relicEffects.bronze.splice(0, 1);
    } else if (relicType === RELIC.silver) {
        location.relicEffects = relicEffects.silver[0];
        relicEffects.silver.splice(0, 1);
    } else {
        console.error("Unable to determine relic type in setRelicEffects: " + relicType);
    }
    return location;
}