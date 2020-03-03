import {BACKGROUNDS} from "../components/cards/Card";
import React from "react";
import {} from "../components/Symbols";
import {Explore} from "../components/Symbols";
import {Coin} from "../components/Symbols";
import {Draw1Card} from "../components/Symbols";
import {Ship} from "../components/Symbols";
import {Draw2Cards} from "../components/Symbols";
import {Adventurer} from "../components/Symbols";
import {Jeep} from "../components/Symbols";
import {Plane} from "../components/Symbols";
import {Arrow} from "../components/Symbols";
import {Jewel} from "../components/Symbols";
import {Shiny} from "../components/Symbols";
import {Weapon} from "../components/Symbols";
import {Text} from "../components/Symbols";
import {Guardian} from "../components/Symbols";
import {Discard} from "../components/Symbols";
import {Walk} from "../components/Symbols";
import {DestroyCard} from "../components/Symbols";


const CARD_TYPE = Object.freeze({
    item: "item",
    artifact: "artifact",
    fear: "fear",
    basic: "basic"
});

/*const MOVEMENT = Object.freeze({
    walk: <img src={sWalk} className="movementSymbol mx-auto"/>,
    drive: <img src={sJeep} className="movementSymbol mx-auto"/>,
    sail: <img src={sShip} className="movementSymbol mx-auto"/>,
    fly: <img src={sPlane} className="movementSymbol mx-auto"/>
});*/

export const CARDS = Object.freeze({
    fear: {
        cardName: "Fear",
        type: CARD_TYPE.fear,
        background: BACKGROUNDS.itemWalk,
        cost: 0,
        effects: "",
        points: -1
    },
    coin: {
        cardName: "Coin",
        type: CARD_TYPE.basic,
        background: BACKGROUNDS.itemJeep,
        cost: 0,
        effects: <Coin/>,
        points: 0
    },
    explore: {
        cardName: "Explore",
        type: CARD_TYPE.basic,
        background: BACKGROUNDS.itemShip,
        cost: 0,
        effects: <Explore/>,
        points: 0
    },
    seaTurtle: {
        cardName: "Sea Turtle",
        background: BACKGROUNDS.itemEmpty,
        type: CARD_TYPE.item,
        cost: 2,
        effects: <div className="effectsText"><Draw1Card/> and <Ship/></div>,
        points: 1
    },
    ostrich: {
        cardName: "Ostrich",
        background: BACKGROUNDS.itemEmpty,
        type: CARD_TYPE.item,
        cost: 2,
        effects: <div className="effectsText"><Draw1Card/> and <Jeep/></div>,
        points: 1
    },
    camel: {
        cardName: "Camel",
        background: BACKGROUNDS.itemJeep,
        type: CARD_TYPE.item,
        cost: 2,
        effects: <div className="effectsText"><Draw1Card/> and <Coin/></div>,
        points: 1
    },
    packDonkey: {
        cardName: "Pack Donkey",
        background: BACKGROUNDS.itemJeep,
        type: CARD_TYPE.item,
        cost: 3,
        effects: <Draw2Cards/>,
        points: 1
    },
    horse: {
        cardName: "Horse",
        background: BACKGROUNDS.itemJeep,
        type: CARD_TYPE.item,
        cost: 4,
        effects: <div className="effectsText"><Draw1Card/> and return <Adventurer/> back home. </div>,
        points: 1
    },
    dog: {
        cardName: "Horse",
        background: BACKGROUNDS.itemJeep,
        type: CARD_TYPE.item,
        cost: 2,
        effects: <div className="effectsText"><Draw1Card/> and return <Adventurer/> back home. </div>,
        points: 1
    },
    canoe: {
        cardName: "Canoe",
        background: BACKGROUNDS.itemEmpty,
        type: CARD_TYPE.item,
        cost: 3,
        effects: <div className="effectsText"><Explore/> <Explore/></div>,
        effects2: <div className="effectsText"><Ship/> <Ship/></div>,
        points: 1
    },
    jeep: {
        cardName: "Jeep",
        background: BACKGROUNDS.itemEmpty,
        type: CARD_TYPE.item,
        cost: 3,
        effects: <div className="effectsText"><Explore/> <Explore/></div>,
        effects2: <div className="effectsText"><Jeep/> <Jeep/></div>,
        points: 1
    },
    astrolabe: {
        cardName: "Astrolabe",
        background: BACKGROUNDS.itemEmpty,
        type: CARD_TYPE.item,
        cost: 3,
        effects: <div className="effectsText"><Ship/> <Explore/> <Explore/></div>,
        points: 1
    },
    hotAirBaloon: {
        cardName: "Hot Air Baloon",
        background: BACKGROUNDS.itemEmpty,
        type: CARD_TYPE.item,
        cost: 2,
        effects: <div className="effectsText"><Plane/> <Explore/></div>,
        points: 1
    },
    Airplane: {
        cardName: "Airplane",
        background: BACKGROUNDS.itemPlane,
        type: CARD_TYPE.item,
        cost: 5,
        effects: <div className="effectsText"><Plane/> <Explore/></div>,
        points: 2
    },
    jewel: {
        cardName: "Jewel",
        background: BACKGROUNDS.itemShip,
        type: CARD_TYPE.item,
        cost: 1,
        effects: <div className="effectsText"><Coin/> <Coin/></div>,
        points: 1
    },
    hat: {
        cardName: "Hat",
        background: BACKGROUNDS.itemShip,
        type: CARD_TYPE.item,
        cost: 1,
        effects: <div className="effectsText"><Coin/> <Coin/></div>,
        points: 1
    },
    trowel: {
        cardName: "Trowel",
        background: BACKGROUNDS.itemJeep,
        type: CARD_TYPE.item,
        cost: 1,
        effects: <div className="effectsText">1x: <Explore/> <Arrow/> <Jewel/></div>,
        points: 1
    },
    pickaxe: {
        cardName: "Pickaxe",
        background: BACKGROUNDS.itemJeep,
        type: CARD_TYPE.item,
        cost: 1,
        effects: <div className="effectsText">1x: <Explore/> <Arrow/> <Weapon/> <Text/></div>,
        points: 1
    },
    spyglass: {
        cardName: "Spyglass",
        background: BACKGROUNDS.itemShip,
        type: CARD_TYPE.item,
        cost: 1,
        effects: <div className="effectsText">1x: <Explore/> <Explore/> <Arrow/> <Shiny/></div>,
        effects2: <div className="effectsText"><Jeep/> <Jeep/></div>,
        points: 1
    },
    /*hammock: {
        cardName: "Hammock",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 2,
        effects: <div className="effectsText"><Draw1Card/></div>,
        effects2: /!* (H) *!/"",
        points: 1
    },*/
    coffee: {
        cardName: "Coffee",
        background: BACKGROUNDS.itemShip,
        type: CARD_TYPE.item,
        cost: 2,
        effects: <div className="effectsText">Return <Adventurer/> back home.</div>,
        points: 1
    },
    banjo: {
        cardName: "Banjo",
        background: BACKGROUNDS.itemShip,
        type: CARD_TYPE.item,
        cost: 1,
        effects: <div className="effectsText">Gain 1 <Coin/> for each Legend you started.</div>,
        points: 1
    },
    beerMug: {
        cardName: "Beer Mug",
        background: BACKGROUNDS.itemJeep,
        type: CARD_TYPE.item,
        cost: 2,
        effects: <div className="effectsText">Gain 1 <Coin/> for each <Guardian/> you defeated (max 4).</div>,
        points: 2
    },
    journal: {
        cardName: "Journal",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 4,
        effects: <div className="effectsText">Gain 1 <Explore/> for each <Shiny/> (max 4).</div>,
        points: 1
    },
    lockPick: {
        cardName: "Lock Pick",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 2,
        effects: <div className="effectsText"> <Discard/> <Arrow/> <Coin/> <Coin/> <Coin/>.</div>,
        points: 2
    },
    parrot: {
        cardName: "Parrot",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 2,
        effects: <div className="effectsText"> <Discard/> <Arrow/> <Jewel/>.</div>,
        points: 2
    },
    boots: {
        cardName: "Boots",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemWalk,
        cost: 1,
        effects: <div className="effectsText"> First pay to progress in a legend, then <Explore/> <Explore/> </div>,
        points: 2
    },
    pocketWatch: {
        cardName: "Pocket Watch",
        background: BACKGROUNDS.itemShip,
        type: CARD_TYPE.item,
        cost: 3,
        effects: <div className="effectsText"> <Coin/> and if this was the last card in your hand, gain extra <Coin/> <Coin/> </div>,
        points: 2
    },
    grapplingHook: {
        cardName: "Grappling Hook",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 4,
        effects: <div className="effectsText"> You may use the effect of an empty location. </div>,
        points: 1
    },
    camouflagePaint: {
        cardName: "Camouflage Paint",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        cost: 4,
        effects: <div className="effectsText"> You may use the effect of a location used by an opponent.</div>,
        points: 1
    },
    tent: {
        cardName: "Tent",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemPlane,
        cost: 4,
        effects: <div className="effectsText"> Use the effect of a location already occupied by your <Adventurer/> </div>,
        points: 1,
    },
    fishingRod: {
        cardName: "FishingRod",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 4,
        effects: <div className="effectsText"> Reveal the top card of the Item deck.<br/>You may buy any Item with discount of <Coin/> <Coin/> </div>,
        points: 1
    },
    compass: {
        cardName: "Compass",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 2,
        effects:
            <div className="effectsText"> Reveal the top card of the Artifact deck. <br/>You may buy any Artifact with discount of <Explore/> <Explore/>  </div>,
        points: 1
    },
    flintPistol: {
        cardName: "Flint Pistol",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        cost: 4,
        effects:
            <div className="effectsText"> Defeat <Guardian/> in your play area or discard pile.</div>,
        points: 1
    },
    bowAndArrows: {
        cardName: "Bow and Arrows",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        cost: 4,
        effects:
            <div className="effectsText"><Explore/> plus <Explore/> for each <Guardian/> in your Play Area and Discard Pile.</div>,
        points: 1
    },
    messengerPidgeon: {
        cardName: "Messenger Pidgeon",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        cost: 3,
        effects:
            <div className="effectsText">Gain <Text/> and you may draw any card from your Discard Pile.</div>,
        points: 2
    },
    whip: {
        cardName: "Whip",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        cost: 2,
        effects:
            <div className="effectsText">Gain an Artifact then destroy this card.</div>,
        points: 2
    },
    bookOfMyths: {
        cardName: "Book of Myths",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 2,
        effects:
            <div className="effectsText">Progress in a Legend then destroy this card.</div>,
        points: 2
    },
    bag: {
        cardName: "Bag",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 2,
        effects:
            <div className="effectsText">Gain an Item to your hand then destroy this card.</div>,
        points: 2
    },
    floraSamples: {
        cardName: "Flora Samples",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        cost: 2,
        effects:
            <div className="effectsText">(H)</div>,
        points: 2
    },
    boomerang: {
        cardName: "Boomerang",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        cost: 3,
        effects:
            <div className="effectsText"><Walk /> <Draw1Card /> <Discard />.</div>,
        points: 3
    },
    beetleMask: {
        cardName: "Beetle Mask",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 3,
        effects:
            <div className="effectsText">Remove <Guardian/> in your Play Area or Discard Pile from the game.</div>,
        points: 4
    },
    hook: {
        cardName: "Hook",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        cost: 2,
        effects:
            <div className="effectsText"><DestroyCard /></div>,
        points: 3
    },
});

const CARD_EFFECT = Object.freeze({
    drawCard: "draw a card",
    returnHome: "return one deployed hunter home",
    jeep: "gain 1 travel on the land",
    ship: "gain 1 travel on the sea",
    walk: "gain 1 short travel",
    explore: "gain 1 explore",
    coin: "gain 1 coin",

});
