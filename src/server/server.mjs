import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import cors from "cors"
import {LOCATION_STATE, TRANSMISSIONS} from "../data/idLists.mjs";
import addPlayer from "./addPlayer.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import getInitialPlayerStates, {
    getInitialLocations,
    getInitialStoreItems,
    GLOBAL_VARS
} from "../components/functions/initialStateFunctions.mjs";
import {
    addCardToDiscardDeck,
    addCardToHand,
    addDiscardToDrawDeck
} from "../components/functions/cardManipulationFuntions.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app)

let players = [];
let playerStates = getInitialPlayerStates();
let store = getInitialStoreItems();
let locations = getInitialLocations();
let round = 1;
let activePlayer = 0;

const io = socketIO(server);
io.on("connection", socket => {
    console.log("New client connected: " + socket.id);
    // todo limit number of players according to global settings
    players = addPlayer(players, socket.id);
    socket.emit(TRANSMISSIONS.getStates, {
        playerState: playerStates[players.indexOf(socket.id)],
        store: store,
        locations: locations,
        round: round,
        isActivePlayer: players.indexOf(socket.id) === activePlayer
    });
    console.log("Emitted playerstate to player no. " + players.indexOf(socket.id));

    /** NEXT PLAYER **/
    socket.on(TRANSMISSIONS.nextPlayer, states => {
        let playerIndex = players.indexOf(socket.id);
        console.log("PLAYER " + (playerIndex) + " passing action.");
        nextPlayer(playerIndex);
        playerStates.splice(playerIndex, 1, states.playerState);
        store = states.store;
        locations = states.locations;
        updateStatesToAll();
    })

    /** End of round**/
    socket.on(TRANSMISSIONS.finishedRound, states => {
        let playerIndex = players.indexOf(socket.id);
        for (let playerSTate of playerStates) {
            console.log("Has player finished round?" + playerSTate.finishedRound);
        }
        console.log("end of round initiated");


        let tPlayerState = states.playerState;
        tPlayerState.finishedRound = true;
        playerStates.splice(playerIndex, 1, tPlayerState);
        store = states.store;
        locations = states.locations;

        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        let haveAllFinished = true;

        while (playerIndex !== nextPlayerIndex) {
            if (!playerStates[nextPlayerIndex].finishedRound) {
                haveAllFinished = false;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0;
        }
        console.log("have all finished: " + haveAllFinished);

        if (haveAllFinished) {
            /* handle store changes */
            let tStore = cloneDeep(store);
            if (tStore.itemsOffer.length > 0) {
                tStore.itemsOffer.splice(tStore.itemsOffer.length - round, 1, tStore.artifactsDeck[0]);
                tStore.artifactsDeck.splice(0, 1);
                store = tStore;
            }

            /* remove adventurers from locations */
            let tLocations = cloneDeep(locations);
            for (let key in locations) {
                let location = locations[key];
                if (location.state === LOCATION_STATE.occupied) {
                    location.state = LOCATION_STATE.explored
                }
            }
            locations = tLocations;

            /* reset player states */
            let tPlayerStates = [];
            for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
                let tPlayerState = cloneDeep(playerStates[i]);
                tPlayerState.availableAdventurers = GLOBAL_VARS.adventurers;

                /* remove active card */
                if (tPlayerState.activeCard !== false) {
                    tPlayerState.discardDeck.push(tPlayerState.activeCard);
                    tPlayerState.activeCard = false;
                }

                /* move cards from hand to discard */
                for (let card of tPlayerState.hand) {
                    tPlayerState = addCardToDiscardDeck(card, tPlayerState);
                    tPlayerState.hand = [];
                }

                /* draw a new hand */
                for (let i = 0; i < GLOBAL_VARS.handSize; i++) {
                    if (tPlayerState.drawDeck.length === 0) {
                        tPlayerState = addDiscardToDrawDeck(tPlayerState);
                    }
                    if (tPlayerState.drawDeck.length > 0) {
                        const result = addCardToHand(tPlayerState.drawDeck[0], cloneDeep(tPlayerState));
                        tPlayerState = cloneDeep(result);
                        tPlayerState.drawDeck.splice(0, 1);
                    }
                }

                /* reset transport resources */
                tPlayerState.resources.walk = 0;
                tPlayerState.resources.jeep = 0;
                tPlayerState.resources.ship = 0;
                tPlayerState.resources.plane = 0;

                /* reset active rest of counters */
                tPlayerState.activeEffects = [];
                tPlayerState.actions = 1;
                tPlayerState.finishedRound = false;
                tPlayerStates.push(tPlayerState);
                //todo isactive player + 1
            }
            playerStates = tPlayerStates;
            round += 1;
            console.log("*** END OF ROUND ***");
        } else {
            nextPlayer(playerIndex);
        }
        updateStatesToAll();
    })
    /* DISCONNECT */
    socket.on("disconnect", () => {
        console.log("Client " + socket.id + " disconnected. Removing from active players.");
        players.splice(players.indexOf(socket.id), 1, false);
    })

    function updateStatesToAll() {
        for (let player of players) {
            io.to(`${player}`).emit(TRANSMISSIONS.stateUpdate, {
                playerState: playerStates[players.indexOf(player)],
                store: store,
                locations: locations,
                round: round,
                isActivePlayer: players.indexOf(player) === activePlayer
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
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`));