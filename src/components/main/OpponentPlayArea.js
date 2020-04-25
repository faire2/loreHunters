import React, {useContext} from "react";
import {CardRow} from "../cards/CardRow";
import {PlayerStateContext} from "../../Contexts";

export function OpponentPlayArea() {
    const playerContext = useContext(PlayerStateContext);
    const playerStates = playerContext.playerStates;
    const previousPlayer = playerContext.previousPlayer ? playerContext.previousPlayer : 0;
    const playerColor = playerStates[previousPlayer].color;

    const previousHand = previousPlayer ? playerStates[previousPlayer] : [];
    if (previousHand.length > 0) {debugger}
    const containerStyle = {
        position: "absolute",
        marginLeft: "47vw",
        marginTop: "39.7vw",
        backgroundColor: playerColor,
        width: "100%",
        top: 0,
    }

    return (
        <div style={containerStyle}>
            <CardRow cards={playerStates[previousPlayer ? previousPlayer : 0].activeCards} text={"LAST PLAYED"}/>
        </div>
    )
}