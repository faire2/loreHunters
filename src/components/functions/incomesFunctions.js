import {INCOME_LEVEL} from "./enums";

function hasSilverIncome(tPlayerState) {
    for (const income of tPlayerState.incomes) {
        if (income.level === INCOME_LEVEL.silver) {
            return true;
        }
    }
    return false;
}

export function getAssistantsChoice(playerState, store, onlySilver) {
    let incomesArr = [];
    incomesArr.push(store.incomes1Offer[0]);
    incomesArr.push(store.incomes1Offer[1]);
    if (!onlySilver && hasSilverIncome(playerState)){
        incomesArr.push(store.incomes2Offer[0]);
        incomesArr.push(store.incomes2Offer[1]);
    }
    return incomesArr;
}