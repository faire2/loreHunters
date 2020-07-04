/* GLOBAL VARIABLES */

export const ACTION_TYPE = Object.freeze({
    activatesLocation: "activates a location",
    buysItem: "buys an item",
    buysArtifact: "buys an artifact",
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

export const CARD_STATE = Object.freeze({
    active: "active card",
    destroyed: "destroyed card",
    discard: "card is discarded",
    drawDeck: "card in draw deck",
    inHand: "card is in hand",
    inStore: "card is in store",
    locked: "locked card",
    victoryCards: "card is among victory cards",
});

export const CARD_TYPE = Object.freeze({
    item: "item",
    artifact: "artifact",
    basic: "basic",
    guardian: "guardian",
    goalCard: "expedition"
});

export const LOCATION_LEVEL = Object.freeze({
    1: "I",
    2: "II",
    3: "III"
});

export const LOCATION_LINE = Object.freeze({
    line1: "line1",
    line2: "line2",
    line3: "line3",
    line4: "line4"
});

export const LOCATION_TYPE = Object.freeze({
    basic: "basic location",
    undetermined: "undetermined type of location",
    green: "green location",
    brown: "brown location",
    lostCity: "lost city",
    /*emptyBrownLocation: "empty brown location",
    emptyGreenLocation: "empty green location",*/
    emptyLocation: "empty location",
});

export const LOCATION_STATE = Object.freeze({
    unexplored: "unexplored",
    explored: "explored",
    guarded: "guarded",
});

export const INCOME_LEVEL = Object.freeze({
    silver: "silver level",
    gold: "gold level",
});

export const INCOME_STATE = Object.freeze({
    inStore: "in store",
    ready: "ready",
    spent: "spent"
});

export const INCOME_SIZE = Object.freeze({
    small: "small",
    large: "large"
});

export const LCL_STORAGE = Object.freeze({
    roomName: "game room name",
    playerIndex: "player index",
});

export const REWARD_TYPE = Object.freeze({
    addAssistant: "income token",
    card: "card",
    effectsArr: "array of effects",
    legendFieldEffects: "combined effects of a legend field",
    location: "location",
    removeAssistant: "remove an assistant",
});
export const TRANSMISSIONS = Object.freeze({
    createGame: "set up a new game",
    currentUsersAndData: "users currently logged in",
    deleteRoom: "delete game room",
    finishedRound: "finishedRound",
    gameStates: "game states",
    handShake: "handshake",
    joinGame: "join game",
    newGame: "start a new game",
    nextPlayer: "nextPlayer",
    sendGameStates: "gameStates",
    sendScoringStates: "send all states",
    sendStage: "send stage in the pipeline",
    scoringStates: "emitting all states",
    stage: "stage of the app",
    stateUpdate: "stateUpdate",
    resetTurn: "reset turn - send back data from beginning of the turn",
    revert: "revert turn - send back data from previous beginning of turn",
    roomCreated: "room has been successfully created and player joined it",
    roomIsFull: "join request denied, room is already full",
    roomList: "list of all active rooms",
    roomNameAlreadyExists: "room name already exists and cannot be used",
    startGame: "open gameboard",
    testData: "testData",
    usernameChanged: "usernameChanged",
});

export const BUTTON_STATE = Object.freeze({
    active: "activated button",
    normal: "basic button state",
    inactive: "button cannot be activated"
}) ;