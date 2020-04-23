import React, {useContext, useState} from 'react';
import {BoardStateContext} from "../../Contexts";
import {EFFECT} from "../../data/effects.mjs";
import {CARD_STATE, CARD_TYPE} from "../../data/idLists";
import {ARTIFACTS, CARD_TRANSPORT, EXPEDITIONS, GUARDIANS, ITEMS} from "../../data/cards";

import jeep from "../../img/items/jeep.png"
import itemBgr from "../../img/cardBackgrounds/Item.png"
import artifactBgr from "../../img/cardBackgrounds/Artifact.png"
import guardianBgr from "../../img/cardBackgrounds/Guardian12.png"
import expeditionBgr from "../../img/cardBackgrounds/ExpeditionGoal.png"
import transportHighlight from "../../img/cardBackgrounds/transportHighlight.png"
import {AdventurerIcon, Coin, Discard, Explore, Guardian, Jeep, Blimp, Ship, Walk, Weapon} from "../Symbols";
import {cloneDeep} from "lodash";
import {gainLockedResourceBack} from "../functions/processEffects";

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
        console.log(props.card.id);
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
                transport.push(<Blimp/>)
                break;
            default:
                console.log("Unable to propcess card transport type in Card.js: " + card.id + ", " + card.transport);
        }
    }
    const [highlightTransport, setHighlightTransport] = useState(false);

    const lockText = card.type === CARD_TYPE.guardian ? card.lockText : null;
    // If resources have already be locked, display their correct amount
    let newLockText = [];
    if (props.card.locked) {
        for (let i = 0; i < props.card.locked.amount; i++) {
            switch (props.card.locked.lockEffect) {
                case (EFFECT.lockAdventurer):
                    newLockText.push(<AdventurerIcon/>);
                    break;
                case (EFFECT.lockCard):
                    newLockText.push(<Discard/>);
                    break;
                case (EFFECT.lockCoins):
                    newLockText.push(<Coin/>)
                    break;
                case (EFFECT.lockExplores):
                    newLockText.push(<Explore/>);
                    break;
                case (EFFECT.lockWeapons):
                    newLockText.push(<Weapon/>);
                    break;
                default:
                    console.log("Unable to process lock effect in Card.js: " + props.card.lockEffect);
            }
        }
        newLockText = newLockText.map((icon, i) =>
            <div key={i}>
                {icon}
            </div>)
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

    // card enlargement is based on hover effect set in app.css
    const cardStyle = {
        height: "9vw",
        width: "6.5vw",
        marginLeft: card.state === CARD_STATE.locked ? "-3vw" : "0.3vw",
        position: "relative",

        zIndex: card.state === CARD_STATE.locked ? -1 : 1
    };

    const cardBackgroundStyle = {
        position: "absolute",
        backgroundImage: `url(${cardBackground}`,
        backgroundSize: "100% 100%",
        zIndex: 1,
        width: "100%",
        height: "100%"
    }

    /* used as clickable area for playing transport */
    const cardTopStyle = {
        position: "absolute",
        right: 0,
        cursor: isPointer,
        width: "100%",
        height: "13%",
        zIndex: 3,
    };

    const transportStyle = {
        display: "flex",
        flex: "auto",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: card.transportAmount === 1 ? "9%" : "10%",
        left: card.transportAmount === 1 ? "6%" : "7%",
        fontSize: card.transportAmount === 1 ? "1vw" : "0.7vw",
        zIndex: 2,
    }

    const transportHighlightStyle = {
        backgroundImage: `url(${transportHighlight}`,
        backgroundSize: "100% 100%",
        position: "absolute",
        width: "1.2vw",
        height: "1.2vw",
        top: "2%",
        left: "5%",
        zIndex: 1,
        visibility:  highlightTransport && card.state === CARD_STATE.inHand ? "visible" : "hidden",
    }

    const cardNameStyle = {
        fontSize: "0.5vw",
        marginTop: "0.5vw",
        zIndex: 1
    };

    const cardImageStyle = {
        position: "absolute",
        marginTop: "17%",
        height: "45%",
        width: "100%",
        /*backgroundImage: `url(${jeep})`,*/
        backgroundSize: "100% 100%",
        zIndex: -1
    }

    const effectsWrapperStyle = {
        cursor: isPointer,
        height: "85%",
        zIndex: 2
    }

    //todo fontSize is set in cards.js, should be moved here
    const effectsStyle = {
        width: "95%",
        marginTop: !isGuardian ? "55%" : "59%",
        marginLeft: !isGuardian ? 0 : "32%",
        fontSize: "0.5vw",
        textAlign: !isGuardian ? "center" : "left",
        position: "absolute",
        zIndex: 1
    };

    // todo: responsiveness depends on font size in Symbols.js
    const discoveryEffectsStyle = {
        position: "absolute",
        display: "flex",
        top: "16%",
        right: "6%",
        fontSize: "0.5vw",
        zIndex: 1
    };

    const lockEffectsStyle = {
        top: "50%",
        fontSize: "0.8vw",
        position: "absolute",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "row",
        width: "1.7vw",
        zIndex: 1
    };

    const costStyle = {
        bottom: "4%",
        left: "5%",
        fontSize: "1.1vw",
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        color: isGuardian ? "gold" : "black",
        zIndex: 1
    };

    const pointsStyle = {
        fontSize: "1vw",
        right: "10%",
        bottom: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        color: "white",
        zIndex: 1
    };

    function handleClickOnEffect(effects, isTravel) {
        if (card.state !== CARD_STATE.inStore && card.state !== CARD_STATE.locked && boardStateContext.activeEffects.length === 0) {
            if (cardType === CARD_TYPE.guardian && props.card.locked) {
                const lockEffect = props.card.locked.lockEffect;
                const amount = props.card.locked.amount;
                effects = gainLockedResourceBack(lockEffect, amount, effects)
            }
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
            <div style={cardBackgroundStyle} />
            <CardTop itemTransport={card.transport} handleClickOnEffect={handleClickOnEffect} style={cardTopStyle}
                     transportAmount={card.transportAmount} setHighlightTransport={setHighlightTransport}/>
            <TransportIcons transport={transport} style={transportStyle}/>
            <div style={transportHighlightStyle}/>
            <h2 style={cardNameStyle}>{card.cardName}</h2>
            <div style={cardImageStyle}/>

            <div onClick={() => handleClickOnEffect(card.effects, false)} style={effectsWrapperStyle}>
                <Effects effectsText={effectsText} style={effectsStyle}/>
            </div>
            {cardType === CARD_TYPE.guardian &&
            <DiscoveryEffects style={discoveryEffectsStyle} discoveryText={card.discoveryText}
                              discoveryText2={card.discoveryText2}/>}
            {cardType === CARD_TYPE.guardian && <LockEffects style={lockEffectsStyle}
                                                             lockText={card.state === CARD_STATE.active ? newLockText : lockText}/>}
            <Cost cost={cost} style={costStyle}/>
            <VictoryPoints points={card.points} style={pointsStyle}/>
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
        <div style={props.style} onClick={() => props.handleClickOnEffect(effects, true)}
             onMouseEnter={() => props.setHighlightTransport(true)} onMouseLeave={() => props.setHighlightTransport(false)}>
        </div>
    )
};

const Effects = (props) =>
    <div style={props.style}>
        {props.effectsText}
    </div>;

const DiscoveryEffects = (props) =>
    <div style={props.style}>
        {props.discoveryText}
        <div style={{position: "absolute", marginTop: "2vw"}}>{props.discoveryText2}</div>
    </div>

const LockEffects = (props) =>
    <div style={props.style}>
        {props.lockText}
    </div>

const Cost = (props) =>
    <div style={props.style}>
        {props.cost.map((icon, i) => {
                const left = i * -0.1 + "vw";
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
            const left = i * 5 + "%";
            const top = i * -7 + "%";
            return (
                <div style={{...props.style, ...{marginLeft: left, marginTop: top, height: left}}} key={i}>
                    {transport}
                </div>
            )
        })}
    </div>


