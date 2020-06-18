import React from "react";
import {
    AdventurerIcon,
    Arrow,
    Blimp,
    Coin,
    DestroyCard,
    Discard,
    Draw1Card,
    Draw2Cards,
    Explore,
    Guardian,
    Jeep,
    Jewel,
    Relic,
    Ship,
    Text,
    Uptrade,
    Walk,
    Weapon
} from "../components/Symbols";

export const ITEM_EFFECTS = Object.freeze({
    fear: {
        effectsDescription: "",
    },
    coin: {
        effectsDescription: <Coin/>,
    },
    explore: {
        effectsDescription: <Explore/>,
    },
    seaTurtle: {
        effectsDescription: <div className="effectsDescription"><Draw1Card/> and <Ship/></div>,
    },
    ostrich: {
        effectsDescription: <div className="effectsDescription"><Draw1Card/> and <Jeep/></div>,
    },
    camel: {
        effectsDescription: <div className="effectsDescription"><Draw1Card/> and <Coin/><Coin/></div>,
    },
    packDonkey: {
        effectsDescription: <Draw2Cards/>,
    },
    horse: {
        effectsDescription: <div className="effectsDescription"><Draw1Card/> and <Explore/><Explore/></div>,
    },
    dog: {
        effectsDescription: <div className="effectsDescription"><Draw2Cards/> and <Discard/>. </div>,
    },
    canoe: {
        effectsDescription: <div className="effectsDescription"><Explore/> <Explore/></div>,
        effectsAltDescription: <div className="effectsDescription"><Ship/> <Ship/></div>,
    },
    jeep: {
        effectsDescription: <div className="effectsDescription"><Explore/> <Explore/></div>,
        effectsAltDescription: <div className="effectsDescription"><Jeep/> <Jeep/></div>,
    },
    astrolabe: {
        effectsDescription: <div className="effectsDescription"><Ship/> <Explore/> <Explore/></div>,
    },
    hotAirBaloon: {
        effectsDescription: <div className="effectsDescription"><Blimp/> <Explore/> <Explore/></div>,
    },
    airplane: {
        effectsDescription: <div className="effectsDescription"><Explore/> <Explore/> <Explore/></div>,
    },
    goldPan: {
        effectsDescription: <div className="effectsDescription"><Coin/> <Coin/></div>,
    },
    hat: {
        effectsDescription: <div className="effectsDescription"><Explore/> <Text/></div>,
    },
    trowel: {
        effectsDescription: <div className="effectsDescription"><Explore/> <Arrow/> <Jewel/></div>,
    },
    pickaxe: {
        effectsDescription: <div className="effectsDescription">1x: <Explore/> <Arrow/> <Weapon/> <Text/></div>,
    },
    spyglass: {
        effectsDescription: <div className="effectsDescription">1x: <Explore/> <Explore/> <Arrow/> <Relic/></div>,
        effectsAltDescription: <div className="effectsDescription"><Jeep/> <Jeep/></div>,
    },
    hammock: {
        effectsDescription: <div className="effectsDescription">Refresh <AdventurerIcon/> and <Uptrade/></div>,
    },
    coffee: {
        effectsDescription: <div className="effectsDescription"><Draw2Cards/><Discard/> and refresh all
            you <AdventurerIcon/></div>,
    },
    banjo: {
        effectsDescription: <div className="effectsDescription">Gain 1 <Coin/> for each Legend you claimed.</div>,
    },
    beerMug: {
        effectsDescription: <div className="effectsDescription">Gain 1 <Coin/> for each <Guardian/> you defeated (max
            4).</div>,
    },
    journal: {
        effectsDescription: <div className="effectsDescription">Gain 1 <Explore/> for each <Relic/> (max 4).</div>,
    },
    lockPick: {
        effectsDescription: <div className="effectsDescription"><Discard/> <Arrow/> <Coin/> <Coin/> <Coin/>.</div>,
    },
    parrot: {
        effectsDescription: <div className="effectsDescription"><Discard/> <Arrow/> <Jewel/>.</div>,
    },
    boots: {
        effectsDescription: <div className="effectsDescription"><Draw1Card/> <Explore/> <Walk/></div>,
    },
    pocketWatch: {
        effectsDescription: <div className="effectsDescription"><Coin/> and if this was the last card in your hand, gain
            extra <Coin/>
            <Coin/></div>,
    },
    grapplingHook: {
        effectsDescription: <div className="effectsDescription"> Exhaust your <AdventurerIcon/> and use the effect of an
            adjacent empty (II) location. </div>,
    },
    camouflagePaint: {
        effectsDescription: <div className="effectsDescription"> You may use the effect of a location used by an
            opponent.</div>,
    },
    tent: {
        effectsDescription: <div className="effectsDescription"> Use the effect of a location already occupied by
            your <AdventurerIcon/>
        </div>,
    },
    fishingRod: {
        effectsDescription: <div className="effectsDescription"> Reveal the top card of the Item deck.<br/>You may buy
            any Item with
            discount of <Coin/> <Coin/></div>,
    },
    compass: {
        effectsDescription:
            <div className="effectsDescription"> Reveal the top card of the Artifact deck. <br/>You may buy any Artifact
                with
                discount of <Explore/> <Explore/></div>,
    },
    flintPistol: {
        effectsDescription:
            <div className="effectsDescription"> Defeat <Guardian/> in your play area or discard pile.</div>,
    },
    bowAndArrows: {
        effectsDescription:
            <div className="effectsDescription"><Explore/> plus <Explore/> for each <Guardian/> in your Play Area and
                Discard
                Pile.</div>,
    },
    messengerPidgeon: {
        effectsDescription:
            <div className="effectsDescription">Gain <Text/> and you may draw any card from your Discard Pile.</div>,
    },
    whip: {
        effectsDescription:
            <div className="effectsDescription">Gain an Artifact then destroy this card.</div>,
    },
    bookOfMyths: {
        effectsDescription:
            <div className="effectsDescription">Progress in a Legend then destroy this card.</div>,
    },
    bag: {
        effectsDescription:
            <div className="effectsDescription">Gain an Item to your hand then destroy this card.</div>,
    },
    floraSamples: {
        effectsDescription:
            <div className="effectsDescription">(H)</div>,
    },
    boomerang: {
        effectsDescription:
            <div className="effectsDescription"><Walk/> <Draw1Card/> <Discard/>.</div>,
    },
    beetleMask: {
        effectsDescription:
            <div className="effectsDescription">Remove <Guardian/> in your Play Area or Discard Pile from the game.
            </div>,
    },
    hook: {
        effectsDescription:
            <div className="effectsDescription"><DestroyCard/></div>,
    },
});