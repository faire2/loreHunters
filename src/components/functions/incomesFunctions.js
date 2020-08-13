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
        for (let i = 0; i < store.assistantsOffer.length; i++)
            assistantsArr.push(store.assistantsOffer[i]);
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