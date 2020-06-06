import {getPoints} from "../scoring/scoringFunctions.mjs";
import {getInitialLegends} from "../functions/initialStates/initialLegends";

export var gameLog = [];

export function addLogEntry(playerState, actionType, id, cost) {
    if (!playerState || !actionType) {
        console.log("Cannot process log entry - player state: " + playerState + ", entry type: " + actionType);
    } else {
        gameLog.push({playerState: playerState, actionType: actionType, id: id, cost: cost, points: getPoints(playerState)});
        console.log("logged action:" + actionType);
        console.log(gameLog);
    }
}

export function setGameLog(serverLog){
    if (serverLog) {
        gameLog = serverLog;
    } else {
        console.log("Unable to set initial log in setInitialLog: " + serverLog);
    }
}

let logLegends = getInitialLegends(4);

export function setLogLegends(legends){
    if (legends) {
        logLegends = legends;
        console.log("Log legends set:");
        console.log(legends);
    } else {
        console.warn("Legends could not be set: " + legends);
    }
}

export function getLogLegends(){
    return logLegends;
}