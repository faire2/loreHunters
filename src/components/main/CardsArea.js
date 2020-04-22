import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {DiscardDeck} from "../cards/DiscardDeck";
import Card from "../cards/Card";
import Resources from "../resources/Resources";
import {CardRow, cardRowStyle, sideTextStyle} from "../cards/CardRow";

export default function CardsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;

    return (
        <div>
            {playerState.activeCards !== false && <CardRow cards={playerState.activeCards} randomize={false} text={"ACT. PLAY AREA"}/>}
            <div style={cardRowStyle}>
                <div style={sideTextStyle}>HAND</div>
                <Hand/>
                <div style={sideTextStyle}>DRAW DECK</div>
                <DrawDeck cards={playerStateContext.playerState.drawDeck}/>
            </div>
        </div>
    )
}