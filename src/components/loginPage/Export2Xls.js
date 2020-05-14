import React from "react";
import ExcelFile from "react-export-excel/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-export-excel/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-export-excel/dist/ExcelPlugin/elements/ExcelColumn";
import Button from "react-bootstrap/Button";
import {nextPlayer} from "../../server/serverFunctions";

export function Export2Xls(props) {
    const origLog = props.gameLog;
    let exportLog = [];

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
        let activeEffects = getStringifiedArray(playerState.activeEffects);


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
        };
        exportLog.push(exportEntry);
    }
    console.log("Exporting game log:");
    console.log(exportLog);

    return (
        <ExcelFile element={<Button variant={"secondary"} size={"sm"}>Export log</Button>}>
            <ExcelSheet data={exportLog} name={"game log"}>
                <ExcelColumn label="player index" value="playerIndex"/>
                <ExcelColumn label="action type" value="actionType"/>
                <ExcelColumn label="ID" value="elementId"/>
                <ExcelColumn label="cost" value="cost"/>
                <ExcelColumn label="coins" value="coins"/>
                <ExcelColumn label="explore" value="explore"/>
                <ExcelColumn label="texts" value="texts"/>
                <ExcelColumn label="weapons" value="weapons"/>
                <ExcelColumn label="jewels" value="jewels"/>
                <ExcelColumn label="shinies" value="shinies"/>
                <ExcelColumn label="walk" value="walk"/>
                <ExcelColumn label="jeep" value="jeep"/>
                <ExcelColumn label="ship" value="ship"/>
                <ExcelColumn label="plane" value="plane"/>
                <ExcelColumn label="hand" value="hand"/>
                <ExcelColumn label="destroyedCards" value="destroyedCards"/>
                <ExcelColumn label="victoryCards" value="victoryCards"/>
                <ExcelColumn label="incomes" value="incomes"/>
                <ExcelColumn label="activeCards" value="activeCards"/>
                <ExcelColumn label="activeEffects" value="activeEffects"/>
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