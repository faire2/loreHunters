import {LOCATION_IDs} from "../../../data/idLists.mjs";
import {LOCATION_LEVEL, LOCATION_LINE, LOCATION_STATE, LOCATION_TYPE} from "../lists.mjs";
import {shuffleArray} from "../cardManipulationFuntions.mjs";


/* EMPTY PLAYER STATE */


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

    let level2Max;
    let level3Max;

    switch (numOfPlayers) {
        case 1:
        case 2:
            level2Max = 2;
            level3Max = 2;
            break;
        case 3:
            level2Max = 3;
            level3Max = 2;
            break;
        case 4:
            level2Max = 4;
            level3Max = 2;
            break;
        default:
            console.log("Unable to process number of players in getInitialLocations: " + numOfPlayers);
    }

    for (let i = 0; i < locationKeys.length; i++) {
        let location = locations[locationKeys[i]];
        switch (location.level) {
            case LOCATION_LEVEL["1"]:
                level1.push(location);
                break;
            case LOCATION_LEVEL["2"]:
                if (location.type === LOCATION_TYPE.brown) {
                    if (level2Brown.length < level2Max) {
                        level2Brown.push(location);
                    }
                } else if (location.type === LOCATION_TYPE.green) {
                    if (level2Green.length < level2Max) {
                        level2Green.push(location);
                    }
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            case LOCATION_LEVEL["3"]:
                if (location.type === LOCATION_TYPE.brown) {
                    if (level3Brown.length < level3Max) {
                        level3Brown.push(location);
                    }
                } else if (location.type === LOCATION_TYPE.green) {
                    if (level3Green.length < level3Max) {
                        level3Green.push(location);
                    }
                } else if (location.type === LOCATION_TYPE.lostCity) {
                    if (level3LostCity.length < 1) {
                        level3LostCity.push(location);
                    }
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            default:
                console.log("Unable to process location level in getInitialLocations: " + locations[locationKeys[i]]);
        }
    }

    /* level 1 locations start explored, other not */
    for (let key in locations) {
        locations[key].state = (locations[key].level === LOCATION_LEVEL["1"]) ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;
    }

    /* there are is a specific spatial configuration for every player number variation: */
    let line1 = level1;
    /*let line1.push(locations.g32);
    line1[5].state = LOCATION_STATE.explored;*/
    let line2 = [];
    let line3 = [];
    let line4 = [];

    switch (numOfPlayers) {
        case 1:
        case 2:
            line2 = [...level2Green, ...level2Brown];
            line3 = [...level3Green, ...level3Brown, ...level3LostCity];
            break;
        case 3:
            line2 = [level2Green[0], level2Green[1], level2Brown[0], level2Brown[1]];
            line3 = [level3Green[0], level2Green[2], level2Brown[2], level3Brown[0]];
            line4 = [level3Green[1], "empty", level3Brown[1], level3LostCity[0]];
            break;
        case 4:
            line2 = [level2Green[0], level2Green[1], level2Brown[0], level2Brown[1]];
            line3 = [level2Green[2], level2Green[3], level2Brown[2], level2Brown[3]];
            line4 = [level3Green[0], level3Green[1], level3Brown[0], level3Brown[1], level3LostCity[0]];
            break;
        default:
            console.log("Unable to process number of players in getInitialLocations: " + numOfPlayers);
    }

    for (let location of line1) {
        location.line = LOCATION_LINE.line1;
    }
    for (let location of line2) {
        location.line = LOCATION_LINE.line2;
    }
    for (let location of line3) {
        location.line = LOCATION_LINE.line3;
    }
    if (line4.length > 0) {
        for (let location of line4) {
            if (location !== "empty") {
                location.line = LOCATION_LINE.line4;
            }
        }
    }

    return {
        [LOCATION_LINE.line1]: line1,
        [LOCATION_LINE.line2]: line2,
        [LOCATION_LINE.line3]: line3,
        [LOCATION_LINE.line4]: line4,
    };
}

