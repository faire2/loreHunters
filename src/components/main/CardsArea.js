import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {DiscardDeck} from "../cards/DiscardDeck";
import Card from "../cards/Card";
import Resources from "../resources/Resources";
import {cardRowStyle, sideTextStyle} from "../cards/cardRowStyle";

export default function CardsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const activeCards = playerStateContext.playerState.activeCards;

    return (
        <div>
            <div style={cardRowStyle}>
                <div style={sideTextStyle}>PLAY AREA</div>
                {activeCards !== false ?
                    <ActiveCards activeCards={activeCards} activeEffect={playerStateContext.activeEffects}
                                 cancelEffect={playerStateContext.cancelEffect}/> : ""}
            </div>
            <div style={cardRowStyle}>
                <div style={sideTextStyle}>HAND</div>
                <Hand/>
                <div style={sideTextStyle}>DRAW DECK</div>
                <DrawDeck cards={playerStateContext.playerState.drawDeck}/>
            </div>
        </div>
    )
}

const ActiveCards = props =>
    <div className="d-flex flex-row position-relative">
        {props.activeCards.map((card, i) =>
            <div key={i}>
                <Card card={card} index={i}/>
            </div>
        )}
    </div>