import React, {useContext} from "react";
import styled from "styled-components";
import {BronzeRelic, GoldRelic, SilverRelic} from "../Symbols";
import victoryPoints from "../../img/symbols/VP.png"
import {PlayerStateContext} from "../../Contexts";
import {RELIC} from "../functions/enums";
import {JsxFromEffects} from "../JsxFromEffects";
import {pointsForUnusedRelics, relicRewards} from "../functions/constants";

export function RelicsArea() {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;

    let relicsArr = [];
    for (let i = 0; i < playerState.resources.bronzeRelics; i++) {
        relicsArr.push(<BronzeRelic/>)
    }
    for (let i = 0; i < playerState.resources.silverRelics; i++) {
        relicsArr.push(<SilverRelic/>)
    }
    for (let i = 0; i < playerState.resources.goldRelics; i++) {
        relicsArr.push(<GoldRelic/>)
    }

    const relicSlots =
        pointsForUnusedRelics.map((points, i) => {
            return (
                    <RelicSlot key={i} free={playerState.relics[i]} onClick={() => playerStateContext.handleClickOnRelic(i)}>
                        {playerState.relics[i] ? getRelic(playerState.relics[i])
                        : pointsForUnusedRelics[i]}

                    </RelicSlot>
                )
            }
        );

    return (
        <RelicsContainer length={relicsArr.length}>
            <SideText>
                RELICS
            </SideText>
            <Wrapper>
                <RelicEffects>
                    {relicRewards.map((effects, i) =>
                        <JsxFromEffects effectsArray={effects} fontSize={"1.3vw"} key={i}/>
                    )}
                </RelicEffects>
                <RelicWrapper>
                    {relicSlots}
                </RelicWrapper>
                <UnspentRelics>
                    {relicsArr.map((icon, i) =>
                        <div key={i}>
                            {icon}
                        </div>
                    )}
                </UnspentRelics>
            </Wrapper>
        </RelicsContainer>
    )
}

function getRelic(relic) {
    if (relic === RELIC.bronze) {
        return <BronzeRelic/>
    } else if (relic === RELIC.silver) {
        return <SilverRelic/>
    } else if (relic === RELIC.gold) {
        return <GoldRelic/>
    }
}

const RelicsContainer = styled.div`
    position: absolute;
    top: 21vw;
    left: 75vw;
    width: 16vw;
    height: 10vw;
    padding: 1vw;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const SideText = styled.div`
    position: absolute;
    writing-mode: vertical-rl;
    margin: 3vw 0  0 -1.3vw;
`;

const RelicWrapper = styled.div`
    background-color: rgba(0,0,0,0.18);
    display: flex;
    flex-flow: row;
    width: 100%;
    justify-content: space-evenly;
    border-radius: 0.5vw;
    margin-bottom: 0.5vw;
    padding: 0.3vw;
`;

const RelicSlot = styled.div`
    display: flex;
    font-size: ${props => props.free ? "3vw" : "2vw"};
    height: 3.5vw;
    width: 3.2vw;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.2vw;
    color: rgb(255,255,255);
    background-image: url(${props => props.free ? "" : victoryPoints});
    background-size: contain;
`;

const UnspentRelics = styled.div`
    width: 90%;
    height: 5vw;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    font-size: 3vw;
    justify-content: center;
    line-height: 0;
    margin-left: 0.7vw;
`;

const RelicEffects = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    width: 100%;
`;