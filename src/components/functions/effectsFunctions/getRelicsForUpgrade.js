import {RELIC} from "../enums";

export function getRelicsForUpgrade(playerState) {
    let relicsArray = [RELIC.bronze];
    if (playerState.resources.bronzeRelics > 0) {
        relicsArray.push(RELIC.silver);
    } else if (playerState.resources.silverRelics > 0) {
        relicsArray.push(RELIC.gold);
    }
    return relicsArray;
}