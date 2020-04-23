import React from "react";
import {
    AdventurerIcon,
    Arrow,
    Artifact,
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
    Blimp,
    Shiny,
    Ship,
    Text,
    VictoryPoints,
    Walk,
    Weapon
} from "../components/Symbols.js";
import {EFFECT} from "./effects.mjs";
import {CARD_TYPE} from "./idLists.mjs";


export const CARD_TRANSPORT = Object.freeze({
    empty: "no transport",
    walk: "hike",
    jeep: "jeep",
    ship: "ship",
    plane: "plane",
});

const bigIconsStyle = {
    fontSize: "1.2vw",
}

const lockEffectsStyle = {
    height: "100%",
    width: "auto"
}

const columnStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "auto",
}

export const ITEMS = Object.freeze({
    fear: {
        id: "fear",
        cardName: "Fear",
        transport: CARD_TRANSPORT.walk,
        transportAmount: 1,
        effectsText: "",
        effects: [],
        cost: 0,
        points: -1
    },
    coin: {
        id: "coin",
        cardName: "Coin",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/></div>,
        effects: [EFFECT.gainCoin],
        cost: 0,
        points: 0
    },
    explore: {
        id: "explore",
        cardName: "Explore",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/></div>,
        effects: [EFFECT.gainExplore],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        id: "seaTurtle",
        cardName: "Sea Turtle",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw1Card/><Ship/></div>,
        effects: [EFFECT.draw1, EFFECT.gainShip],
        cost: 2,
        points: 2
    },
    ostrich: {
        id: "ostrich",
        cardName: "Ostrich",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw1Card/><Jeep/></div>,
        effects: [EFFECT.draw1, EFFECT.gainJeep],
        cost: 2,
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
        cost: 4,
        points: 2
    },
    horse: {
        id: "horse",
        cardName: "Horse",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw1Card/><Explore/><Explore/></div>,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 4,
        points: 1
    },
    dog: {
        id: "dog",
        cardName: "Dog",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        //todo it should not be allowed to skip the discard
        effectsText: <div style={bigIconsStyle}><Draw2Cards/> <Discard/></div>,
        effects: [EFFECT.draw2, EFFECT.discard],
        cost: 2,
        points: 2
    },
    steamBoat: {
        id: "steamBoat",
        cardName: "Steam boat",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: 2
    },
    jeep: {
        id: "jeep",
        cardName: "Jeep",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: 1
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
        cardName: "Boots",
        transport: CARD_TRANSPORT.walk,
        transportAmount: 2,
        effectsText: <div style={bigIconsStyle}><Explore/></div>,
        effects: [EFFECT.gainExplore],
        cost: 1,
        points: 1
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        cardName: "Hot Air Baloon",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Discount:</b> <Explore/><Explore/><Explore/><Explore/> to discover
            any location. Then <b>destroy</b> this card.</div>,
        effects: [EFFECT.gainPlane, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: 1
    },
    airplane: {
        id: "airplane",
        cardName: "Airplane",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore],
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
        cost: 1,
        points: 1
    },
    /*hat: {
        id: "hat",
        cardName: "Hat",
        transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Explore/> <Text/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainText],
        cost: 1,
        points: 1
    },*/
    trowel: {
        id: "trowel",
        cardName: "Trowel",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Arrow/><Jewel/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainJewel],
        cost: 1,
        points: 1
    },
    pickaxe: {
        id: "pickaxe",
        cardName: "Pickaxe",
        transport: CARD_TRANSPORT.jeep,

        effectsText: <div style={bigIconsStyle}><Explore/><Arrow/><Weapon/><Text/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainText, EFFECT.gainWeapon],
        cost: 1,
        points: 1
    },
    /*spyglass: {
        id: "spyglass",
        cardName: "Spyglass", transport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">1x: <Explore/> <Explore/> <Arrow/> <Shiny/></div>,
        effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainShiny],
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
        effectsText: <div className="effectsText"><b>Gain:</b> 1 <Coin/> for each <Guardian/> you defeated.</div>,
        effects: [EFFECT.return],
        cost: 2,
        points: 2
    },
    journal: {
        id: "journal",
        cardName: "Journal",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Explore/> for each <Shiny/> you own (up tp 4) .</div>,
        effects: [EFFECT.gainExploreForShinys],
        cost: 3,
        points: 2
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
        cost: 2,
        points: 2
    },
    pocketWatch: {
        id: "pocketWatch",
        cardName: "Pocket Watch",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Coin/> and <b>Gain:</b> <Coin/><Coin/> if this was the
            last card in your hand.</div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoinsIfLast],
        cost: 3,
        points: 2
    },
    grapplingHook: {
        id: "grapplingHook",
        cardName: "Grappling Hook",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Text/> or <Weapon/> or <Jewel/> that can be obtained
            from
            a location adjacent to you <AdventurerIcon/></div>,
        effects: [EFFECT.gainResourceFromAdjacent],
        cost: 3,
        points: 1
    },
    camouflagePaint: {
        id: "camouflagePaint",
        cardName: "Camouflage Paint",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Activate:</b> <LocationL1/> or <LocationL2/> occupied by the
            opponent.</div>,
        effects: [EFFECT.useOpponentsLocation],
        cost: 3,
        points: 1
    },
    tent: {
        id: "tent",
        cardName: "Tent",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Activate:</b> <LocationL1/> or <LocationL2/> that you already
            occupy.
        </div>,
        effects: [EFFECT.useYourLocation],
        cost: 3,
        points: 1,
    },
    fishingRod: {
        id: "fishingRod",
        cardName: "FishingRod",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Discount:</b> <Coin/><Coin/><Coin/> You may buy any <Item/>.
        </div>,
        effects: [EFFECT.revealItemBuyWithDiscount2],
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
        effects: [EFFECT.revealArtifactBuyWithDiscount2],
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
        effectsText: <div className="effectsText"><b>Gain:</b> <Explore/> for each <Guardian/> in your Play Area and
            Discard
            Pile (up to 4).</div>,
        effects: [EFFECT.gainExploreForGuardians],
        cost: 2,
        points: 2
    },
    messengerPidgeon: {
        id: "messengerPidgeon",
        cardName: "Pidgeon",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Text/> and you may draw a card from discard pile into
            your hand</div>,
        effects: [EFFECT.gainText, EFFECT.drawFromDiscard],
        cost: 3,
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
        cost: 2,
        points: 1
    },
    bookOfMyths: {
        id: "bookOfMyths",
        cardName: "Book of Myths",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Shiny/>. Then <b>destroy</b> this card.</div>,
        effects: [EFFECT.gainShiny, EFFECT.destroyThisCard],
        cost: 3,
        points: 1
    },
    bag: {
        id: "bag",
        cardName: "Bag",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Item/> to your hand. Then <b>destroy</b> this card.
        </div>,
        effects: [EFFECT.gainItemToHand, EFFECT.destroyThisCard],
        cost: 2,
        points: 1
    },
    flask: {
        id: "flask",
        cardName: "Flask",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Draw3Cards/></div>,
        effects: [EFFECT.draw1, EFFECT.draw1, EFFECT.draw1],
        cost: 2,
        points: 1
    },
    floraSamples: {
        id: "floraSamples",
        cardName: "Flora Samples",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div className="effectsText"><b>Gain:</b> <Text/> for each <AdventurerIcon/> in a jungle location.
        </div>,
        effects: [EFFECT.gainTextInJungle],
        cost: 1,
        points: 1
    },
    boomerang: {
        id: "boomerang",
        cardName: "Boomerang",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Coin/><Explore/><Draw1Card/><Discard/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.draw1, EFFECT.discard],
        cost: 2,
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
        effectsText: <div style={bigIconsStyle}><Coin/><Coin/><DestroyCard/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.destroyCard],
        cost: 3,
        points: 1
    },
    machete: {
        id: "machete",
        cardName: "Machete",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effectsText: <div style={bigIconsStyle}><Explore/><Explore/><DestroyCard/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyCard],
        cost: 3,
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
        effects: [EFFECT.gainPlane, EFFECT.moveAdvToEmptyAdjacentLocation],
        isGuarded: false,
        cost: 1,
        points: 1
    },
    warMask: {
        id: "warMask",
        cardName: "War Mask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><DestroyCard/></div>,
        effects: [EFFECT.draw1, EFFECT.destroyCard],
        isGuarded: true,
        cost: 2,
        points: 2
    },
    mirrorShard: {
        id: "mirrorShard",
        cardName: "Mirror shard",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Activate</b> another <Artifact/> in the offer.</div>,
        effects: [EFFECT.useArtifactOnMarket],
        isGuarded: true,
        cost: 2,
        points: 2
    },
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
        isGuarded: true,
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
        cost: 3,
        points: 2
    },
    ringOfLight: {
        id: "ringOfLight",
        cardName: "Ring of Light",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><Draw1Card/> from you <b>Draw deck</b> or <b>Discard Pile</b></div>,
        effects: [EFFECT.drawFromDrawDeckOrDiscard],
        isGuarded: false,
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
            <div className="effectsText"><b>Discount</b> <Jewel/> to progress in a legend.</div>,
        effects: [EFFECT.progressWithJewel],
        isGuarded: false,
        cost: 3,
        points: 2
    },
    inscribedBlade: {
        id: "inscribedBlade",
        cardName: "Inscribed Blade",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Discount</b> <Text/><Text/> of <Weapon/> to progress in a legend.</div>,
        effects: [EFFECT.progressWithTextsOrWeapon],
        isGuarded: false,
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
        effects: [EFFECT.destroyCard, EFFECT.discardFor2Cards],
        cost: 2,
        points: 3
    },*/
    ancientCipher: {
        id: "ancientCipher",
        cardName: "Ancient Cipher",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div style={bigIconsStyle}><Draw1Card/><Text/></div>,
        effects: [EFFECT.draw1, EFFECT.gainText],
        isGuarded: false,
        cost: 2,
        points: 1
    },
    owlEyes: {
        id: "owlEyes",
        cardName: "Owl Eyes",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effectsText:
            <div className="effectsText"><b>Gain</b> basic <b>Explore bonus</b> of one of your defeated <Guardian/>.
            </div>,
        effects: [EFFECT.gainDiscoveryBonus],
        isGuarded: false,
        cost: 3,
        points: 1
    },
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
        effects: [EFFECT.destroyCard, EFFECT.gainWeapon],
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
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">2 <VictoryPoints/> for up to 3 <Item/> that cost 1 <Coin/></div>
    },
    secretPaths: {
        id: "secretPaths",
        cardName: "Secret Paths",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText"><VictoryPoints/> for each <Shiny/> you own</div>
    },
    rareFinds: {
        id: "rareFinds",
        cardName: "Rare Finds",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">1 <VictoryPoints/> and <VictoryPoints/> of one <Item/> and one <Artifact/> you
                own.</div>
    },
    fullyEquipped: {
        id: "fullyEquipped",
        cardName: "Fully Equipped",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">2 <VictoryPoints/> and 1 <VictoryPoints/> for each 3 cards in your deck.</div>,
    },
    trophyHunter: {
        id: "trophyHunter",
        cardName: "Trophy Hunter",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">1 <VictoryPoints/> and 1 <VictoryPoints/> for each defeated <Guardian/></div>,
    },
    trustedGear: {
        id: "trustedGear",
        cardName: "Trusted Gear",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">1 <VictoryPoints/> for each <Item/> in your deck (up to 7 <VictoryPoints/>)</div>
    },
    collector: {
        id: "collector",
        cardName: "Collector",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">1 <VictoryPoints/> for each <Artifact/> in your deck (up to 7 <VictoryPoints/>)</div>
    },
    cartographer: {
        id: "cartographer",
        cardName: "Cartographer",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">2 <VictoryPoints/> for each <Shiny/> (up to 8 <VictoryPoints/>)</div>
    },
    fearless: {
        id: "fearless",
        cardName: "Fearless",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">6 <VictoryPoints/> if you have no <Fear/> in you deck. 2 <VictoryPoints/> if you have only one.</div>
    },
    beyondBasics: {
        id: "beyondBasics",
        cardName: "Beyond Basics",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">2 <VictoryPoints/> for each Explore and Gold card you destroyed during the game.</div>
    },
    quantityAboveAll: {
        id: "quantityAboveAll",
        cardName: "Quantity Above All",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">2 <VictoryPoints/> for each <Item/> that costs <Coin/><Coin/><Coin/> or more (up to 8 <VictoryPoints/>)</div>
    },
    belongsToTheMuseum: {
        id: "belongsToTheMuseum",
        cardName: "Belongs to the Museum",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">2 <VictoryPoints/> for each <Artifact/> that costs <Explore/><Explore/><Explore/> or more (upo to 8 <VictoryPoints/>)</div>
    },
    secondHandEquipment: {
        id: "secondHandEquipment",
        cardName: "Second-hand equipment",
        type: CARD_TYPE.expedition,
        effectsText:
            <div className="effectsText">1 <VictoryPoints/> for each <Item/> that costs <Coin/><Coin/> or more (up to 6 <VictoryPoints/>)</div>
    }
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
        discoveryTextRow: <div style={bigIconsStyle}><Text/><Coin/><Explore/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Weapon/><Jewel/></div>,
        cost: null,
        points: 2
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
        discoveryTextRow: <div style={bigIconsStyle}><Coin/><Text/><Text/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Explore/><Text/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Weapon/><Text/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/><Discard/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Explore/><Weapon/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Text/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Explore/><Text/><Text/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Weapon/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Explore/><Text/><Text/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Explore/><Explore/></div>,
        lockText: <div style={lockEffectsStyle}><Explore/><Explore/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Text/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Text/><Weapon/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: -1
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
        discoveryTextRow: <div style={bigIconsStyle}><Coin/><Weapon/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/><Discard/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Explore/><Text/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Explore/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Coin/><Weapon/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Weapon/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Text/><Text/><Text/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Coin/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Explore/><Weapon/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 1
    },
    swarmingSpiders: {
        id: "swarmingSpiders",
        cardName: "Swarming Spiders",
        type: CARD_TYPE.guardian,
        effectsText:
            <div style={bigIconsStyle}><Walk/></div>,
        effects: [EFFECT.loseWalk, EFFECT.defeatThisGuardian],
        discoveryText: <div style={columnStyle}><Coin/><Weapon/></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainCoin],
        discoveryText2: <div style={columnStyle}><Explore/><Text/></div>,
        discoveryEffect2: [EFFECT.gainExplore, EFFECT.gainText],
        discoveryTextRow: <div style={bigIconsStyle}><Coin/><Weapon/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Explore/><Text/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Coin/><Coin/><Explore/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Text/><Text/></div>,
        lockText: <div style={lockEffectsStyle}><Text/><Weapon/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Coin/><Coin/><Coin/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Weapon/></div>,
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
        discoveryTextRow: <div style={bigIconsStyle}><Jewel/></div>,
        discoveryTextRow2: <div style={bigIconsStyle}><Coin/><Coin/></div>,
        lockText: <div style={lockEffectsStyle}><Discard/></div>,
        cost: null,
        points: 2
    },
});
