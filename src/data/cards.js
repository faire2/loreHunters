import React from "react";
import {
    AdventurerIcon,
    Arrow,
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
import bgrItemEmpty from "../img/cardBackgrounds/ItemBrownEmpty3.png";
import bgrWalk from "../img/cardBackgrounds/ItemBrownWalk3.png";
import bgrJeep from "../img/cardBackgrounds/ItemBrownJeep3.png";
import bgrShip from "../img/cardBackgrounds/ItemBrownShip3.png";
import bgrPlane from "../img/cardBackgrounds/ItemBrownPlane3.png";
import bgrArtifact from "../img/cardBackgrounds/Artifacts7.png";
import bgrGuardian from "../img/cardBackgrounds/Guardian12.png";
import {EFFECT} from "./effects.mjs";
import {CARD_TYPE} from "./idLists";

export const CARD_TRANSPORT = Object.freeze({
    empty: bgrItemEmpty,
    walk: bgrWalk,
    jeep: bgrJeep,
    ship: bgrShip,
    plane: bgrPlane,
    artifact: bgrArtifact,
    guardian: bgrGuardian
});

export const RES = Object.freeze({
    coin: "coin",
    explore: "explore",
    text: "text"
});


export const ITEMS = Object.freeze({
    fear: {
        id: "fear",
        cardName: "Fear",itemTransport: CARD_TRANSPORT.walk,
        effectsText: "",
        effects: [],
        cost: 0,
        points: -1
    },
    coin: {
        id: "coin",
        cardName: "Coin",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <Coin/>,
        effects: [EFFECT.gainCoin],
        cost: 0,
        points: 0
    },
    explore: {
        id: "explore",
        cardName: "Explore",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <Explore/>,
        effects: [EFFECT.gainExplore],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        id: "seaTurtle",
        cardName: "Sea Turtle",itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Draw1Card/> and <Ship/></div>,
        effects: [EFFECT.draw1, EFFECT.gainShip],
        cost: 2,
        points: 1
    },
    ostrich: {
        id: "ostrich",
        cardName: "Ostrich",itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Draw1Card/> and <Jeep/></div>,
        effects: [EFFECT.draw1, EFFECT.gainJeep],
        cost: 2,
        points: 1
    },
    camel: {
        id: "camel",
        cardName: "Camel",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Draw1Card/> and <Coin/><Coin /></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 1
    },
    packDonkey: {
        id: "packDonkey",
        cardName: "Pack Donkey",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <Draw2Cards/>,
        effects: [EFFECT.draw2],
        cost: 3,
        points: 1
    },
    horse: {
        id: "horse",
        cardName: "Horse",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Draw1Card/> and <Explore /><Explore /> </div>,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 4,
        points: 1
    },
    dog: {
        id: "dog",
        cardName: "Dog",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Draw2Cards/> and <Discard />. </div>,
        effects: [EFFECT.draw2, EFFECT.discard],
        cost: 1,
        points: 1
    },
    canoe: {
        id: "canoe",
        cardName: "Canoe",itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Explore/> <Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        effects2Text: <div className="effectsText"><Ship/> <Ship/></div>,
        effects2: [EFFECT.travelShip, EFFECT.travelShip],
        cost: 3,
        points: 1
    },
    jeep: {
        id: "jeep",
        cardName: "Jeep",itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Explore/> <Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore],
        effects2Text: <div className="effectsText"><Jeep/> <Jeep/></div>,
        effects2: [EFFECT.travelJeep, EFFECT.travelJeep],
        cost: 3,
        points: 1
    },
    astrolabe: {
        id: "astrolabe",
        cardName: "Astrolabe",itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Ship/> <Explore/> <Explore/></div>,
        effects: [EFFECT.gainShip, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 3,
        points: 1
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        cardName: "Hot Air Baloon",itemTransport: CARD_TRANSPORT.empty,
        effectsText: <div className="effectsText"><Plane/> <Explore/> <Explore /></div>,
        effects: [EFFECT.gainPlane, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: 1
    },
    airplane: {
        id: "airplane",
        cardName: "Airplane",itemTransport: CARD_TRANSPORT.plane,
        effectsText: <div className="effectsText"><Explore/> <Explore /> <Explore/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 5,
        points: 2
    },
    goldPan: {
        id: "goldPan",
        cardName: "Gold Pan",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Coin/> <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },
    hat: {
        id: "hat",
        cardName: "Hat",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Explore/> <Text/></div>,
        effects: [EFFECT.gainExplore, EFFECT.gainText],
        cost: 1,
        points: 1
    },
    trowel: {
        id: "trowel",
        cardName: "Trowel",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"><Explore/> <Arrow/> <Jewel/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainJewel],
        cost: 1,
        points: 1
    },
    pickaxe: {
        id: "pickaxe",
        cardName: "Pickaxe",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText">1x: <Explore/> <Arrow/> <Weapon/> <Text/></div>,
        effects: [EFFECT.loseExplore, EFFECT.gainText, EFFECT.gainWeapon],
        cost: 1,
        points: 1
    },
    spyglass: {
        id: "spyglass",
        cardName: "Spyglass",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">1x: <Explore/> <Explore/> <Arrow/> <Shiny/></div>,
        effects: [EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.gainShiny],
        effects2Text: <div className="effectsText"><Jeep/> <Jeep/></div>,
        effects2: [EFFECT.gainJeep, EFFECT.gainJeep],
        cost: 1,
        points: 1
    },
    hammock: {
        id: "hammock",
        cardName: "Hammock",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">Refresh <AdventurerIcon /> and <Uptrade /></div>,
        effects2Text: [EFFECT.refreshAdventurer, EFFECT.uptrade],
        cost: 1,
        points: 1
    },
    coffee: {
        id: "coffee",
        cardName: "Coffee",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Draw2Cards /><Discard /> and refresh all you <AdventurerIcon /></div>,
        effects: [EFFECT.draw2, EFFECT.discard, EFFECT.refreshAllAdventurers],
        cost: 2,
        points: 1
    },
    banjo: {
        id: "banjo",
        cardName: "Banjo",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">Gain 1 <Coin/> for each Legend you claimed.</div>,
        effects: [EFFECT.gainCoinForLegends],
        cost: 2,
        points: 1
    },
    beerMug: {
        id: "beerMug",
        cardName: "Beer Mug",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText">Gain 1 <Coin/> for each <Guardian/> you defeated (max 4).</div>,
        effects: [EFFECT.return],
        cost: 2,
        points: 1
    },
    journal: {
        id: "journal",
        cardName: "Journal",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText">Gain 1 <Explore/> for each <Shiny/> (max 4).</div>,
        effects: [EFFECT.gainExploreForShinys],
        cost: 4,
        points: 1
    },
    lockPick: {
        id: "lockPick",
        cardName: "Lock Pick",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Discard/> <Arrow/> <Coin/> <Coin/> <Coin/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 0
    },
    parrot: {
        id: "parrot",
        cardName: "Parrot",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Discard/> <Arrow/> <Jewel/>.</div>,
        effects: [EFFECT.discard, EFFECT.gainJewel],
        cost: 2,
        points: 1
    },
    boots: {
        id: "boots",
        cardName: "Boots",itemTransport: CARD_TRANSPORT.walk,
        effectsText: <div className="effectsText"> <Draw1Card /> <Explore /> <Walk /></div>,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainWalk],
        cost: 3,
        points: 1
    },
    pocketWatch: {
        id: "pocketWatch",
        cardName: "Pocket Watch",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"><Coin/> and if this was the last card in your hand, gain extra <Coin/>
            <Coin/></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoinsIfLast],
        cost: 3,
        points: 1
    },
    grapplingHook: {
        id: "grapplingHook",
        cardName: "Grappling Hook",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"> Exhaust your <AdventurerIcon /> and use the effect of an adjacent empty (II) location. </div>,
        effects: [EFFECT.useAdjacentEmptyLocation],
        cost: 2,
        points: 1
    },
    camouflagePaint: {
        id: "camouflagePaint",
        cardName: "Camouflage Paint",itemTransport: CARD_TRANSPORT.jeep,
        effectsText: <div className="effectsText"> You may use the effect of a location used by an opponent.</div>,
        effects: [EFFECT.useOpponentsLocation],
        cost: 4,
        points: 1
    },
    tent: {
        id: "tent",
        cardName: "Tent",itemTransport: CARD_TRANSPORT.plane,
        effectsText: <div className="effectsText"> Use the effect of a location already occupied by your <AdventurerIcon/>
        </div>,
        effects: [EFFECT.useYourLocation],
        cost: 4,
        points: 1,
    },
    fishingRod: {
        id: "fishingRod",
        cardName: "FishingRod",itemTransport: CARD_TRANSPORT.ship,
        effectsText: <div className="effectsText"> Reveal the top card of the Item deck.<br/>You may buy any Item with
            discount of <Coin/> <Coin/></div>,
        effects: [EFFECT.revealItemBuyWithDiscount2],
        cost: 2,
        points: 1
    },
    compass: {
        id: "compass",
        cardName: "Compass",itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText"> Reveal the top card of the Artifact deck. <br/>You may buy any Artifact with
                discount of <Explore/> <Explore/></div>,
        effects: [EFFECT.revealArtifactBuyWithDiscount2],
        cost: 2,
        points: 1
    },
    flintPistol: {
        id: "flintPistol",
        cardName: "Flint Pistol",itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText"> Defeat <Guardian/> in your play area or discard pile.</div>,
        effects: [EFFECT.defeatGuardian],
        cost: 4,
        points: 1
    },
    bowAndArrows: {
        id: "bowAndArrows",
        cardName: "Bow and Arrows",itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText"><Explore/> plus <Explore/> for each <Guardian/> in your Play Area and Discard
                Pile.</div>,
        effects: [EFFECT.gainExplore, EFFECT.gainExploreForGuardians],
        cost: 2,
        points: 2
    },
    messengerPidgeon: {
        id: "messengerPidgeon",
        cardName: "Messenger Pidgeon",itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText">Gain <Text/> and you may draw any card from your Discard Pile.</div>,
        effects: [EFFECT.gainText, EFFECT.drawFromDiscard],
        cost: 3,
        points: 2
    },
    whip: {
        id: "whip",
        cardName: "Whip",itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText">Gain an Artifact then destroy this card.</div>,
        effects: [EFFECT.destroyThisCard, EFFECT.gainArtifact],
        cost: 2,
        points: 1
    },
    bookOfMyths: {
        id: "bookOfMyths",
        cardName: "Book of Myths",itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText">Progress in a Legend then destroy this card.</div>,
        effects: [EFFECT.progressForFree, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    bag: {
        id: "bag",
        cardName: "Bag",itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText">Gain an Item to your hand then destroy this card.</div>,
        effects: [EFFECT.gainItemToHand, EFFECT.destroyThisCard],
        cost: 2,
        points: 2
    },
    floraSamples: {
        id: "floraSamples",
        cardName: "Flora Samples",
        itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText">(H)</div>,
        cost: 2,
        points: 2
    },
    boomerang: {
        id: "boomerang",
        cardName: "Boomerang",itemTransport: CARD_TRANSPORT.jeep,
        effectsText:
            <div className="effectsText"><Walk/> <Draw1Card/> <Discard/>.</div>,
        effects: [EFFECT.gainWalk, EFFECT.draw1, EFFECT.discard],
        cost: 3,
        points: 3
    },
    beetleMask: {
        id: "beetleMask",
        cardName: "Beetle Mask",itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText">Remove <Guardian/> in your Play Area or Discard Pile from the game.</div>,
        effects: [EFFECT.removeGuardian],
        cost: 3,
        points: 4
    },
    hook: {
        id: "hook",
        cardName: "Hook",itemTransport: CARD_TRANSPORT.ship,
        effectsText:
            <div className="effectsText"><DestroyCard/></div>,
        effects: [EFFECT.destroyCard],
        cost: 2,
        points: 3
    },
});



export const ARTIFACTS = Object.freeze({
    golemShem: {
        id: "golemShem",
        cardName: "Golem Shem",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">For this round only: <AdventurerIcon /> </div>,
        effects: [EFFECT.gainAdventurerForThisRound],
        cost: 3,
        points: 2
    },
    bookOfSecrets: {
        id: "bookOfSecrets",
        cardName: "Book of Secrets",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Gain a bonus from an unclaimed, visible legend.</div>,
        effects: [EFFECT.gainBonusFromUnclaimedLegend],
        cost: 1,
        points: 2
    },
    chestOfWonders: {
        id: "chestOfWonders",
        cardName: "Chest of Wonders",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Use the effect of an item on the market</div>,
        effects: [EFFECT.useItemOnMarket],
        cost: 2,
        points: 2
    },
    mirrorShard: {
        id: "mirrorShard",
        cardName: "Mirror shard",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Use the effect of an artifact in the market</div>,
        effects: [EFFECT.useArtifactOnMarket],
        cost: 2,
        points: 2
    },
    portalStone: {
        id: "portalStone",
        cardName: "Portal stone",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Plane /> and relocate one of your deployed <AdventurerIcon /> to an empty location.</div>,
        effects: [EFFECT.gainPlane, EFFECT.moveAdvToEmptyLocation],
        cost: 2,
        points: 2
    },
    pathfinderStaff: {
        id: "pathfinderStaff",
        cardName: "Pathfinder's Staff",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Plane /> and place one of your deployed <AdventurerIcon /> to an adjacent.</div>,
        effects: [EFFECT.gainPlane, EFFECT.moveToAdjacentLocation],
        cost: 1,
        points: 1
    },
    healingOrb: {
        id: "healingOrb",
        cardName: "Healing Orb",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Refresh all your <AdventurerIcon />.</div>,
        effects: [EFFECT.refreshAdventurer],
        cost: 3,
        points: 2
    },
    mysteriousTexts: {
        id: "mysteriousTexts",
        cardName: "Mysterious Texts",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw2Cards /> and refresh <AdventurerIcon /></div>,
        effects: [EFFECT.draw2, EFFECT.refreshAdventurer],
        cost: 4,
        points: 2
    },
    cursedTreasure: {
        id: "cursedTreasure",
        cardName: "Cursed Treasure",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Fear /><Coin /><Coin /><Coin /><Coin /></div>,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 3
    },
    darkKnowledge: {
        id: "darkKnowledge",
        cardName: "Dark Knowledge",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Fear /><Jewel /></div>,
        effects: [EFFECT.gainFear, EFFECT.gainJewel],
        cost: 2,
        points: 2
    },
    goldenMask: {
        id: "goldenMask",
        cardName: "Golden Mask",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Pay <Coin /> to gain effect of an occupied location.</div>,
        effects: [EFFECT.payTouseOccupiedLocation],
        cost: 4,
        points: 1
    },
    warMask: {
        id: "warMask",
        cardName: "War Mask",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw1Card /><DestroyCard /></div>,
        effects: [EFFECT.draw1, EFFECT.destroyCard],
        cost: 1,
        points: 2
    },
    ritualDagger: {
        id: "ritualDagger",
        cardName: "Ritual Dagger",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Discard /> to gain <Jewel /><Jewel /></div>,
        effects: [EFFECT.discardFor2Jewels],
        cost: 3,
        points: 1
    },
    ringOfLight: {
        id: "ringOfLight",
        cardName: "Ring of Light",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Pick a card from your draw deck.</div>,
        effects: [EFFECT.drawFromDrawDeck],
        cost: 3,
        points: 3
    },
    beastKiller: {
        id: "beastKiller",
        cardName: "Beast Killer",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Defeat a guardian in your play area or discard pile.</div>, // todo replace with guardian icon
        effects: [EFFECT.defeatGuardian],
        cost: 4,
        points: 1
    },
    flameJewel: {
        id: "flameJewel",
        cardName: "Flame Jewel",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Gain or Decipher a Legend with a discount of <Jewel /></div>,
        effects: [EFFECT.gainOrDecipherWithJewel],
        cost: 3,
        points: 2
    },
    inscribedBlade: {
        id: "inscribedBlade",
        cardName: "Inscribed Blade",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Gain or Decipher a Legend with a discount of <Text /><Text /> or <Weapon /></div>,
        effects: [EFFECT.gainOrDecipherWithTextsOrWeapon],
        cost: 3,
        points: 2
    },
    amuletOfCharm: {
        id: "amuletOfCharm",
        cardName: "Amulet of Charm",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText">Buy an item with discount of <Coin /><Coin /><Coin /></div>,
        effects: [EFFECT.buyItemWithDiscount3],
        cost: 3,
        points: 2
    },
    drinkingHorn: {
        id: "drinkingHorn",
        cardName: "Drinking Horn",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><DestroyCard /><Discard /><Draw2Cards /></div>,
        effects: [EFFECT.destroyCard, EFFECT.discardFor2Cards],
        cost: 2,
        points: 3
    },
    ancientCipher: {
        id: "ancientCipher",
        cardName: "Ancient Cipher",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw1Card /> <Coin /></div>,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        cost: 2,
        points: 2
    },
    transmutation: {
        id: "transmutation",
        cardName: "Transmutation",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><DestroyCard /> <Coin /><Coin /></div>,
        effects: [EFFECT.destroyCard, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 3,
        points: 2
    },
    fearlessBlade: {
        id: "fearlessBlade",
        cardName: "Fearless Blade",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><DestroyCard /> <Weapon /></div>,
        effects: [EFFECT.destroyCard, EFFECT.gainWeapon],
        cost: 2,
        points: 1
    },
    keysToAllDoors: {
        id: "keysToAllDoors",
        cardName: "Keys to all Doors",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Coin /> <Coin /> <Coin /></div>,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: 1
    },
    treacherusWhistle: {
        id: "treacherusWhistle",
        cardName: "Treacherus Whistle",itemTransport: CARD_TRANSPORT.artifact,
        effectsText:
            <div className="effectsText"><Draw2Cards /> if a guardian is drawn</div>, //todo replace guardian with an icon
        effects: [],
        cost: 1,
        points: 2
    },
    giantEgg: {
        id: "giantEgg",
        cardName: "Giant Egg",itemTransport: CARD_TRANSPORT.artifact,
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

/* cost turns to VP when guardian is defeated */
export const GUARDIANS = Object.freeze({
    foxSpirit: {
        id: "foxSpirit",
        cardName: "Fox Spirit",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Jeep/><Coin/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseJeep, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Coin /><Explore /></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        cost: 1,
        points: -1
    },
    forestDragon: {
        id: "forestDragon",
        cardName: "Forest Dragon",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Jeep/><Explore/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseJeep, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Coin /><Explore /></div>,
        discoveryEffect: [EFFECT.gainText, EFFECT.gainCoin, EFFECT.gainCoin],
        cost: 1,
        points: -1
    },
    naga: {
        id: "naga",
        cardName: "Naga",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Jeep/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseJeep, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Weapon /><Text /></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainText],
        cost: 2,
        points: -1
    },
    stoneTitan: {
        id: "stoneTitan",
        cardName: "Stone Titan",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Jeep/><Weapon/><Text /> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseJeep, EFFECT.loseWeapon, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Coin /><Explore /></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    golem: {
        id: "golem",
        cardName: "Golem",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Jeep/><Text /><Text /> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseJeep, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Text/><Explore /></div>,
        discoveryEffect: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainExplore],
        cost: 2,
        points: -1
    },
    mountainGuardian: {
        id: "mountainGuardian",
        cardName: "Mountain Guardian",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Plane/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.losePlane, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Coin /><Explore /></div>,
        discoveryEffect: [EFFECT.destroyCard, EFFECT.gainText, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    gryphon: {
        id: "gryphon",
        cardName: "Gryphon",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Plane /><Text /> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.losePlane, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Jewel /></div>,
        discoveryEffect: [EFFECT.gainJewel],
        cost: 3,
        points: -1
    },
    whisperingShadow: {
        id: "whisperingShadow",
        cardName: "Whispering Shadow",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Walk/><Text/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Weapon /><Explore /></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainExplore],
        cost: 1,
        points: -1
    },
    giantScarab: {
        id: "giantScarab",
        cardName: "Giant Scarab",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Jeep/><Jewel/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseJeep, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Weapon /><Coin /></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainWeapon],
        cost: 3,
        points: -1
    },
    swampSnake: {
        id: "swampSnake",
        cardName: "Swamp snake",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Ship/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseShip, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Jewel /></div>,
        discoveryEffect: [EFFECT.gainJewel],
        cost: 2,
        points: -1
    },
    stealingMonkey: {
        id: "stealingMonkey",
        cardName: "Stealing Monkey",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Ship/><Coin/><Coin/><Coin/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseShip, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Jewel /></div>,
        discoveryEffect: [EFFECT.gainJewel],
        cost: 3,
        points: -1
    },
    hornedHippo: {
        id: "hornedHippo",
        cardName: "Horned Hippo",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Jeep/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseShip, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Weapon /></div>,
        discoveryEffect: [EFFECT.gainText, EFFECT.gainWeapon],
        cost: 3,
        points: -1
    },
    lakeMonster: {
        id: "lakeMonster",
        cardName: "Lake Monster",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Ship/><Ship /><Weapon /> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseShip, EFFECT.loseShip, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Coin /><Explore /></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    energyLeech: {
        id: "energyLeech",
        cardName: "Energy Leech",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Walk/><Walk/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseWalk, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Weapon /><Explore /></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainExplore],
        cost: 1,
        points: -1
    },
    swarmingSpiders: {
        id: "swarmingSpiders",
        cardName: "Swarming Spiders",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Walk/><Explore/><Explore /> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseExplore, EFFECT.loseExplore, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Weapon /><Coin /></div>,
        discoveryEffect: [EFFECT.gainWeapon, EFFECT.gainCoin],
        cost: 2,
        points: -1
    },
    HeartOfForest: {
        id: "HeartOfForest",
        cardName: "Heart of the Forest",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Walk/><Jewel/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseJewel, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Coin /><Coin /><Explore /></div>,
        discoveryEffect: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainExplore],
        cost: 3,
        points: -1
    },
    wyvern: {
        id: "wyvern",
        cardName: "Wyvern",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Walk/><Weapon/> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseWalk, EFFECT.loseWeapon, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Text /><Explore /><Explore /></div>,
        discoveryEffect: [EFFECT.gainText, EFFECT.gainExplore, EFFECT.gainExplore],
        cost: 2,
        points: -1
    },
    crabmanHermit: {
        id: "crabmanHermit",
        cardName: "Crabman Hermit",
        type: CARD_TYPE.guardian,
        itemTransport: CARD_TRANSPORT.guardian,
        effectsText:
            <div className="effectsText"><Ship /><Text /><Text /> <Arrow/> <DefeatedGuardian/></div>,
        effects: [EFFECT.loseShip, EFFECT.loseText, EFFECT.loseText, EFFECT.defeatThisGuardian],
        discoveryText: <div ><Jewel /></div>,
        discoveryEffect: [EFFECT.gainJewel],
        cost: 2,
        points: -1
    },
});