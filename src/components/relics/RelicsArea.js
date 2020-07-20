import React, {useContext} from "react";
import {Relic} from "../Symbols";
import bgr from "../../img/relics/relicsBackground.png"
import {PlayerStateContext} from "../../Contexts";
import vpBgr from "../../img/symbols/VP.png";
import {JsxFromEffects} from "../JsxFromEffects";

export function RelicsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;

    let relicsArr = [];
    for (let i = 0; i < playerState.resources.relics; i++) {
        relicsArr.push(<Relic/>)
    }

    const twoLines = relicsArr.length > 5;

    const containerStyle = {
        top: "3vw",
        paddingLeft: "3.3vw",
        paddingTop: "0.5%",
        backgroundImage: `url(${bgr}`,
        backgroundSize: "100% 100%",
        position: "absolute",
        marginTop: "18.5vw",
        marginLeft: "75vw",
        width: "16vw",
        height: "18vw",
        display: "flex",
        flexWrap: "wrap",
    };

    const fieldStyle1Icon = {
        height: "1.9vw",
        width: "26%",
        marginRight: "4.5%",
        marginBottom: "9%",
        fontSize: "2.6vw",
        cursor: "pointer",
    };

    const fieldStyle2Icons = {
        height: "1.9vw",
        width: "26%",
        marginRight: "4.5%",
        marginBottom: "1%",
        fontSize: "2.8vw",
        cursor: "pointer",
    };

    /*const overLapStyle = {
        marginTop: "-1.3vw"
    };*/

    const relicsStyle = {
        fontSize: !twoLines ? "2.4vw" : "1.8vw",
        display: "flex",
        width: "80%",
        height: "20%",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: !twoLines ? "0.9vw" : "0.5vw"
    };

    const victoryPointsStyle = {
        marginBottom: "110%",
        backgroundSize: "100% 100%",
        backgroundImage: `url(${vpBgr}`,
        width: "2vw",
        height: "2vw",
        color: "white",
        fontSize: "1.2vw"
    };

    const victoryPointsContainerStyle = {
        marginLeft: "-17%",
        marginTop: "7%",
        position: "absolute",
        height: "100%",
    };

    const effectsArr = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    const victoryPoints = [0, 1, 2, 4];
    const victoryPointsArr = victoryPoints.map((vp, i) =>
        <div style={victoryPointsStyle} key={i}>
            {vp}
        </div>
    );

    const fieldsArr =
        effectsArr.map((effect, i) => {
                const style = effect.length !== 2 ? fieldStyle1Icon : fieldStyle2Icons
                return (
                    <div style={style} key={i} onClick={() => playerStateContext.handleClickOnRelic(effectsArr[i], i)}>
                        {playerState.relics[i] ? <JsxFromEffects effectsArray={effect} fontSize={"2vw"}/> : <Relic/>}
                    </div>
                )
            }
        );

    return (
        <div style={containerStyle}>
            {fieldsArr}
            <div style={relicsStyle}>
                {relicsArr.map((icon, i) =>
                    <div key={i}>
                        {icon}
                    </div>
                )}
            </div>
            <div style={victoryPointsContainerStyle}>
                {victoryPointsArr}
            </div>
        </div>
    )
}