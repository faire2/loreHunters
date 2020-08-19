import React, {useContext} from "react";
import styled from "styled-components";
import {PlayerStateContext} from "../../Contexts";
import {AutomatonCardsArea} from "../automaton/AutomatonCardsArea";
import {DivRow} from "../functions/styles";

export default function TopSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);

    return (
        <Panel extendPanel={props.extendPanel} color={playerStateContext.playerState.color}>
            <DivRow>
                <AutomatonCardsArea />
            </DivRow>

        </Panel>
    )
}

const Panel = styled.div`
    position: fixed;
    top: ${props => props.extendPanel ? 0 : "-10vw"};
    left: 0;
    height: 10vw;
    width: 100vw;
    transition: all .5s cubic-bezier(0, 0.2, 0, 1);
    background-color: ${props => props.color};
    font-size: 1vw;
    display: flex;
    flex-flow: column;
    justify-content: center;
`;