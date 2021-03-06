import {RESOURCES} from "./ResourcesArea";

export function processUptrade(tPlayerState, resource) {
    let resources = tPlayerState.resources;
    const tActiveEffects = tPlayerState.activeEffects;
    if (resource === RESOURCES.texts) {
        resources.texts -= 1;
        resources.weapons += 1;
    } else if (resource === RESOURCES.weapons) {
        resources.weapons -= 1;
        resources.jewels += 1;
    } else if (resource === RESOURCES.jewels) {
        resources.jewels -= 1;
        resources.texts += 3;
    } else {
        console.log("Unknown resource in handleClickOnResource: " + resource);
    }
    tActiveEffects.splice(0, 1);
    return tPlayerState;
}