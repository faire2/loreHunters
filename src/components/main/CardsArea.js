import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {DiscardDeck} from "../cards/DiscardDeck";
import Card from "../cards/Card";

export default function CardsArea(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const activeCards = playerStateContext.playerState.activeCards;
    const minWidthStyle = {
        minWidth: "20vw"
    }

    return (
        <div>
            <div className="d-flex flex-row cardRow">
                <div className="d-flex flex-row" style={minWidthStyle}>
                    <div className="vertical-text">DRAW DECK</div>
                        <DrawDeck cards={playerStateContext.playerState.drawDeck}/>
                </div>
                <div className="d-flex flex-row" style={minWidthStyle}>
                    <div className="vertical-text">ACTIVE CARDS</div>
                    {activeCards !== false ?
                        <ActiveCards activeCards={activeCards} activeEffect={playerStateContext.activeEffects}
                                     cancelEffect={playerStateContext.cancelEffect}/> : ""}

                </div>
                <div className="d-flex flex-row" style={minWidthStyle}>

                </div>
            </div>
            <div className="d-flex flex-row">
                <Hand/>
                <div className="vertical-text">DISCARD</div>
                <DiscardDeck cards={playerStateContext.playerState.discardDeck}/>
            </div>
        </div>
    )
}

const ActiveCards = props =>
    <div className="d-flex flex-row position-relative">
        {props.activeCards.map((card, i) =>
            <div key={i} >
                <Card card={card} index={i}/>
            </div>
        )}
    </div>