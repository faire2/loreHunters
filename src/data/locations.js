import {EFFECT} from "./effects.mjs";
import {
    Arrow,
    Blimp,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Discard,
    Draw1Card,
    Explore,
    Item,
    Jeep,
    Jewel,
    Shiny,
    Ship,
    Text,
    Walk,
    Weapon
} from "../components/Symbols";
import React from "react";

export const TRANSPORT_TYPE = Object.freeze({
    walk: <Walk />,
    jeep: <Jeep />,
    ship: <Ship />,
    plane: <Blimp />
});

const rowStyle = {
  display: "flex",
  flexFlow: "row"
};

export const LOCATIONS = Object.freeze({
    1: {
    id: "1",
        effectsText: <div style={rowStyle}><Coin/><Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    2: {
        id: "2",
        effectsText: <div style={rowStyle}><Text/><Text/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    3: {
        id: "3",
        effectsText: <div style={rowStyle}><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    4: {
        id: "4",
        effectsText: <div style={rowStyle}><Weapon/></div>,
        effects: [EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    5: {
        id: "5",
        effectsText: <div style={rowStyle}><Jewel/></div>,
        effects: [EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 2}
    },
    b21: {
        id: "b21",
        effectsText: <div style={rowStyle}><Text/><Text/><Text/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b22: {
        id: "b22",
        effectsText: <div style={rowStyle}><Coin/><Text/><Draw1Card/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b23: {
        id: "b23",
        effectsText: <div style={rowStyle}><Weapon/><DestroyCard/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b24: {
        id: "b24",
        effectsText: <div style={rowStyle}><Discard/><Arrow/><Text/><Text/><Weapon/></div>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b25: {
        id: "b25",
        effectsText: <div style={rowStyle}><Jewel/></div>,
        effects: [EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b26: {
        id: "b26",
        effectsText: <div style={rowStyle}><Coin/><Coin/><Explore/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b31: {
        id: "b31",
        effectsText: <div style={rowStyle}><Discard/><Arrow/><Text/><Text/><Weapon/><Weapon/></div>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b32: {
        id: "b32",
        effectsText: <div style={rowStyle}><Weapon/><Jewel/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b33: {
        id: "b33",
        effectsText: <div style={rowStyle}><Text/><Text/><Jewel/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b34: {
        id: "b34",
        effectsText: <div style={rowStyle}><Coin/><Coin/><Text/><Text/><Text/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    g21: {
        id: "g21",
        effectsText: <div style={rowStyle}><Item/></div>,
        effects: [EFFECT.gainItem],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g22: {
        id: "g22",
        effectsText: <div style={rowStyle}><Coin/><Weapon/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g23: {
        id: "g23",
        effectsText: <div style={rowStyle}><Weapon/><Draw1Card/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g24: {
        id: "g24",
        effectsText: <div style={rowStyle}><Discard/><Arrow/><Text/><Jewel/></div>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g25: {
        id: "g25",
        effectsText: <div style={rowStyle}><Text/><Text/><DestroyCard/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g26: {
        id: "g26",
        effectsText: <div style={rowStyle}><Text/><Weapon/></div>,
        effects: [EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g31: {
        id: "g31",
        effectsText: <div style={rowStyle}><Text/><Jewel/><Draw1Card/></div>,
        effects: [EFFECT.gainText, EFFECT.gainJewel, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g32: {
        id: "g32",
        effectsText: <div style={rowStyle}><DefeatedGuardian/></div>,
        effects: [EFFECT.defeatGuardian],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g33: {
        id: "g33",
        effectsText: <div style={rowStyle}><Explore/><Coin/><Jewel/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainCoin, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g34: {
        id: "g34",
        effectsText: <div style={rowStyle}><Coin/><Weapon/><Weapon/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    lc1: {
        id: "lc1",
        effectsText: <div style={rowStyle}><Shiny/></div>,
        effects: [EFFECT.gainRelic],
        useCost: {transportType: TRANSPORT_TYPE.plane, amount: 1}
    }
});



