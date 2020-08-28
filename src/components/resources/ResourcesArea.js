import React, {useContext, useState} from "react";
import styled from "styled-components";
import relicBgr from "../../img/relics/Relic.png"
import {PlayerStateContext} from "../../Contexts";
import {AdventurerToken, Blimp, Coin, Explore, Jeep, Jewel, Ship, Text, Walk, Weapon} from "../Symbols";
import {Assistant} from "../assistantsChoice/Assistant";
import {PlayerTabs} from "../scoring/ScoringPanel";
import {ASSISTANT_TILE_SIZE} from "../functions/enums";
import {GLOBAL_VARS} from "../../data/idLists";
import {emptyPlayerState} from "../functions/initialStates/initialPlayerStates";
import {DivColumn} from "../functions/styles";
import {JsxFromEffects} from "../JsxFromEffects.js";

export default function ResourcesArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerStates = playerStateContext.playerStates;
    const ownPlayerState = playerStateContext.playerState;
    const [showPlayerIndex, setShowPlayerIndex] = useState(0);
    const showPlayerState = playerStates ? playerStates[showPlayerIndex] : emptyPlayerState;
    const automatonLevel = playerStateContext.automatonLevel;

    function handleClickOnPlayerTab(index) {
        setShowPlayerIndex(index);
    }

    const containerStyle = {
        position: "absolute",
        marginLeft: "46vw",
        top: "22.5vw",
        fontSize: "1.3vw",
        zIndex: 1,
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

    const opponentResources = !automatonLevel > 0 ?
        <div>
            <PlayerTabs width={tabWidth} height={tabHeight} handleClickOnTab={handleClickOnPlayerTab}
                        numOfPlayers={playerStateContext.numOfPlayers}/>
            <Resources playerState={showPlayerState}/>
        </div>
        : <div>
            <div>AUTOMATON</div>
            <RelicRowWrapper>
                {playerStateContext.automatonState.relicEffects.map((effect, i) =>
                    <RelicWrapper bgr={relicBgr} key={i}>
                        <JsxFromEffects fontSize={"2vw"} effectsArray={[effect]} key={i}/>
                    </RelicWrapper>
                )}
            </RelicRowWrapper>
        </div>

    return (
        <div style={containerStyle}>
            <div style={showOwnContainerStyle}>
                <Resources playerState={ownPlayerState}/>
            </div>
            <div style={showOtherContainerStyle}>
                {opponentResources}
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
    /*let bronzeRelicIcons = [];
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
    }*/


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
            {/*<div style={secondColumnFieldStyle}>
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
            </div>*/}
            <div style={secondColumnFieldStyle}>
                {availableAdventurers}
            </div>
            <div style={secondColumnFieldStyle}>
                <DivColumn>
                    {playerState.assistants.map(income =>
                        <Assistant assistant={income} size={ASSISTANT_TILE_SIZE.small}/>
                    )}
                </DivColumn>
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

const RelicRowWrapper = styled.div`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
`

const RelicWrapper = styled.div`
    width: 2.4vw;
    height: 3vw;
    background-image: url("${props => props.bgr}");
    background-size: cover;
    margin: 0.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
`