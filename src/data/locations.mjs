import {EFFECT} from "./effects.mjs";
import {LOCATION_LEVEL, LOCATION_TYPE} from "../components/functions/enums.mjs";

export const TRANSPORT_TYPE = Object.freeze({
    walk: "walk",
    jeep: "jeep",
    ship: "ship",
    plane: "blimp"
});

const rowStyle = {
  display: "flex",
  flexFlow: "row"
};

export const Locations = Object.freeze({
    1: {
    id: "1",
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1},
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
        },
    2: {
        id: "2",
        effects: [EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1},
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    3: {
        id: "3",
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1},
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    4: {
        id: "4",
        effects: [EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1},
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    5: {
        id: "5",
        effects: [EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 2},
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    b21: {
        id: "b21",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["2"],
    },
    b22: {
        id: "b22",
        effects: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["2"],
    },
    b23: {
        id: "b23",
        effects: [EFFECT.gainWeapon, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["2"],
    },
    b24: {
        id: "b24",
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["2"],
    },
    b25: {
        id: "b25",
        effects: [EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["2"],
    },
    b26: {
        id: "b26",
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["2"],
    },
    b31: {
        id: "b31",
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["3"],
    },
    b32: {
        id: "b32",
        effects: [EFFECT.gainWeapon, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["3"],
    },
    b33: {
        id: "b33",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["3"],
    },
    b34: {
        id: "b34",
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2},
        type: LOCATION_TYPE.brown,
        level: LOCATION_LEVEL["3"],
    },
    g21: {
        id: "g21",
        effects: [EFFECT.gainItem],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["2"],
    },
    g22: {
        id: "g22",
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["2"],
    },
    g23: {
        id: "g23",
        effects: [EFFECT.gainWeapon, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["2"],
    },
    g24: {
        id: "g24",
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["2"],
    },
    g25: {
        id: "g25",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["2"],
    },
    g26: {
        id: "g26",
        effects: [EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["2"],
    },
    g31: {
        id: "g31",
        effects: [EFFECT.gainText, EFFECT.gainJewel, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["3"],
    },
    g32: {
        id: "g32",
        effects: [EFFECT.defeatGuardian],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["3"],
    },
    g33: {
        id: "g33",
        effects: [EFFECT.gainExplore, EFFECT.gainCoin, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["3"],
    },
    g34: {
        id: "g34",
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2},
        type: LOCATION_TYPE.green,
        level: LOCATION_LEVEL["3"],
    },
    lc1: {
        id: "lc1",
        effects: [EFFECT.gainRelic],
        useCost: {transportType: TRANSPORT_TYPE.plane, amount: 1},
        type: LOCATION_TYPE.lostCity,
        level: LOCATION_LEVEL["3"],
    },
    emptyLocation: {
        id: "emptyLocation",
        effects: [],
        useCost: null,
        type: LOCATION_TYPE.emptyLocation,
        level: LOCATION_LEVEL["2"],
    },
    emptyBrownLocation: {
        id: "emptyBrownLocation",
        effects: [],
        useCost: null,
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL["2"],
    },
    emptyGreenLocation: {
        id: "emptyGreenLocation",
        effects: [],
        useCost: null,
        type: LOCATION_TYPE.emptyGreenLocation,
        level: LOCATION_LEVEL["2"],
    },
});



