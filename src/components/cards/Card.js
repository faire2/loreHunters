import React, {useContext} from 'react';
import {CARD_STATE, CARD_TRANSPORT} from "../../data/cards";
import {BoardStateContext} from "../../Contexts";
import {EFFECT} from "../../data/effects";


export default function Card(props) {
    const card = props.card;
    const boardStateContext = useContext(BoardStateContext);
    // if cardsState = inShop => no effects, else (in hand) clickOn effects only active, if activeEffects.length = 0

    const styles = {
        width: 142,
        height: 200,
        margin: 5,
        position: "relative",
        backgroundImage: `url(${card.itemTransport}`,
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
            boardStateContext.handleCardEffect(effects, props.index);
        }
    }

    function handleClickOnCard() {
        const activeEffects = boardStateContext.activeEffects;
        if (activeEffects.length > 0) {
            boardStateContext.handleActiveEffectClickOnCard(card, props.index);
        } else if (card.state === CARD_STATE.inStore) {
            console.log("Click on buy");
            boardStateContext.handleCardBuy(card, props.index);
        }
    }


    return (
        <div style={styles} className="card" onClick={() => handleClickOnCard()}>
            <Movement itemTransport={card.itemTransport} handleClickOnEffect={handleClickOnEffect}/>
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


const Movement = (props) => {
    let effect = [];
    switch (props.itemTransport) {
        case CARD_TRANSPORT.walk:
            effect.push(EFFECT.gainWalk);
            break;
        case CARD_TRANSPORT.jeep:
            effect.push(EFFECT.gainJeep);
            break;
        case CARD_TRANSPORT.ship:
            effect.push(EFFECT.gainShip);
            break;
        case CARD_TRANSPORT.plane:
        case CARD_TRANSPORT.artifact:
            effect.push(EFFECT.gainPlane);
            break;
        case CARD_TRANSPORT.empty:
            break;
        default:
            console.log("Unknwown ITEM_TRANSPORT type in Card > Movement: " + props.itemTransport);
    }

    return (
        <div className="Movement" onClick={() => props.handleClickOnEffect(effect)}>
            {props.movement}
        </div>
    )
};

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


