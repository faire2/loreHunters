import {EFFECT} from "./effects.mjs";
import {LOCATION_LEVEL, LOCATION_TYPE} from "../components/functions/enums.mjs";

export const TRANSPORT_TYPE = Object.freeze({
    walk: "walk",
    jeep: "jeep",
    ship: "ship",
    plane: "blimp"
});

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
        effects: [EFFECT.discard, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 2},
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    l11: {
        id: "l11",
        effects: [EFFECT.gainItemOrExplores],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l12: {
        id: "l12",
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l13: {
        id: "l13",
        effects: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.draw1],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l14: {
        id: "l14",
        effects: [EFFECT.gainExplore, EFFECT.gainWeapon],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l15: {
        id: "l15",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainCoin],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l16: {
        id: "l16",
        effects: [EFFECT.gainText, EFFECT.gainWeapon],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l17: {
        id: "l17",
        effects: [EFFECT.gainWeapon, EFFECT.draw1],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l18: {
        id: "l18",
        effects: [EFFECT.gainText, EFFECT.gainJewel, EFFECT.gainFear],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l19: {
        id: "l19",
        effects: [EFFECT.gainExplore, EFFECT.gainJewel, EFFECT.gainFear],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["2"],
    },
    l201: {
        id: "l201",
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainJewel],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["3"],
    },
    l202: {
        id: "l202",
        effects: [EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.gainText, EFFECT.gainWeapon],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["3"],
    },
    l203: {
        id: "l203",
        effects: [EFFECT.gainWeapon, EFFECT.gainJewel],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["3"],
    },
    l204: {
        id: "l204",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainJewel],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["3"],
    },
    l205: {
        id: "l205",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon, EFFECT.gainWeapon, EFFECT.gainFear],
        //useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1},
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL["3"],
    },
    lc1: {
        id: "lc1",
        effects: [EFFECT.gainRelic],
        ///useCost: {transportType: TRANSPORT_TYPE.plane, amount: 1},
        ///type: LOCATION_TYPE.lostCity,
        level: LOCATION_LEVEL["3"],
    },
    emptyLocation: {
        id: "emptyLocation",
        effects: [],
        ///useCost: null,
        type: LOCATION_TYPE.emptyLocation,
        level: LOCATION_LEVEL["2"],
    },
    emptyBrownLocation2: {
        id: "emptyBrownLocation",
        effects: [],
        ///useCost: null,
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL["2"],
    },
    emptyBrownLocation3: {
        id: "emptyBrownLocation",
        effects: [],
        ///useCost: null,
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL["3"],
    },
    emptyGreenLocation2: {
        id: "emptyGreenLocation",
        effects: [],
        ///useCost: null,
        type: LOCATION_TYPE.emptyGreenLocation,
        level: LOCATION_LEVEL["2"],
    },
    emptyGreenLocation3: {
        id: "emptyGreenLocation",
        effects: [],
        ///useCost: null,
        type: LOCATION_TYPE.emptyGreenLocation,
        level: LOCATION_LEVEL["3"],
    },
});
