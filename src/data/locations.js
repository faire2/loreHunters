import {EFFECT} from "./effects.js";
import {
    Artifact,
    Coin,
    DestroyCard,
    Discard,
    Draw1Card,
    Explore, Jeep,
    Jewel, Plane,
    Shiny, Ship,
    Text,
    Uptrade, Walk,
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
    G25, G26, G31, G32, G33, L11, L12, L13, L14, L15
} from "../components/locations/locations_images";

export const TRANSPORT_TYPE = Object.freeze({
    walk: <Walk />,
    jeep: <Jeep />,
    ship: <Ship />,
    plane: <Plane />
});

export const Locations = Object.freeze({
    1: {
    id: "1",
        effectsText: <div className="effectsText"><Coin/><Coin/></div>,
        effectsImage: <L11/>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    2: {
        id: "2",
        effectsText: <div className="effectsText"><Text/><Text/></div>,
        effectsImage: <L12/>,
        effects: [EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    3: {
        id: "3",
        effectsText: <div className="effectsText"><Explore/><Explore/></div>,
        effectsImage: <L13/>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    4: {
        id: "4",
        effectsText: <div className="effectsText"><Weapon/></div>,
        effectsImage: <L14/>,
        effects: [EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    5: {
        id: "5",
        effectsText: <div className="effectsText"><Explore/><Jewel/></div>,
        effectsImage: <L15/>,
        effects: [EFFECT.gainExplore, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 2}
    },
    b21: {
        id: "b21",
        effectsText: <div className="effectsText"><Weapon/><Draw1Card/></div>,
        effectsImage: <B21/>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b22: {
        id: "b22",
        effectsText: <div className="effectsText"><Weapon/><Draw1Card/></div>,
        effectsImage: <B22/>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b23: {
        id: "b23",
        effectsText: <div className="effectsText"><Weapon/><Draw1Card/></div>,
        effectsImage: <B23/>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b24: {
        id: "b24",
        effectsText: <div className="effectsText"><Weapon/><Draw1Card/></div>,
        effectsImage: <B24/>,
        effects: [EFFECT.gainText, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b25: {
        id: "b25",
        effectsText: <div className="effectsText"><Weapon/><Draw1Card/></div>,
        effectsImage: <B25/>,
        effects: [EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b31: {
        id: "b31",
        effectsText: <div className="effectsText"><Weapon/><DestroyCard/></div>,
        effectsImage: <B31/>,
        effects: [EFFECT.discard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b32: {
        id: "b32",
        effectsText: <div className="effectsText"><Jewel/></div>,
        effectsImage: <B32/>,
        effects: [EFFECT.gainWeapon, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b33: {
        id: "b33",
        effectsText: <div className="effectsText">-<Explore/><Explore/>: <Artifact/></div>,
        effectsImage: <B33/>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    g21: {
        id: "g21",
        effectsText: <div className="effectsText"><Explore/><Explore/><Uptrade/></div>,
        effectsImage: <G21/>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g22: {
        id: "g22",
        effectsText: <div className="effectsText"><Discard/>: <Text/><Jewel/></div>,
        effectsImage: <G22/>,
        effects: [EFFECT.gainCoin, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g23: {
        id: "g23",
        effectsText: <div className="effectsText"><Weapon/><Coin/></div>,
        effectsImage: <G23/>,
        effects: [EFFECT.gainItem],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g24: {
        id: "g24",
        effectsText: <div className="effectsText"><Coin/><Weapon/></div>,
        effectsImage: <G24/>,
        effects: [EFFECT.gainWeapon, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g25: {
        id: "g25",
        effectsText: <div className="effectsText"><Discard/>:<Weapon/><Weapon/></div>,
        effectsImage: <G25/>,
        effects: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g26: {
        id: "g26",
        effectsText: <div className="effectsText"><Coin/><Draw1Card/> from discard </div>,
        effectsImage: <G26/>,
        effects: [EFFECT.gainWeapon, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g31: {
        id: "g31",
        effectsText: <div className="effectsText"><Text/><Text/><Text/></div>,
        effectsImage: <G31/>,
        effects: [EFFECT.gainText, EFFECT.gainJewel, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g32: {
        id: "g32",
        effectsText: <div className="effectsText"><Weapon/><Uptrade/></div>,
        effectsImage: <G32/>,
        effects: [EFFECT.gainCoin, EFFECT.defeatGuardian],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g33: {
        id: "g33",
        effectsText: <div className="effectsText"><Coin/></div>,
        effectsImage: <G33/>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
});



