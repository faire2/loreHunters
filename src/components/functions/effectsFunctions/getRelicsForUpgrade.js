import {RELIC} from "../enums";

export function getRelicsForUpgrade(playerState) {
    let relicsArray = [];
    if (playerState.resources.relics > 0) {
        relicsArray.push(RELIC.bronze);
    } else if (playerState.resources.silverRelics > 0) {
        relicsArray.push(RELIC.silver);
    }
    return relicsArray;
}