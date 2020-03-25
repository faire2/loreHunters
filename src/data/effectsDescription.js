import React from "react";
import {
    AdventurerIcon,
    Arrow, Artifact,
    Coin, DefeatedGuardian,
    DestroyCard,
    Discard,
    Draw1Card,
    Draw2Cards,
    Explore, Fear,
    Guardian,
    Jeep,
    Jewel,
    Plane,
    Shiny,
    Ship,
    Text, Uptrade,
    Walk,
    Weapon
} from "../components/Symbols";
import {EFFECT} from "./effects";
import {LOCATION_LEVEL, LOCATION_TYPE, TRANSPORT_TYPE} from "./locations";
import {CARD_TRANSPORT, CARD_TYPE} from "./cards";

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
        effectsDescription: <div className="effectsDescription"><Plane/> <Explore/> <Explore/></div>,
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
        effectsDescription: <div className="effectsDescription">1x: <Explore/> <Explore/> <Arrow/> <Shiny/></div>,
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
        effectsDescription: <div className="effectsDescription">Gain 1 <Explore/> for each <Shiny/> (max 4).</div>,
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

export const ARTIFACT_EFFECTS = Object.freeze({
    golemShem: <div className="effectsText">For this round only: <AdventurerIcon/></div>,
    bookOfSecrets: <div className="effectsText">Gain a bonus from an unclaimed, visible legend.</div>,
    chestOfWonders: <div className="effectsText">Use the effect of an item on the market</div>,
    mirrorShard: <div className="effectsText">Use the effect of an artifact in the market</div>,
    portalStone: <div className="effectsText"><Plane/> and relocate one of your deployed <AdventurerIcon/> to an empty
        location.</div>,
    pathfinderStaff: <div className="effectsText"><Plane/> and place one of your deployed <AdventurerIcon/> to an
        adjacent.</div>,
    healingOrb: <div className="effectsText">Refresh all your <AdventurerIcon/>.</div>,
    mysteriousTexts: <div className="effectsText"><Draw2Cards/> and refresh <AdventurerIcon/></div>,
    cursedTreasure: <div className="effectsText"><Fear/><Coin/><Coin/><Coin/><Coin/></div>,
    darkKnowledge: <div className="effectsText"><Fear/><Jewel/></div>,
    goldenMask: <div className="effectsText">Pay <Coin/> to gain effect of an occupied location.</div>,
    warMask: <div className="effectsText"><Draw1Card/><DestroyCard/></div>,
    ritualDagger: <div className="effectsText"><Discard/> to gain <Jewel/><Jewel/></div>,
    ringOfLight: <div className="effectsText">Pick a card from your draw deck.</div>,
    beastKiller: <div className="effectsText">Defeat a guardian in your play area or discard pile.</div>, // todo replace with guardian icon
    flameJewek: <div className="effectsText">Gain or Decipher a Legend with a discount of <Jewel/></div>,
    inscribedBlade: <div className="effectsText">Gain or Decipher a Legend with a discount
        of <Text/><Text/> or <Weapon/></div>,
    amuletOfCharm: <div className="effectsText">Buy an item with discount of <Coin/><Coin/><Coin/></div>,
    drinkingHorn: <div className="effectsText"><DestroyCard/><Discard/><Draw2Cards/></div>,
    ancientCipher: <div className="effectsText"><Draw1Card/> <Coin/></div>,
    transmutation: <div className="effectsText"><DestroyCard/> <Coin/><Coin/></div>,
    fearlessBlade: <div className="effectsText"><DestroyCard/> <Weapon/></div>,
    keysToAllDoors: <div className="effectsText"><Coin/> <Coin/> <Coin/></div>,
    treacherousWhistle: <div className="effectsText"><Draw2Cards/> if a guardian is drawn</div>, //todo replace guardian with an icon
    giantEgg: <div className="effectsText"><Text/><Text/> and <Uptrade/></div>, //todo replace guardian with an icon
});

export const GUARDIANS_DISCOVERY_EFFECTS = Object.freeze({
    foxSpirit: <div><Text/><Coin/><Explore/></div>,
    forestDragon: <div className="effectsText"><Jeep/><Explore/> <Arrow/> <DefeatedGuardian/></div>,
    naga: <div className="effectsText"><Jeep/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    stoneTitan: <div className="effectsText"><Jeep/><Weapon/><Text/> <Arrow/> <DefeatedGuardian/></div>,
    golem: <div className="effectsText"><Jeep/><Text/><Text/> <DefeatedGuardian/></div>,
    mountainGuardian: <div className="effectsText"><Plane/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    gryphon: <div className="effectsText"><Plane/><Text/> <Arrow/> <DefeatedGuardian/></div>,
    whisperingShadow: <div className="effectsText"><Walk/><Text/> <Arrow/> <DefeatedGuardian/></div>,
    giantScarab: <div className="effectsText"><Jeep/><Jewel/> <Arrow/> <DefeatedGuardian/></div>,
    swampSnake: <div className="effectsText"><Ship/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    stealingMonkey: <div className="effectsText"><Ship/><Coin/><Coin/><Coin/> <Arrow/> <DefeatedGuardian/></div>,
    hornedHippo: <div className="effectsText"><Jeep/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    lakeMonster: <div className="effectsText"><Ship/><Ship/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    energyLeech: <div className="effectsText"><Walk/><Walk/> <Arrow/> <DefeatedGuardian/></div>,
    swarmingSpiders: <div className="effectsText"><Walk/><Explore/><Explore/> <Arrow/> <DefeatedGuardian/></div>,
    HeartOfForest: <div className="effectsText"><Walk/><Jewel/> <Arrow/> <DefeatedGuardian/></div>,
    wyvern: <div className="effectsText"><Walk/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    crabmanHermit: <div className="effectsText"><Ship/><Text/><Text/> <Arrow/> <DefeatedGuardian/></div>,
});

export const GUARDIANS_EFFECTS = Object.freeze({
    foxSpirit: <div className="effectsText"><Jeep/><Coin/> <Arrow/> <DefeatedGuardian/></div>,
    forestDragon: <div className="effectsText"><Jeep/><Explore/> <Arrow/> <DefeatedGuardian/></div>,
    naga:         <div className="effectsText"><Jeep/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    stoneTitan: <div className="effectsText"><Jeep/><Weapon/><Text/> <Arrow/> <DefeatedGuardian/></div>,
    golem: <div className="effectsText"><Jeep/><Text/><Text/> <DefeatedGuardian/></div>,
    mountainGuardian: <div cssName="effectsText"><Plane/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    gryphon: <div className="effectsText"><Plane/><Text/> <Arrow/> <DefeatedGuardian/></div>,
    whisperingShadow: <div className="effectsText"><Walk/><Text/> <Arrow/> <DefeatedGuardian/></div>,
    giantScarab: <div className="effectsText"><Jeep/><Jewel/> <Arrow/> <DefeatedGuardian/></div>,
    swampSnake: <div className="effectsText"><Ship/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    stealingMonkey: <div className="effectsText"><Ship/><Coin/><Coin/><Coin/> <Arrow/> <DefeatedGuardian/></div>,
    hornedHippo: <div className="effectsText"><Jeep/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    lakeMonster: <div className="effectsText"><Ship/><Ship/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    energyLeech: <div className="effectsText"><Walk/><Walk/> <Arrow/> <DefeatedGuardian/></div>,
    swarmingSpiders: <div className="effectsText"><Walk/><Explore/><Explore/> <Arrow/> <DefeatedGuardian/></div>,
    HeartOfForest: <div className="effectsText"><Walk/><Jewel/> <Arrow/> <DefeatedGuardian/></div>,
    wyvern: <div className="effectsText"><Walk/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
    crabmanHermit: <div className="effectsText"><Ship/><Text/><Text/> <Arrow/> <DefeatedGuardian/></div>,
});

export const LOCATIONS_EXPLORE_COST = Object.freeze({
    1: "",
    brown2: <div className="effectsText"><Explore/><Explore/><Coin/><Coin/></div>,
    brown3: <div className="effectsText"><Explore/><Explore/><Coin/><Coin/><Coin/></div>,
    green2: <div className="effectsText"><Explore/><Explore/><Explore/><Explore/></div>,
    green3: <div className="effectsText"><Explore/><Explore/><Explore/><Explore/><Explore/></div>,
})

export const LOCATIONS_EFFECTS = Object.freeze(
    {
        "b1": <div className="effectsText"><Coin/> <Coin/></div>,
    },
    {
        "b2": <div className="effectsText"><Text/> <Text/></div>,
    },
    {
        "b3": <div className="effectsText"><Explore/> <Explore/></div>,
    },
    {
        "b4": <div className="effectsText"><Weapon/></div>,
    },
    {
        "b5": <div className="effectsText"><Weapon/><Draw1Card/></div>,
    },
    {
        "b6": <div className="effectsText"><Weapon/><DestroyCard/></div>,
    },
    {
        "b7": <div className="effectsText"><Jewel/></div>,
    },
    {
        "b8": <div className="effectsText"><Artifact/> - <Explore/><Explore/><Explore/></div>,
    },
    {
        "b9": <div className="effectsText"><Text/><Coin/><Uptrade/></div>,
    },
    {
        "b10": <div className="effectsText"><Draw1Card/><Coin/><Explore/></div>,
    },
    {
        "b11": <div className="effectsText"><Text/><Text/><DestroyCard/></div>,
    },
    {
        "b12": <div className="effectsText"><Weapon/><Text/></div>,
    },
    {
        "b13": <div className="effectsText"><Jewel/><Weapon/></div>,
    },
    {
        "b14": <div className="effectsText"><Shiny/><Uptrade/></div>,
    },
    {
        "b15": <div className="effectsText"><Draw1Card/><Jewel/><Text/></div>,
    },
    {
        "b16": <div className="effectsText"><Jewel/><Text/><Coin/></div>,
    },
    {
        "g1": <div className="effectsText"><Explore/><Explore/><Uptrade/></div>,
    },
    {
        "g2": <div className="effectsText"><Discard/>:<Jewel/><Text/></div>,
    },
    {
        "g3": <div className="effectsText"><Weapon/><Coin/></div>,
    },
    {
        "g4": <div className="effectsText"><Weapon/><Coin/></div>,
    },
    {
        "g5": <div className="effectsText"><Discard/>:<Weapon/><Weapon/></div>,
    },
    {
        "g6": <div className="effectsText">DrawFromDisc.<Coin/></div>,
    },
    {
        "g7": <div className="effectsText"><Text/><Text/><Text/></div>,
    },
    {
        "g8": <div className="effectsText"><Weapon/><Uptrade/></div>,
    },
    {
        "g9": <div className="effectsText">DivneZaskrtnuti<Coin/></div>,
    },
    {
        "g10": <div className="effectsText"><Jewel/><Text/><Text/></div>,
    },
    {
        "g11": <div className="effectsText"><Discard/>:<Weapon/><Weapon/><Weapon/></div>,
    },
    {
        "g12": <div className="effectsText"><Jewel/><Explore/><Explore/></div>,
    },
);