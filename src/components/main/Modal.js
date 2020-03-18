import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";


export default function ModalDialogue() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showModal;
    const location = boardStateContext.modalData.location;
    const guardian = boardStateContext.modalData.guardian;


    return (
        <Modal show={showModal} onHide={/* todo RESET STATE TO ORIGINAL*/null}>
            <Modal.Header closeButton>
                <Modal.Title>Choose reward for exploring location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {location !== null ?
                    <div
                        onClick={() => boardStateContext.handleLocationExploredReward(location.effects)}>{location.effectsText}
                    </div> : ""}
                {guardian !== null ?
                    <div
                        onClick={() => boardStateContext.handleLocationExploredReward(guardian.discoveryEffect)}>{guardian.discoveryText}
                    </div> : ""}
            </Modal.Body>
        </Modal>
    );
}