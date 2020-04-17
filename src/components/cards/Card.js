import React, {useContext} from 'react';
import {BoardStateContext} from "../../Contexts";
import {EFFECT} from "../../data/effects.mjs";
import {CARD_STATE, CARD_TYPE} from "../../data/idLists";
import {ARTIFACTS, CARD_TRANSPORT, EXPEDITIONS, GUARDIANS, ITEMS} from "../../data/cards";

import itemBgr from "../../img/cardBackgrounds/Item.png"
import artifactBgr from "../../img/cardBackgrounds/Artifact.png"
import guardianBgr from "../../img/cardBackgrounds/Guardian12.png"
import expeditionBgr from "../../img/cardBackgrounds/ExpeditionGoal.png"
import {Coin, Explore, Guardian, Jeep, Plane, Ship, Walk} from "../Symbols";
import {cloneDeep} from "lodash";

export default function Card(props) {
    /* get JSX card */
    let cardTemplate;
    let cardBackground;
    const cardType = props.card.type;
    if (cardType === CARD_TYPE.item || cardType === CARD_TYPE.basic) {
        cardTemplate = ITEMS[props.card.id];
        cardBackground = itemBgr;
    } else if (cardType === CARD_TYPE.artifact) {
        cardTemplate = ARTIFACTS[props.card.id]
        cardBackground = artifactBgr;
    } else if (cardType === CARD_TYPE.guardian) {
        cardTemplate = GUARDIANS[props.card.id]
        cardBackground = guardianBgr;
    } else if (cardType === CARD_TYPE.expedition) {
        cardTemplate = EXPEDITIONS[props.card.id];
        cardBackground = expeditionBgr;
    } else {
        console.log("Unable to process card type in Card.js: " + cardType);
    }
    // prevents merge of two cards with same id
    let card = cloneDeep(cardTemplate);
    card.state = props.card.state;
    card.type = cardType;

    /* get transports */
    let transport = [];
    for (let i = 0; i < card.transportAmount; i++) {
        switch (card.transport) {
            case CARD_TRANSPORT.walk:
                transport.push(<Walk/>)
                break;
            case CARD_TRANSPORT.jeep:
                transport.push(<Jeep/>)
                break;
            case CARD_TRANSPORT.ship:
                transport.push(<Ship/>)
                break;
            case CARD_TRANSPORT.plane:
                transport.push(<Plane/>)
                break;
            default:
                console.log("Unable to propcess card transport type in Card.js: " + card.id + ", " + card.transport);


        }
    }

    /* get card cost */
    let cost = [];
    let unit = null;
    if (cardType === CARD_TYPE.item) {
        unit = <Coin/>
    } else if (cardType === CARD_TYPE.artifact) {
        unit = <Explore/>
    }
    for (let i = 0; i < card.cost; i++) {
        cost.push(unit)
    }

    const boardStateContext = useContext(BoardStateContext);
    // if cardsState = inShop => no effects, else (in hand) clickOn effects only active, if activeEffects.length = 0
    const isGuardian = card.type === CARD_TYPE.guardian;
    const isPointer = card.state !== CARD_STATE.inStore ? "pointer" : "default";
    const effectsText = card.effectsText;
    const guardianDiscoveryEffectDescription = isGuardian ? card.discoveryText : "";

    const cardStyle = {
        width: "15vw",
        height: "21vw",
        margin: 5,
        position: "relative",
        backgroundImage: `url(${cardBackground}`,
        backgroundSize: "cover"
    };

    /* used as clickable area for playing transport */
    const cardTopStyle = {
        position: "absolute",
        right: 0,
        cursor: isPointer,
        width: "100%",
        height: "25%",
        zIndex: 1,
    };

    const transportStyle = {
        display: "flex",
        flex: "auto",
        alignItems: "center",
        webkitJustifyContent: "center",
        justifyContent: "center",
        position: "absolute",
        top: card.transportAmount > 1 ? "2.2vw" : "2vw",
        left: card.transportAmount > 1 ? "0.9vw" : "1.2vw",
        fontSize: card.transportAmount > 1 ? "1.6vw" : "2vw",
        width: "1.8vw",
        height: "1.8vw",
    }

    const cardNameStyle = {
        fontSize: "1vw",
        marginTop: "1.3vw",
    };

    const effectsStyle = {
        position: "absolute",
        marginTop: !isGuardian ? "11vw" : "12.55vw",
        marginLeft: !isGuardian ? 0 : "1vw",
        cursor: isPointer,
        fontSize: "0.1vw",
        width: "14vw"
    };

    // todo: responsiveness depends on font size in Symbols.js
    const discoveryEffectsStyle = {
        position: "absolute",
        top: "3.2vw",
        display: "flex",
        right: "0.8vw",
        width: "1.2vw",
        fontSize: "1.2vw",
    };

    const lockEffectsStyle = {
        position: "absolute",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        top: "9.8vw",
        display: "flex",
        width: "1.2vw",
    };

    const costStyle = {
        display: "flex",
        flexDirectio: "row",
        position: "absolute",
        bottom: "0.6vw",
        left: "6.5%",
        color: isGuardian ? "gold" : "black",
        height: "3.8vw",
        fontSize: "2.8vw"
    };

    const pointsStyle = {
        position: "absolute",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        right: "1.2vw",
        textShadow: "-1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF",
        fontSize: "3vw",
        height: "3.5vw",
    };

    function handleClickOnEffect(effects, isTravel) {
        if (card.state !== CARD_STATE.inStore && boardStateContext.activeEffects.length === 0) {
            boardStateContext.handleCardEffect(effects, props.index, !(isTravel || cardType === CARD_TYPE.basic), card);
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
        <div style={cardStyle} className="card" onClick={() => handleClickOnCard()}>
            <CardTop itemTransport={card.transport} handleClickOnEffect={handleClickOnEffect} style={cardTopStyle}
                     transportAmount={card.transportAmount}/>
            <TransportIcons transport={transport} style={transportStyle}/>
            <h2 style={cardNameStyle}>{card.cardName}</h2>
            <Effects effectsText={effectsText} effects={card.effects} style={effectsStyle}
                     handleClickOnEffect={handleClickOnEffect}/>
            {cardType === CARD_TYPE.guardian && <DiscoveryEffects style={discoveryEffectsStyle} discoveryText={card.discoveryText}
                      discoveryText2={card.discoveryText2}/>}
            {cardType === CARD_TYPE.guardian && <LockEffects style={lockEffectsStyle} lockText={card.lockText} />}
            <Cost cost={cost} style={costStyle}/>
            <VictoryPoints points={card.points} style={pointsStyle}/>
            <span style={{fontSize: 10, position: "absolute", top: 50, left: 40}}> {card.state} </span>
        </div>
    )
}


const CardTop = (props) => {
    let effects = [];
    for (let i = 0; i < props.transportAmount; i++) {
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
    }

    return (
        <div style={props.style} onClick={() => props.handleClickOnEffect(effects, true)}>
        </div>
    )
};

const Effects = (props) =>
    <div style={props.style} onClick={() => props.handleClickOnEffect(props.effects, false)}>
        {props.effectsText}
    </div>;

const DiscoveryEffects = (props) =>
        <div style={props.style} >
            {props.discoveryText}
            <div style={{position: "absolute", marginTop:"5vw"}}>{props.discoveryText2}</div>
        </div>

const LockEffects = (props) =>
    <div style={props.style}>
        {props.lockText}
    </div>

const Cost = (props) =>
    <div style={props.style}>
        {props.cost.map((icon, i) => {
                const left = i * -0.5 + "vw";
                return (
                    <div key={i} style={{marginLeft: left}}>
                        {icon}
                    </div>
                )
            }
        )}
    </div>;

const VictoryPoints = (props) =>
    <div style={props.style}>
        <h3>{props.points}</h3>
    </div>;

const TransportIcons = (props) =>
    <div>
        {props.transport.map((transport, i) => {
            const left = i * 0.5 + "vw";
            const top = i * -1 + "vw";
            return (
                <div style={{...props.style, ...{marginLeft: left, marginTop: top, height: left}}} key={i}>
                    {transport}
                </div>
            )
        })}
    </div>


