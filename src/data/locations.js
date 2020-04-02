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

export const TRANSPORT_TYPE = Object.freeze({
    walk: <Walk />,
    jeep: <Jeep />,
    ship: <Ship />,
    plane: <Plane />
});




export const LOCATIONS_EXPLORE_COST = Object.freeze({
    1: "",
    brown2: <div className="effectsText"><Explore/><Explore/><Coin/><Coin/></div>,
    brown3: <div className="effectsText"><Explore/><Explore/><Coin/><Coin/><Coin/></div>,
    green2: <div className="effectsText"><Explore/><Explore/><Explore/><Explore/></div>,
    green3: <div className="effectsText"><Explore/><Explore/><Explore/><Explore/><Explore/></div>,
})

export const Locations = Object.freeze({
    b1: {
    id: "b1",
        exploreCost: {explore: 0, coins: 0},
        effectsText: <div className="effectsText"><Coin/><Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    b2: {
        id: "b2",
        exploreCost: {explore: 0, coins: 0},
        effectsText: <div className="effectsText"><Text/><Text/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    b3: {
        id: "b3",
        exploreCost: {explore: 0, coins: 0},
        effectsText: <div className="effectsText"><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    b4: {
        id: "b4",
        exploreCost: {explore: 0, coins: 0},
        effectsText: <div className="effectsText"><Weapon/></div>,
        effects: [EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 1}
    },
    b5: {
        id: "b5",
        exploreCost: {explore: 2, coins: 2},
        effectsText: <div className="effectsText"><Weapon/><Draw1Card/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.draw1],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b6: {
        id: "b6",
        exploreCost: {explore: 2, coins: 2},
        effectsText: <div className="effectsText"><Weapon/><DestroyCard/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b7: {
        id: "b7",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Jewel/></div>,
        effects: [EFFECT.gainJewel],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b8: {
        id: "b8",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText">-<Explore/><Explore/>: <Artifact/></div>,
        effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainArtifact],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b9: {
        id: "b9",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Text/><Coin/><Uptrade/></div>,
        effects: [EFFECT.gainText, EFFECT.gainCoin, EFFECT.uptrade],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b10: {
        id: "b10",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Draw1Card/><Coin/><Explore/></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b11: {
        id: "b11",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Text/><Text/><DestroyCard/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.destroyCard],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b12: {
        id: "b12",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Weapon/><Text/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 1}
    },
    b13: {
        id: "b13",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Jewel/><Weapon/></div>,
        effects: [EFFECT.gainJewel, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b14: {
        id: "b14",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Shiny/><Uptrade/></div>,
        effects: [EFFECT.gainShiny, EFFECT.uptrade],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b15: {
        id: "b15",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Draw1Card/><Jewel/><Text/></div>,
        effects: [EFFECT.draw1, EFFECT.gainJewel, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    b16: {
        id: "b16",
        exploreCost: {explore: 2, coins: 3},
        effectsText: <div className="effectsText"><Text/><Jewel/><Coin/></div>,
        effects: [EFFECT.gainJewel, EFFECT.gainText, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.jeep, amount: 2}
    },
    g1: {
        id: "g1",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Explore/><Explore/><Uptrade/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.uptrade],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g2: {
        id: "g2",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Discard/>: <Text/><Jewel/></div>,
        effects: [EFFECT.discard, EFFECT.gainJewel, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g3: {
        id: "g3",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Weapon/><Coin/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g4: { //todo duplicate with previous!
        id: "g4",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Coin/><Weapon/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g5: {
        id: "g5",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Discard/>:<Weapon/><Weapon/></div>,
        effects: [EFFECT.discard, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g6: {
        id: "g6",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Coin/><Draw1Card/> from discard </div>,
        effects: [EFFECT.drawFromDiscard, EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g7: {
        id: "g7",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Text/><Text/><Text/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g8: {
        id: "g8",
        exploreCost: {explore: 4, coins: 0},
        effectsText: <div className="effectsText"><Weapon/><Uptrade/></div>,
        effects: [EFFECT.gainWeapon, EFFECT.uptrade],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 1}
    },
    g9: {
        id: "g9",
        exploreCost: {explore: 5, coins: 0},
        effectsText: <div className="effectsText"><Coin/></div>,
        effects: [EFFECT.gainCoin],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g10: {
        id: "g10",
        exploreCost: {explore: 5, coins: 0},
        effectsText: <div className="effectsText"><Text/><Text/><Jewel/></div>,
        effects: [EFFECT.gainJewel, EFFECT.gainText, EFFECT.gainText],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g11: {
        id: "g11",
        exploreCost: {explore: 5, coins: 0},
        effectsText: <div className="effectsText"><Discard/>: <Weapon/><Weapon/><Weapon/></div>,
        effects: [EFFECT.discard, EFFECT.gainWeapon, EFFECT.gainWeapon, EFFECT.gainWeapon],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    g12: {
        id: "g12",
        exploreCost: {explore: 5, coins: 0},
        effectsText: <div className="effectsText"><Explore/><Explore/><Jewel/></div>,
        effects: [EFFECT.gainJewel, EFFECT.gainExplore, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.ship, amount: 2}
    },
    m1: {
        id: "m1",
        exploreCost: {explore: 0, coins: 0},
        effectsText: <div className="effectsText"><Explore/><Jewel/></div>,
        effects: [EFFECT.gainJewel, EFFECT.gainExplore],
        useCost: {transportType: TRANSPORT_TYPE.walk, amount: 2}
    }
});



