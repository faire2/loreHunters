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
    LocationL3,
    Ship,
    Text,
    VictoryPoints,
    Walk,
    Weapon
} from "../components/Symbols.js";
import boomerangImg from "../img/cardImages/items/boomerang.png"
import seaTurtleImg from "../img/cardImages/items/turtle.png"
import ostrichImg from "../img/cardImages/items/ostrich.png"
import packDonkeyImg from "../img/cardImages/items/packDonkey.png"
import horseImg from "../img/cardImages/items/horse.png"
/*import dogImg from "../img/cardImages/items/dog.png"*/
import canoeImg from "../img/cardImages/items/canoe.png"
import jeepImg from "../img/cardImages/items/jeep.png"
import bootsImg from "../img/cardImages/items/boots.png"
/*import hotAirBalloonImg from "../img/cardImages/items/balloon.png"
import airPlaneImg from "../img/cardImages/items/airPlane.png"*/
import goldPanImg from "../img/cardImages/items/goldPan.png"
import trowelImg from "../img/cardImages/items/trowel.png"
import pickaxeImg from "../img/cardImages/items/pickaxe.png"
import beerMugImg from "../img/cardImages/items/beerMug.png"
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
/*import bagImg from "../img/cardImages/items/bag.png"*/
import flaskImg from "../img/cardImages/items/flask.png"
import beartrapImg from "../img/cardImages/items/beartrap.png"
import airmailImg from "../img/cardImages/items/airmail.png"
/*import floraSamplesImg from "../img/cardImages/items/floraSamples.png"*/
import torchImg from "../img/cardImages/items/torch.png"
import machetteImg from "../img/cardImages/items/machete.png"
/*import mirrorShardImg from "../img/cardImages/artifacts/mirrorShard.png"*/
import portalStoneImg from "../img/cardImages/artifacts/portalStone.png"
import pathFinderStaffImg from "../img/cardImages/artifacts/pathFinderStaff.png"
import cursedTreasureImg from "../img/cardImages/artifacts/cursedTreasure.png"
import darkKnowledgeImg from "../img/cardImages/artifacts/darkKnowledge.png"
import baneBanisherImg from "../img/cardImages/artifacts/blade.png"
import warMaskImg from "../img/cardImages/artifacts/warMask.png"
import beastKillerImg from "../img/cardImages/artifacts/beastKiller.png"
import flameJewelImg from "../img/cardImages/artifacts/flameJewel.png"
import inscribedBladeImg from "../img/cardImages/artifacts/inscribedBlade.png"
import ancientCipherImg from "../img/cardImages/artifacts/ancientCipher.png"
import transmutationImg from "../img/cardImages/artifacts/transmutation.png"
import owlEyesImg from "../img/cardImages/artifacts/owlEyes.png"
import goldenMaskImg from "../img/cardImages/artifacts/goledMask.png"
import ritualDaggerImg from "../img/cardImages/artifacts/ritualDagger.png"
import magicDoor from "../img/cardImages/artifacts/magicDoor.gif"


import {EFFECT} from "./effects.mjs";
import {Flash, GainAction, Map, Treasure} from "../components/Symbols";
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
        effectsText: <div className="effectsText"><Draw1Card/> and you may place <AdventurerIcon/> to <Ship/></div>,
        effects: [EFFECT.draw1, EFFECT.placeToGreenLocation],
        image: seaTurtleImg,
        cost: 3,
        points: 2
    },
    ostrich: {
        id: "ostrich",
        cardName: "Ostrich",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div className="effectsText"><Draw1Card/> and you may place <AdventurerIcon/> to <Jeep/></div>,
        effects: [EFFECT.draw1, EFFECT.placeToBrownLocation],
        image: ostrichImg,
        cost: 3,
        points: 2
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
    /*dog: {
        id: "dog",
        cardName: "Dog",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw2Cards/> <Discard/></div>,
        effects: [EFFECT.draw2, EFFECT.discard, EFFECT.gainExplore],
        image: dogImg,
        cost: 3,
        points: 2
    },*/
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
        cardName: "Rusty Jeep",
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
        effectsText: <div className="effectsText"><Explore/> any you may place <AdventurerIcon/> to <Walk/></div>,
        effects: [EFFECT.gainExplore, EFFECT.placeToBasicLocation],
        image: bootsImg,
        cost: 1,
        points: 1
    },
    /*hotAirBaloon: {
        id: "hotAirBaloon",
        cardName: "Hot Air Baloon",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Discount:</b> <Blimp/><Explore/><Explore/><Explore/> to discover
            any location. Then <b>remove</b> this card.</div>,
        effects: [EFFECT.exploreAnyLocationWithDiscount4, EFFECT.destroyThisCard], //pozor na update efektu, je vyhodnocen v sekci pro explore lokaci
        image: hotAirBalloonImg,
        cost: 2,
        points: 1
    },
    airplane: {
        id: "airplane",
        cardName: "Airplane",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Discount:</b><Blimp/><Explore/><Explore/> to discover
            any location.</div>,
        effects: [EFFECT.exploreAnyLocationWithDiscount3],
        image: airPlaneImg,
        cost: 4,
        points: 2
    },*/
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
    beerMug: {
        id: "beerMug",
        cardName: "Beer Mug",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> 1 <Explore/>. <b>Gain:</b> 1 <Coin/> for up to 3 <Guardian/> you defeated.</div>,
        effects: [EFFECT.gainCoinAndExploresForGuardians],
        image: beerMugImg,
        cost: 3,
        points: 2
    },
    journal: {
        id: "journal",
        cardName: "Journal",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Explore/> for each <BronzeRelic/> you own (up to 3) .</div>,
        effects: [EFFECT.gainExploreForRelics],
        image: journalImg,
        cost: 3,
        points: 3
    },
    /*lockPick: {
        id: "lockPick",
        cardName: "Lock Pick", transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Discard/> <Arrow/> <Coin/> <Coin/> <Coin/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 0
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
        effectsText: <div className="effectsText"><Draw3Cards/>, keep 1 of them</div>,
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
        effectsText: <div className="effectsText"><Flash/><b>Activate:</b> empty <LocationL2/></div>,
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
        effectsText: <div className="effectsText"><b>Activate:</b> site that you already
            occupy.
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
        effectsText: <div className="effectsText"><b>Discount:</b> <Coin/><Coin/><Coin/> to buy <Item/>. <b>Include</b>
            the top card of the Item deck.
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
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Discount:</b> <Explore/><Explore/><Explore/> to buy <Artifact/>. <b>Include</b>
                the top card of the Artifact deck.</div>,
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
        effectsText: <div className="effectsText"><b>Gain:</b> <Explore/> for up to 4 defeated <Guardian/>.</div>,
        effects: [EFFECT.gainExploreForGuardians],
        image: bowAndArrowsImg,
        cost: 3,
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
            <div className="effectsText"><b>Gain:</b> <Artifact/>. Then <b>destroy</b> this card.</div>,
        effects: [EFFECT.destroyThisCard, EFFECT.gainArtifact],
        image: whipImg,
        cost: 2,
        points: 1
    },
    bookOfMyths: {
        id: "bookOfMyths",
        cardName: "Crude Map",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Map/><Explore/> Then <b>destroy</b> this card.</div>,
        effects: [EFFECT.gainExplore, EFFECT.gainMap, EFFECT.destroyThisCard],
        image: bookOfMythsImg,
        cost: 1,
        points: 1
    },
    airmail: {
        id: "airmail",
        cardName: "Airmail",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Item/> to your hand. Then <b>destroy</b> this card.
        </div>,
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
        effectsText: <div className="effectsText"><Draw3Cards/>, then <b>destroy</b> this card.</div>,
        effects: [EFFECT.draw1, EFFECT.draw1, EFFECT.draw1, EFFECT.destroyThisCard],
        image: flaskImg,
        cost: 2,
        points: 1
    },
    machete: {
        id: "machete",
        cardName: "Machete",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><DestroyCard/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyCard],
        image: machetteImg,
        cost: 3,
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
        effectsText: <div style={bigIconsStyle}><Coin/><Text/><DestroyCard/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.destroyCard],
        image: torchImg,
        cost: 1,
        points: 1
    },
    /*bag: {
        id: "bag",
        cardName: "Large Backpack",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Coin/> and you may draw any card from your discard pile.
        </div>,
        effects: [EFFECT.gainCoin, EFFECT.drawFromDiscard],
        image: bagImg,
        cost: 2,
        points: 1
    },*/
    rope: {
        id: "rope",
        cardName: "Rope",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Discard/><Arrow/><Explore/><Draw2Cards/></div>,
        effects: [EFFECT.discard, EFFECT.gainExplore, EFFECT.draw2],
        image: null,
        cost: 2,
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
        cost: 2,
        points: 2
    },
    hat: {
        id: "hat",
        cardName: "Hat",
        transport: CARD_TRANSPORT.ship,
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
        effectsText: <div style={bigIconsStyle}><Coin/><DestroyCard/></div>,
        effects: [EFFECT.gainCoin, EFFECT.destroyCard],
        image: beartrapImg,
        cost: 1,
        points: 1
    },
    boomerang: {
        id: "boomerang",
        cardName: "Boomerang",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Discard/><Arrow/><Coin/><Explore/><Draw1Card/></div>,
        effects: [EFFECT.discard, EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainExplore,],
        image: boomerangImg,
        cost: 2,
        points: 1
    },
});

export const ARTIFACTS = Object.freeze({
    pathfinderStaff: {
        id: "pathfinderStaff",
        cardName: "Pathfinder's Staff",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Relocate</b> any of your <AdventurerIcon/> to <LocationL1/>.</div>,
        effects: [EFFECT.moveAdvToL1Location],
        isGuarded: false,
        image: pathFinderStaffImg,
        cost: 2,
        points: 1
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
    portalStone: {
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
    },
    warMask: {
        id: "warMask",
        cardName: "War Mask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Weapon/> and don't gain <Fear/> from <Guardian/> this round.</div>,
        effects: [EFFECT.gainWeapon, EFFECT.protectFromFear],
        isGuarded: false,
        image: warMaskImg,
        cost: 3,
        points: 1
    },
    anotherWarmask: {
        id: "anotherWarmask",
        cardName: "Another warmask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><DestroyCard/></div>,
        effects: [EFFECT.draw1, EFFECT.destroyCard],
        isGuarded: false,
        image: warMaskImg,
        cost: 3,
        points: 1
    },
    ancientCipher: {
        id: "ancientCipher",
        cardName: "Ancient Cipher",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><Coin/></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        isGuarded: false,
        image: ancientCipherImg,
        cost: 4,
        points: 3
    },
    baneBanisher: {
        id: "baneBanisher",
        cardName: "Bane Banisher",
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
    transmutation: {
        id: "transmutation",
        cardName: "Transmutation",
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
            <div className="effectsText"><Fear/><Coin/><Coin/><Coin/><Coin/></div>,
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
            <div style={bigIconsStyle}><Fear/><Jewel/></div>,
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
        effectsText: <div style={bigIconsStyle}><Item/></div>,
        effects: [EFFECT.gainItem],
        cost: 3,
        points: 2
    },
    /* ringOfLight: {
        id: "ringOfLight",
        cardName: "Ring of Light",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Draw1Card/> from you <b>Draw deck</b> or <b>Discard Pile</b></div>,
        effects: [EFFECT.drawFromDrawDeckOrDiscard],
        isGuarded: false,
        image: ringOfLightImg,
        cost: 3,
        points: 2
    }, */ 
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
    /*ritualDagger: {
        id: "ritualDagger",
        cardName: "Ritual Dagger",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Discard/> to gain <Jewel/><Jewel/></div>,
        effects: [EFFECT.discardFor2Jewels],
        cost: 3,
        points: 1
    },*/
    flameJewel: {
        id: "flameJewel",
        cardName: "Flame Jewel",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><GainAction/><b>Discount</b> <Jewel/> to progress in a legend.</div>,
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
            <div className="effectsText"><GainAction/><b>Discount</b> <Text/><Text/> of <Weapon/> to progress in a legend.</div>,
        effects: [EFFECT.progressWithTextsOrWeapon],
        isGuarded: false,
        image: inscribedBladeImg,
        cost: 2,
        points: 1
    },
    owlEyes: {
        id: "owlEyes",
        cardName: "Owl Eyes",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><DestroyCard/> and activate empty <LocationL1/>.</div>,
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
            <div className="effectsText"><DefeatedGuardian/> on your or empty site.</div>,
        effects: [EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        isGuarded: false,
        image: beastKillerImg,
        cost: 4,
        points: 2
    },
    seaNecklace: {
        id: "seaNecklace",
        cardName: "Sea necklace",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Activate:</b> 2 dock actions (even the same one)</div>,
        effects: [EFFECT.activate2dockActions],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 2
    },
    forbiddenScrolls: {
        id: "forbiddenScrolls",
        cardName: "Forbidden scrolls",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Research</b> for free with your second token, then <b>destroy</b> this card</div>,
        effects: [EFFECT.destroyThisCard, EFFECT.progressWithSecondToken],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 0
    },
    fragileBlade: {
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
    },
    ritualDagger: {
        id: "ritualDagger",
        cardName: "Ritual Dagger",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Coin/><Coin/> and you may remove one of your defeated <Guardian/> from the game
                to gain <Coin/><Jewel/>.</div>,
        effects: [EFFECT.gainCoinsAndJewelForGuardian],
        isGuarded: false,
        image: ritualDaggerImg,
        cost: 3,
        points: 1
    },
    fearsomeBlades: {
        id: "fearsomeBlades",
        cardName: "Fearsome blades",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Fear/><Weapon/><Weapon/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainWeapon, EFFECT.gainWeapon],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    magicDoor: {
        id: "magicDoor",
        cardName: "Magic door",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Return <AdventurerIcon/> back home, then <b>destroy</b> this card.</div>,
        effects: [EFFECT.returnAdventurer, EFFECT.destroyThisCard],
        isGuarded: false,
        image: magicDoor,
        cost: 3,
        points: 1
    },
    boneWhistle: {
        id: "boneWhistle",
        cardName: "Bone Whistle",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Fear/><Coin/> and return one of your used <BronzeRelic/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainFear, EFFECT.refreshRelic],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    ancientWine: {
        id: "ancientWine",
        cardName: "Ancient wine",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Refresh</b> your assistant and gain <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.refreshAsistant],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    windPassage: {
        id: "windPassage",
        cardName: "Wind passage",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Infinite <Blimp/> to place your <AdventurerIcon/><AdventurerIcon/> this round.</div>,
        effects: [EFFECT.infinitePlanes],
        isGuarded: false,
        image: "",
        cost: 4,
        points: 1
    },
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
    goldenMask: {
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
    },
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
    },
    giantEgg: {
        id: "giantEgg",
        cardName: "Giant Egg",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Text/><Text/> and <Uptrade/></div>, //todo replace guardian with an icon
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.uptrade],
        cost: 1,
        points: 2
    },*/

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
            <div className="effectsText">+ ?<VictoryPoints/> equal to <VictoryPoints/> on one of your <Item/> and one of your <Artifact/>.</div>,
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
            <div className="effectsText">+6 <VictoryPoints/> if you have no <Fear/> in you deck. +2 <VictoryPoints/> if you have only one.</div>,
        points: 1,
    },
    beyondBasics: {
        id: "beyondBasics",
        cardName: "Beyond Basics",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPoints/> for each Explore and Gold card you destroyed during the game.</div>,
        points: 1,
    },
    quantityAboveAll: {
        id: "quantityAboveAll",
        cardName: "Quantity Above All",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPoints/> for up to 4 <Item/> that costs <Coin/><Coin/><Coin/> or more.</div>,
        points: 0,
    },
    belongsToTheMuseum: {
        id: "belongsToTheMuseum",
        cardName: "Belongs to the Museum",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPoints/> for each <Artifact/> that costs <Explore/><Explore/><Explore/> or more.</div>,
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
            <div className="effectsText">+1 <VictoryPoints/> for each <Item/> or <Artifact/> that you own which has <DestroyCard/> ability.</div>,
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
            <div className="effectsText">+1 <VictoryPoints/> for each <BronzeRelic/> that you placed in the first 3 rows.</div>,
        points: 4,
    },
    touchTheSkies: {
        id: "touchTheSkies",
        cardName: "Touch the Skies",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPoints/> for each <Blimp/> generated by your cards of assistants.</div>,
        points: 1,
    },
});


