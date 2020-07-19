import React, {useContext, useState} from "react";
import {PlayerStateContext} from "../../Contexts";
import {
    AdventurerToken,
    Blimp,
    Coin,
    Explore,
    GoldRelic,
    Jeep,
    Jewel,
    Map,
    Relic,
    Ship,
    SilverRelic,
    Text,
    Walk,
    Weapon
} from "../Symbols";
import {IncomeTile} from "../legends/tiles/IncomeTile";
import {PlayerTabs} from "../scoring/ScoringPanel";
import {INCOME_SIZE} from "../functions/enums";
import {GLOBAL_VARS} from "../../data/idLists";
import {emptyPlayerState} from "../functions/initialStates/initialPlayerStates";

export default function ResourcesArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerStates = playerStateContext.playerStates;
    const ownPlayerState = playerStateContext.playerState;
    const [showPlayerIndex, setShowPlayerIndex] = useState(0);
    const showPlayerState = playerStates ? playerStates[showPlayerIndex] : emptyPlayerState;


    function handleClickOnPlayerTab(index) {
        setShowPlayerIndex(index);
    }

    const containerStyle = {
        position: "absolute",
        marginLeft: "46vw",
        marginTop: "21.5vw",
        fontSize: "1.3vw",
        zIndex: 1,
        top: 0,
        height: "13.5vw",
        width: "27.5vw",
    };

    const tabWidth = (13.7 / playerStateContext.numOfPlayers) + "vw";
    const tabHeight = "1.5vw";

    const showOwnContainerStyle = {
        marginTop: tabHeight,
    };

    const showOtherContainerStyle = {
        position: "absolute",
        marginLeft: "50%",
        top: 0
    };

    return (
        <div style={containerStyle}>
            <div style={showOwnContainerStyle}>
                <Resources playerState={ownPlayerState}/>
            </div>
            <div style={showOtherContainerStyle}>
                <PlayerTabs width={tabWidth} height={tabHeight} handleClickOnTab={handleClickOnPlayerTab}
                            numOfPlayers={playerStateContext.numOfPlayers}/>
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
    };

    const firstColumnFieldStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "3vw",
        fontSize: "1.5vw",
    };

    const secondColumnFieldStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: "7vw",
        fontSize: "2vw"
    };

    const availableAdventurers = [];
    for (let i = 0; i < playerStateContext.playerState.availableAdventurers; i++) {
        availableAdventurers.push(<AdventurerToken key={i}
                                                   color={GLOBAL_VARS.playerColors[playerIndex]}
                                                   style={{width: "1.8vw"}}/>)
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
    let bronzeRelicIcons = [];
    for (let i = 0; i < resources.bronzeRelics; i++) {
        bronzeRelicIcons.push(<Relic/>)
    }
    let silverRelicIcons = [];
    for (let i = 0; i < resources.silverRelics; i++) {
        silverRelicIcons.push(<SilverRelic/>)
    }
    let goldRelicIcons = [];
    for (let i = 0; i < resources.goldRelics; i++) {
        goldRelicIcons.push(<GoldRelic/>)
    }


    return (
        <div style={containerStyle}>
            <div style={firstColumnFieldStyle}>
                <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.coins)}>
                    <Coin/>
                    {resources.coins}
                </div>
                <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.explores)}>
                    <Explore/>
                    {resources.explore}
                </div>
                <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.texts)}>
                    <Text/>
                    {resources.texts}
                </div>
                <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.weapons)}>
                    <Weapon/>
                    {resources.weapons}
                </div>
                <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.jewels)}>
                    <Jewel/>
                    {resources.jewels}
                </div>
                <div>
                    <Map/>
                    {resources.maps}
                </div>
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
            <div style={secondColumnFieldStyle}>
                {bronzeRelicIcons.map(icon =>
                    icon
                )}
            </div>
            <div style={secondColumnFieldStyle}>
                {silverRelicIcons.map(icon =>
                    icon
                )}
            </div>
            <div style={secondColumnFieldStyle}>
                {goldRelicIcons.map(icon =>
                    icon
                )}
            </div>
            <div style={secondColumnFieldStyle}>
                {playerState.incomes.map(income =>
                    <IncomeTile income={income} size={INCOME_SIZE.large}/>
                )}
            </div>
        </div>
    )
};

export const RESOURCES = Object.freeze({
    coins: "coins",
    explores: "explore",
    texts: "texts",
    weapons: "weapons",
    jewels: "jewels",
    relics: "relics",
    walk: "walk",
    jeep: "jeep",
    ship: "ship",
    blimp: "blimp",
});