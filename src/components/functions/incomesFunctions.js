import {ASSISTANT, INCOME_LEVEL} from "./enums";

function hasSilverIncome(tPlayerState) {
    for (const income of tPlayerState.incomes) {
        if (income.level === INCOME_LEVEL.silver) {
            return true;
        }
    }
    return false;
}

export function getAssistantsChoice(playerState, store, choiceType) {
    let incomesArr = [];
    if (choiceType === ASSISTANT.silver || choiceType === ASSISTANT.upgrade) {
        store.assistantSilverOffer[0] && incomesArr.push(store.assistantSilverOffer[0]);
        store.assistantSilverOffer[1] && incomesArr.push(store.assistantSilverOffer[1]);
    }
    if (choiceType === ASSISTANT.gold || (choiceType === ASSISTANT.upgrade && hasSilverIncome(playerState))) {
        store.assistantGoldOffer[0] && incomesArr.push(store.assistantGoldOffer[0]);
        store.assistantGoldOffer[0] && incomesArr.push(store.assistantGoldOffer[1]);
    }
    return incomesArr;
}