import {AUTOMATON, CARD_TYPE} from "../functions/enums.mjs";
import {autoOccupyLocation} from "./autoOccupyLocation.mjs";
import {EFFECT} from "../../data/effects.mjs";
import {autoExploreLocation} from "./autoExploreLocation.mjs";
import {takeArtifactFromStore} from "./autoTakeFromStore.mjs";
import {autoResearch} from "./autoResearch.mjs";
import {autoDefeatAGuardian} from "./autoDefeatGuardian.mjs";

export function performAutomatonAction(states, automatonState, round) {
    const actionObject = automatonState.automatonActions[0];

    // we look at previous action to determine the direction of automaton effect
    const previousAction = automatonState.executedAutomatonActions[automatonState.executedAutomatonActions.length - 1];
    const direction = previousAction !== undefined ? previousAction.direction : actionObject.direction;
    let actionResult;

    switch (actionObject.action) {
        case AUTOMATON.adventurerCoin:
            states = autoOccupyLocation(states, EFFECT.gainCoin, direction);
            break;
        case AUTOMATON.adventurerExplore:
            states = autoOccupyLocation(states, EFFECT.gainExplore, direction);
            break;
        case AUTOMATON.adventurerText:
            states = autoOccupyLocation(states, EFFECT.gainText, direction);
            break;
        case AUTOMATON.adventurerWeapon:
            states = autoOccupyLocation(states, EFFECT.gainWeapon, direction);
            break;
        case AUTOMATON.adventurerJewel:
            states = autoOccupyLocation(states, EFFECT.gainJewel, direction);
            break;
        case AUTOMATON.exploresLocation:
            actionResult = autoExploreLocation(states, round, direction, automatonState);
            automatonState = actionResult.automatonState;
            states = actionResult.states;
            break;
        /*case AUTOMATON.exilesInnerCards:
            states = autoExileCard(states, EXILE_CARDS.inner);
            break;
        case AUTOMATON.exilesOuterCards:
            states = autoExileCard(states, EXILE_CARDS.outer)
            break;*/
        /*case AUTOMATON.takesLegendBonus:
            states = autoTakeLegendBonus(states);
            break;*/
        case AUTOMATON.takesArtifact:
            actionResult = takeArtifactFromStore(states, automatonState, direction, CARD_TYPE.artifact);
            automatonState = actionResult.automatonState;
            states = actionResult.states;
            break;
        case AUTOMATON.takesItem:
            actionResult = takeArtifactFromStore(states, automatonState, direction, CARD_TYPE.item);
            automatonState = actionResult.automatonState;
            states = actionResult.states;
            break;
        case AUTOMATON.researches:
            actionResult = autoResearch(states, automatonState, direction);
            automatonState = actionResult.automatonState;
            states = actionResult.states;

            // replace the first assistant in the offer if there are any assistants left in the deck
            if (states.store.assistantsDeck.length > 0) {
                states.store.assistantsOffer.splice(0, 1, states.store.assistantsDeck[0]);
                states.store.assistantsDeck.splice(0, 1);
            }
            break;
        case AUTOMATON.defeatsOrResearches:
            actionResult = autoDefeatAGuardian(states, automatonState, direction);
            if (actionResult.defeatedGuardian) {
                states = actionResult.states;
                automatonState = actionResult.automatonState;
            } else {
                actionResult = autoResearch(states, automatonState, direction);
                automatonState = actionResult.automatonState;
                states = actionResult.states;
            }
            break;
        default:
            console.error("Unable to recognize automaton action in performAutomatonAction");
    }
    return {states: states, automatonState: automatonState};
}