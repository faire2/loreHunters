import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {AdventurerToken, Artifact, BronzeRelic, DefeatedGuardian, Item} from "../Symbols";
import {getPoints} from "../scoring/scoringFunctions";

export default function Left(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;
    const extendPanel = props.extendPanel;
    const points = getPoints(playerState);


    const slideStyle = {
        position: "fixed",
        top: 0,
        left: extendPanel ? 0 : "-5vw",
        width: "5vw",
        height: "100vw",
        zIndex: 10,
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
        backgroundColor: playerStateContext.playerState.color,
        fontSize: "2vw",
        display: "flex",
        flexFlow: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    };

    const rowStyle = {
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <div style={slideStyle}>
            <div style={rowStyle}>
                <Item/>:{points.itemPoints}
            </div>
            <div style={rowStyle}>
                <Artifact/>:{points.artifactPoints}
            </div>
            {/*<div style={rowStyle}>
                <Guardian/>:{points.undefeatedGuardianPoints}
            </div>*/}
            <div style={rowStyle}>
                <DefeatedGuardian/>:{points.defeatedGuardianPoints}
            </div>
            <div style={rowStyle}>
                <AdventurerToken color={"black"} style={{width: "1.8vw"}}/>:{points.legendPoints}
            </div>
            <div style={rowStyle}>
                <BronzeRelic/>:{points.relicsPoints}
            </div>
            {points.itemPoints + points.artifactPoints + points.defeatedGuardianPoints + points.legendPoints + points.relicsPoints}
        </div>
    )
}