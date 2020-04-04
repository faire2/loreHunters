import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {AdventurerToken, Coin, Explore, Jeep, Jewel, Plane, Shiny, Ship, Text, Walk, Weapon} from "../Symbols";
import {GLOBAL_VARS} from "../functions/initialStateFunctions";

export default function Resources(props) {
    const playerStateContext = useContext(PlayerStateContext);

    const availableAdventurers = [];
    for (let i = 0; i < playerStateContext.playerState.availableAdventurers; i++) {
        availableAdventurers.push(<AdventurerToken key={i} color={GLOBAL_VARS.playerColors[playerStateContext.playerState.playerIndex]}/>)
    }

    const style = {
      position: "relative",
        float: "right"

    };

    return (
        <div style={style}>
            <div>
                <div onClick={() => props.handleClickOnResource(RESOURCES.COINS)}>
                    <Coin/>
                    {playerStateContext.playerState.resources.coins}
                </div>
                <div onClick={() => props.handleClickOnResource(RESOURCES.EXPLORE)}>
                    <Explore/>
                    {playerStateContext.playerState.resources.explore}
                </div>
                <div onClick={() => props.handleClickOnResource(RESOURCES.TEXTS)}>
                    <Text/>
                    {playerStateContext.playerState.resources.texts}
                </div>
                <div onClick={() => props.handleClickOnResource(RESOURCES.WEAPONS)}>
                    <Weapon/>
                    {playerStateContext.playerState.resources.weapons}
                </div>
                <div onClick={() => props.handleClickOnResource(RESOURCES.JEWELS)}>
                    <Jewel/>
                    {playerStateContext.playerState.resources.jewels}
                </div>
                <div onClick={() => props.handleClickOnResource(RESOURCES.SHINIES)}>
                    <Shiny/>
                    {playerStateContext.playerState.resources.shinies}
                </div>
            </div><br/>
            <div>
                <div>
                    <Walk />
                    {playerStateContext.playerState.resources.walk}
                </div>
                <div>
                    <Jeep />
                    {playerStateContext.playerState.resources.jeep}
                </div>
                <div>
                    <Ship />
                    {playerStateContext.playerState.resources.ship}
                </div>
                <div>
                    <Plane />
                    {playerStateContext.playerState.resources.plane}
                </div>
                <div>
                    {availableAdventurers}
                </div>
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