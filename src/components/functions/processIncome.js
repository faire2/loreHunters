import {EFFECT} from "../../data/effects";
import {INCOME_STATE} from "./enums";
import {processEffects} from "./processEffects";

export function processIncomeTile(effects, incomeId, playerState) {
    for (let effect of effects) {
        switch (effect) {
            // this effects are handled automatically in end of round
            case EFFECT.gainAdventurerForThisRound:
            case EFFECT.gainCoin:
            case EFFECT.gainExplore:
            case EFFECT.gainText:
            case EFFECT.gainWeapon:
                break;
            case EFFECT.draw1:
            case EFFECT.buyWithDiscount1:
            case EFFECT.gainBlimp:
            case EFFECT.uptrade:
                const effectsResult = processEffects(null, null, playerState, [effect], null,
                    null, null, null, null);
                playerState = effectsResult.tPlayerState;

                break;
            default:
                console.log("Unable to process effect in handleClickOnIncomeTile: ");
                console.log(effects);
        }
    }
    for (let income of playerState.incomes) {
        if (income.id === incomeId) {
            income.state = INCOME_STATE.spent;
            break;
        }
    }
    return playerState
}