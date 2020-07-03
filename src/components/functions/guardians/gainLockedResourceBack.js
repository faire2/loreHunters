import {EFFECT} from "../../../data/effects";

export function gainLockedResourceBack(lockEffects, effects) {
    for (let effect of lockEffects) {
        switch (effect) {
            case EFFECT.lockAdventurer:
                effects.push(EFFECT.gainAdventurerForThisRound);
                break;
            case EFFECT.lockCard:
                effects.push(EFFECT.unlockCard);
                break;
            case EFFECT.lockCoin:
                effects.push(EFFECT.gainCoin);
                break;
            case EFFECT.lockExplore:
                effects.push(EFFECT.gainExplore);
                break;
            case EFFECT.lockText:
                effects.push(EFFECT.gainText);
                break;
            case EFFECT.lockWeapon:
                effects.push(EFFECT.gainWeapon);
                break;
            case EFFECT.lockJewel:
                effects.push(EFFECT.gainJewel);
                break;
            default:
                console.log("Unable to process lockEffect in gainLockedResourceBack: " + lockEffects);
        }
    }
    return effects;
}