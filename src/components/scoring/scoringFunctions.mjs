import {ITEM_IDs} from "../../data/idLists";
import {ARTIFACTS, ITEMS} from "../../data/cards";
import {getLogLegends} from "../main/logger";
import {CARD_TYPE} from "../functions/enums";
import {selectedLegendIndex} from "../functions/initialStates/initialLegends";

export function getPoints(playerState) {
    const legends = getLogLegends();
    const playerIndex = playerState.playerIndex;
    const allDeckCards = [...playerState.hand, ...playerState.drawDeck, ...playerState.activeCards];
    const items = allDeckCards.filter(card => (card.type === CARD_TYPE.item || card.type === CARD_TYPE.basic)
        && card.id !== ITEM_IDs.fear.id);

    /* ITEM POINTS */
    let itemPoints = 0;
    for (let card of items) {
        itemPoints += ITEMS[card.id].points;
    }

    /* ARTIFACTS */
    const artifacts = allDeckCards.filter(card => card.type === CARD_TYPE.artifact);
    let artifactPoints = 0;
    for (let card of artifacts) {
        artifactPoints += ARTIFACTS[card.id].points;
    }

    /* FEARS */
    const fears = allDeckCards.filter(card => card.id === ITEM_IDs.fear.id);
    let fearPoints = 0;
    for (let card of fears) {
        fearPoints += ITEMS[card.id].points;
    }

    /* DEFEATED GUARDIANS */
    const defeatedGuardians = playerState.defeatedGuardians.length;
    let defeatedGuardianPoints = 0;
    defeatedGuardianPoints += defeatedGuardians * 5;

    /* LEGEND */
    let legendPoints = 0;
    const legend = legends[selectedLegendIndex];
    const victoryPoints = legend.victoryPoints;
    // points for columns any of tokens reached
    for (const position of legend.positions[playerIndex]) {
        if (position.columnIndex !== null) {
            legendPoints += victoryPoints[position.columnIndex];
        }
    }
    // points for position in the lost city
    const lostCityPlayerPositions = legend.lostCityPlayers;
    for (let i = 0; i < lostCityPlayerPositions.length; i++) {
        if (playerState.playerIndex === i) {
            legendPoints += legend.lostCityPoints[i];
        }
    }

    /* RELICS */
    let relicsPoints = 0;
    relicsPoints += playerState.resources.bronzeRelics * 3;
    relicsPoints += playerState.resources.silverRelics * 6;
    relicsPoints += playerState.resources.goldRelics * 9;

    // negative points for used relics
    let usedRelics = 0;
    for (const relic of playerState.relics) {
        if (!relic) {
            usedRelics += 1;
        }
    }
    if (usedRelics > 0) {
        const negativeRelicPoints = [1, 1, 2, 3, 4];
        relicsPoints -= negativeRelicPoints[usedRelics - 1]
    }

    const totalPoints = itemPoints + artifactPoints + fearPoints /*+ undefeatedGuardianPoints */ + defeatedGuardianPoints +
        legendPoints + relicsPoints;

    return {
        items: items,
        itemPoints: itemPoints,
        artifacts: artifacts,
        artifactPoints: artifactPoints,
        fears: fears,
        fearPoints: fearPoints,
        defeatedGuardians: defeatedGuardians,
        defeatedGuardianPoints: defeatedGuardianPoints,
        legendPoints: legendPoints,
        relicsPoints: relicsPoints,
        totalPoints: totalPoints
    }
}