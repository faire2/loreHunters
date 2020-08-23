import {getPoints} from "../scoring/scoringFunctions.mjs";
import {getInitialLegend} from "../functions/initialStates/initialLegends.mjs";

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

let logLegend = getInitialLegend(4, "legend1");

export function setLogLegend(legend){
    if (legend) {
        logLegend = legend;
        console.log("Log legend set:");
        console.log(legend);
    } else {
        console.warn("Legend could not be set: " + legend);
    }
}

export function getLogLegend(){
    return logLegend;
}