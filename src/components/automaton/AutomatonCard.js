import React from "react";
import styled from "styled-components"
import {JsxFromEffects} from "../JsxFromEffects";
import easyBgr from "../../img/cardBackgrounds/AuromatonEasy.png"
import hardBgr from "../../img/cardBackgrounds/AutomatonHard.png"
import fixedBgr from "../../img/cardBackgrounds/AuromatonFixed.png"
import {AUTOMATON_DIFFICULTY} from "../functions/enums.mjs";

export const AutomatonCard = (props) => {
    let bgr;
    switch (props.actionObject.difficulty) {
        case AUTOMATON_DIFFICULTY.easy:
            bgr = easyBgr;
            break;
        case AUTOMATON_DIFFICULTY.hard:
            bgr = hardBgr;
            break;
        case AUTOMATON_DIFFICULTY.fixed:
            bgr = fixedBgr;
            break;
        default: console.warn("Unable to determine difficulty in AutomatonCard: " + props.actionObject.difficulty)
    }
    return (
        <Automaton bgr={bgr}>
            {props.actionObject.action !== null && <JsxFromEffects effectsArray={[props.actionObject.action]} fontSize={"3vw"}/>}
        </Automaton>
    )
}

const Automaton = styled.div`
    height: 6vw;
    width: 4.1vw;
    margin-left: 0.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vw;
    background-image: url("${props => props.bgr}");
    background-size: contain;
`;
