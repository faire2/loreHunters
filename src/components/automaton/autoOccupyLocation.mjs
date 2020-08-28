import {hasLocationFreeSlots} from "../locations/functions/hasLocationFreeSlots.mjs";
import {DIRECTION} from "../functions/enums.mjs";

export function autoOccupyLocation(states, effect, direction) {
    console.log("AUTOMATON: occupying location for effect " + effect + " from " + direction);
    const locations = states.locations;
    if (direction === DIRECTION.left) {
        for (let i = 0; i < locations.line4.length; i++) {
            if (locations.line4[i].effects.includes(effect) && hasLocationFreeSlots(locations.line4[i])) {
                locations.line4[i].adventurers.push(4);
                return states;
            }
        }
        for (let i = 0; i < locations.line3.length; i++) {
            if (locations.line3[i].effects.includes(effect) && hasLocationFreeSlots(locations.line3[i])) {
                locations.line3[i].adventurers.push(4);
                return states;
            }
        }
        for (let i = 0; i < locations.line2.length; i++) {
            if (locations.line2[i].effects.includes(effect) && hasLocationFreeSlots(locations.line2[i])) {
                locations.line2[i].adventurers.push(4);
                return states;
            }
        }
        for (let i = 0; i < locations.line1.length; i++) {
            if (locations.line1[i].effects.includes(effect) && hasLocationFreeSlots(locations.line1[i])) {
                locations.line1[i].adventurers.push(4);
                return states;
            }
        }
        console.log("Automaton unable to occupy location in autoOccupyLocation - effect: " + effect);
        return states;
    } else if (direction === DIRECTION.right) {
        for (let i = locations.line4.length - 1; i > -1; i--) {
            if (locations.line4[i].effects.includes(effect) && hasLocationFreeSlots(locations.line4[i])) {
                locations.line4[i].adventurers.push(4);
                return states;
            }
        }
        for (let i = locations.line3.length - 1; i > -1; i--) {
            if (locations.line3[i].effects.includes(effect) && hasLocationFreeSlots(locations.line3[i])) {
                locations.line3[i].adventurers.push(4);
                return states;
            }
        }
        for (let i = locations.line2.length - 1; i > -1; i--) {
            if (locations.line2[i].effects.includes(effect) && hasLocationFreeSlots(locations.line2[i])) {
                locations.line2[i].adventurers.push(4);
                return states;
            }
        }
        for (let i = locations.line1.length - 1; i > -1; i--) {
            if (locations.line1[i].effects.includes(effect) && hasLocationFreeSlots(locations.line1[i])) {
                locations.line1[i].adventurers.push(4);
                return states;
            }
        }
        console.log("Automaton unable to occupy location in autoOccupyLocation - effect: " + effect);
        return states;
    } else {
        console.error("Unable to determine direction in autoOccupyLocation: " + direction);
    }
}
