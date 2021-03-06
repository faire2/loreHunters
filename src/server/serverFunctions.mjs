// insert player into null position or push him to the end
import {EFFECT} from "../data/effects.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {GLOBAL_VARS, ITEM_IDs} from "../data/idLists.mjs";
import {addCardToPlayedCards, drawCards} from "../components/functions/cardManipulationFuntions.mjs";
import {ASSISTANT_STATE, CARD_STATE, LOCATION_STATE} from "../components/functions/enums.mjs";

/*export function handleAssistants(playerState) {
    for (let assistant of playerState.assistants) {
        for (let effect of assistant.effects) {
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
                    console.log("Unable to process effect in handleAssistants: ");
                    console.log(assistant.effects);
            }
        }
        // automatic assistants were used and must be marked
        if (AUTOMATIC_ASSISTANT_EFFECTS.includes(assistant.id)) {
            assistant.state = ASSISTANT_STATE.spent;
        }
    }
    return playerState;
}*/

// currently only run from rewards modal on gain / refresh assistants
/*export function handleIncome(playerState, assistant) {
    const effects = assistant.level === ASSISTANT_LEVEL.silver ? assistant.silverEffects : assistant.goldEffects;
    const assistantResult = processEffects(null, null, playerState, effects, null, null,
        null)
    if (assistantResult.processedAllEffects) {
        playerState = assistantResult.tPlayerState;
    }
    return playerState;
}*/

export function processEndOfRound(room) {
    console.log("processing end of round " + room.states.round);
    let round = room.states.round;

    /* handle store changes */
    console.log("resetting the store");
    let tStore = cloneDeep(room.states.store);
    if (tStore.itemsOffer.length > 0) {
        tStore.itemsOffer.splice(0, 1);
        tStore.artifactsOffer.splice(tStore.artifactsOffer.length - 1, 1, tStore.artifactsDeck[0]);
        tStore.artifactsOffer.push(tStore.artifactsDeck[1]);
        tStore.artifactsDeck.splice(0, 2);
    }
    room.states.store = tStore;

    /* remove adventurers from locations */
    console.log("removing adventurers");
    let tLocations = cloneDeep(room.states.locations);
    const extraFear = {0: 0, 1: 0, 2: 0, 3: 0};
    let locationLines = [tLocations.line1, tLocations.line2, tLocations.line3, tLocations.line4]
    for (let line of locationLines) {
        for (let location of line) {
            /* owner of each adventurer in a guarded location gains a fear */
            if (location.state === LOCATION_STATE.guarded) {
                for (let playerId of location.adventurers) {
                    extraFear[playerId] += 1;
                }
            }
            location.adventurers = [];
        }
    }

    room.states.locations = tLocations;

    /* pass turn to next initial player */
    room.states.initialPlayer = room.states.initialPlayer !== room.players.length - 1 ? room.states.initialPlayer + 1 : 0;
    room.states.activePlayer = room.states.initialPlayer;
    console.log("turn passed to player " + room.states.initialPlayer);

    /* prepare array for updated playerstates */
    let tPlayerStates = [];

    for (let i = 0; i < room.numOfPlayers; i++) {
        console.log("resetting playerState" + i);
        let tPlayerState = cloneDeep(room.states.playerStates[i]);
        tPlayerState.availableAdventurers = GLOBAL_VARS.adventurers;

        /* discard active cards */
        /*for (let card of tPlayerState.activeCards) {
            /!* undefeated guardians are removed from the game *!/
            if (card.type === CARD_TYPE.guardian) {
                tPlayerState.destroyedCards.push(card);
                tPlayerState = addCardToPlayedCards(cloneDeep(ITEM_IDs.fear), tPlayerState);
            } else {
                tPlayerState = addCardToPlayedCards(card, tPlayerState);
            }
        }
        tPlayerState.activeCards = [];*/

        /* gain fears for adventurers in guarded locations */
        if (!tPlayerState.longEffects.includes(EFFECT.protectFromFear)) {
            for (let x = 0; x < extraFear[i]; x++) {
                tPlayerState.activeCards.push(cloneDeep(ITEM_IDs.fear));
            }
        }

        /* discard cards from hand */
        for (let card of tPlayerState.hand) {
            tPlayerState = addCardToPlayedCards(card, tPlayerState);
        }
        tPlayerState.hand = [];

        /* played cards go to draw deck*/
        tPlayerState.drawDeck = [...tPlayerState.drawDeck, ...tPlayerState.activeCards];
        for (let card of tPlayerState.drawDeck) {
            card.state = CARD_STATE.drawDeck;
        }
        tPlayerState.activeCards = [];

        /* draw a new hand */
        tPlayerState = drawCards(5, tPlayerState);

        /* reset assistant states */
        for (let assistant of tPlayerState.assistants) {
            assistant.state = ASSISTANT_STATE.ready
        }

        /* automatic assistants are handled here for beginning of next round */
        /*tPlayerState = handleAssistants(tPlayerState);*/

        /* reset transport resources */
        tPlayerState = resetTransport(tPlayerState);


        /* reset active rest of counters */
        tPlayerState.activeEffects = [];
        tPlayerState.longEffects = [];
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

export function getSocketId(username, users) {
    for (let user of users) {
        if (user.username === username) {
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
    console.error("Room could not be found: " + roomName + ". Rooms:");
    console.error(rooms);
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

export function removeUser(users, socketId) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === socketId) {
            console.log("User " + users[i].username + " removed from active users.");
            users.splice(i, 1);
            console.log("Current users: " + users);
            return ({users: users})
        }
    }
    return ({users: users})
}

export function changeFormerUsername(formerUsername, newUsername, users, gamerooms) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === formerUsername) {
            console.log("User " + users[i].username + " changed.");
            users[i].username = newUsername;
            console.log("changed active username from " + formerUsername + " to " + newUsername);
            break;
        }
    }
    for (let i = 0; i < gamerooms.length; i++) {
        /*console.log(gamerooms[i].name);*/
        for (let x = 0; x < gamerooms[i].players.length; x++) {
            /*console.log(gamerooms[i].players[x]);*/
            if (gamerooms[i].players[x] === formerUsername) {
                gamerooms[i].players[x] = newUsername;
                console.log("Changed username from " + formerUsername + " to " + newUsername + " in room " + gamerooms[i].name);
                break;
            }
        }
    }
    return ({users: users, gamerooms: gamerooms});
}

export function updateRoomState(room, playerIndex, states) {
    room.states.previousPlayer = playerIndex >= 0 ? playerIndex : 0;
    console.log("previous player: " + room.states.previousPlayer);
    room.states.activePlayer = nextPlayer(playerIndex, room);
    console.log("active player: " + room.states.activePlayer);
    let tPlayerState = states.playerState;
    tPlayerState = resetTransport(tPlayerState);
    room.states.playerStates.splice(playerIndex, 1, tPlayerState);
    room.states.store = states.store;
    room.states.locations = states.locations;
    room.states.legends = states.legends;
    room.states.gameLog = states.gameLog;
    console.log("Room " + room.name + " state updated.");
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

export function getPlayerIndex(socketId, users, room) {
    const userName = getUserName(socketId, users);
    const playersArr = room.players;
    if (playersArr.includes(userName)) {
        return playersArr.indexOf(userName);
    } else {
        console.error("Unable to determine playerIndex.");
        console.log(socketId);
        console.log(userName);
        console.log(room);
    }
}