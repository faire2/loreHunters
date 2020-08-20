import React, {useContext} from "react";
import {CardRow} from "../cards/CardRow";
import {PlayerStateContext} from "../../Contexts";
import {AutomatonCardsArea} from "../automaton/AutomatonCardsArea";
import {DivRow} from "../functions/styles";

export function OpponentPlayArea() {
    const playerContext = useContext(PlayerStateContext);
    const playerStates = playerContext.playerStates;
    const previousPlayer = playerContext.previousPlayer ? playerContext.previousPlayer : 0;
    const playerColor = playerStates ? playerStates[previousPlayer].color : "white";
    const automatonActions = playerContext.executedAutomatonActions;

    let displayElement;
    if (automatonActions && automatonActions.length > 0) {
        displayElement = <DivRow> <AutomatonCardsArea /></DivRow>;
    } else if (playerStates) {
        displayElement = <CardRow cards={playerStates[previousPlayer ? previousPlayer : 0].activeCards} text={"LAST PLAYED"}/>;
    } else {
        displayElement = "";
    }

    const containerStyle = {
        position: "absolute",
        marginLeft: "47vw",
        marginTop: "39.7vw",
        backgroundColor: playerColor,
        width: "44vw",
        height: "9.6vw",
        top: 0,
        paddingTop: "0.2vw"
    };

    return (
        <div style={containerStyle}>
            {displayElement}
        </div>
    )
}