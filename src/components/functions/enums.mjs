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
    played: "card is has been played",
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
    basic: "basic location",
    level1: "level 1 location",
    level2: "level 2 location"
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
    emptyBrownLocation: "empty brown location",
    emptyGreenLocation: "empty green location",
    emptyLocation: "empty location",
});

export const LOCATION_STATE = Object.freeze({
    unexplored: "unexplored",
    explored: "explored",
    guarded: "guarded",
});

export const LOCATION_SLOTS = Object.freeze({
    single: "single adventurer slot",
    double: "double adventurer slot",
    both: "both adventurers slots",
});

export const ASSISTANT_LEVEL = Object.freeze({
    silver: "silver level",
    gold: "gold level",
});

export const ASSISTANT_TILE_SIZE = Object.freeze({
    small: "small",
    large: "large"
});

export const ASSISTANT_STATE = Object.freeze({
    inStore: "in store",
    ready: "ready",
    spent: "spent"
});

export const LCL_STORAGE = Object.freeze({
    roomName: "game room name",
    playerIndex: "player index",
});

export const REWARD_TYPE = Object.freeze({
    upgradeAssistant: "assistant choice or upgrade",
    card: "card",
    chooseDestroyedCard: "choose a destroyed card",
    drawCard: "draw one, discard rest",
    drawStackDiscardCard: "draw 1, stack 1, discard the last",
    effectsArr: "array of effects",
    exchangeAssistant: "exchange an assistant",
    gainAssistant: "assistant choice",
    gainAssistantFromLegend: "assistant from legend choice",
    guardian: "price for guardian",
    legendFieldEffects: "combined effects of a legend field",
    legendColumnEffects: "first token effects of legend columns",
    location: "location",
    refreshAssistant: "refresh an assistant",
    relicWithEffects: "relic with effects",
    removeAssistant: "remove an assistant",
    stackCardToDrawDeck: "choose which card goes to draw deck",
    upgradeRelic: "relic upgrade",
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
});

export const STYLE = Object.freeze({
    row: {
        display: "flex",
        flexFlow: "row"
    }
});

export const RELIC = Object.freeze({
    bronze: "bronze relic",
    bronzeDouble: "two bronze relics",
    silver: "silver relic",
    gold: "golden relic",
});

export const ASSISTANT = Object.freeze({
    silver: "silver assistant",
    gold: "gold assistant",
    upgrade: "upgrade of an assistant",
});

export const AUTOMATON = Object.freeze({
    adventurerCoin: "automaton places an adventurer in a coin location",
    adventurerExplore: "automaton places an adventurer in an explore location",
    adventurerText: "automaton places an adventurer in a text location",
    adventurerWeapon: "automaton places an adventurer in a weapon location",
    adventurerJewel: "automaton places an adventurer in a jewel location",
    exploresLocation: "automaton explores location from left and top",
    exilesOuterCards: "automaton exiles outer cards",
    exilesInnerCards: "automaton exiles inner cards",
    takesLegendBonus: "takes legend bonus"
});

export const DIRECTION = Object.freeze({
   left: "direction - left",
   right: "direction - right"
});