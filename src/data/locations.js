import {EFFECT} from "./effects.mjs";
import {
    Arrow,
    Artifact,
    Blimp,
    Coin,
    DestroyCard,
    Discard,
    Draw1Card,
    Explore, Item,
    Jeep,
    Jewel,
    Ship,
    Text,
    Uptrade,
    Walk,
    Weapon
} from "../components/Symbols";
import React from "react";
import {
    B21,
    B22,
    B23,
    B24,
    B25,
    B31,
    B32,
    B33,
    G21,
    G22,
    G23,
    G24,
    G25,
    G26,
    G31,
    G32,
    G33,
    L11,
    L12,
    L13,
    L14,
    L15
} from "../components/locations/locationsImages";

export const TRANSPORT_TYPE = Object.freeze({
    walk: <Walk />,
    jeep: <Jeep />,
    ship: <Ship />,
    plane: <Blimp />
});

export const LOCATIONS = Object.freeze({
    1: {
    id: "1",
        effectsText: <div><Coin/><Coin/></div>,
        effectsImage: <L11/>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    2: {
        id: "2",
        effectsText: <div><Text/><Text/></div>,
        effectsImage: <L12/>,
        effects: [EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    3: {
        id: "3",
        effectsText: <div><Explore/><Explore/></div>,
        effectsImage: <L13/>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    4: {
        id: "4",
        effectsText: <div><Weapon/></div>,
        effectsImage: <L14/>,
        effects: [EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    5: {
        id: "5",
        effectsText: <div><Explore/><Jewel/></div>,
        effectsImage: <L15/>,
        effects: [EFFECT.gainExplore, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 2}
    },
    b21: {
        id: "b21",
        effectsText: <div><Discard/><Arrow/><Text/><Text/><Weapon/></div>,
        effectsImage: <B21/>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b22: {
        id: "b22",
        effectsText: <div><Discard/><Arrow/><Text/><Jewel/></div>,
        effectsImage: <B22/>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b23: {
        id: "b23",
        effectsText: <div><Text/><Text/><DestroyCard/></div>,
        effectsImage: <B23/>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b24: {
        id: "b24",
        effectsText: <div><Text/><Weapon/></div>,
        effectsImage: <B24/>,
        effects: [EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b25: {
        id: "b25",
        effectsText: <div><Jewel/></div>,
        effectsImage: <B25/>,
        effects: [EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b31: {
        id: "b31",
        effectsText: <div><Discard/><Arrow/><Text/><Weapon/><Weapon/></div>,
        effectsImage: <B31/>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b32: {
        id: "b32",
        effectsText: <div><Weapon/><Jewel/></div>,
        effectsImage: <B32/>,
        effects: [EFFECT.gainWeapon, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b33: {
        id: "b33",
        effectsText: <div><Text/><Text/><Jewel/></div>,
        effectsImage: <B33/>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    g21: {
        id: "g21",
        effectsText: <div><Explore/><Explore/><Uptrade/></div>,
        effectsImage: <G21/>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g22: {
        id: "g22",
        effectsText: <div><Coin/><Weapon/></div>,
        effectsImage: <G22/>,
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g23: {
        id: "g23",
        effectsText: <div><Item/></div>,
        effectsImage: <G23/>,
        effects: [EFFECT.gainItem],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g24: {
        id: "g24",
        effectsText: <div><Coin/><Weapon/></div>,
        effectsImage: <G24/>,
        effects: [EFFECT.gainWeapon, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g25: {
        id: "g25",
        effectsText: <div><Discard/>:<Weapon/><Weapon/></div>,
        effectsImage: <G25/>,
        effects: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g26: {
        id: "g26",
        effectsText: <div><Coin/><Draw1Card/> from discard </div>,
        effectsImage: <G26/>,
        effects: [EFFECT.gainWeapon, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g31: {
        id: "g31",
        effectsText: <div><Text/><Text/><Text/></div>,
        effectsImage: <G31/>,
        effects: [EFFECT.gainText, EFFECT.gainJewel, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g32: {
        id: "g32",
        effectsText: <div><Weapon/><Uptrade/></div>,
        effectsImage: <G32/>,
        effects: [EFFECT.gainCoin, EFFECT.defeatGuardian],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g33: {
        id: "g33",
        effectsText: <div><Coin/></div>,
        effectsImage: <G33/>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
});



