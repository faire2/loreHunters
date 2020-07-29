export const EFFECT = Object.freeze({
    activateOccupiedLocation: "activate occupied location",
    activateYourLocation: "activae a location occupied by you",
    activateAdjacentLocation: "activate a location adjacent to you adventurer",
    activateEmptyL2Location: "activate an empty location",
    activateEmptyL1Location: "activate an empty level 1 location",
    activate2dockActions: "activate two dock actions",
    arrow: "trade resource on the left for resource on the right",
    buyItemWithDiscount3: "buy an item with discount of 3 coins",
    defeatGuardianOnOwnedLocation: "defeat a guardian in a location you are present",
    defeatGuardianOnOwnOrEmptyLocation: "defeat a guardian on your or empty location",
    defeatThisGuardian: "defeat this guardian card",
    destroyCard: "pick a card to destroy",
    destroyCardMandatory: "must pick a card to destroy",
    destroyThisCard: "destroy this card",
    destroyThisCardToDefeatAGuardan: "destroy this card to defeat a guardian",
    discoverLostCity: "discover lost city",
    canActivateLostCity: "player can activate city",
    canActivateL3Location: "player can activate level 3 location",
    draw1: "draw a card",
    draw2: "draws 2 cards", // todo item change to draw1
    draw2ForGuardian: "draw 2 cards if you have a guardian in hand",
    draw3keep1: "draw 3 cards and keep one",
    drawFromDiscard: "draw a card from your discard pile",
    drawFromDrawDeckOrDiscard: "draw a card from your draw deck or discard",
    discard: "discard a card",
    exploreAnyLocationWithDiscount3: "explore location with discount of 3 explore",
    exploreAnyLocationWithDiscount4: "explore location with discount of 4 explore",
    escapeGuardian: "escape guardian, get back locked resources and gain a fear to handd",
    finishRound: "finish the round",
    gainAction: "gain an action",
    gainAdventurerForThisRound: "gain adventurer for this round",
    gainArtifact: "gain an artifact",
    gainArtifactForExplore: "gain artifact for explore", // todo artifacts implement
    gainSilverAssistant: "gain a new silver assistant",
    gainGoldAssistant: "gain a gold assistant",
    gainBronzeRelic: "gain a bronze relic",
    gainBonusFromLegendYouCompleted: "gain a bonus from legend you completed", //todo legends implement
    gainBonusFromUnclaimedLegend: "gain a bonus from an unclaimed, visible legend", //todo legends implement
    gainCoin: "gain a coin",
    gainCoinIfFirst: "first player that reaches this tile of legend gets a coin",
    gainCoinOrExploreIfFirst: "gain coin or explore",
    gainCoinAndExploresForGuardians: "gain one coin and an explore for each of up to 3 guardians you have defeated",
    gainCoinForLegends: "gain a coin for each legend",
    gainCoinForGuardians: "gain a coin for each destroyed Guardian (max. 4)",
    gainCoinsAndJewelForGuardian: "gain a jewel and coins for VP of a defeated guardian",
    gain2CoinsOrPassAnd3: "gain 2 coins or pass the round and gain 3",
    buyWithDiscount1: "buy an item or artifact with discount of 1",
    gainExpeditionCard: "gain an expedition card",
    gainExplore: "gain an explore",
    gainExploreIfFirst: "first player that reaches this tile of legend gets an explore",
    gainExploreOrMapIfFirst: "gain an explore or a map",
    gainExploreForRelics: "gain an explore for each shinies (max. 4)",
    gainExploreForGuardians: "gain an explore for each guardian in you play area",
    gainDiscoveryBonus: "gain guardian's discovery bonus",
    gainPlane: "travel with an airplane",
    infinitePlanes: "gain infinite blimps for one round",
    gainFear: "gain a fear card",
    gainItem: "gain an item",
    gainItemToHand: "gain an item to your hand",
    gainJeep: "travel with a jeep",
    gainJewel: "gain a jewel",
    gainRewardLevel: "gain a level of reward in lost city",
    gainMap: "gain a map",
    gainMapIfFirst: "first player that reaches this tile of legend gets a map",
    gainOrUpgradeAssistant: "gain a new assistant or upgrade one you have",
    gainOrUpgradeRelic: "gain a new relive or upgrade one you have",
    gainPlaceholder: "gain megartifact without a name",
    gainResourceFromAdjacentLocation: "gain one resource that can be obtained from a location adjacent to your Adventurer",
    gainShip: "travel with a ship",
    gainText: "gain a text",
    gainTextInJungle: "gain a text for each adventurer in a jungle location", //todo items implement
    gainTreasure: "gain treasure",
    gainWalk: "travel on foot",
    gainWeapon: "gain a weapon",
    goldenMask: "plane to an occupied location, use its effect twice", // todo ??? implement
    lockAdventurer: "lock an adventurer",
    lockCard: "discard a random card",
    lockCoin: "lock a coin",
    lockExplore: "lock an explore",
    lockText: "lock a text",
    lockJewel: "lock a jewel",
    lockWeapon: "lock a weapon",
    loseAction: "lose an action",
    loseAdventurer: "lose an adventurer",
    loseCoin: "lose a coin",
    loseExplore: "lose an explore",
    loseText: "lose a text",
    loseMap: "lose a map",
    loseWeapon: "lose a weapon",
    loseJewel: "lose a jewel",
    loseWalk: "lose a walk",
    loseJeep: "lose a jeep",
    loseShip: "lose a ship",
    loseBlimp: "lose a plane",
    markOwnLocation: "mark location for adjacency / non-identity check",
    moveAdvToEmptyLocation: "move deployed adventurer to a different empty tLocation",
    moveAdvToL1Location: "move deployed adventurer to an adjacent tLocation",
    placeToGreenLocation: "place adventurer to a green location",
    placeToBrownLocation: "place adventurer to a brown location",
    placeToBasicLocation: "place adventurer to a basic location",
    progress: "progress in a legend",
    progressWithTexts: "progress in a legend with a discount of two Texts",
    progressWithWeapon: "progress in a legend with a discount of one Weapon",
    progressWithJewel: "progress in a legend with a discount of one Jewel",
    progressWithTextsOrWeapon: "click on Weapon or Text to pick you discount",
    progressWithSecondToken: "progress with second token",
    protectFromFear: "do not gain fear from guarded location at the end of round",
    refreshAsistant: "refresh an assistant",
    refreshAllAssistants: "refresh all assistants",
    refreshRelic: "refresh a used relic",
    removeGuardian: "remove a guardian from play",
    // used with effects moving adventurer to another location as step one effect
    removeAdventurer: "remove adventurer",
    revealArtifactBuyWithDiscount3: "buy an artifact with a discount",
    revealItemBuyWithDiscount3: "buy an item with discount",
    returnAdventurer: "return adventurer from tLocation",
    returnResources: "return locked card", //todo implement
    payToUseOccupiedLocation: "use an occupied location",
    unlockCard: "gain back a locked card",
    useItemOnMarket: "use effect of an item on the market",
    useArtifactOnMarket: "use effect of an artifact on the market",
    useOpponentsLocation: "use a (II) location occupied by an opponent", //todo implement
    uptrade: "uptrade",
});
