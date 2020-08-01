import silverBgr from "../../../img/incomes/silverBack.png"
import goldBgr from "../../../img/incomes/goldBack.png"
import React, {useContext} from "react";
import {BoardStateContext} from "../../../Contexts";
import {ASSISTANT_LEVEL, ASSISTANT_STATE, ASSISTANT_TILE_SIZE} from "../../functions/enums";
import {AssistantEffects} from "./AssistantEffects";
import styled from "styled-components";

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    background-size: cover;
    width: ${props => props.small ? "2.1vw" : "5vw"};
    height: ${props => props.small ? "2.25vw" : "5.3vw"};
    font-size: ${props => props.small ? "1.6vw" : "4vw"};
    float: left;
    position: relative;
    margin-left: 0.5vw;
    background-image: url(${props => props.bgr});
`;



export const Assistant = (props) => {
    const income = props.income;
    const size = props.size;
    const boardStateContext = useContext(BoardStateContext);
    let state = income.state;

    const bgr = income.level === ASSISTANT_LEVEL.silver ? silverBgr : goldBgr;

    function handleClick() {
        if (state === ASSISTANT_STATE.ready) {
            boardStateContext.handleClickOnIncomeTile(income.effects, income.id, income.state)
        }
    }

    return (
        <Container small={size === ASSISTANT_TILE_SIZE.small} bgr={bgr} onClick={() => handleClick()}>
            <Center>
                <AssistantEffects state={income.state} effects={income.effects}/>
            </Center>
        </Container>
    )
};