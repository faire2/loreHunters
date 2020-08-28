import {DIRECTION, LOCATION_STATE} from "../functions/enums.mjs";

export function autoDefeatAGuardian(states, automatonState, direction) {
    console.log("AUTOMATON: trying to defeat a guardian");
    const locations = states.locations;
    if (direction === DIRECTION.left) {
        const locationLines = [locations.line4, locations.line3, locations.line2, locations.line1];
        for (let y = 0; y < locationLines.length; y++) {
            for (let i = 0; i < locationLines[y].length; i++) {
                let location = locationLines[y][i];
                if (location.state === LOCATION_STATE.guarded && location.adventurers.includes(4)) {
                    location.state = LOCATION_STATE.explored;
                    location.guardian = null;
                    automatonState.defeatedGuardians += 1;
                    return {states: states, automatonState: automatonState, defeatedGuardian: true};
                }
            }
        }
        return {states: states, automatonState: automatonState};
    } else if (direction === DIRECTION.right) {
        const locationLines = [locations.line1, locations.line2, locations.line3, locations.line4];
        for (let y = 0; y < locationLines.length; y++) {
            for (let i = locationLines[y].length - 1; i > -1; i--) {
                let location = locationLines[y][i];
                if (location.state === LOCATION_STATE.guarded && location.adventurers.includes(4)) {
                    location.state = LOCATION_STATE.explored;
                    location.guardian = null;
                    automatonState.defeatedGuardians += 1;
                    return {states: states, automatonState: automatonState, defeatedGuardian: true};
                }
            }
        }
    }
    return {states: states, automatonState: automatonState, defeatedGuardian: false};
}