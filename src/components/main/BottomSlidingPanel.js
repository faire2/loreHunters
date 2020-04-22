import React, {useContext, useState} from "react";
import Card from "../cards/Card";
import {PlayerStateContext} from "../../Contexts";
import {shuffleArray} from "../functions/initialStateFunctions";
import {CardRow, cardRowStyle, sideTextStyle} from "../cards/CardRow";

export default function BottomSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;
    const extendPanel = props.extendPanel;

    const slideStyle = {
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100vw",
        height: !extendPanel ? "0vw" : "29vw",
        zIndex: 10,
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
        backgroundColor: playerStateContext.playerState.color,
    };

    return (
        <div style={slideStyle}>
            <CardRow cards={playerState.drawDeck} randomize={true} text={"RAND. DRAW DECK"} />
            <CardRow cards={playerState.discardDeck} randomize={false} text={"DISCARD DECK"} />
            <CardRow cards={playerState.victoryCards} randomize={false} text={"VICTORY CARDS"} />
        </div>
    )
}