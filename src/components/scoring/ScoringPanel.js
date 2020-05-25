import React, {useEffect, useState} from "react";
import {CARD_TYPE, TRANSMISSIONS} from "../../data/idLists";
import {CardRow} from "../cards/CardRow";
import {socket} from "../../server/socketConnection";
import {emptyPlayerState, GLOBAL_VARS} from "../functions/initialStateFunctions";
import {AdventurerToken, Artifact, DefeatedGuardian, Fear, Guardian, Item, Shiny} from "../Symbols";
import Card from "../cards/Card";
import {getPoints} from "./scoringFunctions";

export function ScoringPanel(props) {
    const [playerStates, setPlayerStates] = useState(props.location.data ?
        props.location.data.playerStates : [emptyPlayerState]);
    const [playerIndex, setPlayerIndex] = useState(0);
    //todo remove?
    const [legends, setLegends] = useState(props.location.data ?
        props.location.data.legends : null);

    const playerState = playerStates[playerIndex];
    useEffect(() => {
        if (!props.location.data) {
            socket.emit(TRANSMISSIONS.sendScoringStates, {});
            console.log("emitting");
        }

        socket.on(TRANSMISSIONS.scoringStates, states => {
            console.log("received");
            setPlayerStates(states.playerStates);
            setLegends(states.legends);
        });
    }, [props.location.data]);

    function handleClickOnPlayerTab(index) {
        setPlayerIndex(index);
    }

    const pointsResult = getPoints(playerState)

    const containerStyle = {
        textAlign: "center",
        fontSize: "4vw",
        width: "100%",
        height: "100%"
    };

    const rowStyle = {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    };

    /* EXPEDITION CARDS */
    const expeditionCards = playerState.victoryCards.filter(card => card.type === CARD_TYPE.goalCard);

    return (
        <div style={containerStyle}>
            <PlayerTabs handleClickOnTab={handleClickOnPlayerTab} width={"25vw"} height={"5vw"}/>
            <div style={rowStyle}>
                <Item/>:{pointsResult.itemPoints}<CardRow cards={pointsResult.items}/>
            </div>
            <div style={rowStyle}>
                <Artifact/>:{pointsResult.artifactPoints}<CardRow cards={pointsResult.artifacts}/>
            </div>
            <div style={rowStyle}>
                <Fear/>:{pointsResult.fearPoints}<CardRow cards={pointsResult.fears}/>
            </div>
            {/*<div style={rowStyle}>
                <Guardian/>:{pointsResult.undefeatedGuardianPoints}<CardRow cards={pointsResult.undefeatedGuardians}/>
            </div>*/}
            <div style={rowStyle}>
                <DefeatedGuardian/>:{pointsResult.defeatedGuardianPoints}<CardRow cards={pointsResult.defeatedGuardians}/>
            </div>
            <div style={rowStyle}>
                <AdventurerToken color={playerState.color} style={{width: "5vw"}}/>:{pointsResult.legendPoints}
            </div>
            <div style={rowStyle}>
                <Shiny/>:{pointsResult.relicsPoints}
            </div>
            Total: {pointsResult.totalPoints}
            <div>
            </div>
            {expeditionCards.map((card, i) =>
                <div key={i}>
                    <div style={{marginLeft: "3vw"}}><Card card={card}/></div>
                </div>
            )}
        </div>
    )
}

export const PlayerTabs = (props) => {
    const playerArr = [];
    for (let i = 0; i < props.numOfPlayers; i++) {
        playerArr.push(i)
    }

    function handleOnClick(i) {
        props.handleClickOnTab(i);
    }

    return (
        <div style={{display: "flex", flexFlow: "row", justifyContent: "left"}}>
            {playerArr.map((player, i) =>
                <div key={i} onClick={() => handleOnClick(i)}>
                    <PlayerTab playerId={player} width={props.width} height={props.height}/>
                </div>
            )}
        </div>
    )
};

const PlayerTab = (props) => {
    const playerId = props.playerId;
    const tabStyle = {
        width: props.width,
        height: props.height,
        backgroundColor: GLOBAL_VARS.playerColors[playerId],
        cursor: "pointer",
    };

    return (
        <div style={tabStyle}/>
    )
};
