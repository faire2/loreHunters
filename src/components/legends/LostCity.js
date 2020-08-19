import React, {useContext, useState} from "react";
import styled from "styled-components";
import {EFFECT} from "../../data/effects";
import {JsxFromEffects} from "../JsxFromEffects";
import {HexButton} from "../buttons/HexButton";
import {PlayerStateContext} from "../../Contexts";
import {processEffects} from "../functions/processEffects";
import {cloneDeep} from "lodash";
import {BUTTON_STATE, RELIC} from "../functions/enums";
import {BronzeRelic, GoldRelic, SilverRelic} from "../Symbols";
import lostCity from "../../img/legends/lostCity.png";

export function LostCity() {
    const playerStateContext = useContext(PlayerStateContext);
    const originaPlayerState = playerStateContext.playerState;
    const [chosenEffects, setChosenEffects] = useState([false, false, false]);

    const prices = [
        [EFFECT.loseCoin, EFFECT.loseText, EFFECT.loseText],
        [EFFECT.loseExplore, EFFECT.loseWeapon],
        [EFFECT.loseJewel]
    ];

    const buttonsStates = [null, null, null];
    let activeRewards = 0;
    for (let effect of chosenEffects) {
        if (effect) {
            activeRewards += 1;
        }
    }
    let rewardToDisplay = null;
    if (activeRewards === 1) {
        rewardToDisplay = <BronzeRelic/>
    } else if (activeRewards === 2 && chosenEffects[2]) {
        rewardToDisplay = <SilverRelic/>
    } else if (activeRewards === 2 && !chosenEffects[2]) {
        rewardToDisplay = <Rewards><BronzeRelic/><BronzeRelic/></Rewards>
    } else if (activeRewards === 3) {
        rewardToDisplay = <GoldRelic/>
    }

    let tPlayerState = cloneDeep(originaPlayerState);

    if (tPlayerState.canActivateLostCity) {
        console.log("Calculating prices for effects in the lost city.");
        // we modify playerState for effects that are currently chosen
        for (let i = 0; i < 3; i++) {
            if (chosenEffects[i]) {
                const priceResult = processEffects(null, null, tPlayerState, prices[i], null, null, null);
                if (priceResult.processedAllEffects) {
                    tPlayerState = priceResult.tPlayerState;
                } else {
                    console.log("Price could not be paid! Next result will probably not be valid.")
                }
                buttonsStates[i] = BUTTON_STATE.active;
            }
        }

        for (let i = 0; i < 3; i++) {
            if (!chosenEffects[i]) {
                const priceResult = processEffects(null, null, tPlayerState, prices[i], null, null, null);
                buttonsStates[i] = priceResult.processedAllEffects ? BUTTON_STATE.normal : BUTTON_STATE.inactive;
            }
        }
    }

    const effectsSize = "2vw";


    function handleButtonOnClick(i) {
        let tChosenEffects = cloneDeep(chosenEffects);
        if (chosenEffects[i]) {
            tChosenEffects[i] = false
        } else {
            const priceResult = processEffects(null, null, tPlayerState, prices[i], null, null, null);
            if (priceResult.processedAllEffects) {
                tChosenEffects[i] = true;
            }
        }
        setChosenEffects(tChosenEffects);
    }

    function modifyPlayerStateOnExit() {
        let rewardLevel = 0;
        for (let effect of chosenEffects) {
            if (effect) {
                rewardLevel += 1
            }
        }

        if (tPlayerState.activeEffects[0] === EFFECT.gainRewardLevel) {
            tPlayerState.activeEffects.splice(0, 1);
            if (rewardLevel < 3) {
                rewardLevel += 1;
            }
        }

        let relicRewards = [];
        let tStore = cloneDeep(playerStateContext.store);
        let params;
        switch (rewardLevel) {
            case 1:
                /*for (let i = 0; i < 2; i++) {
                    if (tStore.bronzeRelicEffects.length > 0) {
                        relicRewards.push(tStore.bronzeRelicEffects[0]);
                        tStore.bronzeRelicEffects.splice(0, 1);
                    }
                }*/
                params = RELIC.bronze;
                break;
            case 2:
                /*for (let i = 0; i < 2; i++) {
                    if (tStore.silverRelicEffects.length > 0) {
                        relicRewards.push(tStore.silverRelicEffects[0]);
                        tStore.silverRelicEffects.splice(0, 1);
                    }
                }*/
                // silver relic is only gained when jewel is paid (option 3)
                if (chosenEffects[2]) {
                    params = RELIC.silver;
                } else {
                    params = RELIC.bronzeDouble;
                }
                break;
            case 3:
                /*for (let i = 0; i < 2; i++) {
                    if (tStore.goldRelicEffects.length > 0) {
                        relicRewards.push(tStore.goldRelicEffects[0]);
                        tStore.goldRelicEffects.splice(0, 1);
                    }
                }*/
                params = RELIC.gold;
                break;
            case 0:
            default:
                console.warn("Unable to process level of reward: " + rewardLevel);
        }
        setChosenEffects([false, false, false]);
        playerStateContext.handleLostCity(tPlayerState, tStore, relicRewards, params);
    }

    return (
        <Container>

            <Wrapper>
                <Row>
                    {tPlayerState.canActivateLostCity &&
                    <HexButton state={buttonsStates[0]} onClickFunction={handleButtonOnClick} index={0}/>}
                    <JsxFromEffects effectsArray={prices[0]} fontSize={effectsSize}/>
                </Row>
                <Row>
                    {tPlayerState.canActivateLostCity &&
                    <HexButton state={buttonsStates[1]} onClickFunction={handleButtonOnClick} index={1}/>}
                    <JsxFromEffects effectsArray={prices[1]} fontSize={effectsSize}/>
                </Row>
                <Row>
                    {tPlayerState.canActivateLostCity &&
                    <HexButton state={buttonsStates[2]} onClickFunction={handleButtonOnClick} index={2}/>}
                    <JsxFromEffects effectsArray={prices[2]} fontSize={effectsSize}/>
                </Row>
                <RewardDisplay>
                    {rewardToDisplay}
                </RewardDisplay>
            </Wrapper>
            {activeRewards > 0 && <RewardButton onClick={() => modifyPlayerStateOnExit()} variant={"primary"} size={"sm"}>
                Gain rewards
            </RewardButton>}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    padding-left: 1.5vw;
    background-image: url("${lostCity}");
    background-size: 100% 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: flex-start
`;

const Row = styled.div`
    display: flex;
    flex-flow: row;
    align-items: flex-end;
`;

const RewardDisplay = styled.div`
    position: absolute;
    right: 1vw;
    top: 2vw;
`;

const Rewards = styled.div`
    display: flex;
    flex-flow: column;
`;

const RewardButton = styled.div`
    position: absolute;
    bottom: -2.4vw;
    font-size:1.6vw;
    background-color: rgba(255,255,255,0.61);
    border-radius: 0.2vw;
    cursor: pointer;
    transition: 1.3s;
    
    &:hover {
      background-color: rgba(255,255,255,0.91);
    }
`;
