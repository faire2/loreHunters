import {CARD_TYPE} from "../../data/idLists";
import {ARTIFACTS, GUARDIANS, ITEMS} from "../../data/cards";
import {Legends2} from "../../data/legends";
import {getLogLegends} from "../main/logger";

export function getPoints(playerState) {
    const legends = getLogLegends();
    const allDeckCards = [...playerState.hand, ...playerState.drawDeck, ...playerState.activeCards, ...playerState.discardDeck];
    const items = allDeckCards.filter(card => card.type === CARD_TYPE.item || card.type === CARD_TYPE.basic);
    let itemPoints = 0;
    for (let card of items) {
        itemPoints += ITEMS[card.id].points;
    }

    const artifacts = allDeckCards.filter(card => card.type === CARD_TYPE.artifact);
    let artifactPoints = 0;
    for (let card of artifacts) {
        artifactPoints += ARTIFACTS[card.id].points;
    }

    const undefeatedGuardians = allDeckCards.filter(card => card.type === CARD_TYPE.guardian);
    let undefeatedGuardianPoints = 0 - undefeatedGuardians.length;

    const defeatedGuardians = playerState.destroyedCards.filter(card => card.type === CARD_TYPE.guardian);
    let defeatedGuardianPoints = 0;
    for (let card of defeatedGuardians) {
        defeatedGuardianPoints += GUARDIANS[card.id].points;
    }

    /* Legends2 */
    let legendPoints = 0;
// only second and following tokens count
    let beyond2 = -1;
    if (legends) {
        for (let i = 0; i < legends.length; i++) {
            const victoryPoints = Legends2[legends[i].id].victoryPoints;
            for (const position of legends[i].positions[playerState.playerIndex]) {
                if (position.columnIndex !== null) {
                    legendPoints += victoryPoints[position.columnIndex];
                    if (position.columnIndex > 2) {
                        beyond2 += 1;
                    }
                }
            }
        }
    }
    if (beyond2 > 0) {
        legendPoints += (5 * beyond2);
    }

    /* RELICS */
    const relics = playerState.relics;
    let relicsPoints = 0;
    for (let i = 0; i < relics.length; i++) {
        if (!relics[i]) {
            relicsPoints += Math.floor(i / 3);
        }
    }
    relicsPoints += playerState.resources.shinies * 4;
    return {itemPoints: itemPoints, artifactPoints: artifactPoints, undefeatedGuardianPoints: undefeatedGuardianPoints,
        defeatedGuardianPoints: defeatedGuardianPoints, legendPoints: legendPoints, relicsPoints: relicsPoints}
}