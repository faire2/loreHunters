import React from "react";
import {
    AdventurerIcon,
    Arrow,
    Artifact,
    Blimp,
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
    Relic,
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
import bagImg from "../img/cardImages/items/bag.png"
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
/*import owlEyesImg from "../img/cardImages/artifacts/owlEyes.png"*/
import goldenMaskImg from "../img/cardImages/artifacts/goledMask.png"
import ritualDaggerImg from "../img/cardImages/artifacts/ritualDagger.png"


import {EFFECT} from "./effects.mjs";
import {Flash, FreeAction, Treasure, Uptrade} from "../components/Symbols";
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

const lockEffectsStyle = {
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
};

export const ITEMS = Object.freeze({
    fear: {
        id: "fear",
        cardName: "Fear",
        transport: CARD_TRANSPORT.walk,
        transportAmount: 1,
        effectsText: "",
        effects: [EFFECT.gainWalk],
        cost: 0,
        points: -1
    },
    coin: {
        id: "coin",
        cardName: "Coin",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/><FreeAction/></div>,
        effects: [EFFECT.gainCoin],
        cost: 0,
        points: 0
    },
    explore: {
        id: "explore",
        cardName: "Explore",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><FreeAction/></div>,
        effects: [EFFECT.gainExplore],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        id: "seaTurtle",
        cardName: "Sea Turtle",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw1Card/><Ship/></div>,
        effects: [EFFECT.draw1, EFFECT.gainShip],
        image: seaTurtleImg,
        cost: 2,
        points: 1
    },
    ostrich: {
        id: "ostrich",
        cardName: "Ostrich",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw1Card/><Jeep/></div>,
        effects: [EFFECT.draw1, EFFECT.gainJeep],
        image: ostrichImg,
        cost: 2,
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
        effects: [EFFECT.loseAction, EFFECT.draw2],
        image: packDonkeyImg,
        cost: 4,
        points: 2
    },
    horse: {
        id: "horse",
        cardName: "Horse",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw1Card/><Explore/><Uptrade/></div>,
        effects: [EFFECT.loseAction, EFFECT.draw1, EFFECT.gainExplore, EFFECT.uptrade],
        image: horseImg,
        cost: 4,
        points: 1
    },
    dog: {
        id: "dog",
        cardName: "Dog",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw2Cards/> <Discard/></div>,
        effects: [EFFECT.loseAction, EFFECT.draw2, EFFECT.discard, EFFECT.gainExplore],
        image: dogImg,
        cost: 3,
        points: 2
    },
    steamBoat: {
        id: "steamBoat",
        cardName: "Steam Boat",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        image: canoeImg,
        cost: 2,
        points: 2
    },
    jeep: {
        id: "jeep",
        cardName: "Rusty Jeep",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
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
        effectsText: <div style={bigIconsStyle}><Walk/><Explore/></div>,
        effects: [EFFECT.gainWalk, EFFECT.gainExplore],
        image: bootsImg,
        cost: 1,
        points: 1
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        cardName: "Hot Air Baloon",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Discount:</b> <Blimp/><Explore/><Explore/><Explore/> to discover
            any location. Then <b>remove</b> this card.</div>,
        effects: [EFFECT.loseAction, EFFECT.exploreAnyLocationWithDiscount4, EFFECT.destroyThisCard], //pozor na update efektu, je vyhodnocen v sekci pro explore lokaci
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
        effects: [EFFECT.loseAction, EFFECT.exploreAnyLocationWithDiscount3],
        image: airPlaneImg,
        cost: 4,
        points: 2
    },
    goldPan: {
        id: "goldPan",
        cardName: "Gold Pan",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/><Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
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
        effects: [EFFECT.loseAction, EFFECT.gainCoinAndExploresForGuardians],
        image: beerMugImg,
        cost: 3,
        points: 2
    },
    journal: {
        id: "journal",
        cardName: "Journal",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Explore/> for each <Relic/> you own (up to 3) .</div>,
        effects: [EFFECT.loseAction, EFFECT.gainExploreForRelics],
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
            <Coin/><Coin/> or <Coin/><Coin/><Coin/> and <b>pass</b> this round.</div>,
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
        effectsText: <div className="effectsText"><b>Gain:</b> <Text/> or <Weapon/> or <Jewel/> that can be found
            on a site adjacent to you <AdventurerIcon/></div>,
        effects: [EFFECT.loseAction, EFFECT.gainResourceFromAdjacentLocation],
        image: grapplingHookImg,
        cost: 3,
        points: 1
    },
    binoculars: {
        id: "binoculars",
        cardName: "Binoculars",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Flash/><b>Activate:</b><LocationL1/> or <LocationL2/> adjacent to your <AdventurerIcon/></div>,
        effects: [EFFECT.loseAction, EFFECT.activateAdjacentLocation],
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
        effects: [EFFECT.loseAction, EFFECT.activateYourLocation],
        image: tentImg,
        cost: 4,
        points: 1,
    },
    fishingRod: {
        id: "fishingRod",
        cardName: "FishingRod",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Discount:</b> <Coin/><Coin/><Coin/>. Reveal the top card of the
            Item deck. You may buy any <Item/>.
        </div>,
        effects: [EFFECT.loseAction, EFFECT.revealItemBuyWithDiscount2],
        image: fishingRodImg,
        cost: 3,
        points: 1
    },
    compass: {
        id: "compass",
        cardName: "Compass",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Discount:</b> <Explore/><Explore/><Explore/>. Reveal the top card of the
                Artifact deck.You may buy any <Artifact/>.</div>,
        effects: [EFFECT.loseAction, EFFECT.revealArtifactBuyWithDiscount],
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
        effectsText: <div className="effectsText"><b>Gain:</b> <Explore/> for up to 3 <Guardian/> defeated and in play.</div>,
        effects: [EFFECT.loseAction, EFFECT.gainExploreForGuardians],
        image: bowAndArrowsImg,
        cost: 2,
        points: 2
    },
    messengerPidgeon: {
        id: "messengerPidgeon",
        cardName: "Messenger Pidgeon",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Text/><Text/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText],
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
        effects: [EFFECT.loseAction, EFFECT.destroyThisCard, EFFECT.gainArtifact],
        image: whipImg,
        cost: 2,
        points: 1
    },
    bookOfMyths: {
        id: "bookOfMyths",
        cardName: "Book of Myths",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Relic/>. Then <b>destroy</b> this card.</div>,
        effects: [EFFECT.loseAction, EFFECT.gainRelic, EFFECT.destroyThisCard],
        image: bookOfMythsImg,
        cost: 2,
        points: 1
    },
    airmail: {
        id: "airmail",
        cardName: "Airmail",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Item/> to your hand. Then <b>destroy</b> this card.
        </div>,
        effects: [EFFECT.loseAction, EFFECT.gainItemToHand, EFFECT.destroyThisCard],
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
    /*boomerang: {
        id: "boomerang",
        cardName: "Boomerang",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/><Explore/><Draw1Card/><Discard/></div>,
        effects: [EFFECT.draw1, EFFECT.discard, EFFECT.gainCoin, EFFECT.gainExplore,],
        image: boomerangImg,
        cost: 2,
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
        effects: [EFFECT.gainText, EFFECT.destroyCard],
        image: torchImg,
        cost: 1,
        points: 1
    },
    bag: {
        id: "bag",
        cardName: "Large Backpack",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Coin/> and you may draw any card from your discard pile.
        </div>,
        effects: [EFFECT.loseAction, EFFECT.gainCoin, EFFECT.drawFromDiscard],
        image: bagImg,
        cost: 2,
        points: 1
    },
    rope: {
        id: "rope",
        cardName: "Rope",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Flash/><b>Gain:</b> <Explore/> and <b>Activate</b>: empty <LocationL1/>.
        </div>,
        effects: [EFFECT.loseAction, EFFECT.gainExplore, EFFECT.activateEmptyL1Location],
        image: null,
        cost: 2,
        points: 1
    },
    revolver: {
        id: "revolver",
        cardName: "revolver",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Flash/><Explore/><Arrow/><DefeatedGuardian/></div>,
        effects: [EFFECT.loseAction, EFFECT.loseExplore, EFFECT.defeatGuardian],
        image: revolverImg,
        cost: 2,
        points: 2
    },
    hat: {
        id: "hat",
        cardName: "Hat",
        transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Coin/> <Explore/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainExplore],
        cost: 1,
        points: 1
    },
    beartrap: {
        id: "beartrap",
        cardName: "Beat Trap",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><DestroyCard/></div>,
        effects: [EFFECT.gainExplore, EFFECT.destroyCard],
        image: beartrapImg,
        cost: 1,
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
            <div className="effectsText"><b>Relocate</b> your <AdventurerIcon/> to an adjacent
                empty <LocationL1/> or <LocationL2/>.</div>,
        effects: [EFFECT.gainBlimp, EFFECT.moveAdvToEmptyAdjacentLocation],
        isGuarded: false,
        image: pathFinderStaffImg,
        cost: 3,
        points: 1
    },
    warMask: {
        id: "warMask",
        cardName: "War Mask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><DestroyCard/></div>,
        effects: [EFFECT.destroyCard, EFFECT.draw1],
        isGuarded: true,
        image: warMaskImg,
        cost: 2,
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
    portalStone: {
        id: "portalStone",
        cardName: "Portal stone",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Relocate</b> one of your deployed <AdventurerIcon/> to any empty
                <LocationL1/> or <LocationL2/>.</div>,
        effects: [EFFECT.moveAdvToEmptyLocation],
        isGuarded: true,
        image: portalStoneImg,
        cost: 2,
        points: 1
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
            <div style={bigIconsStyle}><DestroyCard/><Coin/><Coin/></div>,
        effects: [EFFECT.destroyCard, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        image: transmutationImg,
        cost: 4,
        points: 2
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
            <div className="effectsText"><FreeAction/><b>Discount</b> <Jewel/> to progress in a legend.</div>,
        effects: [EFFECT.progressWithJewel],
        isGuarded: false,
        image: flameJewelImg,
        cost: 3,
        points: 2
    },
    inscribedBlade: {
        id: "inscribedBlade",
        cardName: "Inscribed Blade",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><FreeAction/><b>Discount</b> <Text/><Text/> of <Weapon/> to progress in a legend.</div>,
        effects: [EFFECT.progressWithTextsOrWeapon],
        isGuarded: false,
        image: inscribedBladeImg,
        cost: 2,
        points: 1
    },
    beastKiller: {
        id: "beastKiller",
        cardName: "Beast Killer",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><DefeatedGuardian/></div>,
        effects: [EFFECT.defeatGuardian],
        isGuarded: false,
        image: beastKillerImg,
        cost: 5,
        points: 3
    },
    /*amuletOfCharm: {
        id: "amuletOfCharm",
        cardName: "Amulet of Charm",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Buy an item with discount of <Coin/><Coin/><Coin/></div>,
        effects: [EFFECT.buyItemWithDiscount3],
        cost: 3,
        points: 2
    },
    drinkingHorn: {
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
        cost: 2,
        points: 1
    },
    /*owlEyes: {
        id: "owlEyes",
        cardName: "Owl Eyes",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Gain</b> basic <b>Explore bonus</b> of one of your defeated <Guardian/>.
            </div>,
        effects: [EFFECT.gainDiscoveryBonus],
        isGuarded: false,
        image: owlEyesImg,
        cost: 3,
        points: 1
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
        isGuarded: true,
        image: goldenMaskImg,
        cost: 3,
        points: 1
    },
    ritualDagger: {
        id: "ritualDagger",
        cardName: "Ritual Dagger",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Gain</b> <Jewel/>. <b>Gain</b> <Coin/> equal to <b>Victory points</b> of one
                of your defeated <Guardian/>.</div>,
        effects: [EFFECT.gainCoinsAndJewelForGuardianVP],
        isGuarded: true,
        image: ritualDaggerImg,
        cost: 2,
        points: 2
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
    treacherusWhistle: {
        id: "treacherusWhistle",
        cardName: "Treacherus Whistle",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Draw2Cards/> if a guardian is drawn</div>, //todo replace guardian with an icon
        effects: [],
        cost: 1,
        points: 2
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
            <div className="effectsText">+ ?<VictoryPoints/> Score again 2 of  <Relic/> that you placed</div>,
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
            <div className="effectsText">+1 <VictoryPoints/> for each <Relic/> you own.</div>,
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
            <div className="effectsText">+1 <VictoryPoints/> for each <Relic/> that you placed in the first 3 rows.</div>,
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

/* cost turns to VP when guardian is defeated */
export const GUARDIANS = Object.freeze({
    foxSpirit: {
        id: "foxSpirit",
        cardName: "Fox Spirit",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Walk/><Text/><Text/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Text/><Coin/><Explore/></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        discoveryText2: <div style={columnStyle}><Coin/><Coin/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryTextRow: <div style={rowStyle}><Text/><Coin/><Explore/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Text/></div>,
        cost: null,
        points: 1
    },
    forestDragon: {
        id: "forestDragon",
        cardName: "Forest Dragon",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Walk/><Explore/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Coin/><Text/><Text/></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainText],
        discoveryText2: <div style={columnStyle}><Explore/><Text/></div>,
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainText],
        discoveryTextRow: <div style={rowStyle}><Coin/><Text/><Text/></div>,
        discoveryTextRow2: <div style={rowStyle}><Explore/><Text/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 1
    },
    naga: {
        id: "naga",
        cardName: "Naga",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Coin/><Weapon/></div>,
        effects: [EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Weapon/><Text/></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainText],
        discoveryText2: <div style={columnStyle}><Coin/><Coin/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryTextRow: <div style={rowStyle}><Weapon/><Text/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
    stoneTitan: {
        id: "stoneTitan",
        cardName: "Stone Titan",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Explore/><Weapon/></div>,
        effects: [EFFECT.loseExplore, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Explore/><Weapon/></div>,
        discoveryEffect: [EFFECT.gainExplore, EFFECT.gainWeapon],
        discoveryText2: <div style={columnStyle}><Coin/><Text/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainText],
        discoveryTextRow: <div style={rowStyle}><Explore/><Weapon/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Text/></div>,
        lockText: <div style={lockEffectsStyle}><AdventurerIcon/></div>,
        cost: null,
        points: 2
    },
    golem: {
        id: "golem",
        cardName: "Golem",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Jeep/><Explore/></div>,
        effects: [EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Explore/><Text/><Text/></div>,
        discoveryEffect: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainExplore],
        discoveryText2: <div style={columnStyle}><Weapon/></div>,
        discoveryEffect2: [EFFECT.gainWeapon],
        discoveryTextRow: <div style={rowStyle}><Explore/><Text/><Text/></div>,
        discoveryTextRow2: <div style={rowStyle}><Weapon/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
    mountainGuardian: {
        id: "mountainGuardian",
        cardName: "Mountain Guardian",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Blimp/></div>,
        effects: [EFFECT.losePlane, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Explore/><Text/><Text/></div>,
        discoveryEffect: [EFFECT.destroyCard, EFFECT.gainText, EFFECT.gainText, EFFECT.gainExplore],
        discoveryText2: <div style={columnStyle}><Explore/><Explore/></div>,
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainExplore],
        discoveryTextRow: <div style={rowStyle}><Explore/><Text/><Text/></div>,
        discoveryTextRow2: <div style={rowStyle}><Explore/><Explore/></div>,
        lockText: <div style={lockEffectsStyle}><Coin/></div>,
        cost: null,
        points: 1
    },
    gryphon: {
        id: "gryphon",
        cardName: "Gryphon",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Blimp/><Explore/></div>,
        effects: [EFFECT.losePlane, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Jewel/></div>,
        discoveryEffect: [EFFECT.gainJewel],
        discoveryText2: <div style={columnStyle}><Coin/><Text/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainText],
        discoveryTextRow: <div style={rowStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Text/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
    whisperingShadow: {
        id: "whisperingShadow",
        cardName: "Whispering Shadow",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Text/><Text/></div>,
        effects: [EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Text/><Weapon/></div>,
        discoveryEffect: [EFFECT.gainText, EFFECT.gainWeapon],
        discoveryText2: <div style={columnStyle}><Coin/><Coin/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryTextRow: <div style={rowStyle}><Text/><Weapon/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 1
    },
    giantScarab: {
        id: "giantScarab",
        cardName: "Giant Scarab",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Weapon/></div>,
        effects: [EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Coin/><Weapon/></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainWeapon],
        discoveryText2: <div style={columnStyle}><Coin/><Coin/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryTextRow: <div style={rowStyle}><Coin/><Weapon/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><AdventurerIcon/></div>,
        cost: null,
        points: 2
    },
    swampSnake: {
        id: "swampSnake",
        cardName: "Swamp snake",
        type: CARD_TYPE.guardian,
        transport: CARD_TRANSPORT.guardian,
        effectsText:
            <div style={bigIconsStyle}><Walk/><Discard/></div>,
        effects: [EFFECT.loseWalk, EFFECT.discard, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Jewel/></div>,
        discoveryEffect: [EFFECT.gainJewel],
        discoveryText2: <div style={columnStyle}><Explore/><Text/></div>,
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainText],
        discoveryTextRow: <div style={rowStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={rowStyle}><Explore/><Text/></div>,
        lockText: <div style={lockEffectsStyle}><AdventurerIcon/></div>,
        cost: null,
        points: 2
    },
    stealingMonkey: {
        id: "stealingMonkey",
        cardName: "Stealing Monkey",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Coin/><Coin/></div>,
        effects: [EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Jewel/></div>,
        discoveryEffect: [EFFECT.gainJewel],
        discoveryText2: <div style={columnStyle}><Coin/><Explore/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainExplore],
        discoveryTextRow: <div style={rowStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Explore/></div>,
        lockText: <div style={lockEffectsStyle}><Coin/></div>,
        cost: null,
        points: 1
    },
    hornedHippo: {
        id: "hornedHippo",
        cardName: "Horned Hippo",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Walk/><Weapon/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Coin/><Weapon/></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainWeapon],
        discoveryText2: <div style={columnStyle}><Weapon/></div>,
        discoveryEffect2: [EFFECT.gainWeapon],
        discoveryTextRow: <div style={rowStyle}><Coin/><Weapon/></div>,
        discoveryTextRow2: <div style={rowStyle}><Weapon/></div>,
        lockText: <div style={lockEffectsStyle}><AdventurerIcon/></div>,
        cost: null,
        points: 2
    },
    lakeMonster: {
        id: "lakeMonster",
        cardName: "Lake Monster",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Ship/><Explore/></div>,
        effects: [EFFECT.loseShip, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Text/><Text/><Text/></div>,
        discoveryEffect: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        discoveryText2: <div style={columnStyle}><Coin/><Coin/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryTextRow: <div style={rowStyle}><Text/><Text/><Text/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
    energyLeech: {
        id: "energyLeech",
        cardName: "Energy Leech",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Discard/></div>,
        effects: [EFFECT.discard, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Explore/><Weapon/></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainExplore],
        discoveryText2: <div style={columnStyle}><Coin/><Coin/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryTextRow: <div style={rowStyle}><Explore/><Weapon/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 1
    },
    swarmingSpiders: {
        id: "swarmingSpiders",
        cardName: "Swarming Spiders",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Walk/><Walk/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Coin/><Weapon/></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainCoin],
        discoveryText2: <div style={columnStyle}><Explore/><Text/></div>,
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainText],
        discoveryTextRow: <div style={rowStyle}><Coin/><Weapon/></div>,
        discoveryTextRow2: <div style={rowStyle}><Explore/><Text/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
    heartOfForest: {
        id: "heartOfForest",
        cardName: "Heart of the Forest",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Jewel/></div>,
        effects: [EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Coin/><Coin/><Explore/></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore],
        discoveryText2: <div style={columnStyle}><Text/><Text/></div>,
        discoveryEffect2: [EFFECT.gainText, EFFECT.gainText],
        discoveryTextRow: <div style={rowStyle}><Coin/><Coin/><Explore/></div>,
        discoveryTextRow2: <div style={rowStyle}><Text/><Text/></div>,
        lockText: <div style={lockEffectsStyle}><Jewel/></div>,
        cost: null,
        points: 2
    },
    wyvern: {
        id: "wyvern",
        cardName: "Wyvern",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Coin/><Weapon/></div>,
        effects: [EFFECT.loseCoin, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Coin/><Coin/><Coin/></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryText2: <div style={columnStyle}><Weapon/></div>,
        discoveryEffect2: [EFFECT.gainWeapon],
        discoveryTextRow: <div style={rowStyle}><Coin/><Coin/><Coin/></div>,
        discoveryTextRow2: <div style={rowStyle}><Weapon/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
    crabmanHermit: {
        id: "crabmanHermit",
        cardName: "Crabman Hermit",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Text/><Text/><Text/></div>,
        effects: [EFFECT.loseText, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Jewel/></div>,
        discoveryEffect: [EFFECT.gainJewel],
        discoveryText2: <div style={columnStyle}><Coin/><Coin/></div>,
        discoveryEffect2: [EFFECT.gainCoin, EFFECT.gainCoin],
        discoveryTextRow: <div style={rowStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={rowStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
});
