import {getPoints} from "../scoring/scoringFunctions";

export var gameLog = [];

export function addLogEntry(playerState, actionType, id, cost) {
    if (!playerState || !actionType) {
        console.log("Cannot process log entry - player state: " + playerState + ", entry type: " + actionType);
    } else {
        gameLog.push({playerState: playerState, actionType: actionType, id: id, cost: cost, points: getPoints(playerState)});
        console.log("logged action");
        console.log(gameLog);
    }
}

export function setGameLog(serverLog) {
    if (serverLog) {
        gameLog = serverLog;
    } else {
        console.log("Unable to set initial log in setInitialLog: " + serverLog);
    }
}

let legendsForLog = null;
export function setLegendsForLog(legends) {
    legendsForLog = legends;
}
export function getLegendsForLog(){
    return legendsForLog;
}
