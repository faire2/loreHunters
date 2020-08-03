import {ASSISTANT, ASSISTANT_LEVEL} from "./enums";

function hasSilverIncome(tPlayerState) {
    for (const income of tPlayerState.assistants) {
        if (income.level === ASSISTANT_LEVEL.silver) {
            return true;
        }
    }
    return false;
}

export function getAssistantsChoice(playerState, store, choiceType) {
    let assistantsArr = [];
    // for silver assistants check that store has them
    if (choiceType === ASSISTANT.silver) {
            if (store.assistantsOffer.length > 0) {
                assistantsArr.push(store.assistantsOffer[0]);
            }
        if (store.assistantsOffer.length > 1) {
            assistantsArr.push(store.assistantsOffer[1]);
        }
    }
    // gold assistants can only be gained as upgrade of silver ones
    if (choiceType === ASSISTANT.upgrade && hasSilverIncome(playerState)) {
        for (let assistant of playerState.assistants) {
            if (assistant.level === ASSISTANT_LEVEL.silver) {
                assistantsArr.push(assistant);
            }
        }
    }
    return assistantsArr;
}