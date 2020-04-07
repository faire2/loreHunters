// insert player into null position or push him to the end
import {GLOBAL_VARS} from "../components/functions/initialStateFunctions.mjs";

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