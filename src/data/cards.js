import React from "react";
import {
    Adventurer,
    Arrow,
    Coin,
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
import bgrItemEmpty from "../img/cardBackgrounds/ItemBrownEmpty3.png";
import bgrWalk from "../img/cardBackgrounds/ItemBrownWalk3.png";
import bgrJeep from "../img/cardBackgrounds/ItemBrownJeep3.png";
import bgrShip from "../img/cardBackgrounds/ItemBrownShip3.png";
import bgrPlane from "../img/cardBackgrounds/ItemBrownPlane3.png";
import bgrArtifact from "../img/cardBackgrounds/Artifacts7.png";
import {EFFECT} from "./effects";

export const CARD_TRANSPORT = Object.freeze({
    empty: bgrItemEmpty,
    walk: bgrWalk,
    jeep: bgrJeep,
    ship: bgrShip,
    plane: bgrPlane,
    artifact: bgrArtifact
});

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




export const ITEMS = Object.freeze({
    fear: {
        cardName: "Fear",
        type: CARD_TYPE.basic,
        itemTransport: CARD_TRANSPORT.walk,
        cost: 0,
        effectsText: "",
        points: -1
    },
    coin: {
        cardName: "Coin",
        type: CARD_TYPE.basic,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <Coin/>,
        effects: [EFFECT.gainCoin],
        cost: 0,
        points: 0
    },
    explore: {
        cardName: "Explore",
        type: CARD_TYPE.basic,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <Explore/>,
        effects: [EFFECT.gainExplore],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        cardName: "Sea Turtle",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Draw1Card/> and <Ship/></div>,
        effects: [EFFECT.draw1, EFFECT.gainShip],
        cost: 2,
        points: 1
    },
    ostrich: {
        cardName: "Ostrich",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Draw1Card/> and <Jeep/></div>,
        effects: [EFFECT.draw1, EFFECT.gainJeep],
        cost: 2,
        points: 1
    },
    camel: {
        cardName: "Camel",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Draw1Card/> and <Coin/><Coin /></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 1
    },
    packDonkey: {
        cardName: "Pack Donkey",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <Draw2Cards/>,
        effects: [EFFECT.draw2],
        cost: 3,
        points: 1
    },
    horse: {
        cardName: "Horse",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Draw1Card/> and <Explore /><Explore /> </div>,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 4,
        points: 1
    },
    dog: {
        cardName: "Dog",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Draw2Cards/> and <Discard />. </div>,
        effects: [EFFECT.draw2, EFFECT.discard],
        cost: 1,
        points: 1
    },
    canoe: {
        cardName: "Canoe",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
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
        itemTransport: CARD_TRANSPORT.empty,
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
        itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Ship/> <Explore/> <Explore/></div>,
        effects: [EFFECT.gainShip, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 3,
        points: 1
    },
    hotAirBaloon: {
        cardName: "Hot Air Baloon",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Plane/> <Explore/> <Explore /></div>,
        effects: [EFFECT.gainPlane, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: 1
    },
    Airplane: {
        cardName: "Airplane",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.plane,
        effectsText: <div className="effectsText"><Explore/> <Explore /> <Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 5,
        points: 2
    },
    goldPan: {
        cardName: "Gold Pan",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Coin/> <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },
    hat: {
        cardName: "Hat",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Explore/> <Text/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainText],
        cost: 1,
        points: 1
    },
    trowel: {
        cardName: "Trowel",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Explore/> <Arrow/> <Jewel/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainJewel],
        cost: 1,
        points: 1
    },
    pickaxe: {
        cardName: "Pickaxe",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText">1x: <Explore/> <Arrow/> <Weapon/> <Text/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainText, EFFECT.gainWeapon],
        cost: 1,
        points: 1
    },
    spyglass: {
        cardName: "Spyglass",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">1x: <Explore/> <Explore/> <Arrow/> <Shiny/></div>,
        effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainShiny],
        effects2Text: <div className="effectsText"><Jeep/> <Jeep/></div>,
        effects2: [EFFECT.gainJeep, EFFECT.gainJeep],
        cost: 1,
        points: 1
    },
    /*hammock: {
        cardName: "Hammock",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.itemShip,
        effectsText: <div className="effectsText">Refresh <Adventurer /> and <Uptrade /></div>,
        effects2Text: [EFFECT.refreshAdventurer, EFFECT.uptrade],
        cost: 1,
        points: 1
    },*/
    /*coffee: {
        cardName: "Coffee",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Draw2Cards /><Discard /> and refresh all you <Adventurer /></div>,
        effects: [EFFECT.draw2, EFFECT.discard, EFFECT.refreshAllAdventurers],
        cost: 2,
        points: 1
    },*/
    /*banjo: {
        cardName: "Banjo",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">Gain 1 <Coin/> for each Legend you claimed.</div>,
        effects: [EFFECT.gainCoinForLegends],
        cost: 2,
        points: 1
    },*/
    /*beerMug: {
        cardName: "Beer Mug",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText">Gain 1 <Coin/> for each <Guardian/> you defeated (max 4).</div>,
        effects: [EFFECT.return],
        cost: 2,
        points: 1
    },*/
    journal: {
        cardName: "Journal",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">Gain 1 <Explore/> for each <Shiny/> (max 4).</div>,
        effects: [EFFECT.gainExploreForShinys],
        cost: 4,
        points: 1
    },
    lockPick: {
        cardName: "Lock Pick",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Discard/> <Arrow/> <Coin/> <Coin/> <Coin/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 0
    },
    parrot: {
        cardName: "Parrot",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Discard/> <Arrow/> <Jewel/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainJewel],
        cost: 2,
        points: 1
    },
    boots: {
        cardName: "Boots",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.walk,
        effectsText: <div className="effectsText"> <Draw1Card /> <Explore /> <Walk /></div>,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainWalk],
        cost: 3,
        points: 1
    },
    pocketWatch: {
        cardName: "Pocket Watch",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Coin/> and if this was the last card in your hand, gain extra <Coin/>
            <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoinsIfLast],
        cost: 3,
        points: 1
    },
    grapplingHook: {
        cardName: "Grappling Hook",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"> Exhaust your <Adventurer /> and use the effect of an adjacent empty (II) location. </div>,
        effects: [EFFECT.useAdjacentEmptyLocation],
        cost: 2,
        points: 1
    },
    camouflagePaint: {
        cardName: "Camouflage Paint",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"> You may use the effect of a location used by an opponent.</div>,
        effects: [EFFECT.useOpponentsLocation],
        cost: 4,
        points: 1
    },
    tent: {
        cardName: "Tent",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.plane,
        effectsText: <div className="effectsText"> Use the effect of a location already occupied by your <Adventurer/>
        </div>,
        effects: [EFFECT.useYourLocation],
        cost: 4,
        points: 1,
    },
    fishingRod: {
        cardName: "FishingRod",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"> Reveal the top card of the Item deck.<br/>You may buy any Item with
            discount of <Coin/> <Coin/></div>,
        effects: [EFFECT.revealItemBuyWithDiscount2],
        cost: 2,
        points: 1
    },
    compass: {
        cardName: "Compass",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText"> Reveal the top card of the Artifact deck. <br/>You may buy any Artifact with
                discount of <Explore/> <Explore/></div>,
        effects: [EFFECT.revealArtifactBuyWithDiscount2],
        cost: 2,
        points: 1
    },
    /*flintPistol: {
        cardName: "Flint Pistol",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText"> Defeat <Guardian/> in your play area or discard pile.</div>,
        effects: [EFFECT.defeatGuardian],
        cost: 4,
        points: 1
    },*/
    /*bowAndArrows: {
        cardName: "Bow and Arrows",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText"><Explore/> plus <Explore/> for each <Guardian/> in your Play Area and Discard
                Pile.</div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExploreForGuardians],
        cost: 2,
        points: 2
    },*/
    messengerPidgeon: {
        cardName: "Messenger Pidgeon",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText">Gain <Text/> and you may draw any card from your Discard Pile.</div>,
        effects: [EFFECT.gainText, EFFECT.drawFromDiscard],
        cost: 3,
        points: 2
    },
    whip: {
        cardName: "Whip",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText">Gain an Artifact then destroy this card.</div>,
        effects: [EFFECT.destroyThisCard, EFFECT.gainArtifact],
        cost: 2,
        points: 1
    },
    bookOfMyths: {
        cardName: "Book of Myths",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText">Progress in a Legend then destroy this card.</div>,
        effects: [EFFECT.progressForFree, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    bag: {
        cardName: "Bag",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText">Gain an Item to your hand then destroy this card.</div>,
        effects: [EFFECT.gainItemToHand, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    /*floraSamples: {
        cardName: "Flora Samples",
        type: CARD_TYPE.item,
        itemTransport: itemTransportS.itemJeep,
        effectsText:
            <div className="effectsText">(H)</div>,
        cost: 2,
        points: 2
    },*/
    boomerang: {
        cardName: "Boomerang",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText"><Walk/> <Draw1Card/> <Discard/>.</div>,
        effects: [EFFECT.gainWalk, EFFECT.draw1, EFFECT.discard],
        cost: 3,
        points: 3
    },
    beetleMask: {
        cardName: "Beetle Mask",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText">Remove <Guardian/> in your Play Area or Discard Pile from the game.</div>,
        effects: [EFFECT.removeGuardian],
        cost: 3,
        points: 4
    },
    hook: {
        cardName: "Hook",
        type: CARD_TYPE.item,
        itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText"><DestroyCard/></div>,
        effects: [EFFECT.destroyCard],
        cost: 2,
        points: 3
    },
});



export const ARTIFACTS = Object.freeze({
    /*golemShem: {
        cardName: "Golem Shem",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">For this round only: <Adventurer /> </div>,
        effects: [EFFECT.gainAdventurerForThisRound],
        cost: 3,
        points: 2
    },
    bookOfSecrets: {
        cardName: "Book of secrets",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">2x: gain a bonus from a legend you completed</div>,
        effects: [EFFECT.gainBonusFromLegendYouCompleted, EFFECT.gainBonusFromLegendYouCompleted],
        cost: 4,
        points: 2
    },*/
    bookOfSecrets: {
        cardName: "Book of Secrets",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Gain a bonus from an unclaimed, visible legend.</div>,
        effects: [EFFECT.gainBonusFromUnclaimedLegend],
        cost: 1,
        points: 2
    },
    chestOfWonders: {
        cardName: "Chest of Wonders",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Use the effect of an item on the market</div>,
        effects: [EFFECT.useItemOnMarket],
        cost: 2,
        points: 2
    },
    mirrorShard: {
        cardName: "Mirror shard",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Use the effect of an artifact in the market</div>,
        effects: [EFFECT.useArtifactOnMarket],
        cost: 2,
        points: 2
    },
    portalStone: {
        cardName: "Portal stone",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Plane /> and relocate one of your deployed <Adventurer /> to an empty location.</div>,
        effects: [EFFECT.gainPlane, EFFECT.moveAdvToEmptyLocation],
        cost: 2,
        points: 2
    },
    /*pathfinderStaff: {
        cardName: "Pathfinder's Staff",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Plane /> and place one of your deployed <Adventurer /> to an adjacent.</div>,
        effects: [EFFECT.gainPlane, EFFECT.moveToAdjacentLocation],
        cost: 1,
        points: 1
    },*/
    /*healingOrb: {
        cardName: "Healing Orb",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Refresh all your <Adventurer />.</div>,
        effects: [EFFECT.refreshAdventurer],
        cost: 3,
        points: 2
    },*/
    mysteriousTexts: {
        cardName: "Mysterious Texts",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw2Cards /> and refresh <Adventurer /></div>,
        effects: [EFFECT.draw2, EFFECT.refreshAdventurer],
        cost: 4,
        points: 2
    },
    cursedTreasure: {
        cardName: "Cursed Treasure",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Fear /><Coin /><Coin /><Coin /><Coin /></div>,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 3
    },
    darkKnowledge: {
        cardName: "Dark Knowledge",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Fear /><Jewel /></div>,
        effects: [EFFECT.gainFear, EFFECT.gainJewel],
        cost: 2,
        points: 2
    },
    goldenMask: {
        cardName: "Golden Mask",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Pay <Coin /> to gain effect of an occupied location.</div>,
        effects: [EFFECT.payTouseOccupiedLocation],
        cost: 4,
        points: 1
    },
    warMask: {
        cardName: "War Mask",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw1Card /><DestroyCard /></div>,
        effects: [EFFECT.draw1, EFFECT.destroyCard],
        cost: 1,
        points: 2
    },
    ritualDagger: {
        cardName: "Ritual Dagger",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Discard /> to gain <Jewel /><Jewel /></div>,
        effects: [EFFECT.discardFor2Jewels],
        cost: 3,
        points: 1
    },
    ringOfLight: {
        cardName: "Ring of Light",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Pick a card from your draw deck.</div>,
        effects: [EFFECT.drawFromDrawDeck],
        cost: 3,
        points: 3
    },
    beastKiller: {
        cardName: "Beast Killer",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Defeat a guardian in your play area or discard pile.</div>, // todo replace with guardian icon
        effects: [EFFECT.defeatGuardian],
        cost: 4,
        points: 1
    },
    /*flameJewek: {
        cardName: "Flame Jewel",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Gain or Decipher a Legend with a discount of <Jewel /></div>,
        effects: [EFFECT.gainOrDecipherWithJewel],
        cost: 3,
        points: 2
    },*/
    /*inscribedBlade: {
        cardName: "Inscribed Blade",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Gain or Decipher a Legend with a discount of <Text /><Text /> or <Weapon /></div>,
        effects: [EFFECT.gainOrDecipherWithTextsOrWeapon],
        cost: 3,
        points: 2
    },*/
    amuletOfCharm: {
        cardName: "Amulet of Charm",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Buy an item with discount of <Coin /><Coin /><Coin /></div>,
        effects: [EFFECT.buyItemWithDiscount3],
        cost: 3,
        points: 2
    },
    drinkingHorn: {
        cardName: "Drinking Horn",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><DestroyCard /><Discard /><Draw2Cards /></div>,
        effects: [EFFECT.destroyCard, EFFECT.discardFor2Cards],
        cost: 2,
        points: 3
    },
    ancientCipher: {
        cardName: "Ancient Cipher",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw1Card /> <Coin /></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        cost: 2,
        points: 2
    },
    transmutation: {
        cardName: "Transmutation",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><DestroyCard /> <Coin /><Coin /></div>,
        effects: [EFFECT.destroyCard, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 2
    },
    fearlessBlade: {
        cardName: "Fearless Blade",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><DestroyCard /> <Weapon /></div>,
        effects: [EFFECT.destroyCard, EFFECT.gainWeapon],
        cost: 2,
        points: 1
    },
    keysToAllDoors: {
        cardName: "Keys to all Doors",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Coin /> <Coin /> <Coin /></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },
    treacherusWhistle: {
        cardName: "Treacherus Whistle",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw2Cards /> if a guardian is drawn</div>, //todo replace guardian with an icon
        effects: [],
        cost: 1,
        points: 2
    },
    gianEgg: {
        cardName: "Giant Egg",
        type: CARD_TYPE.artifact,
        itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Text /><Text /> and <Uptrade /> </div>, //todo replace guardian with an icon
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.uptrade],
        effectsText2: //todo implement effects 2
            <div className="effectsText">Destroy this card to defeat a guardian </div>, //todo replace guardian with an icon
        effects2: [EFFECT.destroyThisCardToDefeatAGuardan],
        cost: 1,
        points: 2
    },
});