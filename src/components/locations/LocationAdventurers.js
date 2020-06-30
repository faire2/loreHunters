import {AdventurerToken} from "../Symbols";
import {GLOBAL_VARS} from "../../data/idLists";
import React from "react";

export const LocationAdventurers = (props) => {
    const adventurerStyle = {
        width: "1.5vw",
        top: "1vw",
        right: 0,
        left: 0,
        margin: "auto",
        position: "absolute",
        cursor: "pointer",
        zIndex: 2,
        display: "inline-block",
    };

    return (
    <div>
        {props.adventurers.map((playerId, i) =>
            <div style={adventurerStyle} key={i}>
                <AdventurerToken  color={GLOBAL_VARS.playerColors[playerId]}/>
            </div>
        )}
    </div>
)};