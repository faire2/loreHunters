import {ARTIFACTS, ITEMS} from "../../data/cards";
import {ARTIFACT_IDs, ITEM_IDs} from "../../data/idLists";

export function getIdCard(cardId) {
    if (Object.keys(ITEMS).includes(cardId)) {
        return ITEM_IDs[cardId];
    } else if (Object.keys(ARTIFACTS).includes(cardId)) {
        return ARTIFACT_IDs[cardId];
    } else {
        console.error("Unable to find card in getIdCard: " + cardId);
    }
}