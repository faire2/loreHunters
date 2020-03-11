import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {Adventurer, Coin, Explore, Jeep, Jewel, Plane, Shiny, Ship, Text, Walk, Weapon} from "../Symbols";

export default function Resources(props) {
    const playerStateContext = useContext(PlayerStateContext);

    const availableAdventurers = [];
    for (let i = 0; i < playerStateContext.playerState.availableAdventurers; i++) {
        availableAdventurers.push(<Adventurer key={i}/>)
    }

    return (
        <div className="text-center">
            <div className="d-inline-flex flex-row resources">
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
                    {playerStateContext.playerState.resources.shiny}
                </div>
            </div><br/>
            <div className="d-inline-flex flex-row resources">
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
    SHINIES: "shinys",
});