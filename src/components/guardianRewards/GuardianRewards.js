import React, {useContext} from "react";
import styled from "styled-components"
import {PlayerStateContext} from "../../Contexts";
import {JsxFromEffects} from "../JsxFromEffects";
import {cloneDeep} from "lodash";
import {processEffects} from "../functions/processEffects";

export const GuardianRewards = () => {
    const playerStateContext = useContext(PlayerStateContext);
    let tPlayerState = cloneDeep(playerStateContext.playerState);
    const rewards = tPlayerState.guardianRewards;

    function handleClickOnRewards(reward, rewardIndex) {
        const effectsResult = processEffects(null, null, tPlayerState, reward, null,
            null, null);
        if (effectsResult.processedAllEffects) {
            tPlayerState = effectsResult.tPlayerState;
            tPlayerState.guardianRewards.splice(rewardIndex, 1);
            playerStateContext.setPlayerState(effectsResult.tPlayerState);
        } // toast fallback should be defined here
    }

    return (
        <RewardsContainer>
            <SideText>
                REWARDS
            </SideText>
            {rewards.map((reward, i) =>
                <Reward onClick={() => handleClickOnRewards(reward, i)} key={i}>
                    <JsxFromEffects effectsArray={reward} fontSize={"2vw"}/>
                </Reward>
            )}
        </RewardsContainer>
    )
};

const RewardsContainer = styled.div`
    position: absolute;
    left: 76vw;
    top: 32vw;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    height: 8vw;
`;

const Reward = styled.div`
    height: 3.5vw;
    padding: 0 0.5vw 0.3vw 1vw;
    margin-bottom: 0.5vw;
    background-color: rgba(0,0,0,0.12);
    border-radius: 1.5vw;
    cursor: pointer;
`;

const SideText = styled.div`
    position: absolute;
    writing-mode: vertical-rl;
    margin: 0 0 0 -1.3vw;
    height: 100%;
`;