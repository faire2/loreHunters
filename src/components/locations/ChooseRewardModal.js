import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";


export default function ChooseRewardModal() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showModal;
    const rewards = boardStateContext.modalData;
    const fontSizeStyle = {
        fontSize: "6vw"
    };

    return (
        <Modal show={showModal} onHide={/* todo RESET STATE TO ORIGINAL*/null}>
            <Modal.Header>
                <Modal.Title>Choose reward for exploring location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    {rewards !== null && rewards.map((reward, i) =>
                        <div style={fontSizeStyle} onClick={() => boardStateContext.handleLocationExploredReward(rewards[i].effects)}>
                            {rewards[i].effectsText}
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}