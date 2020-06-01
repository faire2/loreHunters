import React, {useEffect, useState} from "react";
import {CARD_TYPE, LCL_STORAGE, TRANSMISSIONS} from "../../data/idLists";
import {CardRow} from "../cards/CardRow";
import {socket} from "../../server/socketConnection";
import {emptyPlayerState, GLOBAL_VARS} from "../functions/initialStateFunctions";
import {AdventurerToken, Artifact, DefeatedGuardian, Fear, Item, Shiny} from "../Symbols";
import Card from "../cards/Card";
import {getPoints} from "./scoringFunctions";
import {useHistory} from "react-router-dom";
import {StatesSpinner} from "../../GameBoard";
import {getLogLegends, setLogLegends} from "../main/logger";

export function ScoringPanel(props) {
    const [playerStates, setPlayerStates] = useState(null);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [statesLoading, setStatesLoading] = useState(true);
    const history = useHistory();

    const playerState = playerStates ? playerStates[playerIndex] : emptyPlayerState;
    useEffect(() => {
        if (props.location.data) {
            // if location data are available, set states...
            const data = props.location.data;
            setPlayerStates(data.playerStates);
            setStatesLoading(false);
            setLogLegends(getLogLegends());
        } else if (localStorage.getItem(LCL_STORAGE.roomName)) {
            // ...otherwise check local storage for state id's and request the states from server...
            const roomName = localStorage.getItem(LCL_STORAGE.roomName);
            const playerIndex = localStorage.getItem(LCL_STORAGE.playerIndex);
            setPlayerIndex(parseInt(playerIndex, 10));
            socket.emit(TRANSMISSIONS.sendScoringStates, {roomName: roomName, playerIndex: playerIndex});
            console.log("requesting scoring states");
        } else {
            // ...else reroute to login page
            console.log("No game data available, rerouting to login page");
            history.push({pathname: "/", data: {}});
        }

        socket.on(TRANSMISSIONS.scoringStates, states => {
            console.log("scoring states received");
            setLogLegends(states.legends);
            setPlayerStates(states.playerStates);
            setStatesLoading(false);
        });
    }, []);

    function handleClickOnPlayerTab(index) {
        setPlayerIndex(index);
    }

    const pointsResult = playerStates ? getPoints(playerState) : 0;

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

    if (!statesLoading) {
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
                    <DefeatedGuardian/>:{pointsResult.defeatedGuardianPoints}<CardRow
                    cards={pointsResult.defeatedGuardians}/>
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
    } else {
        return  (
            <StatesSpinner/>
        )
    }
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
