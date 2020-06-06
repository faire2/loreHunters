import {
    ARTIFACT_IDs,
    EXPEDITIONS_IDs,
    GUARDIAN_IDs,
    INCOME_IDs,
    ITEM_IDs,
    LEGEND_IDS,
    LOCATION_IDs
} from "../../../data/idLists.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {
    CARD_STATE,
    CARD_TYPE,
    INCOME_LEVEL,
    INCOME_STATE,
    LOCATION_LEVEL,
    LOCATION_STATE,
    LOCATION_TYPE
} from "../lists";
/*

/!* GLOBAL VARIABLES *!/
export const GLOBAL_VARS = Object.freeze({
    handSize: 5,
    initialCards: [{...ITEM_IDs.coin}, {...ITEM_IDs.coin}, {...ITEM_IDs.explore}, {...ITEM_IDs.explore},
        {...ITEM_IDs.fear}, {...ITEM_IDs.fear}],
    itemsInStore: 5,
    artifactsInStore: 1,
    adventurers: 2,
    playerColors: ["#ffcc00", "#33cc00", "#0066ff", "#cc0000"],
    numOfLegendTokens: 3,
});

export const LOCATION_LINE = Object.freeze({
    line1: "line1",
    line2: "line2",
    line3: "line3",
    line4: "line4"
});


/!* EMPTY PLAYER STATE *!/

export const emptyPlayerState = Object.freeze({
    resources: {
        coins: 2,
        explore: 0,
        texts: 0,
        weapons: 0,
        jewels: 0,
        shinies: 0,
        walk: 0,
        jeep: 0,
        ship: 0,
        plane: 0,
    },
    actions: 1,
    activeCards: [],
    activeEffects: [],
    availableAdventurers: GLOBAL_VARS.adventurers,
    color: null,
    destroyedCards: [],
    discardDeck: [],
    discoveredLostCity: false,
    drawDeck: [],
    firstTurn: true,
    finishedRound: false,
    incomes: [],
    hand: [],
    playedCards: [],
    playerIndex: null,
    relics: [true, true, true, true, true, true, true, true, true],
    victoryCards: [],
});


/!* INITIAL PLAYER STATES *!/
export default function getInitialPlayerStates(numOfPlayers) {
    let playerStates = [];

    for (let i = 0; i < numOfPlayers; i++) {
        let playerState = {...emptyPlayerState};

        // each player has different starting resources
        switch (i) {
            case 0:
                playerState.resources.coins = 2;
                playerState.resources.explore = 1;
                break;
            case 1:
                playerState.resources.coins = 1;
                playerState.resources.explore = 2;
                break;
            case 2:
                playerState.resources.coins = 3;
                playerState.resources.explore = 1;
                break;
            case 3:
                playerState.resources.coins = 2;
                playerState.resources.explore = 2;
                break;
            default:
                console.log("Cannot process player index in getInitialPlayerStates: " + i);
        }

        playerState.playerIndex = i;
        playerState.color = GLOBAL_VARS.playerColors[i];

        const initialCards = shuffleArray([...GLOBAL_VARS.initialCards]);

        const cardsSetup = drawCards(cloneDeep(initialCards), GLOBAL_VARS.handSize);
        const hand = [];
        const drawDeck = [];


        for (let card of cardsSetup.deck) {
            card.state = CARD_STATE.drawDeck;
            drawDeck.push(card);
        }

        for (let card of cardsSetup.drawCards) {
            card.state = CARD_STATE.inHand;
            hand.push(card);
        }
        /!*const testCard0 = {...ARTIFACT_IDs.ringOfLight};
        testCard0.state = CARD_STATE.drawDeck;
        drawDeck.splice(0, 0, testCard0);*!/

        /!*const testCard = {...ITEM_IDs.compass};
        testCard.state = CARD_STATE.inHand;
        hand.splice(0, 0, testCard);*!/

        /!*const testCard = {...GUARDIAN_IDs.energyLeech};
        testCard.state = CARD_STATE.discard;
        playerState.discardDeck.splice(0, 0, testCard);*!/

        /!*for (let key in ITEM_IDs) {
            let card = {...ITEM_IDs[key]};
            card.state = CARD_STATE.inHand;
            hand.push(card);
        }

        for (let key in ARTIFACT_IDs) {
            let card = {...ARTIFACT_IDs[key]};
            card.state = CARD_STATE.inHand;
            hand.push(card);
        }*!/

        playerState.hand = hand;
        playerState.drawDeck = drawDeck;
        playerStates.push(playerState);
    }
    return playerStates;
}


/!* INITIAL STORE *!/
export function getInitialStore() {
    /!* all items, each item is represented only once! *!/
    let items = shuffleArray(Object.keys(ITEM_IDs).map(key => {
        return ITEM_IDs[key];
    }));
    items = items.filter(card => card.type !== CARD_TYPE.basic);

    /!* artifacts *!/
    let artifacts = shuffleArray(Object.keys(ARTIFACT_IDs).map(key => {
        ARTIFACT_IDs[key].state = CARD_STATE.inStore;
        return ARTIFACT_IDs[key];
    }));

    /!* guardians *!/
    let guardians = [];
    for (let key in GUARDIAN_IDs) {
        guardians.push(GUARDIAN_IDs[key]);
    }

    /!* expedition cards *!/
    let expeditions = [];
    for (let key in EXPEDITIONS_IDs) {
        EXPEDITIONS_IDs[key].state = CARD_STATE.victoryCards;
        expeditions.push(EXPEDITIONS_IDs[key]);
    }

    /!* incomes *!/
    let incomes1 = [];
    let incomes2 = [];
    for (let key in INCOME_IDs) {
        INCOME_IDs[key].state = INCOME_STATE.inStore;
        if (INCOME_IDs[key].level === INCOME_LEVEL.silver) {
            incomes1.push(INCOME_IDs[key]);
        } else {
            incomes2.push(INCOME_IDs[key]);
        }
    }

    let itemsSetup = drawCards(items, GLOBAL_VARS.itemsInStore);
    let artifactsSetup = drawCards(artifacts, GLOBAL_VARS.artifactsInStore);
    let incomes1Setup = drawCards(incomes1, 2);
    let incomes2Setup = drawCards(incomes2, 2)

    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {
        artifactsDeck: artifactsSetup.deck,
        artifactsOffer: artifactsSetup.drawCards,
        incomes1Deck: incomes1Setup.deck,
        incomes1Offer: incomes1Setup.drawCards,
        incomes2Deck: incomes2Setup.deck,
        incomes2Offer: incomes2Setup.drawCards,
        itemsDeck: itemsSetup.deck,
        itemsOffer: itemsSetup.drawCards,
        expeditions: shuffleArray(expeditions),
        guardians: shuffleArray(guardians),
    }
}


/!* INITIAL LOCATIONS *!/
export function getInitialLocations(numOfPlayers) {
    let locations = LOCATION_IDs;
    const locationKeys = shuffleArray(Object.keys(locations));

    /!* we need to get the right number of green and brown locations of each location level according to n of players *!/
    let level1 = [];
    let level2Green = [];
    let level3Green = [];
    let level2Brown = [];
    let level3Brown = [];
    let level3LostCity = [];

    let level2Max;
    let level3Max;

    switch (numOfPlayers) {
        case 1:
        case 2:
            level2Max = 2;
            level3Max = 2;
            break;
        case 3:
            level2Max = 3;
            level3Max = 2;
            break;
        case 4:
            level2Max = 4;
            level3Max = 2;
            break;
        default:
            console.log("Unable to process number of players in getInitialLocations: " + numOfPlayers);
    }

    for (let i = 0; i < locationKeys.length; i++) {
        let location = locations[locationKeys[i]];
        switch (location.level) {
            case LOCATION_LEVEL["1"]:
                level1.push(location);
                break;
            case LOCATION_LEVEL["2"]:
                if (location.type === LOCATION_TYPE.brown) {
                    if (level2Brown.length < level2Max) {
                        level2Brown.push(location);
                    }
                } else if (location.type === LOCATION_TYPE.green) {
                    if (level2Green.length < level2Max) {
                        level2Green.push(location);
                    }
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            case LOCATION_LEVEL["3"]:
                if (location.type === LOCATION_TYPE.brown) {
                    if (level3Brown.length < level3Max) {
                        level3Brown.push(location);
                    }
                } else if (location.type === LOCATION_TYPE.green) {
                    if (level3Green.length < level3Max) {
                        level3Green.push(location);
                    }
                } else if (location.type === LOCATION_TYPE.lostCity) {
                    if (level3LostCity.length < 1) {
                        level3LostCity.push(location);
                    }
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            default:
                console.log("Unable to process location level in getInitialLocations: " + locations[locationKeys[i]]);
        }
    }

    /!* level 1 locations start explored, other not *!/
    for (let key in locations) {
        locations[key].state = (locations[key].level === LOCATION_LEVEL["1"]) ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;
    }

    /!* there are is a specific spatial configuration for every player number variation: *!/
    let line1 = level1;
    /!*let line1.push(locations.g32);
    line1[5].state = LOCATION_STATE.explored;*!/
    let line2 = [];
    let line3 = [];
    let line4 = [];

    switch (numOfPlayers) {
        case 1:
        case 2:
            line2 = [...level2Green, ...level2Brown];
            line3 = [...level3Green, ...level3Brown, ...level3LostCity];
            break;
        case 3:
            line2 = [level2Green[0], level2Green[1], level2Brown[0], level2Brown[1]];
            line3 = [level3Green[0], level2Green[2], level2Brown[2], level3Brown[0]];
            line4 = [level3Green[1], "empty", level3Brown[1], level3LostCity[0]];
            break;
        case 4:
            line2 = [level2Green[0], level2Green[1], level2Brown[0], level2Brown[1]];
            line3 = [level2Green[2], level2Green[3], level2Brown[2], level2Brown[3]];
            line4 = [level3Green[0], level3Green[1], level3Brown[0], level3Brown[1], level3LostCity[0]];
            break;
        default:
            console.log("Unable to process number of players in getInitialLocations: " + numOfPlayers);
    }

    for (let location of line1) {
        location.line = LOCATION_LINE.line1;
    }
    for (let location of line2) {
        location.line = LOCATION_LINE.line2;
    }
    for (let location of line3) {
        location.line = LOCATION_LINE.line3;
    }
    if (line4.length > 0) {
        for (let location of line4) {
            if (location !== "empty") {
                location.line = LOCATION_LINE.line4;
            }
        }
    }

    return {
        [LOCATION_LINE.line1]: line1,
        [LOCATION_LINE.line2]: line2,
        [LOCATION_LINE.line3]: line3,
        [LOCATION_LINE.line4]: line4,
    };
}

/!* INITIAL Legends2 *!/
export function getInitialLegends(numOfPlayers) {
    const legendsKeys = shuffleArray(Object.keys(LEGEND_IDS));
    const legends = [LEGEND_IDS[legendsKeys[0]]];
    for (let legend of legends) {
        legend.positions = [];
        for (let i = 0; i < numOfPlayers; i++) {
            let playerArr = [];
            let tokenPosition = {columnIndex: null, fieldIndex: null};
            for (let i = 0; i < GLOBAL_VARS.numOfLegendTokens; i++) {
                playerArr.push(tokenPosition);
            }
            legend.positions.push(playerArr);
        }
        legend.usage = [];
        for (let i = 0; i < 8; i++)
            legend.usage.push([0, 0, 0])
    }
    return legends;
}

function drawCards(deck, cardsToDraw) {
    const drawCards = [];
    for (let i = 0; i < cardsToDraw; i++) {
        const rnPosition = getRandomNumber(deck.length - 1, 1);
        drawCards.push(deck[rnPosition]);
        deck.splice(rnPosition, 1);
    }
    return {deck: deck, drawCards: drawCards}
}

function getRandomNumber(size) {
    return Math.floor(Math.random() * (size)) + 1;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}*/
