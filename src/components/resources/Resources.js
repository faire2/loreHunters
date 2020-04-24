import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {AdventurerToken, Coin, Explore, Jeep, Jewel, Blimp, Shiny, Ship, Text, Walk, Weapon} from "../Symbols";
import {GLOBAL_VARS} from "../functions/initialStateFunctions";
import {IncomeTile} from "../legends/tiles/IncomeTile";
import {INCOME_SIZE} from "../../data/idLists";

export default function Resources(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;
    const resources = playerState.resources;

    const availableAdventurers = [];
    for (let i = 0; i < playerStateContext.playerState.availableAdventurers; i++) {
        availableAdventurers.push(<AdventurerToken key={i}
                                                   color={GLOBAL_VARS.playerColors[playerStateContext.playerState.playerIndex]}
                                                   style={{width: "2vw"}}/>)
    }

    const containerStyle = {
        position: "absolute",
        marginLeft: "50vw",
        marginTop: "23vw",
        fontSize: "2vw",
        zIndex: 1,
        top: 0,
    };

    const secondColumnFieldStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: "7vw",
        fontSize: "2.9vw"
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
            <div className="d-flex flex-row">
                <div style={{marginRight: "2vw"}}>
                    <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.COINS)}>
                        <Coin/>
                        {resources.coins}
                    </div>
                    <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.EXPLORE)}>
                        <Explore/>
                        {resources.explore}
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
                    <div onClick={() => playerStateContext.handleClickOnResource(RESOURCES.SHINIES)}>
                        <Shiny/>
                        {resources.shinies}
                    </div>
                </div>
                <div style={{marginTop: "-0.7vw"}}>
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
                </div>
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