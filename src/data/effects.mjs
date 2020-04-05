export const EFFECT = Object.freeze({
    revealArtifactBuyWithDiscount2: "buy and artifact with a discount",
    buyItemWithDiscount3: "buy an item with discount of 3 coins",
    defeatGuardian: "defeat a guardian in play area or discard pile",
    defeatThisGuardian: "defeat this guardian card",
    destroyCard: "pick a card to destroy",
    destroyGuardian: "destroy a guardian",
    destroyThisCard: "destroy this card",
    destroyThisCardToDefeatAGuardan: "destroy this card to defeat a guardian",
    draw1: "draw a card",
    draw2: "draws 2 cards",
    draw2ForGuardian: "draw 2 cards if you have a guardian in hand",
    drawFromDiscard: "draw a card from your discard pile",
    drawFromDrawDeck: "draw a card from your draw deck",
    discard: "discard a card",
    exploreLocationWithDiscount2: "explore location with discount of 2 explore, do not gain a guardian ",
    firstGainsCoin: "first player that reaches this tile of legend gets a coin",
    firstGainsExplore: "first player that reaches this tile of legend gets an explore",
    gainAdventurerForThisRound: "gain adventurer for this round",
    gainArtifact: "gain an artifact",
    gainArtifactForExplore: "gain artifact for explore", // todo artifacts implement
    gainBonusFromLegendYouCompleted: "gain a bonus from legend you completed", //todo legends implement
    gainBonusFromUnclaimedLegend: "gain a bonus from an unclaimed, visible legend", //todo legends implement
    gainCoin: "gain a coin",
    gainCoinForLegends: "gain a coin for each legend",
    gainCoinForGuardians: "gain a coin for each destroyed Guardian (max. 4)",
    gainCoinsIfLast: "if this was last card, gain 2 coins",
    gainExpeditionCard: "gain an expedition card",
    gainExplore: "gain an explore",
    gainExploreForShinys: "gain an explore for each shinies (max. 4)",
    gainExploreForGuardians: "gain an explore for each guardian in you play area",
    gainFear: "gain a fear card",
    gainItem: "gain an item", // todo implement
    gainItemToHand: "gain an item to your hand",
    gainJeep: "travel with a jeep",
    gainJewel: "gain a jewel",
    gainOrDecipherWithJewel: "gain or decipher a legend with a discount of jewel", // todo legend implement
    gainOrDecipherWithTextsOrWeapon: "gain or decipher a legend with a discount of 2 texts or 1 weapon", // todo legend implement
    gainPlane: "travel with an airplane",
    gainShiny: "gain a shinies",
    gainShip: "travel with a ship",
    gainText: "gain a text",
    gainTreasure: "gain treasure",
    gainWalk: "travel on foot",
    gainWeapon: "gain a weapon",
    goldenMask: "plane to an occupied location, use its effect twice", // todo ??? implement
    // incomes are processed by the server during end of round phase
    incomeAdventurer: "gain an extra adventurer income",
    incomeCard: "gain a draw card income",
    incomeCoin: "gain a coin income",
    incomeText: "gain a text income",
    loseCoin: "lose a coin",
    loseExplore: "lose an explore",
    loseText: "lose a text",
    loseWeapon: "lose a weapon",
    loseJewel: "lose a jewel",
    loseWalk: "lose a walk",
    loseJeep: "lose a jeep",
    loseShip: "lose a ship",
    losePlane: "lose a plane",
    markOwnLocation: "mark location for adjacency / non-identity check",
    moveAdvToEmptyLocation: "move deployed adventurer to a different empty tLocation",
    moveToAdjacentLocation: "move deployed adventurer to an adjacent tLocation", // todo implement
    progress: "progress in a legend",
    refreshAdventurer: "refresh an adventurer", // todo legend implement
    refreshAllAdventurers: "refresh all your adventurers", // todo legend implement
    removeGuardian: "remove a guardian from play",
    revealItemBuyWithDiscount2: "buy an item with discount",
    return: "return adventurer from tLocation",
    useAdjacentEmptyLocation: "use an adjacent empty location", // todo implement restriction + level restriction
    payTouseOccupiedLocation: "use an occupied location",
    useItemOnMarket: "use effect of an item on the market",
    useArtifactOnMarket: "use effect of an artifact on the market",
    useOpponentsLocation: "use a (II) location occupied by an opponent", //todo implement
    uptrade: "uptrade", //todo implement
    useYourLocation: "use a location occupied by you",
});