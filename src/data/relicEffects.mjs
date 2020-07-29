import {EFFECT} from "./effects.mjs";

// these are effects that are randomized and placed on individual relics
export let relicEffects =
    {
        bronze: [[EFFECT.gainExplore], [EFFECT.gainExplore], [EFFECT.gainExplore], [EFFECT.gainCoin], [EFFECT.gainCoin], [EFFECT.gainCoin],
            [EFFECT.draw1], [EFFECT.draw1], [EFFECT.destroyCard], [EFFECT.destroyCard], [EFFECT.gainText], [EFFECT.gainText]],
        silver: [[EFFECT.gainExplore], [EFFECT.gainExplore], [EFFECT.draw1], [EFFECT.draw1], [EFFECT.destroyCard], [EFFECT.destroyCard],
            [EFFECT.gainText], [EFFECT.gainText]],
        gold: [[EFFECT.draw1, EFFECT.draw1], [EFFECT.draw1, EFFECT.destroyCard], [EFFECT.progressWithSecondToken],
            [EFFECT.returnAdventurer], [EFFECT.refreshAllAssistants]]
    };