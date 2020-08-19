import {hasLocationFreeSlots} from "../locations/functions/hasLocationFreeSlots.mjs";

export function occupyLocationByAutomaton(states, effect) {
    const locations = states.locations;
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
    console.log("Automaton unable to occupy location in occupyLocationByAutomaton - effect: " + effect);
    return states;
}
