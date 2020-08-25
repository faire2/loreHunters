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
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
        },
    2: {
        id: "2",
        effects: [EFFECT.gainText, EFFECT.gainText],
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    3: {
        id: "3",
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    4: {
        id: "4",
        effects: [EFFECT.gainWeapon],
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    5: {
        id: "5",
        effects: [EFFECT.discard, EFFECT.gainJewel],
        type: LOCATION_TYPE.basic,
        level: LOCATION_LEVEL["1"],
    },
    l11: {
        id: "l11",
        effects: [EFFECT.gainItemOrExplores],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l12: {
        id: "l12",
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l13: {
        id: "l13",
        effects: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.draw1],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l14: {
        id: "l14",
        effects: [EFFECT.gainExplore, EFFECT.gainWeapon],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l15: {
        id: "l15",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainCoin],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l16: {
        id: "l16",
        effects: [EFFECT.gainText, EFFECT.gainWeapon],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l17: {
        id: "l17",
        effects: [EFFECT.gainWeapon, EFFECT.draw1],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l18: {
        id: "l18",
        effects: [EFFECT.gainText, EFFECT.gainJewel, EFFECT.gainFear],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l19: {
        id: "l19",
        effects: [EFFECT.gainExplore, EFFECT.gainJewel, EFFECT.gainFear],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level1,
    },
    l201: {
        id: "l201",
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainJewel],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level2,
    },
    l202: {
        id: "l202",
        effects: [EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.gainText, EFFECT.gainWeapon],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level2,
    },
    l203: {
        id: "l203",
        effects: [EFFECT.gainWeapon, EFFECT.gainJewel],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level2,
    },
    l204: {
        id: "l204",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainJewel],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level2,
    },
    l205: {
        id: "l205",
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon, EFFECT.gainWeapon, EFFECT.gainFear],
        type: LOCATION_TYPE.undetermined,
        level: LOCATION_LEVEL.level2,
    },
    emptyLocation: {
        id: "emptyLocation",
        effects: [],
        type: LOCATION_TYPE.emptyLocation,
        level: LOCATION_LEVEL.level1,
    },
    emptyBrownLocation2: {
        id: "emptyBrownLocation",
        effects: [],
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL.level1,
    },
    emptyBrownLocation3: {
        id: "emptyBrownLocation",
        effects: [],
        type: LOCATION_TYPE.emptyBrownLocation,
        level: LOCATION_LEVEL.level2,
    },
    emptyGreenLocation2: {
        id: "emptyGreenLocation",
        effects: [],
        type: LOCATION_TYPE.emptyGreenLocation,
        level: LOCATION_LEVEL.level1,
    },
    emptyGreenLocation3: {
        id: "emptyGreenLocation",
        effects: [],
        type: LOCATION_TYPE.emptyGreenLocation,
        level: LOCATION_LEVEL.level2,
    },
});
