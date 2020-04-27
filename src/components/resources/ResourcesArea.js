import React, {useContext, useState} from "react";
import {PlayerStateContext} from "../../Contexts";
import {AdventurerToken, Coin, Explore, Jeep, Jewel, Blimp, Shiny, Ship, Text, Walk, Weapon} from "../Symbols";
import {GLOBAL_VARS} from "../functions/initialStateFunctions";
import {IncomeTile} from "../legends/tiles/IncomeTile";
import {INCOME_SIZE} from "../../data/idLists";
import {PlayerTabs} from "../scoring/ScoringPanel";

export default function ResourcesArea(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const playerStates = playerStateContext.playerStates;
    const ownPlayerState = playerStateContext.playerState;
    const [showPlayerIndex, setShowPlayerIndex] = useState(0);
    const showPlayerState = playerStates[showPlayerIndex];


    function handleClickOnPlayerTab(index) {
        setShowPlayerIndex(index);
    }

    const containerStyle = {
        position: "absolute",
        marginLeft: "47vw",
        marginTop: "24vw",
        fontSize: "1.3vw",
        zIndex: 1,
        top: 0,
        height: "13.5vw",
        width: "27.5vw",
    };

    const tabWidth = (13.7 / GLOBAL_VARS.numOfPlayers) + "vw";
    const tabHeight = "1.5vw";

    const showOwnContainerStyle = {
        marginTop: tabHeight,
    }

    const showOtherContainerStyle = {
        position: "absolute",
        marginLeft: "50%",
        top: 0
    }

    return (
        <div style={containerStyle}>
            <div style={showOwnContainerStyle}>
                <Resources playerState={ownPlayerState}/>
            </div>
            <div style={showOtherContainerStyle}>
                <PlayerTabs width={tabWidth} height={tabHeight} handleClickOnTab={handleClickOnPlayerTab}/>
                <Resources playerState={showPlayerState}/>
            </div>
        </div>
    )
}

const Resources = (props) => {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = props.playerState;
    const playerIndex = props.playerState.playerIndex;
    const resources = playerState.resources;

    const containerStyle = {
        display: "flex",
        width: "12vw",
        height: "12.5vw",
        flexFlow: "column",
        flexWrap: "wrap",
        marginLeft: "1.5vw",
    }

    const secondColumnFieldStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: "7vw",
        fontSize: "2.9vw"
    }

    const availableAdventurers = [];
    for (let i = 0; i < playerStateContext.playerState.availableAdventurers; i++) {
        availableAdventurers.push(<AdventurerToken key={i}
                                                   color={GLOBAL_VARS.playerColors[playerIndex]}
                                                   style={{width: "2vw"}}/>)
    }

    let walkIcons = [];
    for (let i = 0; i < resources.walk; i++) {
        walkIcons.push(<Walk/>)
    }
    let jeepIcons = [];
    for (let i = 0; i < resources.jeep; i++) {
        jeepIcons.push(<Jeep/>)
    }
    let shipIcons = [];
    for (let i = 0; i < resources.ship; i++) {
        shipIcons.push(<Ship/>)
    }
    let blimpIcons = [];
    for (let i = 0; i < resources.plane; i++) {
        blimpIcons.push(<Blimp/>)
    }


    return (
        <div style={containerStyle}>
            <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.COINS)}>
                <Coin/>
                {resources.coins}
            </div>
            <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.EXPLORE)}>
                <Explore/>
                {resources.explore}
            </div>
            <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.SHINIES)}>
                <Shiny/>
                {resources.shinies}
            </div>
            <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.TEXTS)}>
                <Text/>
                {resources.texts}
            </div>
            <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.WEAPONS)}>
                <Weapon/>
                {resources.weapons}
            </div>
            <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.JEWELS)}>
                <Jewel/>
                {resources.jewels}
            </div>
            <div style={secondColumnFieldStyle}>
                {availableAdventurers}
            </div>
            <div style={secondColumnFieldStyle}>
                {walkIcons.map(icon =>
                    icon
                )}
            </div>
            <div style={secondColumnFieldStyle}>
                {jeepIcons.map(icon =>
                    icon
                )}
            </div>
            <div style={secondColumnFieldStyle}>
                {shipIcons.map(icon =>
                    icon
                )}
            </div>
            <div style={secondColumnFieldStyle}>
                {blimpIcons.map(icon =>
                    icon
                )}
            </div>
            <div>
                {playerState.incomes.map(income =>
                    <IncomeTile income={income} size={INCOME_SIZE.large}/>
                )}
            </div>
        </div>
    )
}

export const RESOURCES = Object.freeze({
    COINS: "coins",
    EXPLORE: "explore",
    TEXTS: "texts",
    WEAPONS: "weapons",
    JEWELS: "jewels",
    SHINIES: "shinies",
});