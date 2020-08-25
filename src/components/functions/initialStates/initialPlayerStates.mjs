import {GLOBAL_VARS, ITEM_IDs} from "../../../data/idLists.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {CARD_STATE} from "../enums.mjs";
import {drawInitialCards, shuffleArray} from "../cardManipulationFuntions.mjs";

export const emptyPlayerState = Object.freeze({
    resources: {
        coins: null,
        explore: null,
        texts: 0,
        weapons: 0,
        jewels: 0,
        relics: 0,
        slottableRelics: 0,
        bronzeRelics: 0,
        silverRelics: 0,
        goldRelics: 0,
        walk: 0,
        jeep: 0,
        ship: 0,
        plane: 0,
    },
    actions: 1,
    activeCards: [],
    activeEffects: [],
    availableAdventurers: GLOBAL_VARS.adventurers,
    canActivateLostCity: false,
    color: null,
    defeatedGuardians: [],
    drawDeck: [],
    firstTurn: true,
    finishedRound: false,
    assistants: [],
    hand: [],
    longEffects: [],
    guardianRewards: [],
    playerIndex: null,
    relics: [null, null, null, null, null],
    victoryCards: [],
});
/* INITIAL PLAYER STATES */
export default function getInitialPlayerStates(numOfPlayers) {
    let playerStates = [];

    for (let i = 0; i < numOfPlayers; i++) {
        let playerState = {...emptyPlayerState};

        // each player has different starting resources
        switch (i) {
            case 0:
                playerState.resources.coins = 2;
                playerState.resources.explore = 0;
                break;
            case 1:
                playerState.resources.coins = 1;
                playerState.resources.explore = 1;
                break;
            case 2:
                playerState.resources.coins = 2;
                playerState.resources.explore = 1;
                break;
            case 3:
                playerState.resources.coins = 1;
                playerState.resources.explore = 2;
                break;
            default:
                console.log("Cannot process player index in getInitialPlayerStates: " + i);
        }

        playerState.playerIndex = i;
        playerState.color = GLOBAL_VARS.playerColors[i];

        const initialCards = shuffleArray([...GLOBAL_VARS.initialCards]);

        const cardsSetup = drawInitialCards(cloneDeep(initialCards), GLOBAL_VARS.handSize);
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
        /*const testCard0 = {...ARTIFACT_IDs.runesOfDead };
        testCard0.state = CARD_STATE.drawDeck;
        drawDeck.splice(0, 0, testCard0);*/

        const testCard = {...ITEM_IDs.airplane};
        testCard.state = CARD_STATE.inHand;
        hand.splice(0, 0, testCard);

        /*for (let key in ITEM_IDs) {
            let card = {...ITEM_IDs[key]};
            card.state = CARD_STATE.inHand;
            hand.push(card);
        }*/

        /*for (let key in ARTIFACT_IDs) {
            let card = {...ARTIFACT_IDs[key]};
            card.state = CARD_STATE.inHand;
            hand.push(card);
        }*/
        playerState.hand = hand;
        playerState.drawDeck = drawDeck;
        playerStates.push(playerState);
    }
    return playerStates;
}