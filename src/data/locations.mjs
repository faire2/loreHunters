import React from "react";

import {EFFECT} from "./effects.mjs";

export const TRANSPORT_TYPE = Object.freeze({
    walk: "<Walk />",
    jeep: "<Jeep />",
    ship: "<Ship />",
    plane: "<Plane />"
});

export const LOCATION_LEVEL = Object.freeze({
    1: "I",
    2: "II",
    3: "III"
});

export const LOCATION_TYPE = Object.freeze({
    green: "green tLocation that requires boats",
    brown: "brown tLocation that requires jeeps",
    mixed: "brown and green tLocation - unique"
});

export const LOCATIONS =
        [
            {
                id: "b1",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["1"],
                exploreCost: {explore: 0, coins: 0},
                effects: [EFFECT.gainCoin, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                id: "b2",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["1"],
                exploreCost: {explore: 0, coins: 0},
                effects: [EFFECT.gainText, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                id: "b3",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["1"],
                exploreCost: {explore: 0, coins: 0},
                effects: [EFFECT.gainExplore, EFFECT.gainExplore],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                id: "b4",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["1"],
                exploreCost: {explore: 0, coins: 0},
                effects: [EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                id: "b5",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 2},
                effects: [EFFECT.gainWeapon, EFFECT.draw1],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b6",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 2},
                effects: [EFFECT.gainWeapon, EFFECT.destroyCard],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b7",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.gainJewel],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b8",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainArtifact],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b9",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.gainText, EFFECT.gainCoin, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b10",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainExplore],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b11",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.destroyCard],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b12",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.gainWeapon, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                id: "b13",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.gainJewel, EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                id: "b14",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.gainShiny, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                id: "b15",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.draw1, EFFECT.gainJewel, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                id: "b16",
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 2, coins: 3},
                effects: [EFFECT.gainJewel, EFFECT.gainText, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                id: "g1",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g2",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.discard, EFFECT.gainJewel, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g3",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.gainWeapon, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g4",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.gainWeapon, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g5",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.discard, EFFECT.gainWeapon, EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g6",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.drawFromDiscard, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g7",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g8",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreCost: {explore: 4, coins: 0},
                effects: [EFFECT.gainWeapon, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                id: "g9",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 5, coins: 0},
                effects: [EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
            {
                id: "g10",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 5, coins: 0},
                effects: [EFFECT.gainJewel, EFFECT.gainText, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
            {
                id: "g11",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 5, coins: 0},
                effects: [EFFECT.discard, EFFECT.gainWeapon, EFFECT.gainWeapon, EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
            {
                id: "g12",
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreCost: {explore: 5, coins: 0},
                effects: [EFFECT.gainJewel, EFFECT.gainExplore, EFFECT.gainExplore],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
        ];

export const LOCATION_STATE = Object.freeze({
    unexplored: "unexplored",
    explored: "explored",
    occupied: "occupied",
});

