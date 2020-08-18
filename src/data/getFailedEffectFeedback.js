import {EFFECT} from "./effects";

export function getFailedEffectFeedback(effect) {
    switch (effect) {
        case EFFECT.loseAdventurer:
            return "No free adventurer!";
        case EFFECT.loseCoin:
            return "Not enough coins!";
        case EFFECT.loseExplore:
            return "Not enough explore!";
        case EFFECT.loseText:
            return "Not enough texts!";
        case EFFECT.loseWeapon:
            return "Not enough weapons!";
        case EFFECT.loseJewel:
            return "Not enough jewels!";
        case EFFECT.loseWalk:
            return "Not enough boots!";
        case EFFECT.loseJeep:
            return "Not enough jeeps!";
        case EFFECT.loseShip:
            return "Not enough ships!";
        case EFFECT.losePlane:
            return "Not enough planes!";
        default: return "Could not process effect: " + effect
    }
}