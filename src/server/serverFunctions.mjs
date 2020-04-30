// insert player into null position or push him to the end
import {GLOBAL_VARS} from "../components/functions/initialStateFunctions.mjs";
import {EFFECT} from "../data/effects.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {CARD_STATE, CARD_TYPE, INCOME_STATE, ITEM_IDs, LOCATION_STATE} from "../data/idLists.mjs";
import {addCardToDiscardDeck, drawCards} from "../components/functions/cardManipulationFuntions.mjs";

export default function addPlayer(players, socketId) {
    if (players.length === 0) {
        players.push(socketId)
    } else {
        for (let i = 0; i < players.length; i++) {
            if (players[i] === null) {
                players.splice(i, 1, socketId);
                break;
            }
        }
        if (players.length < GLOBAL_VARS.numOfPlayers) {
            players.push(socketId);
        }
    }
    return players;
}

export function handleIncomes(playerState) {
    for (let income of playerState.incomes) {
        for (let effect of income.effects) {
            switch (effect) {
                case EFFECT.draw1:
                case EFFECT.buyWithDiscount1:
                case EFFECT.gainPlane:
                case EFFECT.uptrade:
                    break;
                case EFFECT.gainAdventurerForThisRound:
                    playerState.availableAdventurers += 1;
                    break;
                case EFFECT.gainCoin:
                    playerState.resources.coins += 1;
                    break;
                case EFFECT.gainExplore:
                    playerState.resources.explore += 1;
                    break;
                case EFFECT.gainText:
                    playerState.resources.texts += 1;
                    break;
                case EFFECT.gainWeapon:
                    playerState.resources.weapons += 1;
                    break;
                default:
                    console.log("Unable to process effect in handleIncomes: ");
                    console.log(income.effects);
            }
        }
    }
    return playerState;
}

export function processEndOfRound(room) {
    let round = room.states.round;

    /* handle store changes */
    let tStore = cloneDeep(room.states.store);
    if (tStore.itemsOffer.length > 0) {
        tStore.itemsOffer.splice(-1 + round, 1, tStore.artifactsDeck[0]);
        tStore.artifactsDeck.splice(0, 1);
    }
    room.states.store = tStore;

    /* remove adventurers from locations */
    let tLocations = cloneDeep(room.states.locations);
    for (let key in tLocations) {
        let locationLine = tLocations[key];
        for (let location of locationLine) {
            if (location.state === LOCATION_STATE.occupied) {
                location.state = LOCATION_STATE.explored;
                location.owner = null;
            }
        }
    }
    room.states.locations = tLocations;

    /* reset player states */
    let tPlayerStates = [];
    for (let i = 0; i < room.numOfPlayers; i++) {
        let tPlayerState = cloneDeep(room.states.playerStates[i]);
        tPlayerState.availableAdventurers = GLOBAL_VARS.adventurers;

        /* move active cards to discard */
        for (let card of tPlayerState.activeCards) {
            if (card.type === CARD_TYPE.guardian) {
                tPlayerState = addCardToDiscardDeck({...ITEM_IDs.fear}, tPlayerState);
            }
            tPlayerState = addCardToDiscardDeck(card, tPlayerState);
        }
        tPlayerState.activeCards = [];

        /* move cards from hand to discard */
        for (let card of tPlayerState.hand) {
            tPlayerState = addCardToDiscardDeck(card, tPlayerState);
        }
        tPlayerState.hand = [];

        /* in 5th round all guardians come into play */
        if (round === 4) {
            for (let i; i < tPlayerState.discardDeck.length; i++) {
                if (tPlayerState.discardDeck[i].type === CARD_TYPE.guardian) {
                    tPlayerState.discardDeck[i].state = CARD_STATE.drawDeck;
                    tPlayerState.hand.push(tPlayerState.drawDeck[i]);
                    tPlayerState.discardDeck.splice(i);
                }
            }

            for (let i; i < tPlayerState.drawDeck.length; i++) {
                if (tPlayerState.drawDeck[i].type === CARD_TYPE.guardian) {
                    tPlayerState.drawDeck[i].splice(0, 0, i);
                }
            }
        }

        /* draw a new hand */
        tPlayerState = drawCards(5, tPlayerState);

        /* handle regular incomes */
        tPlayerState = handleIncomes(tPlayerState);

        /* reset transport resources */
        tPlayerState = resetTransport(tPlayerState);

        /* reset income states */
        for (let income of tPlayerState.incomes) {
            income.state = INCOME_STATE.ready
        }

        /* reset active rest of counters */
        tPlayerState.activeEffects = [];
        tPlayerState.actions = 1;
        tPlayerState.finishedRound = false;
        tPlayerStates.push(tPlayerState);

    }
    room.states.playerStates = tPlayerStates;
    room.states.round = round + 1;
    console.log("*** END OF ROUND ***");
    return room;
}

export function resetTransport(playerState) {
    playerState.resources.walk = 0;
    playerState.resources.jeep = 0;
    playerState.resources.ship = 0;
    playerState.resources.plane = 0;
    return playerState
}

export function getUserName(userId, users) {
    for (let user of users) {
        if (user.userId === userId) {
            return user.username
        }
    }
}

export function getRoom(roomName, rooms) {
    for (let room of rooms) {
        if (room.name === roomName) {
            return room;
        }
    }
}

export function processNewConnection(username, socketId, users) {
    let isUserAlreadyRegistered = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            users.splice(i, 1, {username: username, userId: socketId});
            isUserAlreadyRegistered = true;
        }
    }
    if (!isUserAlreadyRegistered) {
        users.push({username: username, userId: socketId})
    }
    let actualUsers = [];
    for (let user of users) {
        actualUsers.push(user.username);
    }
    console.log("Actual users: [" + actualUsers + "]");
    return users;
}

export function isRoomNameTaken(roomData, gameRooms) {
    console.log("* setting a new game room *");
    const roomName = roomData.roomName;
    //check if the name is existing
    let roomNames = [];
    for (const room of gameRooms) {
        roomNames.push(room.name);
    }
    return roomNames.includes(roomName)
}

export function removeUser(users, gameRooms, socketId) {
    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === socketId) {
            console.log("User " + users[i].username + " removed from active users.");
            user = users[i];
            users.splice(i, 1);
            break;
        }
    }
    if (user) {
        for (let room of gameRooms) {
            for (let i = 0; i < room.players.length; i++) {
                if (room.players[i] === user.username) {
                    room.players.splice(i, 1);
                    console.log("User " + user.username + " removed from room: " + room.name);
                }
            }
        }
    }
    return ({users: users, gameRooms: gameRooms})
}

export function updateRoomState(room, playerIndex, states) {
    room.states.previousPlayer = playerIndex;
    room.states.activePlayer = nextPlayer(playerIndex, room);
    let tPlayerState = states.playerState;
    tPlayerState = resetTransport(tPlayerState);
    room.states.playerStates.splice(playerIndex, 1, tPlayerState);
    room.states.store = states.store;
    room.states.locations = states.locations;
    room.states.legends = states.legends;
    return room;
}

export function nextPlayer(playerIndex, room) {
    let nextPlayerIndex = playerIndex + 1 < room.numOfPlayers ? playerIndex + 1 : 0;
    while (nextPlayerIndex !== playerIndex) {
        if (!room.states.playerStates[nextPlayerIndex].finishedRound) {
            console.log("PASSING ACTION TO PLAYER " + (nextPlayerIndex + 1));
            return nextPlayerIndex;
        }
        nextPlayerIndex = nextPlayerIndex + 1 < room.numOfPlayers ? nextPlayerIndex + 1 : 0
    }
    return nextPlayerIndex;
}