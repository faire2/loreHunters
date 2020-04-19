// insert player into null position or push him to the end
import {GLOBAL_VARS} from "../components/functions/initialStateFunctions.mjs";
import {EFFECT} from "../data/effects.mjs";

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