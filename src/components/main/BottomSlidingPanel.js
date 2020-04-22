import React, {useContext, useState} from "react";
import Card from "../cards/Card";
import {PlayerStateContext} from "../../Contexts";
import {shuffleArray} from "../functions/initialStateFunctions";
import {cardRowStyle, sideTextStyle} from "../cards/cardRowStyle";

export default function BottomSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);
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
            <div style={cardRowStyle}>
                <div style={sideTextStyle}>RAND. DRAW DECK</div>
                {shuffleArray(playerStateContext.playerState.drawDeck).map((card, i) =>
                    <div key={i}>
                        <Card card={card} index={i}/>
                    </div>
                )}
            </div>
            <div style={cardRowStyle}>
                <div style={sideTextStyle}>VICTORY CARDS</div>
                {shuffleArray(playerStateContext.playerState.victoryCards).map((card, i) =>
                    <div key={i}>
                        <Card card={card} index={i}/>
                    </div>
                )}
            </div>
            <div style={cardRowStyle}>
                <div style={sideTextStyle}>DISCARD DECK</div>
                {shuffleArray(playerStateContext.playerState.discardDeck).map((card, i) =>
                    <div key={i}>
                        <Card card={card} index={i}/>
                    </div>
                )}
            </div>
        </div>
    )
}