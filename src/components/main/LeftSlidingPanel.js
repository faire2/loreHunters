import React, {useContext} from "react";
import styled from "styled-components";
import {PlayerStateContext} from "../../Contexts";
import {BriefScoringPanel} from "../scoring/BriefScoringPanel.js";
import {AutomatonBriefScore} from "../scoring/AutomatonBriefScoringPanel.js";

export default function Left(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const extendPanel = props.extendPanel;

    return (
        <SlidingPanel extendPanel={extendPanel} color={playerStateContext.playerState.color}>
            <BriefScoringPanel />
            {playerStateContext.automatonLevel > 0 && <AutomatonBriefScore /> }
        </SlidingPanel>
    )
}
const SlidingPanel = styled.div`
    position: fixed;
    top: 0;
    left: ${props => props.extendPanel ? 0 : "-5vw"};
    width: 5vw;
    height: 100vw;
    z-index: 10;
    transition: all .5s cubic-bezier(0, .2, 0, 1);
    background-color: ${props => props.color};
    font-size: 2vw;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center
`;