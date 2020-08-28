import React from "react";
import styled from "styled-components"
import {JsxFromEffects} from "../JsxFromEffects";
import autoCardBgr from "../../img/cardBackgrounds/auromatonBgr.png"

export const AutomatonCard = (props) => {
    return (
        <Automaton>
            {props.automatonAction !== null && <JsxFromEffects effectsArray={[props.automatonAction]} fontSize={"3vw"}/>}
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
    background-image: url("${autoCardBgr}");
    background-size: contain;
`;
