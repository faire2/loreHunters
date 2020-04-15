import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";


export default function ChooseExpeditionModal() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showChooseExpeditionModal;
    const data = boardStateContext.chooseExpeditionModalData;
    const fontSizeStyle = {
        fontSize: "6vw"
    }

    return (
        <Modal show={showModal} onHide={/* todo RESET STATE TO ORIGINAL*/null}>
            <Modal.Header>
                <Modal.Title>Choose expedition card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    {data !== null && data.map((idCard, i) =>
                        <div style={fontSizeStyle} onClick={() => boardStateContext.handleExpeditionReward(idCard)}>
                            <Card card={idCard} index={i}/>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}