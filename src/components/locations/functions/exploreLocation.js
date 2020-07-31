import {getExplorationCost} from "./locationFunctions";
import {processEffects} from "../../functions/processEffects";
import {ACTION_TYPE, LOCATION_DISCOUNT_EFFECTS, LOCATION_LEVEL, LOCATION_STATE} from "../../functions/enums";
import {addLogEntry} from "../../main/logger";

export function exploreLocation(playerState, locations, store, location) {
    const exploreDiscount = hasPlayerExplorationDiscount(playerState);
    // get exploration cost & process discount
    const exploreCostEffects = getExplorationCost(location.type, location.level, exploreDiscount, playerState);
    if (exploreDiscount) {
        playerState.activeEffects.splice(0)
    }
    // process the cost
    const explorationCostResult = processEffects(null, null, playerState, exploreCostEffects, null, location, null);
    if (explorationCostResult.processedAllEffects) {
        playerState = explorationCostResult.tPlayerState;
        // if exploration discount active effect is present the action has already been substracted
        playerState.actions -= exploreDiscount ? 0 : 1;

        // gain relic and relic resource
        location.level === LOCATION_LEVEL["2"] ? playerState.resources.bronzeRelics += 1 : playerState.resources.silverRelics += 1;
        const relicEffectResult = processEffects(null, null, playerState, location.relicEffects, null, location, null);
        playerState = relicEffectResult.tPlayerState;

        // mark location as guarded
        locations[location.line][location.index].state = LOCATION_STATE.guarded;

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
    return LOCATION_DISCOUNT_EFFECTS.includes(playerState.activeEffects[0])
}