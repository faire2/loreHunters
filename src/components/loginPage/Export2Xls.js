import React from "react";
import Button from "react-bootstrap/Button";
import ExcelFile from "react-data-export/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-data-export/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-data-export/dist/ExcelPlugin/elements/ExcelColumn";

export function Export2Xls(props) {
    const origLog = props.gameLog;
    const playerNames = props.playerNames;
    let exportLog = [];

    // storing the last points state for each player
    let endPoints = [];

    for (let logEntry of origLog) {
        const playerState = logEntry.playerState;
        const resources = playerState.resources;

        let cost = null;
        if (!logEntry.cost) {
            cost = ""
        } else if (Array.isArray(logEntry.cost)) {
            cost = logEntry.cost.toString();
        } else {
            JSON.stringify(logEntry.cost);
        }

        let elementId = null;
        if (logEntry.id) {
            elementId = typeof logEntry.id === "string" ? logEntry.id : JSON.stringify(logEntry.id);
        }

        let hand = getStringifiedArray(playerState.hand);
        let discard = getStringifiedArray(playerState.discardDeck);
        let destroyedCards = getStringifiedArray(playerState.destroyedCards);
        let victoryCards = getStringifiedArray(playerState.victoryCards);
        let incomes = getStringifiedArray(playerState.incomes);
        let activeCards = getStringifiedArray(playerState.activeCards);
        let activeEffects = playerState.activeEffects.toString();
        let points = logEntry.points;

        let exportEntry = {
            playerIndex: playerState.playerIndex != null ? playerState.playerIndex : "",
            actionType: logEntry.actionType != null ? logEntry.actionType : "",
            elementId: elementId,
            cost: cost,
            coins: resources.coins != null ? resources.coins : "",
            explore: resources.explore != null ? resources.explore : "",
            texts: resources.texts != null ? resources.texts : "",
            weapons: resources.weapons != null ? resources.weapons : "",
            jewels: resources.jewels != null ? resources.jewels : "",
            shinies: resources.shinies != null ? resources.shinies : "",
            walk: resources.walk != null ? resources.walk : "",
            jeep: resources.jeep != null ? resources.jeep : "",
            ship: resources.ship != null ? resources.ship : "",
            plane: resources.plane != null ? resources.plane : "",
            hand: hand,
            discard: discard,
            destroyedCards: destroyedCards,
            victoryCards: victoryCards,
            incomes: incomes,
            activeCards: activeCards,
            activeEffects: activeEffects,
            itemPoints: points.itemPoints,
            artifactPoints: points.artifactPoints,
            undefeatedGuardianPoints: points.undefeatedGuardianPoints,
            defeatedGuardianPoints: points.defeatedGuardianPoints,
            legendPoints: points.legendPoints,
            relicsPoints: points.relicsPoints,
            totalPoints: points.itemPoints + points.artifactPoints + points.undefeatedGuardianPoints + points.defeatedGuardianPoints
                + points.legendPoints + points.relicsPoints,
        };
        endPoints.splice(exportEntry.playerIndex, 1, exportEntry.totalPoints);
        exportLog.push(exportEntry);
    }
    console.log("Exporting game log:");
    console.log(exportLog);

    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getFullYear().toString().concat("-", today.getDate().toString(), "-", month.toString());
    const numOfPlayers = playerNames.length;
    const players = playerNames.join("-");
    const endPointsString = endPoints.join("-");
    const filename = date.concat("_", numOfPlayers, "players_Scores", endPointsString, "_players", players);

    return (
        <ExcelFile element={<Button variant={"secondary"} size={"sm"}>Export log</Button>} filename={filename}>
            <ExcelSheet data={exportLog} name={"game log"}>
                <ExcelColumn label="P" value="playerIndex"/>
                <ExcelColumn label="action type" value="actionType"/>
                <ExcelColumn label="ID" value="elementId"/>
                <ExcelColumn label="gain" value="cost"/>
                <ExcelColumn label="C" value="coins"/>
                <ExcelColumn label="E" value="explore"/>
                <ExcelColumn label="T" value="texts"/>
                <ExcelColumn label="W" value="weapons"/>
                <ExcelColumn label="J" value="jewels"/>
                <ExcelColumn label="R" value="shinies"/>
                <ExcelColumn label="walk" value="walk"/>
                <ExcelColumn label="jeep" value="jeep"/>
                <ExcelColumn label="ship" value="ship"/>
                <ExcelColumn label="blimp" value="plane"/>
                <ExcelColumn label="hand" value="hand"/>
                <ExcelColumn label="activeCards" value="activeCards"/>
                <ExcelColumn label="discard" value="discard"/>
                <ExcelColumn label="victoryCards" value="victoryCards"/>
                <ExcelColumn label="incomes" value="incomes"/>
                <ExcelColumn label="activeEffects" value="activeEffects"/>
                <ExcelColumn label="destroyedCards" value="destroyedCards"/>
                <ExcelColumn label="itemPoints" value="itemPoints"/>
                <ExcelColumn label="artifactPoints" value="artifactPoints"/>
                <ExcelColumn label="undefeatedGuardianPoints" value="undefeatedGuardianPoints"/>
                <ExcelColumn label="defeatedGuardianPoints" value="defeatedGuardianPoints"/>
                <ExcelColumn label="legendPoints" value="legendPoints"/>
                <ExcelColumn label="relicsPoints" value="relicsPoints"/>
            </ExcelSheet>
        </ExcelFile>
    )
}

function getStringifiedArray(cards) {
    let cardsArr = [];
    for (let card of cards) {
        cardsArr.push(card.id);
    }
    return cardsArr.toString()
}