import {CARD_STATE} from "../enums";
import {activateGuardianAndLockEffects} from "../cardManipulationFuntions";

export function handleGuardianArrival(tPlayerState, tStore, round) {
    if (round < 5) {
        tPlayerState.discardDeck.push(tStore.guardians[0]);
        tPlayerState.discardDeck[tPlayerState.discardDeck.length - 1].state = CARD_STATE.discard;
    } else {
        tPlayerState = activateGuardianAndLockEffects(tPlayerState, [tStore.guardians[0]],
            [tStore.guardians[0].lockEffects]);
    }
    tStore.guardians.splice(0, 1);
    return {tPlayerState: tPlayerState, tStore: tStore}
}