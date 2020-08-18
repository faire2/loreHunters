import silverBgr from "../../img/incomes/silverBack.png"
import goldBgr from "../../img/incomes/goldBack.png"
import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import {ASSISTANT_LEVEL, ASSISTANT_STATE, ASSISTANT_TILE_SIZE} from "../functions/enums";
import {AssistantEffects} from "../legends/tiles/AssistantEffects";
import styled from "styled-components";

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    background-image: url(${props => props.bgr});
    background-size: 100% 100%;
    width: ${props => props.small ? "2.1vw" : "5vw"};
    height: ${props => props.small ? "2.25vw" : "5.3vw"};
    font-size: ${props => props.small ? "1.6vw" : "4vw"};
    float: left;
    position: relative;
    justify-content: center;
    margin-left: 0.5vw;
`;



export const Assistant = (props) => {
    const assistant = props.assistant;
    const size = props.size;
    const boardStateContext = useContext(BoardStateContext);
    let state = assistant.state;
    let effects = assistant.level === ASSISTANT_LEVEL.silver ? assistant.silverEffects : assistant.goldEffects;

    const bgr = assistant.level === ASSISTANT_LEVEL.silver ? silverBgr : goldBgr;

    function handleClick() {
        if (state === ASSISTANT_STATE.ready) {
            boardStateContext.handleClickOnAssistantTile(effects, assistant.id, assistant.state)
        }
    }

    return (
        <Container small={size === ASSISTANT_TILE_SIZE.small} bgr={bgr} onClick={() => handleClick()}>
            <Center>
                <AssistantEffects state={assistant.state} effects={effects}/>
            </Center>
        </Container>
    )
};