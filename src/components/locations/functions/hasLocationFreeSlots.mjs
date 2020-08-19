import {LOCATION_SLOTS} from "../../functions/enums.mjs";

export function hasLocationFreeSlots(tLocation) {
    // determine number of slots in given location

    let locationSlots;
    switch (tLocation.slots) {
        case LOCATION_SLOTS.single:
        case LOCATION_SLOTS.double:
            locationSlots = 1;
            break;
        case LOCATION_SLOTS.both:
            locationSlots = 2;
            break;
        default:
            console.error("Unable to determine location slots in hasLocationFreeSlots: " + tLocation.slots);
    }
    return (tLocation.adventurers.length < locationSlots);
}