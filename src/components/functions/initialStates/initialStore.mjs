/* INITIAL STORE */
import {ARTIFACT_IDs, GLOBAL_VARS, ITEM_IDs} from "../../../data/idLists.mjs";
import {ASSISTANT_LEVEL, ASSISTANT_STATE, CARD_STATE, CARD_TYPE} from "../enums.mjs";
import {drawInitialCards, shuffleArray} from "../cardManipulationFuntions.mjs";
import {relicEffects} from "../../../data/relicEffects.mjs";
import {Assistants} from "../../../data/assistants.mjs";
import cloneDeep from 'lodash/cloneDeep.js';
import {Guardians} from "../../../data/guardians.mjs";
import {silverAssistantsOfferNumber} from "../constants.mjs";

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
    for (let key in Guardians) {
        guardians.push(Guardians[key]);
    }

    /* assistants */
    let assistants = [];
    for (let key in Assistants) {
        Assistants[key].state = ASSISTANT_STATE.inStore;
        Assistants[key].level = ASSISTANT_LEVEL.silver;
        assistants.push(cloneDeep(Assistants[key]))
    }

    /* relics */
    const bronzeRelicEffects = shuffleArray(relicEffects.bronze);
    const silverRelicEffects = shuffleArray(relicEffects.silver);
    const goldRelicEffects = shuffleArray(relicEffects.gold);

    let itemsSetup = drawInitialCards(items, GLOBAL_VARS.itemsInStore);
    let artifactsSetup = drawInitialCards(artifacts, GLOBAL_VARS.artifactsInStore);
    let assistantsSetup = drawInitialCards(assistants, silverAssistantsOfferNumber);

    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {
        artifactsDeck: artifactsSetup.deck,
        artifactsOffer: artifactsSetup.drawCards,
        assistantsDeck: assistantsSetup.deck,
        assistantsOffer: assistantsSetup.drawCards,
        itemsDeck: itemsSetup.deck,
        itemsOffer: itemsSetup.drawCards,
        guardians: shuffleArray(guardians),
        bronzeRelicEffects: bronzeRelicEffects,
        silverRelicEffects: silverRelicEffects,
        goldRelicEffects: goldRelicEffects,
        destroyedCards: [],
    }
}