import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import cors from "cors"
import {CARD_STATE, CARD_TYPE, INCOME_STATE, ITEM_IDs, LOCATION_STATE, TRANSMISSIONS} from "../data/idLists.mjs";
import addPlayer, {handleIncomes} from "./serverFunctions.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import getInitialPlayerStates, {
    getInitialLegends,
    getInitialLocations,
    getInitialStoreItems,
    GLOBAL_VARS
} from "../components/functions/initialStateFunctions.mjs";
import {addCardToDiscardDeck, drawCards} from "../components/functions/cardManipulationFuntions.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app)

let players = [];
let playerStates = getInitialPlayerStates();
let store = getInitialStoreItems();
let locations = getInitialLocations();
let legends = getInitialLegends();
let round = 1;
let activePlayer = 0;

const io = socketIO(server);
io.on("connection", socket => {
    players = addPlayer(players, socket.id);
    if (players.includes(socket.id)) {
        console.log("New client connected: " + socket.id + " | [" + players + "]");
        socket.emit(TRANSMISSIONS.getStates, {
            playerState: playerStates[players.indexOf(socket.id)],
            store: store,
            locations: locations,
            round: round,
            legends: legends,
            isActivePlayer: players.indexOf(socket.id) === activePlayer,
        });
        console.log("Emitted initial playerstate to player no. " + players.indexOf(socket.id));
    } else {
        console.log("Socket connection refused: " + socket.id);
    }

    /** NEXT PLAYER **/
    socket.on(TRANSMISSIONS.nextPlayer, states => {
        let playerIndex = players.indexOf(socket.id);
        console.log("PLAYER " + (playerIndex) + " passing action.");
        nextPlayer(playerIndex);
        let tPlayerState = states.playerState;
        tPlayerState = resetTransport(tPlayerState);
        playerStates.splice(playerIndex, 1, tPlayerState);
        store = states.store;
        locations = states.locations;
        legends = states.legends;
        updateStatesToAll();
        console.log("States updated");
    });

    /** NEW GAME **/
    socket.on(TRANSMISSIONS.newGame, () => {
        console.log("*** NEW GAME INITIATED ***");
        newGame();
    })

    /** End of round**/
    socket.on(TRANSMISSIONS.finishedRound, states => {
        let playerIndex = players.indexOf(socket.id);
        for (let playerState of playerStates) {
            console.log("Has player finished round?" + playerState.finishedRound);
        }
        console.log("end of round initiated");

        let tPlayerState = states.playerState;
        tPlayerState = resetTransport(tPlayerState);
        tPlayerState.finishedRound = true;
        playerStates.splice(playerIndex, 1, tPlayerState);
        store = states.store;
        locations = states.locations;
        legends = states.legends;

        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        let haveAllFinished = true;

        while (playerIndex !== nextPlayerIndex) {
            if (!playerStates[nextPlayerIndex].finishedRound) {
                haveAllFinished = false;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0;
        }
        console.log("have all finished: " + haveAllFinished);

        if (haveAllFinished && round < 5) {
            /* handle store changes */
            let tStore = cloneDeep(store);
            if (tStore.itemsOffer.length > 0) {
                tStore.itemsOffer.splice(-1 + round, 1, tStore.artifactsDeck[0]);
                tStore.artifactsDeck.splice(0, 1);
                store = tStore;
            }

            /* remove adventurers from locations */
            let tLocations = cloneDeep(locations);
            for (let key in tLocations) {
                let locationLine = locations[key];
                for (let location of locationLine) {
                    if (location.state === LOCATION_STATE.occupied) {
                        location.state = LOCATION_STATE.explored;
                        location.owner = null;
                    }
                }
            }

            /* reset player states */
            let tPlayerStates = [];
            for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
                let tPlayerState = cloneDeep(playerStates[i]);
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
            playerStates = tPlayerStates;
            round += 1;
            console.log("*** END OF ROUND ***");
        } else if (round !== 5) {
            nextPlayer(playerIndex);
        } else {
            for (let player of players) {
                io.to(`${player}`).emit(TRANSMISSIONS.scoringStates, {
                    playerStates: playerStates,
                    legends: legends
                })
            }

        }
        updateStatesToAll();
    });

    /** SEND BACK ALL PLAYER STATES **/
    socket.on(TRANSMISSIONS.sendScoringStates, () => {
        console.log("*Sending player states for scoring, length:" + playerStates.length);
        socket.emit(TRANSMISSIONS.scoringStates, {playerStates: playerStates, legends: legends});
    })

    /* DISCONNECT */
    socket.on("disconnect", () => {
        console.log("Client " + socket.id + " disconnected. Removing from active players.");
        players.splice(players.indexOf(socket.id), 1, null);
    });

    function updateStatesToAll() {
        for (let player of players) {
            io.to(`${player}`).emit(TRANSMISSIONS.stateUpdate, {
                playerState: playerStates[players.indexOf(player)],
                store: store,
                locations: locations,
                round: round,
                isActivePlayer: players.indexOf(player) === activePlayer,
                legends: legends
            })
        }
    }

    function nextPlayer(playerIndex) {
        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        while (nextPlayerIndex !== playerIndex) {
            if (!playerStates[nextPlayerIndex].finishedRound) {
                activePlayer = nextPlayerIndex;
                console.log("PASSING ACTION TO PLAYER " + (nextPlayerIndex + 1));
                break;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0
        }
    }

    function newGame() {
        playerStates = getInitialPlayerStates();
        store = getInitialStoreItems();
        locations = getInitialLocations();
        legends = getInitialLegends();
        round = 1;
        activePlayer = 0;
    }
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`))

function resetTransport(playerState) {
    playerState.resources.walk = 0;
    playerState.resources.jeep = 0;
    playerState.resources.ship = 0;
    playerState.resources.plane = 0;
    return playerState
}