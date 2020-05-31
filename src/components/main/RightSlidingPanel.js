import React, {useContext, useState} from "react";
import {PlayerStateContext} from "../../Contexts";
import {CardRow} from "../cards/CardRow";
import {getPoints} from "../scoring/scoringFunctions";
import {AdventurerToken, Artifact, DefeatedGuardian, Guardian, Item, Shiny} from "../Symbols";
import Card from "../cards/Card";
import {PlayerTabs} from "../scoring/ScoringPanel";

export default function RightSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;
    const extendPanel = props.extendPanel;
    const points = getPoints(playerState);


    const slideStyle = {
        position: "fixed",
        bottom: 0,
        right: "0vw",
        width: !extendPanel ? "0vw" : "15vw",
        height: "100vh",
        zIndex: 10,
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
        backgroundColor: playerStateContext.playerState.color,
        fontSize: "3vw",
        paddingLeft: !extendPanel ? "0vw" : "2vw",
        display: "flex",
        flexFlow: "column",
    };

    const rowStyle = {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    };

    return (
        <div style={slideStyle}>
            POINTS
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
                <AdventurerToken color={"black"} style={{width: "3vw"}}/>:{points.legendPoints}
            </div>
            <div style={rowStyle}>
                <Shiny/>:{points.relicsPoints}
            </div>
            {points.itemPoints + points.artifactPoints + points.defeatedGuardianPoints + points.legendPoints + points.relicsPoints}
        </div>
    )
}