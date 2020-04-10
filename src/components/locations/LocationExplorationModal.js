import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";


export default function ChooseRewardModal() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showModal;
    const firstReward = boardStateContext.modalData.firstReward;
    const secondReward = boardStateContext.modalData.secondReward;

    const fontSizeStyle = {
        fontSize: "6vw"
    }

    return (
        <Modal show={showModal} onHide={/* todo RESET STATE TO ORIGINAL*/null}>
            <Modal.Header>
                <Modal.Title>Choose reward for exploring location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                {firstReward !== null ?
                    <div style={fontSizeStyle}
                        onClick={() => boardStateContext.handleLocationExploredReward(firstReward.effects)}>{firstReward.effectsText}
                    </div> : ""}
                {secondReward !== null ?
                    <div style={fontSizeStyle}
                        onClick={() => boardStateContext.handleLocationExploredReward(secondReward.effects)}>
                        {secondReward.effectsText}
                    </div> : ""}
                </div>
            </Modal.Body>
        </Modal>
    );
}