import {
    Artifact,
    Coin,
    DestroyCard, Discard,
    Draw1Card,
    Explore, Item,
    Jeep,
    Jewel,
    Plane, Shiny,
    Ship,
    Text, Uptrade,
    Walk,
    Weapon
} from "../components/Symbols";

import React from "react";

import {EFFECT} from "./effects";

export const LOCATION_LEVEL = Object.freeze({
    1: "I",
    2: "II",
    3: "III"
});
export const TRANSPORT_TYPE = Object.freeze({
    walk: <Walk />,
    jeep: <Jeep />,
    ship: <Ship />,
    plane: <Plane />
});

export const LOCATION_TYPE = Object.freeze({
    green: "green tLocation that requires boats",
    brown: "brown tLocation that requires jeeps",
    mixed: "brown and green tLocation - unique"
});

export const LOCATIONS =
        [
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["1"],
                exploreText: <div className="effectsText"></div>,
                exploreCost: {explore: 0, coins: 0},
                effectsText: <div className="effectsText"><Coin/> <Coin/></div>,
                effects: [EFFECT.gainCoin, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["1"],
                exploreText: <div className="effectsText"></div>,
                exploreCost: {explore: 0, coins: 0},
                effectsText: <div className="effectsText"><Text/> <Text/></div>,
                effects: [EFFECT.gainText, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["1"],
                exploreText: <div className="effectsText"></div>,
                exploreCost: {explore: 0, coins: 0},
                effectsText: <div className="effectsText"><Explore /> <Explore /></div>,
                effects: [EFFECT.gainExplore, EFFECT.gainExplore],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["1"],
                exploreText: <div className="effectsText"></div>,
                exploreCost: {explore: 0, coins: 0},
                effectsText: <div className="effectsText"><Weapon /></div>,
                effects: [EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 2},
                effectsText: <div className="effectsText"><Weapon /><Draw1Card /></div>,
                effects: [EFFECT.gainWeapon, EFFECT.draw1],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 2},
                effectsText: <div className="effectsText"><Weapon /><DestroyCard /></div>,
                effects: [EFFECT.gainWeapon, EFFECT.destroyCard],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Jewel /></div>,
                effects: [EFFECT.gainJewel],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Artifact /> - <Explore /><Explore /><Explore /></div>,
                effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainArtifact],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Text /><Coin /><Uptrade /></div>,
                effects: [EFFECT.gainText, EFFECT.gainCoin, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Draw1Card /><Coin /><Explore /></div>,
                effects: [EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainExplore],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Text /><Text /><DestroyCard /></div>,
                effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.destroyCard],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Weapon /><Text /></div>,
                effects: [EFFECT.gainWeapon, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Jewel /><Weapon /></div>,
                effects: [EFFECT.gainJewel, EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Shiny /><Uptrade /></div>,
                effects: [EFFECT.gainShiny, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Draw1Card /><Jewel /><Text /></div>,
                effects: [EFFECT.draw1, EFFECT.gainJewel, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                type: LOCATION_TYPE.brown,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Coin /><Coin /><Coin /></div>,
                exploreCost: {explore: 2, coins: 3},
                effectsText: <div className="effectsText"><Jewel /><Text /><Coin /></div>,
                effects: [EFFECT.gainJewel, EFFECT.gainText, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText"><Explore /><Explore /><Uptrade /></div>,
                effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText"><Discard />:<Jewel /><Text /></div>,
                effects: [EFFECT.discard, EFFECT.gainJewel, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText"><Weapon /><Coin /></div>,
                effects: [EFFECT.gainWeapon, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText"><Weapon /><Coin /></div>,
                effects: [EFFECT.gainWeapon, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText"><Discard />:<Weapon /><Weapon /></div>,
                effects: [EFFECT.discard, EFFECT.gainWeapon, EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText">DrawFromDisc.<Coin /></div>,
                effects: [EFFECT.drawFromDiscard, EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText"><Text /><Text /><Text /></div>,
                effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["2"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 4, coins: 0},
                effectsText: <div className="effectsText"><Weapon /><Uptrade /></div>,
                effects: [EFFECT.gainWeapon, EFFECT.uptrade],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 5, coins: 0},
                effectsText: <div className="effectsText">DivneZaskrtnuti<Coin /></div>,
                effects: [EFFECT.gainCoin],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 5, coins: 0},
                effectsText: <div className="effectsText"><Jewel /><Text /><Text /></div>,
                effects: [EFFECT.gainJewel, EFFECT.gainText, EFFECT.gainText],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 5, coins: 0},
                effectsText: <div className="effectsText"><Discard />:<Weapon /><Weapon /><Weapon /></div>,
                effects: [EFFECT.discard, EFFECT.gainWeapon, EFFECT.gainWeapon, EFFECT.gainWeapon],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
            {
                type: LOCATION_TYPE.green,
                level: LOCATION_LEVEL["3"],
                exploreText: <div className="effectsText"><Explore /><Explore /><Explore /><Explore /><Explore /></div>,
                exploreCost: {explore: 5, coins: 0},
                effectsText: <div className="effectsText"><Jewel /><Explore /><Explore /></div>,
                effects: [EFFECT.gainJewel, EFFECT.gainExplore, EFFECT.gainExplore],
                useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
            },
        ];
export const LOCATION_STATE = Object.freeze({
    unexplored: "unexplored",
    explored: "explored",
    occupied: "occupied",
});

