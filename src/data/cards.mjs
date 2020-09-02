import {EFFECT} from "./effects.mjs";
import {CARD_TYPE} from "../components/functions/enums.mjs";

export const CARD_TRANSPORT = Object.freeze({
    empty: "no transport",
    walk: "hike",
    jeep: "jeep",
    ship: "ship",
    plane: "plane",
});


export const ITEMS = Object.freeze({
    fear: {
        id: "fear",
        cardName: "Fear",
        type: CARD_TYPE.basic,
        transport: CARD_TRANSPORT.walk,
        transportAmount: 1,
        effects: [EFFECT.gainWalk, EFFECT.gainAction],
        cost: 0,
        points: -1
    },
    coin1: {
        id: "coin1",
        cardName: "Coin",
        type: CARD_TYPE.basic,
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainCoin, EFFECT.gainAction],
        cost: 0,
        points: 0
    },
    coin2: {
        id: "coin2",
        cardName: "Coin",
        type: CARD_TYPE.basic,
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.gainCoin, EFFECT.gainAction],
        cost: 0,
        points: 0
    },
    explore1: {
        id: "explore1",
        cardName: "Explore",
        type: CARD_TYPE.basic,
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.gainExplore, EFFECT.gainAction],
        cost: 0,
        points: 0
    },
    explore2: {
        id: "explore2",
        cardName: "Explore",
        type: CARD_TYPE.basic,
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainExplore, EFFECT.gainAction],
        cost: 0,
        points: 0
    },
    seaTurtle: {
        id: "seaTurtle",
        cardName: "Sea Turtle",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effects: [EFFECT.draw1, EFFECT.placeToGreenLocation],
        cost: 3,
        points: 1
    },
    ostrich: {
        id: "ostrich",
        cardName: "Ostrich",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effects: [EFFECT.draw1, EFFECT.placeToBrownLocation],
        cost: 3,
        points: 1
    },
    packDonkey: {
        id: "packDonkey",
        cardName: "Pack Donkey",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effects: [EFFECT.draw2],
        cost: 4,
        points: 1
    },
    horse: {
        id: "horse",
        cardName: "Horse",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effects: [EFFECT.draw1, EFFECT.gainExplore, EFFECT.gainCoin],
        cost: 4,
        points: 1
    },
    steamBoat: {
        id: "steamBoat",
        cardName: "Steam Boat",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainAction],
        cost: 3,
        points: 3
    },
    jeep: {
        id: "jeep",
        cardName: "Automobile",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainAction],
        cost: 3,
        points: 3
    },
    boots: {
        id: "boots",
        cardName: "Sturdy Boots",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effects: [EFFECT.gainExplore, EFFECT.placeToBasicLocationDiscount2],
        cost: 1,
        points: 1
    },
    goldPan: {
        id: "goldPan",
        cardName: "Gold Pan",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainAction],
        cost: 1,
        points: 1
    },
    trowel: {
        id: "trowel",
        cardName: "Trowel",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.loseExplore, EFFECT.gainJewel],
        cost: 1,
        points: 1
    },
    pickaxe: {
        id: "pickaxe",
        cardName: "Pickaxe",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.loseExplore, EFFECT.gainText, EFFECT.gainWeapon],
        cost: 1,
        points: 1
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        cardName: "Hot Air Baloon",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.exploreAnyLocationWithDiscount3, EFFECT.destroyThisCard], //pozor na update efektu, je vyhodnocen v sekci pro explore lokaci
        cost: 2,
        points: 1
    },
    airplane: {
        id: "airplane",
        cardName: "Aeroplane",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effects: [EFFECT.exploreAnyLocationWithDiscount2],
        cost: 4,
        points: 3
    },
    journal: {
        id: "journal",
        cardName: "Journal",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.destroyThisCard, EFFECT.progressWithSecondToken],
        cost: 2,
        points: 1
    },
    parrot: {
        id: "parrot",
        cardName: "Parrot",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.discard, EFFECT.gainJewel],
        cost: 2,
        points: 2
    },
    wristWatch: {
        id: "wristWatch",
        cardName: "Wristwatch",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gain2CoinsOrPassAnd3],
        cost: 1,
        points: 1
    },
    armyKnife: {
        id: "armyKnife",
        cardName: "Army Knife",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.draw3keep1],
        cost: 2,
        points: 2
    },
    binoculars: {
        id: "binoculars",
        cardName: "Binoculars",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.activateL2Location],
        cost: 4,
        points: 1
    },
    tent: {
        id: "tent",
        cardName: "Tent",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.activateYourLocation],
        cost: 4,
        points: 2,
    },
    fishingRod: {
        id: "fishingRod",
        cardName: "FishingRod",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.revealItemBuyWithDiscount3],
        cost: 2,
        points: 2
    },
    compass: {
        id: "compass",
        cardName: "Precision Compass",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.revealArtifactBuyWithDiscount3],
        cost: 4,
        points: 1
    },
    bowAndArrows: {
        id: "bowAndArrows",
        cardName: "Bow and Arrows",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.gainExploreForGuardians],
        cost: 2,
        points: 2
    },
    carrierPidgeon: {
        id: "carrierPidgeon",
        cardName: "Carrier Pigeon",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainText, EFFECT.gainText, EFFECT.gainAction],
        cost: 2,
        points: 1
    },
    whip: {
        id: "whip",
        cardName: "Whip",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.destroyThisCard, EFFECT.gainArtifact],
        cost: 2,
        points: 1
    },
    roughMap: {
        id: "roughMap",
        cardName: "Rough Map",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyThisCard],
        cost: 1,
        points: 1
    },
    airDrop: {
        id: "airDrop",
        cardName: "Airdrop",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainItemToHand, EFFECT.destroyThisCard],
        cost: 2,
        points: 1
    },
    flask: {
        id: "flask",
        cardName: "Flask",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.draw1, EFFECT.draw1, EFFECT.draw1, EFFECT.destroyThisCard],
        cost: 2,
        points: 1
    },
    machete: {
        id: "machete",
        cardName: "Machete",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.gainExplore, EFFECT.gainExplore, EFFECT.destroyCard],
        cost: 4,
        points: 1
    },
    axe: {
            id: "axe",
            cardName: "Axe",
            transport: CARD_TRANSPORT.jeep,
            transportAmount: 1,
            effects: [EFFECT.gainExplore, EFFECT.destroyCard],
            cost: 2,
            points: 2
        },
    torch: {
        id: "torch",
        cardName: "Torch",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainText, EFFECT.destroyCard],
        cost: 2,
        points: 2
    },
    bag: {
        id: "bag",
        cardName: "Large Backpack",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.gainCoin, EFFECT.drawFromBottom],
        cost: 3,
        points: 1
    },
    rope: {
        id: "rope",
        cardName: "Rope",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.discard, EFFECT.draw2],
        cost: 2,
        points: 1
    },
    revolver: {
        id: "revolver",
        cardName: "revolver",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.loseExplore, EFFECT.defeatGuardianOnOwnedLocation],
        cost: 4,
        points: 1
    },
    hat: {
        id: "hat",
        cardName: "Hat",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainCoin, EFFECT.gainExplore, EFFECT.gainAction],
        cost: 1,
        points: 1
    },
    beartrap: {
        id: "beartrap",
        cardName: "Bear Trap",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.destroyThisCard ,EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        cost: 2,
        points: 1
    },
    grapplingHook: {
        id: "grapplingHook",
        cardName: "Grappling Hook",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.discard, EFFECT.draw1, EFFECT.destroyCard],
        cost: 2,
        points: 2
    },
    handLens: {
        id: "handLens",
        cardName: "Hand Lens",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 1,
        effects: [EFFECT.gain2ResearchBonuses],
            cost: 2,
        points: 1
    },
    dog: {
        id: "dog",
        cardName: "Dog",
        transport: CARD_TRANSPORT.jeep,
        transportAmount: 2,
        effects: [EFFECT.gainExplore, EFFECT.activateEmptyL1Location],
        cost: 3,
        points: 1
    },
    philologyBook: {
        id: "philologyBook",
        cardName: "Brush",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainExploreForRelics],
        cost: 3,
        points: 3
    },
    chronometer: {
        id: "chronometer",
        cardName: "Chronometer",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 2,
        effects: [EFFECT.gainCoinExploreOrPassForExtraExplore],
        cost: 3,
        points: 2
    },
    theodolite: {
        id: "theodolite",
        cardName: "Theodolite",
        transport: CARD_TRANSPORT.ship,
        transportAmount: 1,
        effects: [EFFECT.gainExplore, EFFECT.gainExploreForPlacedAdventurers],
        cost: 4,
        points: 2
    },
});

export const ARTIFACTS = Object.freeze({
    pathfinderSandals: {
        id: "pathfinderSandals",
        cardName: "Pathfinder's sandals",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.moveAdvToL1Location],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    pathfinderStaff: {
        id: "pathfinderStaff",
        cardName: "Pathfinder's Staff",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effects: [EFFECT.moveAdvToL1L2Location],
        isGuarded: false,
        cost: 4,
        points: 1
    },
    warMask: {
        id: "warMask",
        cardName: "War Mask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainWeapon, EFFECT.protectFromFear],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    treasureChest: {
        id: "treasureChest",
        cardName: "Treasure Chest",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.draw1, EFFECT.gainCoin],
        isGuarded: false,
        cost: 4,
        points: 3
    },
    ritualDagger: {
        id: "ritualDagger",
        cardName: "Ritual Dagger",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.destroyCardMandatory, EFFECT.gainWeapon],
        isGuarded: false,
        cost: 4,
        points: 2
    },
     earRingOfLight: {
        id: "earRingOfLight",
        cardName: "Crystal Earring",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.draw3keep1stack1],
        isGuarded: false,
        cost: 4,
        points: 2
    },
    mortar: {
        id: "mortar",
        cardName: "Mortar",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.destroyCardMandatory, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    serpentsIdol: {
        id: "serpentsIdol",
        cardName: "Serpent's Idol",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainFear, EFFECT.gainJewel],
        isGuarded: false,
        cost: 2,
        points: 1
    },
    serpentsGold: {
        id: "serpentsGold",
        cardName: "Serpent's Gold",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        cost: 3,
        points: 2
    },
    monkeyMedallion: {
        id: "monkeyMedallion",
        cardName: "Monkey Medallion",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainItem],
        cost: 4,
        points: 2
    },
    idolOfAraAnu: {
        id: "idolOfAraAnu",
        cardName: "Idol of Ara-Anu",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.progressWithJewel],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    inscribedBlade: {
        id: "inscribedBlade",
        cardName: "Inscribed Blade",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.progressWithTextsOrWeapon],
        isGuarded: false,
        cost: 2,
        points: 1
    },
    guardianOccarina: {
        id: "guardianOccarina",
        cardName: "Guardian's Ocarina",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effects: [EFFECT.infinitePlanes, EFFECT.returnAdventurer],
        isGuarded: false,
        cost: 4,
        points: 1
    },
    owlEyes: {
        id: "owlEyes",
        cardName: "Bone Hairpin",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.destroyCard, EFFECT.activateEmptyL1Location],
        isGuarded: false,
        cost: 4,
        points: 2
    },
    warClub: {
        id: "warClub",
        cardName: "War Club",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.defeatGuardianOnOwnOrEmptyLocation],
        isGuarded: false,
        cost: 5,
        points: 2
    },
    sunDial: {
        id: "sunDial",
        cardName: "Sun dial",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gain2TextsOrPassAndJewel],
        isGuarded: false,
        cost: 2,
        points: 1
    },
    tradersSatchel: {
        id: "tradersSatchel",
        cardName: "Trader's scales",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.uptrade, EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.gainCoin],
        isGuarded: false,
        cost: 4,
        points: 2
    },
    huntingArrows: {
        id: "huntingArrows",
        cardName: "Hunting Arrows",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainFear, EFFECT.gainWeapon, EFFECT.gainWeapon],
        isGuarded: false,
        cost: 4,
        points: 1
    },
    coconutFlask: {
        id: "coconutFlask",
        cardName: "Coconut flask",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainCoin, EFFECT.gainCoin, EFFECT.activateLesserAssistantFromOffer, EFFECT.gainAction],
        isGuarded: false,
        cost: 3,
        points: 2
    },
    cauldron: {
        id: "cauldron",
        cardName: "Redstone Cauldron",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.draw1, EFFECT.destroyCard],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    ancientWine: {
        id: "ancientWine",
        cardName: "Ancient Wine",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainCoin, EFFECT.activateStrongerAssistantFromOffer, EFFECT.gainAction],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    decoratedHorn: {
        id: "decoratedHorn",
        cardName: "Decorated Horn",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.exchangeAssistant],
        isGuarded: false,
        cost: 2,
        points: 1
    },
    ornateHammer: {
        id: "ornateHammer",
        cardName: "Ornate Hammer",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainDestroyedItem],
        isGuarded: false,
        cost: 4,
        points: 2
    },
    starCharts: {
        id: "starCharts",
        cardName: "Star Charts",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.loseCoin, EFFECT.activate2L1Locations],
        isGuarded: false,
        cost: 4,
        points: 2
    },
    stoneJar: {
        id: "stoneJar",
        cardName: "Stone Jar",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.draw1],
        isGuarded: false,
        cost: 2,
        points: 1
    },
    passageShell: {
        id: "passageShell",
        cardName: "Passage shell",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.placeToBasicLocationActivateTwice],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    ceremonialRattle: {
        id: "ceremonialRattle",
        cardName: "Ceremonial Rattle",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.refreshAnyAssistant],
        isGuarded: false,
        cost: 3,
        points: 2
    },
    sacredDrum: {
        id: "sacredDrum",
        cardName: "Sacred drum",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.discard, EFFECT.refreshAllAssistants],
        isGuarded: false,
        cost: 4,
        points: 1
    },
    stoneKey: {
        id: "stoneKey",
        cardName: "Stone Key",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.refreshRelic],
        isGuarded: false,
        cost: 3,
        points: 2
    },
    obsidianEarring: {
        id: "obsidianEarring",
        cardName: "Obsidian Earring",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.draw2FromBottomKeep1],
        cost: 4,
        points: 2
    },
    guidingStone: {
        id: "guidingStone",
        cardName: "Guiding Stone",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.activateTopL2Location],
        isGuarded: false,
        cost: 3,
        points: 1
    },
    guidingSkull: {
        id: "guidingSkull",
        cardName: "Guiding Skull",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.loseExplore, EFFECT.activateTopL2Location],
        isGuarded: false,
        cost: 4,
        points: 1
    },
    runesOfDead: {
        id: "runesOfDead",
        cardName: "Runes of the Dead",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 1,
        effects: [EFFECT.gainFear, EFFECT.gainCoin, EFFECT.gainText, EFFECT.gainText, EFFECT.gainText],
        cost: 4,
        points: 1
    },
    guradiansCrown: {
        id: "guradiansCrown",
        cardName: "Guardian's crown",
        transport: CARD_TRANSPORT.plane,
        transportAmount: 2,
        effects: [EFFECT.moveGuardianOut],
        cost: 4,
        points: 2
    },
});
