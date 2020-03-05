import {BACKGROUNDS} from "../components/global/Card";
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


export const CARD_STATE = Object.freeze({
    active: "active card",
    destroyed: "destroyed card",
    discard: "card is discarded",
    drawDeck: "card in draw deck",
    inHand: "card is in hand",
    inStore: "card is in store",
});

export const CARD_TYPE = Object.freeze({
    item: "item",
    artifact: "artifact",
    basic: "basic",
    guardian: "guardian"
});

export const RES = Object.freeze({
    coin: "coin",
    explore: "explore",
    text: "text"
});

/*const MOVEMENT = Object.freeze({
    walk: <img src={sWalk} className="movementSymbol mx-auto"/>,
    drive: <img src={sJeep} className="movementSymbol mx-auto"/>,
    sail: <img src={sShip} className="movementSymbol mx-auto"/>,
    fly: <img src={sPlane} className="movementSymbol mx-auto"/>
});*/

export const EFFECT = Object.freeze({
    buyArtifact: "buy and artifact with a discount",
    destroyCard: "pick a card to destroy",
    destroyGuardian: "destroy a guardian",
    destroyThisCard: "destroy this card",
    draw1: "draw a card",
    draw2: "draws 2 cards",
    drawFromDiscard: "draw a card from your discard pile",
    discard: "discard a card",
    gainCoin: "gain a coin",
    gainCoinForLegends: "gain a coin for each legend",
    gainCoinForGuardians: "gain a coin for each destroyed Guardian (max. 4)",
    gainCoinsIfLast: "if this was last card, gain 2 coins",
    gainExplore: "gain an explore",
    gainExploreForShinys: "gain an explore for each shiny (max. 4)",
    gainExploreForGuardians: "gain an explore for each guardian in you play area",
    gainText: "gain a text",
    gainWeapon: "gain a weapon",
    gainJewel: "gain a jewel",
    gainShiny: "gain a shiny",
    gainItemToHand: "gain an item to your hand",
    gainArtifact: "gain an artifact",
    loseCoin: "lose a coin",
    loseExplore: "lose an explore",
    loseText: "lose a text",
    loseWeapon: "lose a weapon",
    loseJewel: "lose a jewel",
    progress: "progress in a legend",
    progressForFree: "progress in a legendForFree",
    removeGuardian: "remove a guardian from play",
    revealItemBuyWithDiscount: "buy an item with discount",
    travelWalk: "travel on foot",
    travelJeep: "travel with a jeep",
    travelShip: "travel with a ship",
    travelPlane: "travel with an airplane",
    return: "return adventurer home",
    useEmptyLocation: "use an empty location",
    useOpponentsLocation: "use a location occupied by an opponent",
    useYourLocation: "use a location occupied by you",


});

export const CARDS = Object.freeze({
    fear: {
        cardName: "Fear",
        type: CARD_TYPE.basic,
        background: BACKGROUNDS.itemWalk,
        cost: 0,
        effectsText: "",
        points: -1
    },
    coin: {
        cardName: "Coin",
        type: CARD_TYPE.basic,
        background: BACKGROUNDS.itemJeep,
        effectsText: <Coin/>,
        effects: [EFFECT.gainCoin],
        cost: 0,
        points: 0
    },
    explore: {
        cardName: "Explore",
        type: CARD_TYPE.basic,
        background: BACKGROUNDS.itemShip,
        effectsText: <Explore/>,
        effects: [EFFECT.gainExplore],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        cardName: "Sea Turtle",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemEmpty,
        effectsText: <div className="effectsText"><Draw1Card/> and <Ship/></div>,
        effects: [EFFECT.draw1, EFFECT.travelShip],
        cost: 2,
        points: 1
    },
    ostrich: {
        cardName: "Ostrich",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemEmpty,
        effectsText: <div className="effectsText"><Draw1Card/> and <Jeep/></div>,
        effects: [EFFECT.draw1, EFFECT.travelJeep],
        cost: 2,
        points: 1
    },
    camel: {
        cardName: "Camel",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <div className="effectsText"><Draw1Card/> and <Coin/></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        cost: 2,
        points: 1
    },
    packDonkey: {
        cardName: "Pack Donkey",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <Draw2Cards/>,
        effects: [EFFECT.draw2],
        cost: 3,
        points: 1
    },
    horse: {
        cardName: "Horse",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <div className="effectsText"><Draw1Card/> and return <Adventurer/> back home. </div>,
        effects: [EFFECT.draw1, EFFECT.return],
        cost: 4,
        points: 1
    },
    dog: {
        cardName: "Dog",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <div className="effectsText"><Draw1Card/> and <Explore/>. </div>,
        effects: [EFFECT.draw1, EFFECT.gainExplore],
        cost: 2,
        points: 1
    },
    canoe: {
        cardName: "Canoe",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemEmpty,
        effectsText: <div className="effectsText"><Explore/> <Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        effects2Text: <div className="effectsText"><Ship/> <Ship/></div>,
        effects2: [EFFECT.travelShip, EFFECT.travelShip],
        cost: 3,
        points: 1
    },
    jeep: {
        cardName: "Jeep",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemEmpty,
        effectsText: <div className="effectsText"><Explore/> <Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        effects2Text: <div className="effectsText"><Jeep/> <Jeep/></div>,
        effects2: [EFFECT.travelJeep, EFFECT.travelJeep],
        cost: 3,
        points: 1
    },
    astrolabe: {
        cardName: "Astrolabe",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemEmpty,
        effectsText: <div className="effectsText"><Ship/> <Explore/> <Explore/></div>,
        effects: [EFFECT.travelShip, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 3,
        points: 1
    },
    hotAirBaloon: {
        cardName: "Hot Air Baloon",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemEmpty,
        effectsText: <div className="effectsText"><Plane/> <Explore/></div>,
        effects: [EFFECT.travelPlane, EFFECT.gainExplore],
        cost: 2,
        points: 1
    },
    Airplane: {
        cardName: "Airplane",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemPlane,
        effectsText: <div className="effectsText"><Plane/> <Explore/></div>,
        effects: [EFFECT.travelPlane, EFFECT.gainExplore],
        cost: 5,
        points: 2
    },
    jewel: {
        cardName: "Jewel",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"><Coin/> <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },
    hat: {
        cardName: "Hat",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"><Explore/> <Text/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainText],
        cost: 1,
        points: 1
    },
    trowel: {
        cardName: "Trowel",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <div className="effectsText">1x: <Explore/> <Arrow/> <Jewel/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainJewel],
        cost: 1,
        points: 1
    },
    pickaxe: {
        cardName: "Pickaxe",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <div className="effectsText">1x: <Explore/> <Arrow/> <Weapon/> <Text/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainText, EFFECT.gainWeapon],
        cost: 1,
        points: 1
    },
    spyglass: {
        cardName: "Spyglass",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText">1x: <Explore/> <Explore/> <Arrow/> <Shiny/></div>,
        effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainShiny],
        effects2Text: <div className="effectsText"><Jeep/> <Jeep/></div>,
        effects2: [EFFECT.travelJeep, EFFECT.travelJeep],
        cost: 1,
        points: 1
    },
    /*hammock: {
        cardName: "Hammock",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"><Draw1Card/></div>,
        effects2Text: /!* (H) *!/"",
        cost: 2,
        points: 1
    },*/
    coffee: {
        cardName: "Coffee",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText">Return <Adventurer/> back home.</div>,
        effects: [EFFECT.return],
        cost: 2,
        points: 1
    },
    banjo: {
        cardName: "Banjo",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText">Gain 1 <Coin/> for each Legend you started.</div>,
        effects: [EFFECT.gainCoinForLegends],
        cost: 1,
        points: 1
    },
    beerMug: {
        cardName: "Beer Mug",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <div className="effectsText">Gain 1 <Coin/> for each <Guardian/> you defeated (max 4).</div>,
        effects: [EFFECT.return],
        cost: 2,
        points: 2
    },
    journal: {
        cardName: "Journal",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText">Gain 1 <Explore/> for each <Shiny/> (max 4).</div>,
        effects: [EFFECT.gainExploreForShinys],
        cost: 4,
        points: 1
    },
    lockPick: {
        cardName: "Lock Pick",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"><Discard/> <Arrow/> <Coin/> <Coin/> <Coin/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 2,
        points: 2
    },
    parrot: {
        cardName: "Parrot",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"><Discard/> <Arrow/> <Jewel/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainJewel],
        cost: 2,
        points: 2
    },
    boots: {
        cardName: "Boots",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemWalk,
        effectsText: <div className="effectsText"> First pay to progress in a legend, then <Explore/> <Explore/></div>,
        effects: [EFFECT.progress, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 1,
        points: 2
    },
    pocketWatch: {
        cardName: "Pocket Watch",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"><Coin/> and if this was the last card in your hand, gain extra <Coin/>
            <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoinsIfLast],
        cost: 3,
        points: 2
    },
    grapplingHook: {
        cardName: "Grappling Hook",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"> You may use the effect of an empty location. </div>,
        effects: [EFFECT.useEmptyLocation],
        cost: 4,
        points: 1
    },
    camouflagePaint: {
        cardName: "Camouflage Paint",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText: <div className="effectsText"> You may use the effect of a location used by an opponent.</div>,
        effects: [EFFECT.useOpponentsLocation],
        cost: 4,
        points: 1
    },
    tent: {
        cardName: "Tent",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemPlane,
        effectsText: <div className="effectsText"> Use the effect of a location already occupied by your <Adventurer/>
        </div>,
        effects: [EFFECT.useYourLocation],
        cost: 4,
        points: 1,
    },
    fishingRod: {
        cardName: "FishingRod",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText: <div className="effectsText"> Reveal the top card of the Item deck.<br/>You may buy any Item with
            discount of <Coin/> <Coin/></div>,
        effects: [EFFECT.revealItemBuyWithDiscount],
        cost: 4,
        points: 1
    },
    compass: {
        cardName: "Compass",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText:
            <div className="effectsText"> Reveal the top card of the Artifact deck. <br/>You may buy any Artifact with
                discount of <Explore/> <Explore/></div>,
        effects: [EFFECT.buyArtifact],
        cost: 2,
        points: 1
    },
    flintPistol: {
        cardName: "Flint Pistol",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText:
            <div className="effectsText"> Defeat <Guardian/> in your play area or discard pile.</div>,
        effects: [EFFECT.destroyGuardian],
        cost: 4,
        points: 1
    },
    bowAndArrows: {
        cardName: "Bow and Arrows",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText:
            <div className="effectsText"><Explore/> plus <Explore/> for each <Guardian/> in your Play Area and Discard
                Pile.</div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExploreForGuardians],
        cost: 4,
        points: 1
    },
    messengerPidgeon: {
        cardName: "Messenger Pidgeon",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText:
            <div className="effectsText">Gain <Text/> and you may draw any card from your Discard Pile.</div>,
        effects: [EFFECT.gainText, EFFECT.drawFromDiscard],
        cost: 3,
        points: 2
    },
    whip: {
        cardName: "Whip",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText:
            <div className="effectsText">Gain an Artifact then destroy this card.</div>,
        effects: [EFFECT.gainArtifact, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    bookOfMyths: {
        cardName: "Book of Myths",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText:
            <div className="effectsText">Progress in a Legend then destroy this card.</div>,
        effects: [EFFECT.progressForFree, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    bag: {
        cardName: "Bag",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText:
            <div className="effectsText">Gain an Item to your hand then destroy this card.</div>,
        effects: [EFFECT.gainItemToHand, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    /*floraSamples: {
        cardName: "Flora Samples",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText:
            <div className="effectsText">(H)</div>,
        cost: 2,
        points: 2
    },*/
    boomerang: {
        cardName: "Boomerang",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemJeep,
        effectsText:
            <div className="effectsText"><Walk/> <Draw1Card/> <Discard/>.</div>,
        effects: [EFFECT.travelWalk, EFFECT.draw1, EFFECT.discard],
        cost: 3,
        points: 3
    },
    beetleMask: {
        cardName: "Beetle Mask",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText:
            <div className="effectsText">Remove <Guardian/> in your Play Area or Discard Pile from the game.</div>,
        effects: [EFFECT.removeGuardian],
        cost: 3,
        points: 4
    },
    hook: {
        cardName: "Hook",
        type: CARD_TYPE.item,
        background: BACKGROUNDS.itemShip,
        effectsText:
            <div className="effectsText"><DestroyCard/></div>,
        effects: [EFFECT.destroyCard],
        cost: 2,
        points: 3
    },
});