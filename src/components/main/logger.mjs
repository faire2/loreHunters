export function Logger() {
    // action - cost - endresult
}

export var Gamelog = [

];

export function addLogEntry(playerState, actionType, id, cost) {
    if (!playerState || !actionType) {
        console.log("Cannot process log entry - player state: " + playerState + ", entry type: " + actionType);
    } else {
        Gamelog.push({playerState: playerState, actionType: actionType, id: id, cost: cost});
        console.log("logged action");
        console.log(Gamelog);
    }
}