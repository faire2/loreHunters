import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";
import {CARD_TYPE, INCOME_LEVEL, INCOME_STATE, REWARD_TYPE} from "../../data/idLists";
import Card from "../cards/Card";
import {cloneDeep} from "lodash";
import {IncomeTile} from "../legends/tiles/IncomeTile";
import {processEffects} from "../functions/processEffects";
import {handleIncomes} from "../../server/serverFunctions";


export default function ChooseRewardModal() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showModal;
    const rewards = boardStateContext.modalData;
    const rewardType = rewards.type;
    let tPlayerState = cloneDeep(boardStateContext.playerState);
    let tStore = cloneDeep(boardStateContext.store);

    const fontSizeStyle = {
        fontSize: "6vw",
        display: "flex",
        flexFlow: "row",
    };

    function getElement(reward) {
        let element = null;
        switch (rewardType) {
            case (REWARD_TYPE.card):
                element = <Card card={reward}/>;
                break;
            case REWARD_TYPE.incomeToken:
                element = <IncomeTile income={reward}/>;
                break;
            case REWARD_TYPE.effectsArr:
                element = reward.effectsText;
                break;
            default:
                console.log("Element type could not be identified at getElement: ");
                console.log(rewardType);
        }
        return element;
    }

    function handleClickOnReward(reward, index) {
        let effects = [];
        switch (rewardType) {
            case REWARD_TYPE.card:
                if (reward.type === CARD_TYPE.goalCard) {
                    tPlayerState.victoryCards.push(reward);
                    tStore.expeditions.splice(index, 1);
                }
                break;
            case REWARD_TYPE.incomeToken:
                reward.state = INCOME_STATE.ready;
                tPlayerState.incomes.push(reward);
                if (reward.level === INCOME_LEVEL.silver) {
                    tStore.incomes1Offer.splice(index, 1, tStore.incomes1Deck[0]);
                    tStore.incomes1Deck.splice(0, 1);
                } else {
                    tStore.incomes2Offer.splice(index, 1, tStore.incomes1Deck[0]);
                    tStore.incomes2Deck.splice(0, 1);
                }
                tPlayerState = handleIncomes(tPlayerState);
                break;
            case REWARD_TYPE.effectsArr:
                effects = rewardType === REWARD_TYPE.incomeToken ? reward.effects : reward.effects;
                debugger
                const effectsResult = processEffects(null, null, tPlayerState, effects, null, null, null, null);
                if (effectsResult.processedAllEffects) {
                tPlayerState = effectsResult.tPlayerState;
                } else {
                    console.log("Effects could not be processed in handleClickOnReward");
                    console.log(reward);
                }
                break;
            default:
                console.log("Element type could not be identified at getElement: ");
                console.log(rewardType);
        }
        boardStateContext.handleReward(tPlayerState, tStore);
    }

    return (
        <Modal show={showModal} onHide={/* todo RESET STATE TO ORIGINAL*/null}>
            <Modal.Header>
                <Modal.Title>Choose reward for exploring location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    {rewards.data.map((reward, i) =>
                        <div style={fontSizeStyle} onClick={() => handleClickOnReward(reward, i)} key={i}>
                            {getElement(reward)}
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}