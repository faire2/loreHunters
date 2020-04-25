import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {DiscardDeck} from "../cards/DiscardDeck";
import Card from "../cards/Card";
import ResourcesArea from "../resources/ResourcesArea";
import {CardRow, cardRowStyle, sideTextStyle} from "../cards/CardRow";

export default function CardsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;

    const containerStyle = {
        width: "45vw",
    }

    return (
        <div style={containerStyle}>
            {playerState.activeCards !== false && <CardRow cards={playerState.activeCards} randomize={false} text={"PLAY AREA"}/>}
            <div style={cardRowStyle}>

                <Hand/>
                <div style={sideTextStyle}>DRAW DECK</div>
                <DrawDeck cards={playerStateContext.playerState.drawDeck}/>
            </div>
        </div>
    )
}