export function Logger() {
    // action - cost - endresult
}

export var Gamelog = [

];

export const ACTION_TYPE = Object.freeze({
    activatesLocation: "activates a location",
    buysCard: "buys a card",
    finishesRound: "finishes round",
    endOfTurn: "ends turn",
    exploresLocation: "explores location",
    guardianComes: "guardian encountered",
    placesRelic: "places a relic",
    playsCard: "plays a card",
    playsCardWithoutAction: "plays a card without spending action",
    researches: "researches a legend",
    usesAssistant: "uses assistant / income",
    usesBonusAction: "uses a bonus action",

});

export function addLogEntry(playerState, actionType, id, cost) {
    if (!playerState || !actionType) {
        debugger
        console.log("Cannot process log entry - player state: " + playerState + ", entry type: " + actionType);
    } else {
        Gamelog.push({playerState: playerState, actionType: actionType, id: id, cost: cost});
        console.log("logged action");
        console.log(Gamelog);
    }
}