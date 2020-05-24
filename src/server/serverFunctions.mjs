// insert player into null position or push him to the end
import {GLOBAL_VARS} from "../components/functions/initialStateFunctions.mjs";
import {EFFECT} from "../data/effects.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {CARD_STATE, CARD_TYPE, INCOME_STATE, ITEM_IDs, LOCATION_STATE} from "../data/idLists.mjs";
import {addCardToDiscardDeck, drawCards} from "../components/functions/cardManipulationFuntions.mjs";

export function handleIncomes(playerState) {
    for (let income of playerState.incomes) {
        for (let effect of income.effects) {
            switch (effect) {
                case EFFECT.draw1:
                case EFFECT.buyWithDiscount1:
                case EFFECT.gainBlimp:
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

export function handleIncome(playerState, income) {
    for (let effect of income.effects) {
        switch (effect) {
            case EFFECT.draw1:
            case EFFECT.buyWithDiscount1:
            case EFFECT.gainBlimp:
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
                console.log("Unable to process effect in handleIncome: ");
                console.log(income);
        }
    }
    return playerState;
}

export function processEndOfRound(room) {
    console.log("processing end of round " + room.states.round);
    let round = room.states.round;

    /* handle store changes */
    console.log("resetting the store");
    let tStore = cloneDeep(room.states.store);
    if (tStore.itemsOffer.length > 0) {
        tStore.itemsOffer.splice(0, 1);
        tStore.artifactsOffer.push(tStore.artifactsDeck[0]);
        tStore.artifactsDeck.splice(0, 1);
    }
    room.states.store = tStore;

    /* remove adventurers from locations */
    console.log("removing adventurers");
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

    /* pass turn to next initial player */
    room.states.initialPlayer = room.states.initialPlayer !== room.players.length - 1 ? room.states.initialPlayer + 1 : 0;
    room.states.activePlayer = room.states.initialPlayer;
    console.log("turn passed to player " + room.states.initialPlayer);

    for (let i = 0; i < room.numOfPlayers; i++) {
        console.log("resetting playerState" + i);
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
            console.log("ensuring guardians enter play");
            for (let i = 0; i < tPlayerState.discardDeck.length; i++) {
                if (tPlayerState.discardDeck[i].type === CARD_TYPE.guardian) {
                    tPlayerState.discardDeck[i].state = CARD_STATE.drawDeck;
                    tPlayerState.drawDeck.push(tPlayerState.discardDeck[i]);
                    tPlayerState.discardDeck.splice(i, 1);
                }
            }

            for (let i = 1; i < tPlayerState.drawDeck.length; i++) {
                if (tPlayerState.drawDeck[i].type === CARD_TYPE.guardian) {
                    let tCard = tPlayerState.drawDeck[i];
                    tPlayerState.drawDeck.splice(i, 1);
                    tPlayerState.drawDeck.splice(0, 0, tCard);
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
    room.states.previousPlayer = playerIndex;
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