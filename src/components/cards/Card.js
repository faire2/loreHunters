import React, {useContext} from 'react';
import {BoardStateContext} from "../../Contexts";
import {EFFECT} from "../../data/effects";
import {ARTIFACT_IDs, CARD_STATE, CARD_TYPE, GUARDIAN_IDs, ITEM_IDs} from "../../data/idLists";
import {ARTIFACTS, CARD_TRANSPORT, GUARDIANS, ITEMS} from "../../data/cards";
import {ITEM_EFFECTS} from "../../data/effectsDescription";


export default function Card(props) {
    let card;
    if (props.card.type === CARD_TYPE.item || props.card.type === CARD_TYPE.basic) {
        card = ITEMS[props.card.id]
    } else if (props.card.type === CARD_TYPE.artifact) {
        card = ARTIFACTS[props.card.id]
    } else if (props.card.type === CARD_TYPE.guardian) {
        card = GUARDIANS[props.card.id]
    } else {
        console.log("Unable to process card type in Card.js: " + props.card.type);
    }
    card.state = props.card.state;

    const boardStateContext = useContext(BoardStateContext);
    // if cardsState = inShop => no effects, else (in hand) clickOn effects only active, if activeEffects.length = 0
    const isGuardian = card.type === CARD_TYPE.guardian;
    const isPointer = card.state !== CARD_STATE.inStore ? "pointer" : "default";
    const effectsText = card.effectsText;
    const effectsText2 = card.effectsText2 ? card.effectsText2 : "";
    const guardianDiscoveryEffectDescription = isGuardian ? card.discoveryText : "";

    const styles = {
        width: 142,
        height: 200,
        margin: 5,
        position: "relative",
        backgroundImage: `url(${card.itemTransport}`,
        backgroundSize: "cover"
    };

    const cardTopStyle = {
        position: "absolute",
        visibility: isGuardian ? "true" : "false",
        right: 0,
        marginTop: isGuardian ? 5 : 0,
        fontSize: 1,
        cursor: isPointer,
        width: isGuardian ? "" : "100%",
        height: isGuardian ? "" : "10%",
    };

    const cardNameStyle = {
        fontSize: "40%",
        marginTop: isGuardian ? "58%" : "10%",
    };

    const effectsStyle = {
        position: "relative",
        marginTop: isGuardian ? "35%" : "48%",
        cursor: isPointer,
    };

    const alternativeEffectsStyle = {
        position: "relative",
        cursor: isPointer,
        marginTop: 10
    };

    const costStyle = {
        position: "absolute",
        bottom: "-3%",
        left: "6.5%",
        color: isGuardian ? "gold" : "black",
        fontSize: 30
    };

    const pointsStyle = {
        position: "absolute",
        bottom: "-3%",
        right: "4%",
        visibility: isGuardian ? "hidden" : "visible",
        textShadow: "-1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF",
        fontSize: 30,
    };

    /*console.log("Displaying card:" + card.cardName);
    console.log(card);
*/
    function handleClickOnEffect(effects, isTravel) {
        if (card.state !== CARD_STATE.inStore && boardStateContext.activeEffects.length === 0) {
            boardStateContext.handleCardEffect(effects, props.index, isTravel);
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
            <CardTop itemTransport={card.itemTransport} handleClickOnEffect={handleClickOnEffect} style={cardTopStyle}
                     discovery={guardianDiscoveryEffectDescription}
                     discoveryEffect={isGuardian ? card.discoveryEffect : []}/>
            <h2 style={cardNameStyle}>{card.cardName}</h2>
            <Effects effectsText={effectsText} effects={card.effects} style={effectsStyle}
                     handleClickOnEffect={handleClickOnEffect}/>
            <AlternativeEffects effectsText={effectsText2} effects={card.effects2} style={alternativeEffectsStyle}
                                handleClickOnEffect={handleClickOnEffect}/>
            <Cost cost={card.cost} style={costStyle}/>
            <VictoryPoints points={card.points} style={pointsStyle}/>
            <span style={{fontSize: 10, position: "absolute", top: 50, left: 40}}> {card.state} </span>
        </div>
    )
}


const CardTop = (props) => {
    let effects = props.discoveryEffect;
    switch (props.itemTransport) {
        case CARD_TRANSPORT.walk:
            effects.push(EFFECT.gainWalk);
            break;
        case CARD_TRANSPORT.jeep:
            effects.push(EFFECT.gainJeep);
            break;
        case CARD_TRANSPORT.ship:
            effects.push(EFFECT.gainShip);
            break;
        case CARD_TRANSPORT.plane:
        case CARD_TRANSPORT.artifact:
            effects.push(EFFECT.gainPlane);
            break;
        case CARD_TRANSPORT.empty:
        case CARD_TRANSPORT.guardian:
            break;
        default:
            console.log("Unknwown ITEM_TRANSPORT type in Card > Movement: " + props.itemTransport);
    }
    return (
        <div style={props.style} onClick={() => props.handleClickOnEffect(effects, true)}>
            {props.discovery}
        </div>
    )
};

const Effects = (props) =>
    <div style={props.style} onClick={() => props.handleClickOnEffect(props.effects, false)}>
        {props.effectsText}
    </div>;

const AlternativeEffects = (props) =>
    <div style={props.style} onClick={() => props.handleClickOnEffect(props.effects, false)}>
        {props.effectsText}
    </div>;

const Cost = (props) =>
    <div style={props.style}>
        <h3>{props.cost}</h3>
    </div>;

const VictoryPoints = (props) =>
    <div style={props.style}>
        <h3>{props.points}</h3>
    </div>;


