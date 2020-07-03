import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {getPoints} from "../scoring/scoringFunctions";
import {LostCity} from "../legends/LostCity";

export default function RightSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;
    const extendPanel = props.extendPanel;
    const points = getPoints(playerState);


    const slideStyle = {
        position: "fixed",
        top: 0,
        right: extendPanel ? "0vw" : "-24vw",
        width: "13vw",
        height: "19vw",
        zIndex: 10,
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
        backgroundColor: playerStateContext.playerState.color,
        fontSize: "3vw",
    };

    const rowStyle = {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    };

    return (
        <div style={slideStyle}>
            <LostCity/>
        </div>
    )
}