import React, {useContext} from "react";
import styled from "styled-components";
import {PlayerStateContext} from "../../Contexts";

export default function TopSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const extendPanel = playerStateContext.playerState.activeEffects.length > 0 || props.extendPanel;

    return (
        <Panel extendPanel={extendPanel} color={playerStateContext.playerState.color}>
            {playerStateContext.playerState.activeEffects.length > 0 && playerStateContext.playerState.activeEffects[0]}
        </Panel>
    )
}

const Panel = styled.div`
    position: fixed;
    top: ${props => props.extendPanel ? 0 : "-3.5vw"};
    left: 0;
    height: 3.5vw;
    width: 100vw;
    transition: all .5s cubic-bezier(0, 0.2, 0, 1);
    background-color: rgba(255,255,255,0.47);
    font-size: 1.5vw;
    display: flex;
    flex-flow: column;
    justify-content: center;
`;