import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";
import {GUARDIANS} from "../../data/cards";


export default function ExplorationDialogueModal() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showModal;
    const location = boardStateContext.modalData.location;
    const guardian = boardStateContext.modalData.guardian;


    return (
        <Modal show={showModal} onHide={/* todo RESET STATE TO ORIGINAL*/null}>
            <Modal.Header>
                <Modal.Title>Choose reward for exploring location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {location !== null ?
                    <div
                        onClick={() => boardStateContext.handleLocationExploredReward(location.effects)}>{location.effectsImage}
                    </div> : ""}
                {guardian !== null ?
                    <div
                        onClick={() => boardStateContext.handleLocationExploredReward(GUARDIANS[guardian.id].discoveryEffect)}>
                        {GUARDIANS[guardian.id].discoveryText}
                    </div> : ""}
            </Modal.Body>
        </Modal>
    );
}