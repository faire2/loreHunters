import React, {useContext} from "react";
import {Blimp, Coin, Draw1Card, Explore, Jewel, Shiny, Text, Weapon} from "../Symbols";
import bgr from "../../img/relics/relicsBackground.png"
import {PlayerStateContext} from "../../Contexts";
import {EFFECT} from "../../data/effects";

export function RelicsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;

    let relicsArr = [];
    for (let i = 0; i < playerState.resources.shinies; i++) {
        relicsArr.push(<Shiny/>)
    }

    const twoLines = relicsArr.length > 5;

    const containerStyle = {
        paddingLeft: "3.3vw",
        paddingTop: "0.5%",
        backgroundImage: `url(${bgr}`,
        backgroundSize: "100% 100%",
        position: "absolute",
        marginTop: "19.5vw",
        right: 0,
        marginRight: "9vw",
        width: "16vw",
        height: "18vw",
        display: "flex",
        flexWrap: "wrap",
    }

    const fieldStyle1Icon = {
        height: "1.9vw",
        width: "26%",
        marginRight: "4.5%",
        marginBottom: "9%",
        fontSize: "2.6vw",
        cursor: "pointer",
    }

    const fieldStyle2Icons = {
        height: "1.9vw",
        width: "26%",
        marginRight: "4.5%",
        marginBottom: "1%",
        fontSize: "1.8vw",
        cursor: "pointer",
    }

    const overLapStyle = {
        marginTop: "-1.3vw"
    }

    const relicsStyle = {
        fontSize: !twoLines ? "2.4vw" : "1.8vw",
        display: "flex",
        width: "80%",
        height: "20%",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: !twoLines ? "0.9vw" : "0.5vw"
    }

    const field1 = <div style={fieldStyle1Icon} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainJewel])}>
            <Jewel/>
        </div>

    const field2 = <div style={fieldStyle1Icon} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainJewel])}>
            <Jewel/>
        </div>

    const field3 = <div style={fieldStyle2Icons} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainCoin, EFFECT.gainWeapon])}>
            <Coin/>
            <div style={overLapStyle}>
                <Weapon/>
            </div>
        </div>

    const field4 = <div style={fieldStyle1Icon} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainWeapon])}>
            <Weapon/>
        </div>

    const field5 = <div style={fieldStyle2Icons} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainExplore, EFFECT.gainText])}>
        <Explore/> <div style={overLapStyle}><Text/></div>
    </div>

    const field6 = <div style={fieldStyle2Icons} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainCoin, EFFECT.gainText])}>
        <Coin/> <div style={overLapStyle}><Text/></div>
    </div>

    const field7 = <div style={fieldStyle1Icon} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainText])}>
        <Text/>
    </div>

    const field8 = <div style={fieldStyle1Icon} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.gainExplore])}>
        <Explore/>
    </div>

    const field9 = <div style={fieldStyle1Icon} onClick={() => playerStateContext.handleClickOnRelic([EFFECT.draw1])}>
        <Draw1Card/>
    </div>

    return (
        <div style={containerStyle}>
            {field1}{field2}{field3}
            {field4}{field5}{field6}
            {field7}{field8}{field9}
            <div style={relicsStyle}>
                {relicsArr.map(icon =>
                    icon
                )}
            </div>
        </div>
    )
}