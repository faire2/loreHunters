import React from "react";
import styled from "styled-components"
import {JsxFromEffects} from "../JsxFromEffects";

export const AutomatonCard = (props) => {
    return (
        <Automaton>
            <JsxFromEffects effectsArray={[props.automatonAction]} fontSize={"3vw"}/>
        </Automaton>
    )
}

const Automaton = styled.div`
    height: 8vw;
    width: 5vw;
    margin-left: 0.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;
    border-radius: 0.5vw;
`;
