import React from "react";
import styled from "styled-components";
import {JsxFromEffects} from "../JsxFromEffects";
import firstTokenBgr from "../../img/legends/token_first.png"
import secondTokenBgr from "../../img/legends/token_second.png"
import {VictoryPointsContainer} from "../VictoryPointsContainer";


export const ColunmRewards = (props) => {
    return (
        <ColumnRewardContainer>
            <Token isFirstToken={true}>
                <VictoryPointsWrapper>
                    <VictoryPointsContainer size={1} fontSize={0.8} points={props.firstTokenPoints}/>
                </VictoryPointsWrapper>
                <JsxFromEffects effectsArray={props.columnRewards[0]} fontSize={"1.3vw"}/>
            </Token>
            <Token isFirstToken={false}>
                <VictoryPointsWrapper>
                    <VictoryPointsContainer size={1} fontSize={0.8} points={props.secondTokenPoints}/>
                </VictoryPointsWrapper>
                <JsxFromEffects effectsArray={props.columnRewards[1]} fontSize={"1.3vw"}/>
            </Token>
        </ColumnRewardContainer>
    )
};

const VictoryPointsWrapper = styled.div`
    position: absolute;
    left: 0
`;

const ColumnRewardContainer = styled.div`
    height: 2vw;
    width: 5vw;
    align-items: center;
    justify-content: center;
    margin-top: -0.5vw;
    display: flex;
    flex-flow: row;
`;

const Token = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 2.5vw;
    height: 1.9vw;
    padding-left: 0.6vw;
    position: relative;
    background-image: url(${props => props.isFirstToken ? firstTokenBgr : secondTokenBgr });
`;