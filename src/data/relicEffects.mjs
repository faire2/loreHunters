import {EFFECT} from "./effects.mjs";
import cloneDeep from "lodash/cloneDeep.js";

// these are effects that are randomized and placed on individual relics
const persistentRelicEffects =
    {
        bronze: [[EFFECT.gainExplore], [EFFECT.gainExplore], [EFFECT.gainExplore], [EFFECT.gainExplore],
            [EFFECT.gainCoin], [EFFECT.gainCoin], [EFFECT.gainCoin], [EFFECT.gainCoin],
            [EFFECT.gainText], [EFFECT.gainText], [EFFECT.gainText], [EFFECT.gainText],
            [EFFECT.uptrade], [EFFECT.uptrade], [EFFECT.uptrade],
            [EFFECT.refreshSilverAssistant], [EFFECT.refreshSilverAssistant], [EFFECT.refreshSilverAssistant],
            [EFFECT.destroyCard], [EFFECT.destroyCard], [EFFECT.destroyCard], [EFFECT.destroyCard]],
        silver: [[EFFECT.gainExplore], [EFFECT.gainExplore], [EFFECT.gainCoin], [EFFECT.gainCoin], [EFFECT.gainText], [EFFECT.gainText],
            [EFFECT.destroyCard, EFFECT.destroyCard, EFFECT.draw1, EFFECT.draw1]],
        gold: [[], [], [], [], [], []]
    };

// we need a copy for functions to work on
export let relicEffects = cloneDeep(persistentRelicEffects);
export function resetRelicEffects() {
    relicEffects = cloneDeep(persistentRelicEffects);
}
