import {ASSISTANT_TILE_SIZE, RELIC, REWARD_TYPE} from "../functions/enums";
import Card from "../cards/Card";
import {Assistant} from "../assistantsChoice/Assistant";
import {JsxFromEffects} from "../JsxFromEffects";
import {BronzeRelic, GoldRelic, SilverRelic} from "../Symbols";
import {RelicWithResource} from "../relics/RelicWithResource";
import React from "react";

export function getRewardElement(reward, rewardType, rewards) {
    let element;
    switch (rewardType) {
        case REWARD_TYPE.card:
        case REWARD_TYPE.chooseDestroyedCard:
        case REWARD_TYPE.drawCard:
        case REWARD_TYPE.drawStackDiscardCard:
        case REWARD_TYPE.stackCardToDrawDeck:
            element = <Card card={reward}/>;
            break;
        case REWARD_TYPE.exchangeAssistant:
        case REWARD_TYPE.gainAssistant:
        case REWARD_TYPE.gainAssistantFromLegend:
        case REWARD_TYPE.removeAssistant:
        case REWARD_TYPE.refreshAssistant:
        case REWARD_TYPE.upgradeAssistant:
            element = <Assistant assistant={reward} size={ASSISTANT_TILE_SIZE.large}/>;
            break;
        case REWARD_TYPE.effectsArr:
        case REWARD_TYPE.legendFieldEffects:
        case REWARD_TYPE.legendColumnEffects:
            element = <JsxFromEffects effectsArray={reward}/>;
            break;
        /*case REWARD_TYPE.location:
            element = <Location location={reward}/>;
            break;*/
        case REWARD_TYPE.upgradeRelic:
            if (reward === RELIC.bronze) {
                element = <BronzeRelic/>;
            } else if (reward === RELIC.silver) {
                element = <SilverRelic/>
            } else if (reward === RELIC.gold) {
                element = <GoldRelic/>
            } else {
                console.error("Unable to determine relic for element in getRewardElement: " + reward)
            }
            break;
        case REWARD_TYPE.relicWithEffects:
            const relicWidth = 4;
            const fontSize = 2.4;
            if (rewards[0].params === RELIC.bronze) {
                element = <RelicWithResource relicType={RELIC.bronze} effects={reward} width={relicWidth} fontSize={fontSize}/>
            } else if (rewards[0].params === RELIC.silver) {
                element = <RelicWithResource relicType={RELIC.silver} effects={reward} width={relicWidth} fontSize={fontSize}/>
            } else if (rewards[0].params === RELIC.gold) {
                element = <RelicWithResource relicType={RELIC.gold} effects={reward} width={relicWidth} fontSize={fontSize}/>
            } else {console.error("Unable to determine type of relic with resource in getRewardElement: " + reward)}
            break;
        case REWARD_TYPE.guardian:
            element = <div>{reward}</div>;
            break;
        case null:
            break;
        default:
            console.log("Element type could not be identified at getElement: ");
            console.log(rewardType);
    }
    return element;
}