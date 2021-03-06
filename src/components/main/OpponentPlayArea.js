import React, {useContext} from "react";
import {CardRow} from "../cards/CardRow";
import {PlayerStateContext} from "../../Contexts";

export function OpponentPlayArea() {
    const playerContext = useContext(PlayerStateContext);
    const playerStates = playerContext.playerStates;
    const previousPlayer = playerContext.previousPlayer ? playerContext.previousPlayer : 0;
    const playerColor = playerStates ? playerStates[previousPlayer].color : "white";

    const containerStyle = {
        position: "absolute",
        marginLeft: "47vw",
        marginTop: "39.7vw",
        backgroundColor: playerColor,
        width: "44vw",
        height: "9.6vw",
        top: 0,
    };

    return (
        <div style={containerStyle}>
            {playerStates ? <CardRow cards={playerStates[previousPlayer ? previousPlayer : 0].activeCards} text={"LAST PLAYED"}/>
            : ""}
        </div>
    )
}