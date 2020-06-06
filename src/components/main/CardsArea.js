import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {CardRow, cardRowStyle, sideTextStyle} from "../cards/CardRow";
import {emptyPlayerState} from "../functions/initialStates/initialPlayerStates";

export default function CardsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState ? playerStateContext.playerState : emptyPlayerState;

    const containerStyle = {
        width: "45vw",
    };

    return (
        <div style={containerStyle}>
            {playerState.activeCards !== false && <CardRow cards={playerState.activeCards} randomize={false} text={"PLAY AREA"}/>}
            <div style={cardRowStyle}>

                <Hand/>
                <div style={sideTextStyle}>DRAW DECK</div>
                <DrawDeck cards={playerState.drawDeck}/>
            </div>
        </div>
    )
}