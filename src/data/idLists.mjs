import {LOCATION_LEVEL, LOCATION_TYPE} from "../components/functions/enums.mjs";
import {ITEMS} from "./cards.mjs";


/* Generating locations assigns them new key / value: *line*: numberOfLine, in which is the location displayed */
export const LOCATION_IDs = Object.freeze({
    1: {
        id: "1",
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL.basic,
    },
    2: {
        id: "2",
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL.basic,
    },
    3: {
        id: "3",
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL.basic,
    },
    4: {
        id: "4",
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL.basic,
    },
    5: {
        id: "5",
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL.basic,
    },
    b21: {
        id: "b21",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level1,
    },
    b22: {
        id: "b22",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level1,
    },
    b23: {
        id: "b23",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level1,
    },
    b24: {
        id: "b24",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level1,
    },
    b25: {
        id: "b25",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level1,
    },
    b26: {
        id: "b26",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level1,
    },
    b31: {
        id: "b31",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level2,
    },
    b32: {
        id: "b32",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level2,
    },
    b33: {
        id: "b33",
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL.level2,
    },
    g21: {
        id: "g21",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level1,
    },
    g22: {
        id: "g22",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level1,
    },
    g23: {
        id: "g23",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level1,
    },
    g24: {
        id: "g24",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level1,
    },
    g25: {
        id: "g25",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level1,
    },
    g26: {
        id: "g26",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level1,
    },
    g31: {
        id: "g31",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level2,
    },
    g32: {
        id: "g32",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level2,
    },
    g33: {
        id: "g33",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level2,
    },
    g34: {
        id: "g34",
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL.level2,
    },
    lc1: {
        id: "lc1",
        type: LOCATION_TYPE.lostCity,
        level: LOCATION_LEVEL.level2,
    },
    emptyLocation: {
        id: "emptyLocation",
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL.level1,
    },
    emptyBrownLocation: {
        id: "emptyBrownLocation",
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL.level1,
    },
    emptyGreenLocation: {
        id: "emptyGreenLocation",
        type: LOCATION_TYPE.emptyGreenLocation,
        level: LOCATION_LEVEL.level1,
    },
});

export const INITIAL_CARDS = [{...ITEMS.coin1}, {...ITEMS.coin2}, {...ITEMS.explore1}, {...ITEMS.explore2},
    {...ITEMS.fear}, {...ITEMS.fear}];

export const GLOBAL_VARS = Object.freeze({
    handSize: 5,
    initialCards: INITIAL_CARDS,
    itemsInStore: 5,
    artifactsInStore: 1,
    adventurers: 2,
    playerColors: ["#ffcc00", "#33cc00", "#0066ff", "#cc0000", "#ffffdeab"],
    numOfLegendTokens: 2    ,
});