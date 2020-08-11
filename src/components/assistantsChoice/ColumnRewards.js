import React from "react";
import styled from "styled-components";
import {JsxFromEffects} from "../JsxFromEffects";
import {STYLE} from "../functions/enums";
import firstTokenBgr from "../../img/legends/token_first.png"
import secondTokenBgr from "../../img/legends/token_second.png"
import {VictoryPointsContainer} from "../VictoryPointsContainer";


export const ColunmRewards = (props) => {
    const containerStyle = {
        height: "2vw",
        width: "5vw",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "-0.5vw"
    }

    const tokenStyle = {
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "2.5vw",
        height: "1.9vw",
        paddingLeft: "0.7vw",
        position: "relative"
    }

    const firstTokenStyle = {
        backgroundImage: `url(${firstTokenBgr}`,
    };

    const secondTokenStyle = {
        backgroundImage: `url(${secondTokenBgr}`,
    }

    return (
        <div style={{...STYLE.row, ...containerStyle}}>
            <div style={{...tokenStyle, ...firstTokenStyle}}>
                <VictoryPointsWrapper>
                    <VictoryPointsContainer size={1} fontSize={0.8} points={props.firstTokenPoints}/>
                </VictoryPointsWrapper>
                <JsxFromEffects effectsArray={props.columnRewards[0]} fontSize={"1.3vw"}/>
            </div>
            <div style={{...tokenStyle, ...secondTokenStyle}}>
                <VictoryPointsWrapper>
                    <VictoryPointsContainer size={1} fontSize={0.8} points={props.secondTokenPoints}/>
                </VictoryPointsWrapper>
                <JsxFromEffects effectsArray={props.columnRewards[1]} fontSize={"1.3vw"}/>
            </div>
        </div>
    )
}

const VictoryPointsWrapper = styled.div`
    position: absolute;
    left: 0
`
