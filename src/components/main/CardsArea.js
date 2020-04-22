import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {DiscardDeck} from "../cards/DiscardDeck";
import Card from "../cards/Card";
import Resources from "../resources/Resources";

export default function CardsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const activeCards = playerStateContext.playerState.activeCards;

    const cardRowStyle = {
        marginTop: "0.5vw",
        position: "relative",
        marginLeft: "1.7vw",
        display: "flex",
        flexFlow: "row",
        height: "9vw"
    }

    const rotateTextStyle = {
        writingMode: "vertical-rl",
    }


    return (
        <div>
            <div style={cardRowStyle}>
                <div style={rotateTextStyle}>PLAY AREA</div>
                {activeCards !== false ?
                    <ActiveCards activeCards={activeCards} activeEffect={playerStateContext.activeEffects}
                                 cancelEffect={playerStateContext.cancelEffect}/> : ""}
            </div>
            <div style={cardRowStyle}>
                <div style={rotateTextStyle}>HAND</div>
                <Hand/>
                <div style={rotateTextStyle}>DRAW DECK</div>
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