import React, {useContext} from 'react';
import {Hand} from "../cards/Hand";
import {PlayerStateContext} from "../../Contexts";
import {DrawDeck} from "../global/DrawDeck";
import {DiscardDeck} from "../global/DiscardDeck";
import Card from "../global/Card";

export default function CardsArea(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const activeCard = playerStateContext.playerState.activeCard;

    return (
        <div>
            <div className="row cardRow">
                <div className="col-3 d-flex flex-row">
                    <div className="vertical-text">DRAW DECK</div>
                    <DrawDeck cards={playerStateContext.playerState.drawDeck}/>
                </div>
                <div className="col-3 d-flex flex-row">
                    <div className="vertical-text">ACTIVE CARD</div>
                    {activeCard !== false ?
                        <ActiveCard activeCard={activeCard} activeEffect={playerStateContext.activeEffects}
                                    cancelEffect={playerStateContext.cancelEffect} /> : ""}

                </div>
                <div className="col-lg-3 d-flex flex-row">
                    <div className="vertical-text">DISCARD</div>
                    <DiscardDeck cards={playerStateContext.playerState.discardDeck}/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-9">
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