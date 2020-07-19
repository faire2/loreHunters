import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {LostCity} from "../legends/LostCity";

export default function RightSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const extendPanel = props.extendPanel;


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

    return (
        <div style={slideStyle}>
            <LostCity/>
        </div>
    )
}