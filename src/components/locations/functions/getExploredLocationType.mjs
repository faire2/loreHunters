import {LOCATION_TYPE} from "../../functions/enums.mjs";

export function getExploredLocationType(exploredLocation) {
    switch (exploredLocation.type) {
        case LOCATION_TYPE.emptyBrownLocation:
            return LOCATION_TYPE.brown;
        case LOCATION_TYPE.emptyGreenLocation:
            return LOCATION_TYPE.green;
        default:
            console.warn("Unable to determine type of location!" + exploredLocation.type);
    }
}