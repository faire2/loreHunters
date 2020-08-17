import React from "react";
import {
    AdventurerIcon,
    Arrow,
    Artifact,
    AssistantUpgrade,
    Blimp,
    BronzeRelic,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Discard,
    Draw1Card,
    Draw2Cards,
    Explore,
    Fear,
    GoldAssistant,
    Guardian,
    Item,
    Jeep,
    Jewel,
    LocationL1,
    LocationL2,
    Ship,
    Text,
    Uptrade,
    VictoryPointsBgr,
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
import magicDoor from "../img/cardImages/artifacts/magicDoor.gif"


import {EFFECT} from "./effects.mjs";
import {
    FirstLegendToken,
    Flash,
    GainAction,
    LocationL3,
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
    fontSize: "1.1vw",
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
        effectsText: <div className="effectsText"><Draw1Card/><br/><PlaceAdventurer/> with a discount of <Ship/>.
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
        effectsText: <div className="effectsText"><Draw1Card/><br/><PlaceAdventurer/> with a discount of <Jeep/>.
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
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Draw2Cards/></div>,
        effects: [EFFECT.draw2],
        image: packDonkeyImg,
        cost: 4,
        points: 1
    },
    horse: {
        id: "horse",
        cardName: "Horse",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
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
        cost: 3,
        points: 3
    },
    jeep: {
        id: "jeep",
        cardName: "Automobile",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><GainAction/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainAction],
        image: jeepImg,
        cost: 3,
        points: 3
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
        cardName: "Sturdy Boots",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div className="effectsText"><Explore/><br/><PlaceAdventurer/> with a discount of <Walk/><Walk/>.
        </div>,
        effects: [EFFECT.gainExplore, EFFECT.placeToBasicLocationDiscount2],
        image: bootsImg,
        cost: 1,
        points: 1
    },
    goldPan: {
        id: "goldPan",
        cardName: "Gold Pan",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
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
        effectsText: <div className="effectsText"><b>Exile</b> this card to <PlaceAdventurer/> with a discount of <Blimp/>.
            plus a a discount of <Explore/><Explore/> if discovering a new site.</div>,
        effects: [EFFECT.exploreAnyLocationWithDiscount2, EFFECT.destroyThisCard], //pozor na update efektu, je vyhodnocen v sekci pro explore lokaci
        image: hotAirBalloonImg,
        cost: 3,
        points: 1
    },
    airplane: {
        id: "airplane",
        cardName: "Aeroplane",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effectsText: <div className="effectsText"><PlaceAdventurer/> with a <b>discount</b> of <Blimp/>, plus a discount
            of <Explore/><Explore/> if discovering a new location.</div>,
        effects: [EFFECT.exploreAnyLocationWithDiscount2],
        image: airPlaneImg,
        cost: 4,
        points: 3
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
    journal: {
        id: "journal",
        cardName: "Journal",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Exile</b> this card to progress with your <SecondLegendToken/></div>,
        effects: [EFFECT.destroyThisCard, EFFECT.progressWithSecondToken],
        image: journalImg,
        cost: 2,
        points: 1
    },
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
    wristWatch: {
        id: "wristWatch",
        cardName: "Wristwatch",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b>
            <Coin/><Coin/><GainAction/> or <b>Pass</b> to gain <Coin/><Coin/><Coin/>.</div>,
        effects: [EFFECT.gain2CoinsOrPassAnd3],
        image: pocketWatchImg,
        cost: 1,
        points: 1
    },
    armyKnife: {
        id: "armyKnife",
        cardName: "Army Knife",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText">Draw three cards and keep one. Discard others with no effect.</div>,
        effects: [EFFECT.draw3keep1],
        image: "",
        cost: 2,
        points: 2
    },
    binoculars: {
        id: "binoculars",
        cardName: "Binoculars",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Flash/><b>Activate</b> a <LocationL2/></div>,
        effects: [EFFECT.activateL2Location],
        image: binocularsImg,
        cost: 4,
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
        effectsText: <div className="effectsText"><b>Activate:</b> a site you currently occupy. Pay <Explore /><Explore />
        if it is a <LocationL3 /> site. </div>,
        effects: [EFFECT.activateYourLocation],
        image: tentImg,
        cost: 4,
        points: 2,
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
        points: 2
    },
    compass: {
        id: "compass",
        cardName: "Precision Compass",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Buy <Artifact/> with discount of <Explore/><Explore/><Explore/>, <b>include</b>
                the top card of the deck.</div>,
        effects: [EFFECT.revealArtifactBuyWithDiscount3],
        image: compassImg,
        cost: 4,
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
        effectsText: <div className="effectsText">Gain <Explore/> for each <Guardian/> you overcame and
            each <Guardian/> you are confronting, up to 3.</div>,
        effects: [EFFECT.gainExploreForGuardians],
        image: bowAndArrowsImg,
        cost: 2,
        points: 2
    },
    messengerPidgeon: {
        id: "messengerPidgeon",
        cardName: "Carrier Pigeon",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Text/><Text/><GainAction/></div>,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainAction],
        image: messengerPidgeonImg,
        cost: 2,
        points: 1
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
        effectsText: <div className="effectsText">Exile this card to gain <Item/> for free to your hand.</div>,
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
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><DestroyCard/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyCard],
        image: machetteImg,
        cost: 3,
        points: 1
    },
    axe: {
            id: "axe",
            cardName: "Axe",
            transport: CARD_TRANSPORT.jeep,
            transportAmount: 1,
            effectsText: <div style={bigIconsStyle}><Explore/><DestroyCard/></div>,
            effects: [EFFECT.gainExplore, EFFECT.destroyCard],
            image: null,
            cost: 1,
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
        effectsText: <div className="effectsText"><Coin/><br/> Draw a card from the bottom of you deck.
        </div>,
        effects: [EFFECT.gainCoin, EFFECT.drawFromBottom],
        image: bagImg,
        cost: 3,
        points: 1
    },
    rope: {
        id: "rope",
        cardName: "Rope",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Discard/><Arrow/><Draw1Card/><Draw1Card/></div>,
        effects: [EFFECT.discard, EFFECT.draw2],
        image: null,
        cost: 2,
        points: 1
    },
    revolver: {
        id: "revolver",
        cardName: "revolver",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Explore/><Arrow/><DefeatedGuardian/> on a site you occupy.</div>,
        effects: [EFFECT.loseExplore, EFFECT.defeatGuardianOnOwnedLocation],
        image: revolverImg,
        cost: 4,
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
        effectsText: <div className="effectsText"><b>Exile</b> this card to <DefeatedGuardian/> on any site that is
            not occupied by another player.</div>,
        effects: [EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        image: beartrapImg,
        cost: 2,
        points: 1
    },
    grapplingHook: {
        id: "grapplingHook",
        cardName: "Grappling Hook",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Discard/><Arrow/><Draw1Card/><DestroyCard/></div>,
        effects: [EFFECT.discard, EFFECT.draw1, EFFECT.destroyCard],
        image: grapplingHookImg,
        cost: 2,
        points: 2
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
    handLens: {
        id: "handLens",
        cardName: "Hand Lens",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText">Gain up to two <FirstLegendToken/> bonuses that you have already
            researched.</div>,
        effects: [EFFECT.gain2ResearchBonuses],
        image: "",
        cost: 2,
        points: 1
    },
    dog: {
        id: "dog",
        cardName: "Dog",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div className="effectsText"><Explore/><br/> <b>Activate</b> an unoccupied <LocationL1/> site.</div>,
        effects: [EFFECT.gainExplore, EFFECT.activateEmptyL1Location],
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
    philologyBook: {
        id: "philologyBook",
        cardName: "Brush",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText">Gain <Explore/> for each <BronzeRelic/> you own, up to 3.</div>,
        effects: [EFFECT.gainExploreForRelics],
        image: journalImg,
        cost: 3,
        points: 3
    },
    pocketWatch: {
        id: "pocketWatch",
        cardName: "Pocket Watch",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effectsText: <div className="effectsText"><b>Gain:</b>
            <Coin/><Explore/><GainAction/> or <b>Pass</b> to gain <Coin/><Explore/><Explore/>.</div>,
        effects: [EFFECT.gainCoinExploreOrPassForExtraExplore],
        image: pocketWatchImg,
        cost: 3,
        points: 2
    },
    theodolite: {
        id: "theodolite",
        cardName: "Theodolite",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><Explore/> plus <Explore/> for each of your <AdventurerIcon/> already
            placed on the board.</div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExploreForPlacedAdventurers],
        image: null,
        cost: 4,
        points: 2
    },
});

export const ARTIFACTS = Object.freeze({
    seaNecklace: {
        id: "seaNecklace",
        cardName: "Pathfinder's sandals",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Relocate a placed <AdventurerIcon/> to a <LocationL1/> and <b>activate</b> it.</div>,
        effects: [EFFECT.moveAdvToL1Location],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    pathfinderStaff: {
        id: "pathfinderStaff",
        cardName: "Pathfinder's Staff",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effectsText:
            <div className="effectsText">Move your placed <AdventurerIcon/> to a <LocationL1/> or <LocationL2/> and <b>activate</b> it.</div>,
        effects: [EFFECT.moveAdvToL1L2Location],
        isGuarded: false,
        image: pathFinderStaffImg,
        cost: 4,
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
            <div className="effectsText"><Weapon/><br/> Don't gain <Fear/> from <Guardian/> this round.</div>,
        effects: [EFFECT.gainWeapon, EFFECT.protectFromFear],
        isGuarded: false,
        image: warMaskImg,
        cost: 3,
        points: 1
    },
    jewelryBox: {
        id: "jewelryBox",
        cardName: "Treasure Chest",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><Coin/></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        isGuarded: false,
        image: null,
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
        effects: [EFFECT.destroyCardMandatory, EFFECT.gainWeapon],
        isGuarded: false,
        image: baneBanisherImg,
        cost: 4,
        points: 2
    },
     earRingOfLight: {
        id: "earRingOfLight",
        cardName: "Crystal Earring",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Draw up to 3 cards and keep one. You may return one of them to the top of the deck.</div>,
        effects: [EFFECT.draw3keep1stack1],
        isGuarded: false,
        image: null,
        cost: 4,
        points: 2
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
        cardName: "Serpent's Gold",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">You may gain <Fear/> to gain <Coin/><Coin/><Coin/><Coin/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        image: cursedTreasureImg,
        cost: 3,
        points: 1
    },
    serpentsIdol: {
        id: "serpentsIdol",
        cardName: "Serpent's Idol",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Gain <Fear/> to gain a <Jewel/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainJewel],
        isGuarded: false,
        image: darkKnowledgeImg,
        cost: 2,
        points: 1
    },
    serpentsGold: {
        id: "serpentsGold",
        cardName: "Serpent's Gold",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Gain <Fear/> to gain <Coin/><Coin/><Coin/><Coin/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        image: darkKnowledgeImg,
        cost: 3,
        points: 2
    },
    amuletOfCharm: {
        id: "amuletOfCharm",
        cardName: "Monkey Medallion",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText">Gain <Item/> for free, place it on the top of your deck.</div>,
        effects: [EFFECT.gainItemToTop],
        cost: 4,
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
    idolOfAraAnu: {
        id: "idolOfAraAnu",
        cardName: "Idol of Ara-Anu",
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
    guardianOccarina: {
        id: "guardianOccarina",
        cardName: "Guardian's Ocarina",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effectsText:
            <div className="effectsText">Return a placed <AdventurerIcon/> back to your pool. All your travel icons
                count as <Blimp/> this  round.
            </div>,
        effects: [EFFECT.infinitePlanes, EFFECT.returnAdventurer],
        isGuarded: false,
        image: "",
        cost: 5,
        points: 2
    },
    owlEyes: {
        id: "owlEyes",
        cardName: "Bone Hairpin",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><DestroyCard/><br/> Activate a completely unoccupied <LocationL1/>.</div>,
        effects: [EFFECT.destroyCard, EFFECT.activateEmptyL1Location],
        isGuarded: false,
        image: null,
        cost: 4,
        points: 2
    },
    beastKiller: {
        id: "beastKiller",
        cardName: "War Club",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Overcome <Guardian/> on a site that is not occupied by another player.</div>,
        effects: [EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        isGuarded: false,
        image: beastKillerImg,
        cost: 5,
        points: 2
    },
    sunDial: {
        id: "sunDial",
        cardName: "Sun dial",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Gain <Text/><Text/><Text/> or <b>pass</b> to gain <Jewel/>
            </div>,
        effects: [EFFECT.gain2TextsOrPassAndJewel],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 1
    },
    /*preciousLock: {
        id: "preciousLock",
        cardName: "Precious lock",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Jewel/><Arrow/><Text/><Text/><Weapon/><Weapon/>
            </div>,
        effects: [EFFECT.loseJewel, EFFECT.gainText, EFFECT.gainText, EFFECT.gainWeapon, EFFECT.gainWeapon],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },*/
    tradersSatchel: {
        id: "tradersSatchel",
        cardName: "Trader's scales",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Uptrade/><Coin/><Coin/><Coin/>
            </div>,
        effects: [EFFECT.uptrade, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        image: "",
        cost: 4,
        points: 1
    },
    huntingArrows: {
        id: "huntingArrows",
        cardName: "Hunting Arrows",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Gain <Fear/> to gain <Weapon/><Weapon/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainWeapon, EFFECT.gainWeapon],
        isGuarded: false,
        image: "",
        cost: 4,
        points: 1
    },
    /*unknown2: {
        id: "unknown2",
        cardName: "Guiding Stone",
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
    },*/
    coconutFlask: {
        id: "coconutFlask",
        cardName: "Coconut flask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Coin/><Coin/><Explore/><br/><b>Activate</b> the weaker effect of an assistant in the offer.
            </div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.activateLesserAssistantFromOffer, EFFECT.gainAction],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 2
    },
    cauldron: {
        id: "cauldron",
        cardName: "Redstone Cauldron",
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
    ancientWine: {
        id: "ancientWine",
        cardName: "Ancient Wine",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Coin/><br/>Use effect of of <GoldAssistant/> available on the supply board.
            </div>,
        effects: [EFFECT.gainCoin, EFFECT.activateStrongerAssistantFromOffer, EFFECT.gainAction],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    decoratedHorn: {
        id: "decoratedHorn",
        cardName: "Decorated Horn",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Exchange your <AssistantUpgrade/> with one available in store, keep his level
                and Refresh him and</div>,
        effects: [EFFECT.exchangeAssistant],
        isGuarded: false,
        image: magicDoor,
        cost: 3,
        points: 2
    },
    /*mirrorBowl: {
        id: "mirrorBowl",
        cardName: "Mirror bowl",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Explore/><Explore/><Explore/>
            </div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore],
        isGuarded: false,
        image: "",
        cost: 4,
        points: 2
    },*/
    ornateHammer: {
        id: "ornateHammer",
        cardName: "Ornate Hammer",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Exile rightmost <Item/> in the card row. Gain any <Item/> from the exile.</div>,
        effects: [EFFECT.gainDestroyedItem],
        isGuarded: false,
        image: "",
        cost: 4,
        points: 2
    },
    snakeBracelet: {
        id: "snakeBracelet",
        cardName: "Star Charts",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Pay <Coin/> to activate two different <LocationL1/>
            </div>,
        effects: [EFFECT.loseCoin, EFFECT.activate2L1Locations],
        isGuarded: false,
        image: "",
        cost: 4,
        points: 2
    },
    stoneJar: {
        id: "stoneJar",
        cardName: "Stone Jar",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/>
            </div>,
        effects: [EFFECT.draw1],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 1
    },
    /*boneHairpin: {
        id: "boneHairpin",
        cardName: "Bone hairpin",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Exile</b> <Item/> from the card row and refill it. You may buy <Item/> with
            a discount <Coin/><Coin/></div>,
        effects: [EFFECT.replaceItemsInStore, EFFECT.buyItemWithDiscount2],
        isGuarded: false,
        image: "",
        cost: 2,
        points: 2
    },*/
    passageShell: {
        id: "passageShell",
        cardName: "Passage shell",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><PlaceAdventurer/> on a <LocationL1/> site. You may
            <b>activate</b> it twice instead of once.</div>,
        effects: [EFFECT.placeToBasicLocationActivateTwice],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    boneRattle: {
        id: "boneRattle",
        cardName: "Ceremonial Rattle",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Refresh <AssistantUpgrade/></div>,
        effects: [EFFECT.refreshAnyAssistant],
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
            <div className="effectsText"><Discard/><br/>Refresh all of your <AssistantUpgrade/></div>,
        effects: [EFFECT.discard, EFFECT.refreshAllAssistants],
        isGuarded: false,
        image: "",
        cost: 3,
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
    trophySkull: {
        id: "trophySkull",
        cardName: "Stone Key",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Return a slotted <BronzeRelic/> back to your pool.</div>,
        effects: [EFFECT.refreshRelic],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 2
    },
    earRingOfDarkness: {
        id: "earRingOfDarkness",
        cardName: "Obsidian Earring",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Draw up to two cards from the bottom of your deck. Keep one of them and discard the
            other one with no effect.</div>,
        effects: [EFFECT.draw2FromBottomKeep1],
        image: "",
        cost: 4,
        points: 2
    },
    /*jewelDice: {
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
    },*/
    guidingStone: {
        id: "guidingStone",
        cardName: "Guiding Stone",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Reveal the top tile of the <LocationL2/> stack. Activate it, then put it on the bottom.
            </div>,
        effects: [EFFECT.activateTopL2Location],
        isGuarded: false,
        image: "",
        cost: 3,
        points: 1
    },
    guidingSkull: {
        id: "guidingSkull",
        cardName: "Guiding Skull",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText">Pay <Explore/> to reveal the top tile of the <LocationL2/> stack. Activate it, then put it on the bottom.
            </div>,
        effects: [EFFECT.loseExplore, EFFECT.activateTopL3Location],
        isGuarded: false,
        image: "",
        cost: 4,
        points: 1
    },
    runesOfDead: {
        id: "runesOfDead",
        cardName: "Runes of the Dead",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Fear/><Coin/><Text/><Text/><Text/></div>,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        image: "",
        cost: 4,
        points: 1
    },
    guradiansCrown: {
        id: "guradiansCrown",
        cardName: "Guardian's crown",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effectsText:
            <div className="effectsText">Move <Guardian/> from a site you occupy to any unocuppied
                <LocationL1/> or <LocationL2/> with no <Guardian/>. Activate the site.</div>,
        effects: [EFFECT.moveGuardianOut],
        image: "",
        cost: 4,
        points: 2
    },
});

export const EXPEDITIONS = Object.freeze({
    hiddenGems: {
        id: "hiddenGems",
        cardName: "Hidden Gems",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each <Item/> that cost only <Coin/></div>,
        points: 4,
    },
    secretPaths: {
        id: "secretPaths",
        cardName: "Secret Paths",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+ ?<VictoryPointsBgr/> Score again 2 of <BronzeRelic/> that you placed</div>,
        points: 0
    },
    rareFinds: {
        id: "rareFinds",
        cardName: "Rare Finds",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+ ?<VictoryPointsBgr/> equal to <VictoryPointsBgr/> on one of your <Item/> and one of
                your <Artifact/>.</div>,
        points: 2,
    },
    fullyEquipped: {
        id: "fullyEquipped",
        cardName: "Fully Equipped",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+ 1 <VictoryPointsBgr/> for each 2 cards in your deck.</div>,
        points: 0,
    },
    trophyHunter: {
        id: "trophyHunter",
        cardName: "Trophy Hunter",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each defeated <Guardian/></div>,
        points: 3,
    },
    trustedGear: {
        id: "trustedGear",
        cardName: "Trusted Gear",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for up to 7 <Item/> in your deck.</div>,
        points: 1,
    },
    collector: {
        id: "collector",
        cardName: "Collector",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for up to 7 <Artifact/> in your deck.</div>,
        points: 2,
    },
    cartographer: {
        id: "cartographer",
        cardName: "Cartographer",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each <BronzeRelic/> you own.</div>,
        points: 3,
    },
    fearless: {
        id: "fearless",
        cardName: "Fearless",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+6 <VictoryPointsBgr/> if you have no <Fear/> in you deck. +2 <VictoryPointsBgr/> if
                you have only one.</div>,
        points: 1,
    },
    beyondBasics: {
        id: "beyondBasics",
        cardName: "Beyond Basics",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPointsBgr/> for each Explore and Gold card you destroyed during the
                game.</div>,
        points: 1,
    },
    quantityAboveAll: {
        id: "quantityAboveAll",
        cardName: "Quantity Above All",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPointsBgr/> for up to 4 <Item/> that costs <Coin/><Coin/><Coin/> or
                more.</div>,
        points: 0,
    },
    belongsToTheMuseum: {
        id: "belongsToTheMuseum",
        cardName: "Belongs to the Museum",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+2 <VictoryPointsBgr/> for each <Artifact/> that
                costs <Explore/><Explore/><Explore/> or more.</div>,
        points: 0,
    },
    guardedTreasure: {
        id: "guardedTreasure",
        cardName: "Guarded Treasure",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each guarded <Artifact/>.</div>,
        points: 4,
    },
    checkMyResults: {
        id: "checkMyResults",
        cardName: "Check My Results",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each step you progressed with your 2nd book.</div>,
        points: 2,
    },
    holyGrail: {
        id: "holyGrail",
        cardName: "Holy Grail!",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+7 <VictoryPointsBgr/> if you own <Treasure/></div>,
        points: 0,
    },
    powerfulDestruction: {
        id: "powerfulDestruction",
        cardName: "Powerful destruction",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each <Item/> or <Artifact/> that you own which
                has <DestroyCard/> ability.</div>,
        points: 4,
    },
    animalLover: {
        id: "animalLover",
        cardName: "Animal Lover",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each animal in you deck.</div>,
        points: 2,
    },
    teamWork: {
        id: "teamWork",
        cardName: "Team Work",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+3 <VictoryPointsBgr/> for each assistant you gained.</div>,
        points: 1,
    },
    tradingKnowledge: {
        id: "tradingKnowledge",
        cardName: "Trading Knowledge",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each <BronzeRelic/> that you placed in the first 3
                rows.</div>,
        points: 4,
    },
    touchTheSkies: {
        id: "touchTheSkies",
        cardName: "Touch the Skies",
        type: CARD_TYPE.goalCard,
        effectsText:
            <div className="effectsText">+1 <VictoryPointsBgr/> for each <Blimp/> generated by your cards of assistants.
            </div>,
        points: 1,
    },
});


