import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../cards/DrawDeck";
import {DiscardDeck} from "../cards/DiscardDeck";
import Card from "../cards/Card";

export default function CardsArea(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const activeCard = playerStateContext.playerState.activeCard;
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
                    <div className="vertical-text">ACTIVE CARD</div>
                    {activeCard !== false ?
                        <ActiveCard activeCard={activeCard} activeEffect={playerStateContext.activeEffects}
                                    cancelEffect={playerStateContext.cancelEffect}/> : ""}

                </div>
                <div className="d-flex flex-row"style={minWidthStyle}>
                    <div className="vertical-text">DISCARD</div>
                    <DiscardDeck cards={playerStateContext.playerState.discardDeck}/>
                </div>
            </div>
            <div className="">
                <div className="">
                    <Hand/>
                </div>
            </div>
        </div>
    )
}

const ActiveCard = props =>
    <div className="d-flex flex-row">
        <Card card={props.activeCard} index=""/>
        <button className="btn btn-danger" onClick={() => props.cancelEffect(props.activeEffect[0])}>x</button>
    </div>