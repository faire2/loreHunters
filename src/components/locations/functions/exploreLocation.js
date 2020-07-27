import {getExplorationCost} from "./locationFunctions";
import {processEffects} from "../../functions/processEffects";
import {ACTION_TYPE, LOCATION_LEVEL, LOCATION_STATE} from "../../functions/enums";
import {addLogEntry} from "../../main/logger";
import {EFFECT} from "../../../data/effects";

export function exploreLocation(playerState, locations, store, location, round) {
    const exploreDiscount = hasPlayerExplorationDiscount(playerState);
    if (exploreDiscount) {
        playerState.activeEffects.splice(0)
    }
    // get exploration cost & process discount
    const exploreCostEffects = getExplorationCost(location.type, location.level, exploreDiscount, playerState);
    // process the cost
    const explorationCostResult = processEffects(null, null, playerState, exploreCostEffects,
        null, null, location, null);
    if (explorationCostResult.processedAllEffects) {
        playerState = explorationCostResult.tPlayerState;
        // if exploration discount active effect is present the action has already been substracted
        playerState.actions -= exploreDiscount ? 0 : 1;
        location.level === LOCATION_LEVEL["2"] ? playerState.resources.bronzeRelics += 1 : playerState.resources.silverRelics += 1;

        // mark location as guarded
        locations[location.line][location.index].state = LOCATION_STATE.guarded;

        // push player's adventurer to the location

        /* originally guardians were cards with effects that were processed while they were drawn:
        // player can choose between effect of location and discovery effect of next guardian
        const guardian = Guardians[store.guardians[0].id];
        const locationLevel = LOCATION_IDs[location.id].level;
        // guardian effects are different when location level is 2 and 3
        const guardianText = locationLevel === LOCATION_LEVEL["2"] ? guardian.discoveryTextRow :
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }}>{guardian.discoveryTextRow}{guardian.discoveryTextRow2}</div>;
        const guardianEffects = locationLevel === LOCATION_LEVEL["2"] ? guardian.discoveryEffect :
            [...guardian.discoveryEffect, ...guardian.discoveryEffect2];
        // guardian is moved to player's discard and his arrival is processed (lock effects...)
        const guardianResults = handleGuardianArrival(playerState, cloneDeep(store), round);
        playerState = guardianResults.tPlayerState;
        store = guardianResults.tStore;*/

        addLogEntry(playerState, ACTION_TYPE.exploresLocation, location.id,
            exploreCostEffects);
        return ({
            playerState: playerState, store: store, locations: locations/*, modalRewardData: [{
                type: REWARD_TYPE.effectsArr,
                data: [{effects: location.effects, effectsText: location.effectsText},
                    {effects: guardianEffects, effectsText: guardianText}]
            }]*/
        })
    } else {
        console.error("Not enough resources to explore location - inconsistency with location choice!");
        return false
    }
}

export function hasPlayerExplorationDiscount(playerState) {
    return playerState.activeEffects[0] === EFFECT.exploreAnyLocationWithDiscount3
        || playerState.activeEffects[0] === EFFECT.exploreAnyLocationWithDiscount4;
}