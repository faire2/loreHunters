import {LOCATION_LEVEL, LOCATION_LINE, LOCATION_SLOTS, LOCATION_STATE, LOCATION_TYPE, RELIC} from "../enums.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {Locations} from "../../../data/locations.mjs";
import {Guardians} from "../../../data/guardians.mjs";
import {relicEffects} from "../../../data/relicEffects.mjs";
import {EFFECT} from "../../../data/effects.mjs";

/* INITIAL Locations */
export function getInitialLocations(numOfPlayers, legend) {
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
            case LOCATION_TYPE.undetermined:
                if (location.level === LOCATION_LEVEL.level1) {
                    level2locations.push(location);
                } else if (location.level === LOCATION_LEVEL.level2) {
                    level3locations.push(location);
                }
                break;
            default:
                console.log("Location not sorted: " + location.id);
        }
    }
    /*level2locations.splice(0, 0, Locations.l11);*/

    // basic location slots are determined by number of players
    const basicLocationSlots = [
        [LOCATION_SLOTS.single, LOCATION_SLOTS.single, LOCATION_SLOTS.single, LOCATION_SLOTS.single, LOCATION_SLOTS.single],
        [LOCATION_SLOTS.single, LOCATION_SLOTS.single, LOCATION_SLOTS.single, LOCATION_SLOTS.single, LOCATION_SLOTS.single],
        [LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.single, LOCATION_SLOTS.single, LOCATION_SLOTS.single],
        [LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.both, LOCATION_SLOTS.both],
    ];

    let basicLocationNumber = 0;
    for (let i = 0; i < locationKeys.length; i++) {
        let location = Locations[locationKeys[i]];
        location.state = LOCATION_TYPE.basic === location.type ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;

        // slots describe how many players can be using the location at once
        if (location.type !== LOCATION_TYPE.basic) {
            location.slots = LOCATION_SLOTS.single;
        } else {
            location.slots = basicLocationSlots[numOfPlayers][basicLocationNumber];
            basicLocationNumber += 1;
        }

        // every location has array to hold adventurers
        location.adventurers = [];
    }

    relicEffects.bronze = shuffleArray(relicEffects.bronze);
    relicEffects.silver = shuffleArray(relicEffects.silver);

    let line1 = [level1locations[0], level1locations[1], level1locations[2], level1locations[3], level1locations[4]];
    line1 = setLocationLineIndexTravel(LOCATION_LINE.line1, line1, legend);
    for (let location of line1) {
        location.level = LOCATION_LEVEL.basic
    }

    let line2 = [cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyGreenLocation2),
        cloneDeep(Locations.emptyGreenLocation2)];
    line2 = setLocationLineIndexTravel(LOCATION_LINE.line2, line2, legend);
    for (let location of line2) {
        location = setRelicEffects(location, RELIC.bronze);
        location.level = LOCATION_LEVEL.level1;
    }

    let line3 = [cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyBrownLocation2), cloneDeep(Locations.emptyGreenLocation2),
        cloneDeep(Locations.emptyGreenLocation2)];
    line3 = setLocationLineIndexTravel(LOCATION_LINE.line3, line3, legend);
    for (let location of line3) {
        location = setRelicEffects(location, RELIC.bronze);
        location.level = LOCATION_LEVEL.level1;
    }

    let line4 = [cloneDeep(Locations.emptyBrownLocation3), cloneDeep(Locations.emptyBrownLocation3), cloneDeep(Locations.emptyGreenLocation3),
        cloneDeep(Locations.emptyGreenLocation3)];
    line4 = setLocationLineIndexTravel(LOCATION_LINE.line4, line4, legend);
    for (let location of line4) {
        location = setRelicEffects(location, RELIC.silver);
        location.level = LOCATION_LEVEL.level2;
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

function setRelicEffects(location, relicType) {
    if (relicType === RELIC.bronze) {
        // effects are already stored as arrays
        location.relicEffects = [relicEffects.bronze[0]];
        relicEffects.bronze.splice(0, 1);
    } else if (relicType === RELIC.silver) {
        location.relicEffects = [relicEffects.bronze[0], relicEffects.bronze[1]];
        relicEffects.bronze.splice(0, 2);
    } else {
        console.error("Unable to determine relic type in setRelicEffects: " + relicType);
    }
    return location;
}

function setLocationLineIndexTravel(locationLine, locations, legend) {
    for (let i = 0; i < locations.length; i++) {
        locations[i].line = locationLine;
        locations[i].index = i;
        locations[i].travelCost = travelCost[legend][locationLine][i];
    }
    return locations
}

// location travel costs for each lines
const travelCost = {
    legend1: {
        line1: [[EFFECT.loseWalk], [EFFECT.loseWalk], [EFFECT.loseWalk], [EFFECT.loseWalk], [EFFECT.loseWalk]],
        line2: [[EFFECT.loseJeep], [EFFECT.loseJeep], [EFFECT.loseShip], [EFFECT.loseShip]],
        line3: [[EFFECT.loseJeep], [EFFECT.loseJeep], [EFFECT.loseShip], [EFFECT.loseShip]],
        line4: [[EFFECT.loseJeep, EFFECT.loseJeep], [EFFECT.loseJeep, EFFECT.loseJeep],
            [EFFECT.loseShip, EFFECT.loseShip], [EFFECT.loseShip, EFFECT.loseShip]],
    },
    legend2: {
        line1: [[EFFECT.loseWalk], [EFFECT.loseWalk], [EFFECT.loseWalk], [EFFECT.loseWalk], [EFFECT.loseWalk]],
        line2: [[EFFECT.loseJeep], [EFFECT.loseJeep], [EFFECT.loseShip], [EFFECT.loseShip]],
        line3: [[EFFECT.losePlane], [EFFECT.loseJeep], [EFFECT.loseShip], [EFFECT.loseWalk, EFFECT.loseWalk]],
        line4: [[EFFECT.loseJeep, EFFECT.loseJeep], [EFFECT.loseWalk, EFFECT.losePlane],
            [EFFECT.loseJeep, EFFECT.loseShip], [EFFECT.loseShip, EFFECT.loseShip]],
    },
}