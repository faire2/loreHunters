import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {DiscardDeck} from "../cards/DiscardDeck";
import Card from "../cards/Card";
import Resources from "../resources/Resources";

export default function CardsArea(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const activeCards = playerStateContext.playerState.activeCards;
    
    const rowStyle = {
        marginTop: "0.5vw"
    }

    return (
        <div>
            <div className="d-flex flex-row" style={rowStyle}>
                <div className="d-flex flex-row" >

                </div>
                <div className="d-flex flex-row" style={rowStyle}>
                    <div className="vertical-text">PLAY AREA</div>
                    {activeCards !== false ?
                        <ActiveCards activeCards={activeCards} activeEffect={playerStateContext.activeEffects}
                                     cancelEffect={playerStateContext.cancelEffect}/> : ""}
                </div>
            </div>
            <div className="d-flex flex-row" style={rowStyle}>
                <div className="vertical-text">DRAW DECK</div>
                <DrawDeck cards={playerStateContext.playerState.drawDeck}/>
                <div className="vertical-text">HAND</div>
                <Hand/>
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