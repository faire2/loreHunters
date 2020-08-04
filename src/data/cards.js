import React from "react";
import {
    AdventurerIcon,
    Arrow,
    Artifact,
    Blimp,
    BronzeRelic,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Discard,
    Draw1Card,
    Draw2Cards,
    Draw3Cards,
    Explore,
    Fear,
    Guardian,
    Item,
    Jeep,
    Jewel,
    LocationL1,
    LocationL2,
    Ship,
    Text,
    VictoryPoints,
    Walk,
    Weapon
} from "../components/Symbols.js";
import seaTurtleImg from "../img/cardImages/items/turtle.png"
import ostrichImg from "../img/cardImages/items/ostrich.png"
import packDonkeyImg from "../img/cardImages/items/packDonkey.png"
import horseImg from "../img/cardImages/items/horse.png"
import dogImg from "../img/cardImages/items/dog.png"
import canoeImg from "../img/cardImages/items/canoe.png"
import jeepImg from "../img/cardImages/items/jeep.png"
import bootsImg from "../img/cardImages/items/boots.png"
import hotAirBalloonImg from "../img/cardImages/items/balloon.png"
import airPlaneImg from "../img/cardImages/items/airPlane.png"
import goldPanImg from "../img/cardImages/items/goldPan.png"
import trowelImg from "../img/cardImages/items/trowel.png"
import pickaxeImg from "../img/cardImages/items/pickaxe.png"
import journalImg from "../img/cardImages/items/journal.png"
import parrotImg from "../img/cardImages/items/parrot.png"
import pocketWatchImg from "../img/cardImages/items/pocketWatch.png"
import grapplingHookImg from "../img/cardImages/items/grapplingHook.png"
import binocularsImg from "../img/cardImages/items/binoculars.jpg"
import revolverImg from "../img/cardImages/items/revolver.jpg"
/*import camouflagePaintImg from "../img/cardImages/items/camouflagePaint.png"*/
import tentImg from "../img/cardImages/items/tent.png"
import fishingRodImg from "../img/cardImages/items/fishingRod.png"
import compassImg from "../img/cardImages/items/compass.png"
import bowAndArrowsImg from "../img/cardImages/items/bowAndArrows.png"
import messengerPidgeonImg from "../img/cardImages/items/pidgeon.png"
import whipImg from "../img/cardImages/items/whip.png"
import bookOfMythsImg from "../img/cardImages/items/bookOfMyths.png"
import bagImg from "../img/cardImages/items/bag.png"
import flaskImg from "../img/cardImages/items/flask.png"
import beartrapImg from "../img/cardImages/items/beartrap.png"
import airmailImg from "../img/cardImages/items/airmail.png"
/*import floraSamplesImg from "../img/cardImages/items/floraSamples.png"*/
import torchImg from "../img/cardImages/items/torch.png"
import machetteImg from "../img/cardImages/items/machete.png"
/*import mirrorShardImg from "../img/cardImages/artifacts/mirrorShard.png"*/
import pathFinderStaffImg from "../img/cardImages/artifacts/pathFinderStaff.png"
import cursedTreasureImg from "../img/cardImages/artifacts/cursedTreasure.png"
import darkKnowledgeImg from "../img/cardImages/artifacts/darkKnowledge.png"
import baneBanisherImg from "../img/cardImages/artifacts/blade.png"
import warMaskImg from "../img/cardImages/artifacts/warMask.png"
import beastKillerImg from "../img/cardImages/artifacts/beastKiller.png"
import flameJewelImg from "../img/cardImages/artifacts/flameJewel.png"
import inscribedBladeImg from "../img/cardImages/artifacts/inscribedBlade.png"
import transmutationImg from "../img/cardImages/artifacts/transmutation.png"
import owlEyesImg from "../img/cardImages/artifacts/owlEyes.png"
import magicDoor from "../img/cardImages/artifacts/magicDoor.gif"


import {EFFECT} from "./effects.mjs";
import {
    FirstLegendToken,
    Flash,
    GainAction,
    GoldRelic,
    PlaceAdventurer,
    SecondLegendToken,
    Treasure
} from "../components/Symbols";
import {CARD_TYPE} from "../components/functions/enums";


export const CARD_TRANSPORT = Object.freeze({
    empty: "no transport",
    walk: "hike",
    jeep: "jeep",
    ship: "ship",
    plane: "plane",
});

const bigIconsStyle = {
    fontSize: "1.2vw",
};

/*const lockEffectsStyle = {
    height: "100%",
    width: "auto"
};

const columnStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "auto",
};

const rowStyle = {
  display: "flex",
  flexFlow: "row",  
};*/

export const ITEMS = Object.freeze({
    fear: {
        id: "fear",
        cardName: "Fear",
        transport: CARD_TRANSPORT.walk,
        transportAmount: 1,
        effectsText: "",
        effects: [EFFECT.gainWalk, EFFECT.gainAction],
        cost: 0,
        points: -1
    },
    coin: {
        id: "coin",
        cardName: "Coin",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/><GainAction/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainAction],
        cost: 0,
        points: 0
    },
    explore: {
        id: "explore",
        cardName: "Explore",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><GainAction/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainAction],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        id: "seaTurtle",
        cardName: "Sea Turtle",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effectsText: <div className="effectsText">&nbsp;<PlaceAdventurer/> with a discount of <Ship/>. Then <Draw1Card/>.
        </div>,
        effects: [EFFECT.draw1, EFFECT.placeToGreenLocation],
        image: seaTurtleImg,
        cost: 3,
        points: 1
    },
    ostrich: {
        id: "ostrich",
        cardName: "Ostrich",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div className="effectsText">&nbsp;<PlaceAdventurer/> with a discount of <Jeep/>. Then <Draw1Card/>.
        </div>,
        effects: [EFFECT.draw1, EFFECT.placeToBrownLocation],
        image: ostrichImg,
        cost: 3,
        points: 1
    },
    /*camel: {
        id: "camel",
        cardName: "Camel", transport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Draw1Card/> and <Coin/><Coin/></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 1
    },*/
    packDonkey: {
        id: "packDonkey",
        cardName: "Pack Donkey",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw2Cards/></div>,
        effects: [EFFECT.draw2],
        image: packDonkeyImg,
        cost: 4,
        points: 2
    },
    horse: {
        id: "horse",
        cardName: "Horse",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw1Card/><Coin/><Explore/></div>,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainCoin],
        image: horseImg,
        cost: 4,
        points: 1
    },
    steamBoat: {
        id: "steamBoat",
        cardName: "Steam Boat",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><GainAction/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainAction],
        image: canoeImg,
        cost: 2,
        points: 2
    },
    jeep: {
        id: "jeep",
        cardName: "Automobile",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><GainAction/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainAction],
        image: jeepImg,
        cost: 2,
        points: 2
    },
    /*astrolabe: {
        id: "astrolabe",
        cardName: "Astrolabe", transport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Ship/> <Explore/> <Explore/></div>,
        effects: [EFFECT.gainShip, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 3,
        points: 1
    },*/
    boots: {
        id: "boots",
        cardName: "Buckskin Boots",
        transport: CARD_TRANSPORT.walk,
        transportAmount: 2,
        effectsText: <div className="effectsText">&nbsp;<PlaceAdventurer/> with a discount of <Walk/>. Then <Draw1Card/>.
        </div>,
        effects: [EFFECT.gainExplore, EFFECT.placeToBasicLocation],
        image: bootsImg,
        cost: 1,
        points: 1
    },
    goldPan: {
        id: "goldPan",
        cardName: "Gold Pan",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/><Coin/><GainAction/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainAction],
        image: goldPanImg,
        cost: 1,
        points: 1
    },
    trowel: {
        id: "trowel",
        cardName: "Trowel",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Arrow/><Jewel/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainJewel],
        image: trowelImg,
        cost: 1,
        points: 1
    },
    pickaxe: {
        id: "pickaxe",
        cardName: "Pickaxe",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Arrow/><Weapon/><Text/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainText, EFFECT.gainWeapon],
        image: pickaxeImg,
        cost: 1,
        points: 1
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        cardName: "Hot Air Baloon",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><PlaceAdventurer/> with a <b>discount</b> of <Blimp/>. If discovering
            a new site, you may exile this card for a discount of <Explore/><Explore/><Explore/>.</div>,
        effects: [EFFECT.exploreAnyLocationWithBaloon], //pozor na update efektu, je vyhodnocen v sekci pro explore lokaci
        image: hotAirBalloonImg,
        cost: 2,
        points: 1
    },
    airplane: {
        id: "airplane",
        cardName: "Airplane",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effectsText: <div className="effectsText"><PlaceAdventurer/> with a <b>discount</b> of <Blimp/>, plus a discount
            of <Explore/><Explore/> if discovering a new location.</div>,
        effects: [EFFECT.exploreAnyLocationWithDiscount2],
        image: airPlaneImg,
        cost: 4,
        points: 2
    },
    /*spyglass: {
        id: "spyglass",
        cardName: "Spyglass", transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">1x: <Explore/> <Explore/> <Arrow/> <Shiny/></div>,
        effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainRelic],
        effects2Text: <div className="effectsText"><Jeep/> <Jeep/></div>,
        effects2: [EFFECT.gainJeep, EFFECT.gainJeep],
        cost: 1,
        points: 1
    },
    hammock: {
        id: "hammock",
        cardName: "Hammock", transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">Refresh <AdventurerIcon/> and <Uptrade/></div>,
        effects2Text: [EFFECT.refreshAdventurer, EFFECT.uptrade],
        cost: 1,
        points: 1
    },
    coffee: {
        id: "coffee",
        cardName: "Coffee", transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Draw2Cards/><Discard/> and refresh all you <AdventurerIcon/></div>,
        effects: [EFFECT.draw2, EFFECT.discard, EFFECT.refreshAllAdventurers],
        cost: 2,
        points: 1
    },
    banjo: {
        id: "banjo",
        cardName: "Banjo", transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">Gain 1 <Coin/> for each Legend you claimed.</div>,
        effects: [EFFECT.gainCoinForLegends],
        cost: 2,
        points: 1
    },*/
    parrot: {
        id: "parrot",
        cardName: "Parrot",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Discard/><Arrow/><Jewel/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainJewel],
        image: parrotImg,
        cost: 2,
        points: 2
    },
    pocketWatch: {
        id: "pocketWatch",
        cardName: "Pocket Watch",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b>
            <Coin/><Coin/><GainAction/> or <Coin/><Coin/><Coin/> and <b>pass</b> this round.</div>,
        effects: [EFFECT.gain2CoinsOrPassAnd3],
        image: pocketWatchImg,
        cost: 2,
        points: 1
    },
    grapplingHook: {
        id: "grapplingHook",
        cardName: "Grappling Hook",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Draw3Cards/>, keep 1. Discard rest with no effect.</div>,
        effects: [EFFECT.draw3keep1],
        image: grapplingHookImg,
        cost: 2,
        points: 2
    },
    binoculars: {
        id: "binoculars",
        cardName: "Binoculars",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Flash/><b>Activate</b> any empty <LocationL2/></div>,
        effects: [EFFECT.activateEmptyL2Location],
        image: binocularsImg,
        cost: 3,
        points: 1
    },
    /*camouflagePaint: {
        id: "camouflagePaint",
        cardName: "Camouflage Paint",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Activate:</b> <LocationL1/> or <LocationL2/> occupied by the
            opponent.</div>,
        effects: [EFFECT.useOpponentsLocation],
        image: camouflagePaintImg,
        cost: 3,
        points: 1
    },*/
    tent: {
        id: "tent",
        cardName: "Tent",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Activate:</b> site that you currently occupy.
        </div>,
        effects: [EFFECT.activateYourLocation],
        image: tentImg,
        cost: 4,
        points: 1,
    },
    fishingRod: {
        id: "fishingRod",
        cardName: "FishingRod",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText">Buy <Item/> with discount of <Coin/><Coin/><Coin/>, <b>include</b> the
            top card of the deck.
        </div>,
        effects: [EFFECT.revealItemBuyWithDiscount3],
        image: fishingRodImg,
        cost: 2,
        points: 1
    },
    compass: {
        id: "compass",
        cardName: "Compass",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effectsText:
            <div className="effectsText">Buy <Artifact/> with discount of <Explore/><Explore/><Explore/>, <b>include</b>
                the top card of the deck.</div>,
        effects: [EFFECT.revealArtifactBuyWithDiscount3],
        image: compassImg,
        cost: 3,
        points: 1
    },
    /*flintPistol: {
        id: "flintPistol",
        cardName: "Flint Pistol", transport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText"> Defeat <Guardian/> in your play area or discard pile.</div>,
        effects: [EFFECT.defeatGuardian],
        cost: 4,
        points: 1
    },*/
    bowAndArrows: {
        id: "bowAndArrows",
        cardName: "Bow and Arrows",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText">Gain <Explore/> for each <Guardian/> you have defeated and
            each <Guardian/>
            you are facing, up to 3.</div>,
        effects: [EFFECT.gainExploreForGuardians],
        image: bowAndArrowsImg,
        cost: 2,
        points: 2
    },
    messengerPidgeon: {
        id: "messengerPidgeon",
        cardName: "Carrier Pidgeon",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Text/><Text/><GainAction/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainAction],
        image: messengerPidgeonImg,
        cost: 2,
        points: 2
    },
    whip: {
        id: "whip",
        cardName: "Whip",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Exile this card to gain <Artifact/> for free.</div>,
        effects: [EFFECT.destroyThisCard, EFFECT.gainArtifact],
        image: whipImg,
        cost: 2,
        points: 1
    },
    bookOfMyths: {
        id: "bookOfMyths",
        cardName: "Rough Map",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText">Exile this card to gain <Explore/><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyThisCard],
        image: bookOfMythsImg,
        cost: 1,
        points: 1
    },
    airmail: {
        id: "airmail",
        cardName: "Airdrop",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText">Exile this card to gain <Item/> to your hand for free.</div>,
        effects: [EFFECT.gainItemToHand, EFFECT.destroyThisCard],
        image: airmailImg,
        cost: 2,
        points: 1
    },
    flask: {
        id: "flask",
        cardName: "Flask",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText">Exile this card to <Draw1Card/><Draw1Card/><Draw1Card/></div>,
        effects: [EFFECT.draw1, EFFECT.draw1, EFFECT.draw1, EFFECT.destroyThisCard],
        image: flaskImg,
        cost: 2,
        points: 1
    },
    machete: {
        id: "machete",
        cardName: "Machete",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><DestroyCard/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyCard],
        image: machetteImg,
        cost: 3,
        points: 1
    },
    /*beetleMask: {
        id: "beetleMask",
        cardName: "Beetle Mask", transport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText">Remove <Guardian/> in your Play Area or Discard Pile from the game.</div>,
        effects: [EFFECT.removeGuardian],
        cost: 3,
        points: 4
    },*/
    torch: {
        id: "torch",
        cardName: "Torch",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Text/><DestroyCard/></div>,
        effects: [EFFECT.gainText, EFFECT.destroyCard],
        image: torchImg,
        cost: 1,
        points: 1
    },
    /*floraSamples: {
        id: "floraSamples",
        cardName: "Flora Samples",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Text/> for each <AdventurerIcon/> in a jungle location.
        </div>,
        effects: [EFFECT.gainTextInJungle],
        image: floraSamplesImg,
        cost: 1,
        points: 1
    },*/
    bag: {
        id: "bag",
        cardName: "Large Backpack",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Explore/>. Draw a card from the bottom of you bag.
        </div>,
        effects: [EFFECT.gainExplore, EFFECT.drawFromBottom],
        image: bagImg,
        cost: 2,
        points: 1
    },
    rope: {
        id: "rope",
        cardName: "Rope",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText">Draw two cards. Keep one of them, discard the other.</div>,
        effects: [EFFECT.draw2keep1],
        image: null,
        cost: 1,
        points: 1
    },
    revolver: {
        id: "revolver",
        cardName: "revolver",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Arrow/><DefeatedGuardian/></div>,
        effects: [EFFECT.loseExplore, EFFECT.defeatGuardianOnOwnedLocation],
        image: revolverImg,
        cost: 3,
        points: 1
    },
    hat: {
        id: "hat",
        cardName: "Hat",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/><Explore/><GainAction/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.gainAction],
        cost: 1,
        points: 1
    },
    beartrap: {
        id: "beartrap",
        cardName: "Beat Trap",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText">Exile this card to <DefeatedGuardian/> on any site that is currently
            not occupied by another player.</div>,
        effects: [EFFECT.gainCoin, EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        image: beartrapImg,
        cost: 2,
        points: 1
    },
    /*boomerang: {
        id: "boomerang",
        cardName: "Boomerang",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Discard/><Arrow/><Coin/><Explore/><Draw1Card/></div>,
        effects: [EFFECT.discard, EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainExplore,],
        image: boomerangImg,
        cost: 2,
        points: 1
    },*/
    armyKnife: {
        id: "armyKnife",
        cardName: "Army Knife",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Discard/><Arrow/><Draw1Card/><DestroyCard/></div>,
        effects: [EFFECT.discard, EFFECT.destroyCard, EFFECT.draw1],
        image: beartrapImg,
        cost: 2,
        points: 1
    },
    handLens: {
        id: "handLens",
        cardName: "Hand Lens",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText">Gain the <FirstLegendToken/> bonus of any two research track spaces
            you have already deciphered.</div>,
        effects: [EFFECT.gain2ResearchBonuses],
        image: beartrapImg,
        cost: 2,
        points: 2
    },
    dog: {
        id: "dog",
        cardName: "Dog",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div className="effectsText"><Explore/> and activate an unoccupied <LocationL1/></div>,
        effects: [EFFECT.activateEmptyL1Location],
        image: dogImg,
        cost: 3,
        points: 1
    },
    /*beerMug: {
        id: "beerMug",
        cardName: "Beer Mug",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> 1 <Explore/>. <b>Gain:</b> 1 <Coin/> for up to 3 <Guardian/> you defeated.</div>,
        effects: [EFFECT.gainCoinAndExploresForGuardians],
        image: beerMugImg,
        cost: 3,
        points: 2
    },*/
    journal: {
        id: "journal",
        cardName: "Journal",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText">Exile this card to progress with your <SecondLegendToken/></div>,
        effects: [EFFECT.destroyThisCard, EFFECT.progressWithSecondToken],
        image: journalImg,
        cost: 2,
        points: 1
    },
    philologyBook: {
        id: "philologyBook",
        cardName: "Philology book",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effectsText: <div className="effectsText">Gain <Explore/> for each <BronzeRelic/> you own, up to 3.</div>,
        effects: [EFFECT.gainExploreForRelics],
        image: journalImg,
        cost: 3,
        points: 3
    },
});

export const ARTIFACTS = Object.freeze({
    seaNecklace: {
        id: "seaNecklace",
        cardName: "Sea necklace",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Relocate</b> your <AdventurerIcon/> to a <LocationL1/>.</div>,
        effects: [EFFECT.moveAdvToL1Location],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 1
    },
    pathfinderStaff: {
        id: "pathfinderStaff",
        cardName: "Pathfinder's Staff",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effectsText:
            <div className="effectsText"><b>Relocate</b> your <AdventurerIcon/> to a <LocationL1/> or <LocationL2/>.
            </div>,
        effects: [EFFECT.moveAdvToL1L2Location],
        isGuarded: false,
        image: pathFinderStaffImg,
        cost: 4,
        points: 2
    },
    /*mirrorShard: {
        id: "mirrorShard",
        cardName: "Mirror shard",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Activate</b> another <Artifact/> in the offer.</div>,
        effects: [EFFECT.useArtifactOnMarket],
        isGuarded: true,
        image: mirrorShardImg,
        cost: 2,
        points: 2
    },*/
    /*portalStone: {
        id: "portalStone",
        cardName: "Portal stone",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Relocate</b> one of your deployed <AdventurerIcon style={{height: 1, backgroundColor: "black"}}/> to any empty
                <LocationL1/> or <LocationL2/>.</div>,
        effects: [EFFECT.moveAdvToEmptyLocation],
        isGuarded: false,
        image: portalStoneImg,
        cost: 4,
        points: 2
    },*/
    warMask: {
        id: "warMask",
        cardName: "War Mask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Weapon/>. Don't gain <Fear/> from <Guardian/> this round.</div>,
        effects: [EFFECT.gainWeapon, EFFECT.protectFromFear],
        isGuarded: false,
        image: warMaskImg,
        cost: 3,
        points: 2
    },
    jewelryBox: {
        id: "jewelryBox",
        cardName: "Jewelry box",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><Coin/></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        isGuarded: false,
        image: warMaskImg,
        cost: 4,
        points: 3
    },
    ritualDagger: {
        id: "ritualDagger",
        cardName: "Ritual Dagger",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><DestroyCard/><Weapon/></div>,
        effects: [EFFECT.destroyCard, EFFECT.gainWeapon],
        isGuarded: false,
        image: baneBanisherImg,
        cost: 4,
        points: 2
    },
     earRingOfLight: {
        id: "earRingOfLight",
        cardName: "Ring of Light",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Draw 3 cards, keep one, return one to the top of your deck, and discard one with
                no effect.</div>,
        effects: [EFFECT.draw3keep1stack1],
        isGuarded: false,
        image: null,
        cost: 4,
        points: 3
    },
    mortar: {
        id: "mortar",
        cardName: "Mortar",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><DestroyCard/><Arrow/><Coin/><Coin/></div>,
        effects: [EFFECT.destroyCardMandatory, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        image: transmutationImg,
        cost: 3,
        points: 1
    },
    cursedTreasure: {
        id: "cursedTreasure",
        cardName: "Cursed Treasure",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">You may gain <Fear/> to gain <Coin/><Coin/><Coin/><Coin/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        image: cursedTreasureImg,
        cost: 3,
        points: 2
    },
    darkKnowledge: {
        id: "darkKnowledge",
        cardName: "Dark Knowledge",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">You may gain <Fear/> to gain a <Jewel/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainJewel],
        isGuarded: false,
        image: darkKnowledgeImg,
        cost: 2,
        points: 2
    },
    amuletOfCharm: {
        id: "amuletOfCharm",
        cardName: "Amulet of Charm",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText">Gain <Item/> for free</div>,
        effects: [EFFECT.gainItem],
        cost: 3,
        points: 2
    },
    /* golemShem: {
         id: "golemShem",
         cardName: "Golem Shem",
         transport: CARD_TRANSPORT.plane,
         transportAmount: 1,
         effectsText:
             <div className="effectsText">For this round only: <AdventurerIcon/></div>,
         effects: [EFFECT.gainAdventurerForThisRound],
         cost: 3,
         points: 2
     },*/
    /*bookOfSecrets: {
        id: "bookOfSecrets",
        cardName: "Book of Secrets",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Gain a bonus from an unclaimed, visible legend.</div>,
        effects: [EFFECT.gainBonusFromUnclaimedLegend],
        cost: 1,
        points: 2
    },*/
    /*chestOfWonders: {
        id: "chestOfWonders",
        cardName: "Chest of Wonders",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Use the effect of an item on the market</div>,
        effects: [EFFECT.useItemOnMarket],
        cost: 2,
        points: 2
    },*/
    /*healingOrb: {
        id: "healingOrb",
        cardName: "Healing Orb",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Refresh all your <AdventurerIcon/>.</div>,
        effects: [EFFECT.refreshAdventurer],
        cost: 3,
        points: 2
    },*/
    /*mysteriousTexts: {
        id: "mysteriousTexts",
        cardName: "Mysterious Texts",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Draw2Cards/> and refresh <AdventurerIcon/></div>,
        effects: [EFFECT.draw2, EFFECT.refreshAdventurer],
        cost: 4,
        points: 2
    },*/
    /*goldenMask: {
        id: "goldenMask",
        cardName: "Golden Mask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Pay <Coin/> to gain effect of an occupied location.</div>,
        effects: [EFFECT.payTouseOccupiedLocation],
        cost: 4,
        points: 1
    },*/
    flameJewel: {
        id: "flameJewel",
        cardName: "Flame Jewel",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Research with a discount of <Jewel/></div>,
        effects: [EFFECT.progressWithJewel],
        isGuarded: false,
        image: flameJewelImg,
        cost: 3,
        points: 1
    },
    inscribedBlade: {
        id: "inscribedBlade",
        cardName: "Inscribed Blade",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><GainAction/><b>Discount</b> <Text/><Text/> of <Weapon/> to progress in a
                legend.</div>,
        effects: [EFFECT.progressWithTextsOrWeapon],
        isGuarded: false,
        image: inscribedBladeImg,
        cost: 2,
        points: 1
    },
    birdFlute: {
        id: "birdFlute",
        cardName: "Bird Flute",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effectsText:
            <div className="effectsText"><Coin/><Coin/><br/>All your travel icons count as <Blimp/> this  round.
            </div>,
        effects: [EFFECT.infinitePlanes],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    owlEyes: {
        id: "owlEyes",
        cardName: "Owl Eyes",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><DestroyCard/><br/> Activate an unoccupied <LocationL1/>.</div>,
        effects: [EFFECT.destroyCard, EFFECT.activateEmptyL1Location],
        isGuarded: false,
        image: owlEyesImg,
        cost: 4,
        points: 2
    },
    beastKiller: {
        id: "beastKiller",
        cardName: "Beast Killer",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><DefeatedGuardian/> on any site that is not occupied by another player.</div>,
        effects: [EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        isGuarded: false,
        image: beastKillerImg,
        cost: 5,
        points: 1
    },
    unknown1: {
        id: "unknown1",
        cardName: "unknown1",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Reveal the top tile of the <LocationL2/> stack, activate it, then put it to the bottom
            </div>,
        effects: [EFFECT.activateTopL2Location],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    unknown2: {
        id: "unknown2",
        cardName: "unknown2",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Reveal the top tile of the <LocationL2/> stack, activate it, then put it to the bottom
            </div>,
        effects: [EFFECT.activateTopL2Location],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    trophySkull: {
        id: "trophySkull",
        cardName: "Trophy skull",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Place used <BronzeRelic/> back to your pool.</div>,
        effects: [EFFECT.refreshRelic],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 1
    },
    huntingArrows: {
        id: "huntingArrows",
        cardName: "Hunting arrows",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Gain <Fear/> to gain <Weapon/><Weapon/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainWeapon, EFFECT.gainWeapon],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 1
    },
    /*forbiddenScrolls: {
        id: "forbiddenScrolls",
        cardName: "Forbidden scrolls",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Research</b> for free with your second token, then <b>destroy</b> this card
            </div>,
        effects: [EFFECT.destroyThisCard, EFFECT.progressWithSecondToken],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 0
    },*/
    cauldron: {
        id: "cauldron",
        cardName: "Cauldron",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><DestroyCard/>
            </div>,
        effects: [EFFECT.draw1, EFFECT.destroyCard],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    decoratedHorn: {
        id: "decoratedHorn",
        cardName: "Decorated horn",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Return an <AdventurerIcon/> back to your pool.</div>,
        effects: [EFFECT.returnAdventurer],
        isGuarded: false,
        image: magicDoor,
        cost: 2,
        points: 1
    },
    ornateHammer: {
        id: "ornateHammer",
        cardName: "Ornate hammer",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Exile rightmost <Item/> in the card row. Gain any <Item/> from the exile.</div>,
        effects: [EFFECT.gainDestroyedItem],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    boneRattle: {
        id: "boneRattle",
        cardName: "Bone Rattle",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Explore/><br/>Refresh silver assistant.</div>,
        effects: [EFFECT.gainExplore, EFFECT.refreshSilverAssistant],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 1
    },
    sacredDrum: {
        id: "sacredDrum",
        cardName: "Sacred drum",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Explore/><br/>Refresh any assistant.</div>,
        effects: [EFFECT.gainExplore, EFFECT.refreshAsistant],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    snakeBracelet: {
        id: "snakeBracelet",
        cardName: "Snake bracelet",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Place <AdventurerIcon/> on this card to gain the effect of two
            different <LocationL1/></div>,
        effects: [EFFECT.activate2L1Locations],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 2
    },
    /*fragileBlade: {
        id: "fragileBlade",
        cardName: "Fragile Blade",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><DefeatedGuardian/> on your or empty site then <b>destroy</b> this card.</div>,
        effects: [EFFECT.destroyThisCard, EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 0
    },*/
    /*drinkingHorn: {
        id: "drinkingHorn",
        cardName: "Drinking Horn",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><DestroyCard/><Discard/><Draw2Cards/></div>,
        effects: [EFFECT.removeCard, EFFECT.discardFor2Cards],
        cost: 2,
        points: 3
    },*/
    /*goldenMask: {
        id: "goldenMask",
        cardName: "Golden Mask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Activate</b> any occupied location. If the location is <LocationL3/>,
                pay <Coin/> first.</div>,
        effects: [EFFECT.activateOccupiedLocation],
        isGuarded: false,
        image: goldenMaskImg,
        cost: 3,
        points: 1
    },*/
    /*fearlessBlade: {
        id: "fearlessBlade",
        cardName: "Fearless Blade",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><DestroyCard/> <Weapon/></div>,
        effects: [EFFECT.removeCard, EFFECT.gainWeapon],
        cost: 2,
        points: 1
    },
    keysToAllDoors: {
        id: "keysToAllDoors",
        cardName: "Keys to all Doors",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Coin/> <Coin/> <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },*/
    giantEgg: {
        id: "giantEgg",
        cardName: "Mysterious Egg",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Move <Guardian/> from a site you occupy to any unocuppied
                <LocationL1/> or <LocationL2/>. Activate the site.</div>,
        effects: [EFFECT.moveGuardianOut],
        image: "",
        cost: 4,
        points: 2
    },
    earRingOfDarkness: {
        id: "earRingOfDarkness",
        cardName: "Earring of darkness",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Move <Guardian/> from a site you occupy to any unocuppied
                <LocationL1/> or <LocationL2/>. Activate the site.</div>,
        effects: [EFFECT.draw2keep1stack1],
        image: "",
        cost: 3,
        points: 2
    },
    unknown3: {
        id: "unknown3",
        cardName: "unknown3",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Exile <Item/> from your play area to gain <Item/><Item/>, each
            of the same or lower value than the exiled card.</div>,
        effects: [EFFECT.gain2ItemsFor1Exiled],
        image: "",
        cost: 2,
        points: 1
    },
    jewelDice: {
        id: "jewelDice",
        cardName: "Jewel Dice",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Gain a bonus from a random <GoldRelic/>. Then shuffle the relic back.</div>,
        effects: [EFFECT.gainRandomGoldRelicEffect],
        image: "",
        cost: 4,
        points: 2
    },
    hairPin: {
        id: "hairPin",
        cardName: "Hairpin",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Explore/><Coin/><br/>Exile any card from the offer and refill it.</div>,
        effects: [EFFECT.gainExplore, EFFECT.gainCoin, EFFECT.destroyCardInStore],
        image: "",
        cost: 3,
        points: 2
    },
});

export const EXPEDITIONS = Object.freeze({
    hiddenGems: {
        id: "hiddenGems",
        cardName: "Hidden Gems",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each <Item/> that cost only <Coin/></div>,
        points: 4,
    },
    secretPaths: {
        id: "secretPaths",
        cardName: "Secret Paths",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+ ?<VictoryPoints/> Score again 2 of <BronzeRelic/> that you placed</div>,
        points: 0
    },
    rareFinds: {
        id: "rareFinds",
        cardName: "Rare Finds",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+ ?<VictoryPoints/> equal to <VictoryPoints/> on one of your <Item/> and one of
                your <Artifact/>.</div>,
        points: 2,
    },
    fullyEquipped: {
        id: "fullyEquipped",
        cardName: "Fully Equipped",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+ 1 <VictoryPoints/> for each 2 cards in your deck.</div>,
        points: 0,
    },
    trophyHunter: {
        id: "trophyHunter",
        cardName: "Trophy Hunter",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each defeated <Guardian/></div>,
        points: 3,
    },
    trustedGear: {
        id: "trustedGear",
        cardName: "Trusted Gear",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for up to 7 <Item/> in your deck.</div>,
        points: 1,
    },
    collector: {
        id: "collector",
        cardName: "Collector",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for up to 7 <Artifact/> in your deck.</div>,
        points: 2,
    },
    cartographer: {
        id: "cartographer",
        cardName: "Cartographer",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each <BronzeRelic/> you own.</div>,
        points: 3,
    },
    fearless: {
        id: "fearless",
        cardName: "Fearless",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+6 <VictoryPoints/> if you have no <Fear/> in you deck. +2 <VictoryPoints/> if
                you have only one.</div>,
        points: 1,
    },
    beyondBasics: {
        id: "beyondBasics",
        cardName: "Beyond Basics",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPoints/> for each Explore and Gold card you destroyed during the
                game.</div>,
        points: 1,
    },
    quantityAboveAll: {
        id: "quantityAboveAll",
        cardName: "Quantity Above All",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPoints/> for up to 4 <Item/> that costs <Coin/><Coin/><Coin/> or
                more.</div>,
        points: 0,
    },
    belongsToTheMuseum: {
        id: "belongsToTheMuseum",
        cardName: "Belongs to the Museum",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPoints/> for each <Artifact/> that
                costs <Explore/><Explore/><Explore/> or more.</div>,
        points: 0,
    },
    guardedTreasure: {
        id: "guardedTreasure",
        cardName: "Guarded Treasure",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each guarded <Artifact/>.</div>,
        points: 4,
    },
    checkMyResults: {
        id: "checkMyResults",
        cardName: "Check My Results",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each step you progressed with your 2nd book.</div>,
        points: 2,
    },
    holyGrail: {
        id: "holyGrail",
        cardName: "Holy Grail!",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+7 <VictoryPoints/> if you own <Treasure/></div>,
        points: 0,
    },
    powerfulDestruction: {
        id: "powerfulDestruction",
        cardName: "Powerful destruction",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each <Item/> or <Artifact/> that you own which
                has <DestroyCard/> ability.</div>,
        points: 4,
    },
    animalLover: {
        id: "animalLover",
        cardName: "Animal Lover",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each animal in you deck.</div>,
        points: 2,
    },
    teamWork: {
        id: "teamWork",
        cardName: "Team Work",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+3 <VictoryPoints/> for each assistant you gained.</div>,
        points: 1,
    },
    tradingKnowledge: {
        id: "tradingKnowledge",
        cardName: "Trading Knowledge",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each <BronzeRelic/> that you placed in the first 3
                rows.</div>,
        points: 4,
    },
    touchTheSkies: {
        id: "touchTheSkies",
        cardName: "Touch the Skies",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each <Blimp/> generated by your cards of assistants.
            </div>,
        points: 1,
    },
});


