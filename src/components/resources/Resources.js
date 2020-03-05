import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {Coin, Explore, Jewel, Shiny, Text, Weapon} from "../Symbols";

export default function Resources(props) {
    const playerStateContext = useContext(PlayerStateContext);

    return (
        <div className="text-center">
            <div className="d-inline-flex flex-row">
                <div>
                    <Coin/>
                    {playerStateContext.playerState.resources.coins}
                </div>
                <div>
                    <Explore/>
                    {playerStateContext.playerState.resources.explore}
                </div>
                <div>
                    <Text/>
                    {playerStateContext.playerState.resources.texts}
                </div>
                <div>
                    <Weapon/>
                    {playerStateContext.playerState.resources.weapons}
                </div>
                <div>
                    <Jewel/>
                    {playerStateContext.playerState.resources.jewels}
                </div>
                <div>
                    <Shiny />
                    {playerStateContext.playerState.resources.shiny}
                </div>
            </div>
        </div>
    )
}