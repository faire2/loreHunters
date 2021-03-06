import React, {useContext, useState} from "react";
import {EFFECT} from "../../data/effects";
import {JsxFromEffects} from "../JsxFromEffects";
import {HexButton} from "../buttons/HexButton";
import {PlayerStateContext} from "../../Contexts";
import {processEffects} from "../functions/processEffects";
import {cloneDeep} from "lodash";
import {BUTTON_STATE, RELIC} from "../functions/enums";
import Button from "react-bootstrap/Button";
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

    const containerStyle = {
        width: "100%",
        height: "100%",
        backgroundSize: "100% 100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        backgroundImage: `url(${lostCity}`,
    };

    const rowsWrapperStyle = {
        display: "flex",
        flexFlow: "column",
        alignItems: "flex-start"
    };

    const rowStyle = {
        display: "flex",
        flexFlow: "row",
        alignItems: "flex-end",
    };

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
                params = RELIC.silver;
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
        <div style={containerStyle}>
            <Button onClick={() => modifyPlayerStateOnExit()} variant={"primary"} size={"sm"}>
                Gain rewards
            </Button>
            <div style={rowsWrapperStyle}>
                <div style={rowStyle}>
                    {tPlayerState.canActivateLostCity &&
                    <HexButton state={buttonsStates[0]} onClickFunction={handleButtonOnClick} index={0}/>}
                    <JsxFromEffects effectsArray={prices[0]} fontSize={effectsSize}/>
                </div>
                <div style={rowStyle}>
                    {tPlayerState.canActivateLostCity &&
                    <HexButton state={buttonsStates[1]} onClickFunction={handleButtonOnClick} index={1}/>}
                    <JsxFromEffects effectsArray={prices[1]} fontSize={effectsSize}/>
                </div>
                <div style={rowStyle}>
                    {tPlayerState.canActivateLostCity &&
                    <HexButton state={buttonsStates[2]} onClickFunction={handleButtonOnClick} index={2}/>}
                    <JsxFromEffects effectsArray={prices[2]} fontSize={effectsSize}/>
                </div>
            </div>
        </div>
    )
}