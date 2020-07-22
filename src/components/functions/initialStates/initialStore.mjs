/* INITIAL STORE */
import {
    ARTIFACT_IDs,
    EXPEDITIONS_IDs,
    GLOBAL_VARS,
    GUARDIAN_IDs,
    INCOME_IDs,
    ITEM_IDs
} from "../../../data/idLists.mjs";
import {ASSISTANT_LEVEL, ASSISTANT_STATE, CARD_STATE, CARD_TYPE} from "../enums.mjs";
import {drawInitialCards, shuffleArray} from "../cardManipulationFuntions.mjs";

export function getInitialStore() {
    /* all items, each item is represented only once! */
    let items = shuffleArray(Object.keys(ITEM_IDs).map(key => {
        return ITEM_IDs[key];
    }));
    items = items.filter(card => card.type !== CARD_TYPE.basic);

    /* artifacts */
    let artifacts = shuffleArray(Object.keys(ARTIFACT_IDs).map(key => {
        ARTIFACT_IDs[key].state = CARD_STATE.inStore;
        return ARTIFACT_IDs[key];
    }));

    /* guardians */
    let guardians = [];
    for (let key in GUARDIAN_IDs) {
        guardians.push(GUARDIAN_IDs[key]);
    }

    /* expedition cards */
    let expeditions = [];
    for (let key in EXPEDITIONS_IDs) {
        EXPEDITIONS_IDs[key].state = CARD_STATE.victoryCards;
        expeditions.push(EXPEDITIONS_IDs[key]);
    }

    /* incomes */
    let incomes1 = [];
    let incomes2 = [];
    for (let key in INCOME_IDs) {
        INCOME_IDs[key].state = ASSISTANT_STATE.inStore;
        if (INCOME_IDs[key].level === ASSISTANT_LEVEL.silver) {
            incomes1.push(INCOME_IDs[key]);
        } else {
            incomes2.push(INCOME_IDs[key]);
        }
    }

    let itemsSetup = drawInitialCards(items, GLOBAL_VARS.itemsInStore);
    let artifactsSetup = drawInitialCards(artifacts, GLOBAL_VARS.artifactsInStore);
    let incomes1Setup = drawInitialCards(incomes1, 2);
    let incomes2Setup = drawInitialCards(incomes2, 2)

    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {
        artifactsDeck: artifactsSetup.deck,
        artifactsOffer: artifactsSetup.drawCards,
        assistantSilverDeck: incomes1Setup.deck,
        assistantSilverOffer: incomes1Setup.drawCards,
        assistantGoldDeck: incomes2Setup.deck,
        assistantGoldOffer: incomes2Setup.drawCards,
        itemsDeck: itemsSetup.deck,
        itemsOffer: itemsSetup.drawCards,
        expeditions: shuffleArray(expeditions),
        guardians: shuffleArray(guardians),
    }
}