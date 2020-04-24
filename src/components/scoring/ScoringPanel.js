import React, {useEffect, useState} from "react";
import {CARD_TYPE, TRANSMISSIONS} from "../../data/idLists";
import {CardRow} from "../cards/CardRow";
import {socket} from "../../server/socketConnection";
import {emptyPlayerState, GLOBAL_VARS} from "../functions/initialStateFunctions";
import {ARTIFACTS, GUARDIANS, ITEMS} from "../../data/cards";
import {Legends2} from "../../data/legends2";
import {AdventurerToken, Artifact, DefeatedGuardian, Guardian, Item, Shiny} from "../Symbols";
import Card from "../cards/Card";

export function ScoringPanel(props) {
    const [playerStates, setPlayerStates] = useState([emptyPlayerState]);
    const [playerIndex, setPlayerIndex] = useState(0)
    const [legends, setLegends] = useState(null);
    // todo implement all players' states

    const playerState = playerStates[playerIndex];
    useEffect(() => {
        socket.emit(TRANSMISSIONS.sendScoringStates, {});
        console.log("emitting");

        socket.on(TRANSMISSIONS.scoringStates, states => {
            console.log("received")
            setPlayerStates(states.playerStates);
            setLegends(states.legends);
        });
    }, []);

    function handleClickOnPlayerTab(index) {
        setPlayerIndex(index);
    }


    console.log("player states:");
    console.log(playerStates);
    const allDeckCards = [...playerState.hand, ...playerState.drawDeck, ...playerState.activeCards, ...playerState.discardDeck];
    console.log("****************");
    const items = allDeckCards.filter(card => card.type === CARD_TYPE.item || card.type === CARD_TYPE.basic)
    let itemPoints = 0;
    for (let card of items) {
        itemPoints += ITEMS[card.id].points;
    }

    const artifacts = allDeckCards.filter(card => card.type === CARD_TYPE.artifact)
    let artifactPoints = 0;
    for (let card of artifacts) {
        artifactPoints += ARTIFACTS[card.id].points;
    }

    const undefeatedGuardians = allDeckCards.filter(card => card.type === CARD_TYPE.guardian)
    let undefeatedGuardianPoints = 0;
    for (let card of undefeatedGuardians) {
        undefeatedGuardianPoints -= 1;
    }
    const defeatedGuardians = playerState.destroyedCards.filter(card => card.type === CARD_TYPE.guardian);
    let defeatedGuardianPoints = 0;
    for (let card of defeatedGuardians) {
        defeatedGuardianPoints += GUARDIANS[card.id].points;
    }

    /* Legends2 */
    let legendPoints = 0;
    if (legends) {
        for (let i = 0; i < legends.length; i++) {
            const victoryPoints = Legends2[legends[i].id].victoryPoints;
            for (const position of legends[i].positions[playerState.playerIndex]) {
                if (position.columnIndex !== null) {
                    legendPoints += victoryPoints[position.columnIndex];
                }
            }
        }
    }

    /* RELICS */
    const relics = playerState.relics;
    let relicsPoints = 0;
    for (let i = 0; i < relics.length; i++) {
        if (!relics[i]) {
            relicsPoints += Math.floor(i / 3);
        }
    }
    relicsPoints += playerState.resources.shinies * 4;

    const containerStyle = {
        textAlign: "center",
        fontSize: "6vw"
    }

    const rowStyle = {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",

    }

    /* EXPEDITION CARDS */
    const expeditionCards = playerState.victoryCards.filter(card => card.type === CARD_TYPE.expedition);

    return (
        <div style={containerStyle}>
            <PlayerTabs handleClickOnTab={handleClickOnPlayerTab}/>
            <div style={rowStyle}>
                <Item/>:{itemPoints}<CardRow cards={allDeckCards}/>
            </div>
            <div style={rowStyle}>
                <Artifact/>:{artifactPoints}<CardRow cards={artifacts}/>
            </div>
            <div style={rowStyle}>
                <Guardian/>:{undefeatedGuardianPoints}<CardRow cards={undefeatedGuardians}/>
            </div>
            <div style={rowStyle}>
                <DefeatedGuardian/>:{defeatedGuardianPoints}<CardRow cards={defeatedGuardians}/>
            </div>
            <div style={rowStyle}>
                <AdventurerToken color={playerState.color} style={{width: "5vw"}}/>:{legendPoints}
            </div>
            <div style={rowStyle}>
                <Shiny/>:{relicsPoints}
            </div>
            {expeditionCards.map((card, i) =>
                <div key={i}>
                    <div style={{marginLeft: "3vw"}}><Card card={card}/></div>
                </div>
            )}
        </div>
    )
}

const PlayerTabs = (props) => {
    const playerArr = [];
    for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
        playerArr.push(i)
    }

    function handleOnClick(i) {
        props.handleClickOnTab(i);
    }

    return (
        <div style={{display: "flex", flexFlow: "row", justifyContent: "left"}}>
            {playerArr.map((player, i) =>
            <div key={i} onClick={() => handleOnClick(i)}>
                <PlayerTab playerId={player}/>
            </div>
        )}
        </div>
    )
}

const PlayerTab = (props) => {
    const playerId = props.playerId;
    const tabStyle = {
        width: "25vw",
        height: "5vw",
        backgroundColor: GLOBAL_VARS.playerColors[playerId],
    }

    return (
        <div style={tabStyle}>
        </div>
    )
}
