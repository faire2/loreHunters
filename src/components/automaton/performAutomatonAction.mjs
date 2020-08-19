import {AUTOMATON} from "../functions/enums.mjs";
import {occupyLocationByAutomaton} from "./occupyLocationByAutomaton.mjs";
import {EFFECT} from "../../data/effects.mjs";
import {exploreLocationByAutomaton} from "./exploreLocationByAutomaton.mjs";
import {EXILE_CARDS, exileCardsByAutomaton} from "./exileCardsByAutomaton.mjs";
import {takeLegendBonusByAutomaton} from "./takeLegendBonusByAutomaton.mjs";

export function performAutomatonAction(states, action, round) {
    switch (action) {
        case AUTOMATON.adventurerCoin:
            states = occupyLocationByAutomaton(states, EFFECT.gainCoin);
            break;
        case AUTOMATON.adventurerExplore:
            states = occupyLocationByAutomaton(states, EFFECT.gainExplore);
            break;
        case AUTOMATON.adventurerText:
            states = occupyLocationByAutomaton(states, EFFECT.gainText);
            break;
        case AUTOMATON.adventurerWeapon:
            states = occupyLocationByAutomaton(states, EFFECT.gainWeapon);
            break;
        case AUTOMATON.adventurerJewel:
            states = occupyLocationByAutomaton(states, EFFECT.gainJewel);
            break;
        case AUTOMATON.exploresLocation:
            states = exploreLocationByAutomaton(states, round);
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