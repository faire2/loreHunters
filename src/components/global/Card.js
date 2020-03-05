import React, {useContext} from 'react';

import bgrItemEmpty from "../../img/cardBackgrounds/ItemBrownEmpty3.png"
import bgrWalk from "../../img/cardBackgrounds/ItemBrownWalk3.png"
import bgrJeep from "../../img/cardBackgrounds/ItemBrownJeep3.png"
import bgrShip from "../../img/cardBackgrounds/ItemBrownShip3.png"
import bgrPlane from "../../img/cardBackgrounds/ItemBrownPlane3.png"
import {CARD_STATE, CARD_TYPE, EFFECT} from "../../data/cards";
import {BoardStateContext} from "../../Contexts";


export default function Card(props) {
    const card = props.card;
    const boardStateContext = useContext(BoardStateContext);
    // if cardsState = inShop => no effects, else (in hand) clickOn effects only active, if activeEffects.length = 0

    const styles = {
        width: 142,
        height: 200,
        margin: 5,
        position: "relative",
        backgroundImage: `url(${card.background}`,
        backgroundSize: "cover"
    };

    const pointer = {cursor: "pointer"};
    const noPointer = {cursor: "default"};
    const pointerStyle = card.state !== CARD_STATE.inStore ? pointer : noPointer;

    /*console.log("Displaying card:" + card.cardName);
    console.log(card);
*/
    function handleClickOnEffect(effects) {
        if (card.state !== CARD_STATE.inStore && boardStateContext.activeEffects.length === 0) {
            console.log("Click on effect");
            boardStateContext.handleCardEffect(effects, props.index);
        }
    }

    function handleClickOnCard() {
        const activeEffects = boardStateContext.activeEffects;
        if (card.state === CARD_STATE.inStore) {
            console.log("Click on buy");
            boardStateContext.handleCardBuy(card, props.index)
        } else if (activeEffects.length > 0) {
            boardStateContext.handleActiveEffectClickOnCard(card, props.index);
        }
    }


    return (
        <div style={styles} className="card" onClick={() => handleClickOnCard()}>
            <Movement movement={card.movement}/>
            <h2>{card.cardName}</h2>
            <span style={{fontSize: 10}}> {card.state} </span>
            <Effects effectsText={card.effectsText} effects={card.effects} style={pointerStyle}
                     handleClickOnEffect={handleClickOnEffect}/>
            <AlternativeEffects effectsText={card.effects2Text} effects={card.effects2} style={pointerStyle}
                                handleClickOnEffect={handleClickOnEffect}/>
            <Cost cost={card.cost}/>
            <VictoryPoints points={card.points}/>

        </div>
    )
}


const Movement = (props) =>
    <div className="Movement">
        {props.movement}
    </div>;

const Effects = (props) =>
    <div className="Effects" style={props.style} onClick={() => props.handleClickOnEffect(props.effects)}>
        {props.effectsText}
    </div>;

const AlternativeEffects = (props) =>
    <div className="Effects2" style={props.style} onClick={() => props.handleClickOnEffect(props.effects)}>
        {props.effectsText}
    </div>;

const Cost = (props) =>
    <div className="Cost">
        <h3>{props.cost}</h3>
    </div>;

const VictoryPoints = (props) =>
    <div className="VictoryPoints">
        <h3>{props.points}</h3>
    </div>;

export const BACKGROUNDS = Object.freeze({
    itemEmpty: bgrItemEmpty,
    itemWalk: bgrWalk,
    itemJeep: bgrJeep,
    itemShip: bgrShip,
    itemPlane: bgrPlane
});
