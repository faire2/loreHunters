export const EFFECT = Object.freeze({
    activateOccupiedLocation: "activate occupied location",
    activateYourLocation: "activae a location occupied by you",
    activateAdjacentLocation: "activate a location adjacent to you adventurer",
    activateEmptyL2Location: "activate an empty location",
    activateEmptyL1Location: "activate an empty level 1 location",
    activateL1Location: "activate level 1 location",
    activateL2Location: "activate level 2 location",
    activate2dockActions: "activate two dock actions",
    activateTopL2Location: "activate top of the level 2 locations stack",
    activateTopL3Location: "activate top of the level 2 locations stack",
    activate2L1Locations: "activate two level 1 locations",
    activateThisLocationAgain: "activate this location again",
    activateLesserAssistantFromOffer: "activate lesser effect of an assistant from the offer",
    activateStrongerAssistantFromOffer: "activate stronger effect of an assistant from the offer",
    arrow: "trade resource on the left for resource on the right",
    buyItemWithDiscount3: "buy an item with discount of 3 coins",
    buyItemWithDiscount2: "buy an item with discount of 2 coins",
    defeatGuardianOnOwnedLocation: "defeat a guardian in a location you are present",
    defeatGuardianOnOwnOrEmptyLocation: "defeat a guardian on your or empty location",
    defeatThisGuardian: "defeat this guardian card",
    destroyCard: "pick a card to destroy",
    destroyCardInStore: "destroy a card in the offer",
    destroyCardMandatory: "must pick a card to destroy",
    destroyThisCard: "destroy this card",
    destroyThisCardToDefeatAGuardan: "destroy this card to defeat a guardian",
    destroyItemToGain2: "destroy an item to gain 2 of up to same value",
    discoverLostCity: "discover lost city",
    canActivateLostCity: "player can activate city",
    canActivateL3Location: "player can activate level 3 location",
    draw1: "draw a card",
    draw2: "draws 2 cards", // todo item change to draw1
    draw2ForGuardian: "draw 2 cards if you have a guardian in hand",
    draw2keep1: "draw 2 cards and keep one",
    draw3keep1: "draw 3 cards and keep one",
    drawFromBottom: "draw a card from your discard pile",
    draw2FromBottomKeep1: "draw two cards from you deck and keep one",
    draw2keep1stack1: "draw 2 cards, keep one and stack one to the top of draw deck",
    draw3keep1stack1: "draw 3 cards, keep one and stack one to the top of draw deck, discard the last",
    discard: "discard a card",
    exploreAnyLocationWithBaloon: "explore location with a baloon",
    exploreAnyLocationWithDiscount2: "explore location with discount of 2 explore",
    exploreAnyLocationWithDiscount3: "explore location with discount of 3 explore",
    escapeGuardian: "escape guardian, get back locked resources and gain a fear to handd",
    finishRound: "finish the round",
    gainAction: "gain an action",
    gainAdventurerForThisRound: "gain adventurer for this round",
    gainArtifact: "gain an artifact",
    gainArtifactForExplore: "gain artifact for explore",
    gainSilverAssistant: "gain a new silver assistant",
    gainAssistantFromLegend: "gain a new assistant from a legend field",
    gainGoldAssistant: "gain a gold assistant",
    gainBronzeRelic: "gain a bronze relic",
    gainBonusFromLegendYouCompleted: "gain a bonus from legend you completed",
    gainBonusFromUnclaimedLegend: "gain a bonus from an unclaimed, visible legend",
    gainCoin: "gain a coin",
    gainCoinIfFirst: "first player that reaches this tile of legend gets a coin",
    gainCoinOrExploreIfFirst: "gain coin or explore",
    gainCoinAndExploresForGuardians: "gain one coin and an explore for each of up to 3 guardians you have defeated",
    gainCoinForLegends: "gain a coin for each legend",
    gainCoinForGuardians: "gain a coin for each destroyed Guardian (max. 4)",
    gainCoinsAndJewelForGuardian: "gain a jewel and coins for VP of a defeated guardian",
    gain2CoinsOrPassAnd3: "gain 2 coins or pass the round and gain 3",
    gainCoinExploreOrPassForExtraExplore: "gain coin and explore or pass and gain one more explore",
    gain2TextsOrPassAndJewel: "gain two texts or pass the round and gain a jewel",
    gain2ResearchBonuses: "gain 2 first token research bonuses",
    buyWithDiscount1: "buy an item or artifact with discount of 1",
    buyWithDiscount2: "buy an item or artifact with discount of 2",
    gainExpeditionCard: "gain an expedition card",
    gainExplore: "gain an explore",
    gainExploreIfFirst: "first player that reaches this tile of legend gets an explore",
    gainExploreOrMapIfFirst: "gain an explore or a map",
    gainExploreForRelics: "gain an explore for relics (max. 3)",
    gainExploreForGuardians: "gain an explore for each guardian in you play area",
    gainExploreForPlacedAdventurers: "gain explore + explore for each placed adventurer",
    gainDiscoveryBonus: "gain guardian's discovery bonus",
    gainPlane: "travel with an airplane",
    infinitePlanes: "gain infinite blimps for one round",
    gainFear: "gain a fear card",
    gainItem: "gain an item",
    gainItemToTop: "gain an item to the top of draw deck",
    gainItemOrExplores: "gain an item or explores",
    gain2ItemsFor1Exiled: "exile an item and gain two of same value",
    gainItemOfValue: "gain item of certain value",
    gainDestroyedItem: "gain a destroyed item",
    gainItemToHand: "gain an item to your hand",
    gainJeep: "travel with a jeep",
    gainJewel: "gain a jewel",
    gainRewardLevel: "gain a level of reward in lost city",
    gainMap: "gain a map",
    gainMapIfFirst: "first player that reaches this tile of legend gets a map",
    upgradeAssistant: "gain a new assistant or upgrade one you have",
    exchangeAssistant: "exchange you assistant for one in offer",
    gainOrUpgradeRelic: "gain a new relive or upgrade one you have",
    gainPlaceholder: "gain megartifact without a name",
    gainResourceFromAdjacentLocation: "gain one resource that can be obtained from a location adjacent to your Adventurer",
    gainShip: "travel with a ship",
    gainText: "gain a text",
    gainTreasure: "gain treasure",
    gainWalk: "travel on foot",
    gainWeapon: "gain a weapon",
    gainWeaponOrJewel: "gain weapon or jewel",
    gainRandomGoldRelicEffect: "gain a random gold relic effect",
    gainPlaneOrCoin: "gain a plane or a coin",
    gainJeepOrCoin: "gain a jeep or a coin",
    gainShipOrCoin: "gain a ship or a coin",
    gain2PlanesOr2Coins: "gain two coins of two planes",
    gainJeepOrExplore: "gain explore or jeep",
    gain2JeepsOrCoinExplore: "gain 2 explores or 2 jeeps",
    gainShipOrExplore: "gain explore or ship",
    gain2ShipsOrCoinExplore: "gain 2 explores or 2 ships",
    loseAction: "lose an action",
    loseAdventurer: "lose an adventurer",
    loseCoin: "lose a coin",
    loseExplore: "lose an explore",
    loseJewel: "lose a jewel",
    loseSlottableRelic: "lose a slottable relic",
    loseText: "lose a text",
    loseWeapon: "lose a weapon",
    loseWalk: "lose a walk",
    loseJeep: "lose a jeep",
    loseShip: "lose a ship",
    losePlane: "lose a plane",
    markLocation: "mark location for later check",
    moveAdvToEmptyLocation: "move deployed adventurer to a different empty tLocation",
    moveAdvToL1Location: "move deployed adventurer to location of level 1",
    moveAdvToL1L2Location: "move deployed adventurer to location of level 1 or 2",
    moveGuardianOut: "move guardian from a location",
    moveGuardianIn: "move guardian to a location",
    placeAnywhere: "place adventurer to any location",
    placeToGreenLocation: "place adventurer with discount of a ship",
    placeToBrownLocation: "place adventurer with discount of a jeep",
    placeToBasicLocationActivateTwice: "place adventurer to a basic location with transport discount 1",
    placeToBasicLocationDiscount2: "place adventurer to a basic location with transport discount 2",
    progress: "progress in a legend",
    progressWithTexts: "progress in a legend with a discount of two Texts",
    progressWithWeapon: "progress in a legend with a discount of one Weapon",
    progressWithJewel: "progress in a legend with a discount of one Jewel",
    progressWithTextsOrWeapon: "click on Weapon or Text to pick you discount",
    progressWithSecondToken: "progress with second token",
    protectFromFear: "do not gain fear from guarded location at the end of round",
    replaceItemsInStore: "replace items in store",
    refreshAllAssistants: "refresh an assistant",
    refreshSilverAssistant: "refresh a silver assistant",
    refreshAnyAssistant: "refresh any spent assistant",
    refreshRelic: "refresh a used relic",
    removeGuardian: "remove a guardian from play",
    // used with effects moving adventurer to another location as step one effect
    removeAdventurer: "remove adventurer",
    resolveAdditionalEffects: "resolve additional effects",
    returnAdventurer: "return adventurer from  a location",
    returnAllAdventurers: "return all adventurers from locations",
    returnResources: "return locked card", //todo implement
    revealArtifactBuyWithDiscount3: "buy an artifact with a discount",
    revealItemBuyWithDiscount3: "buy an item with discount",
    payToUseOccupiedLocation: "use an occupied location",
    unlockCard: "gain back a locked card",
    useItemOnMarket: "use effect of an item on the market",
    useArtifactOnMarket: "use effect of an artifact on the market",
    useOpponentsLocation: "use a (II) location occupied by an opponent", //todo implement
    uptrade: "uptrade",
});
