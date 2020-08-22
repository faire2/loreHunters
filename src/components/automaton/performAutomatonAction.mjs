import {AUTOMATON} from "../functions/enums.mjs";
import {occupyLocationByAutomaton} from "./occupyLocationByAutomaton.mjs";
import {EFFECT} from "../../data/effects.mjs";
import {exploreLocationByAutomaton} from "./exploreLocationByAutomaton.mjs";
import {EXILE_CARDS, exileCardsByAutomaton} from "./exileCardsByAutomaton.mjs";
import {takeLegendBonusByAutomaton} from "./takeLegendBonusByAutomaton.mjs";

export function performAutomatonAction(states, actionObject, round, previousAction) {
    const direction = previousAction !== undefined ? previousAction.direction : actionObject.direction;
    switch (actionObject.action) {
        case AUTOMATON.adventurerCoin:
            states = occupyLocationByAutomaton(states, EFFECT.gainCoin, direction);
            break;
        case AUTOMATON.adventurerExplore:
            states = occupyLocationByAutomaton(states, EFFECT.gainExplore, direction);
            break;
        case AUTOMATON.adventurerText:
            states = occupyLocationByAutomaton(states, EFFECT.gainText, direction);
            break;
        case AUTOMATON.adventurerWeapon:
            states = occupyLocationByAutomaton(states, EFFECT.gainWeapon, direction);
            break;
        case AUTOMATON.adventurerJewel:
            states = occupyLocationByAutomaton(states, EFFECT.gainJewel, direction);
            break;
        case AUTOMATON.exploresLocation:
            states = exploreLocationByAutomaton(states, round, direction);
            break;
        case AUTOMATON.exilesInnerCards:
            states = exileCardsByAutomaton(states, EXILE_CARDS.inner);
            break;
        case AUTOMATON.exilesOuterCards:
            states = exileCardsByAutomaton(states, EXILE_CARDS.outer)
            break;
        case AUTOMATON.takesLegendBonus:
            states = takeLegendBonusByAutomaton(states);
            break;
        default:
            console.error("Unable to recognize automaton action in performAutomatonAction");
    }
    return states;
}