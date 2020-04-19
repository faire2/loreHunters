import React, {useContext} from "react";
import Modal from "react-bootstrap/Modal";
import {BoardStateContext} from "../../Contexts";
import Card from "../cards/Card";
import {CARD_TYPE} from "../../data/idLists";
import {IncomeTile} from "./tiles/IncomeTile";


export default function ChooseLegendRewardModal() {
    const boardStateContext = useContext(BoardStateContext);

    const showModal = boardStateContext.showChooseExpeditionModal;
    const data = boardStateContext.chooseExpeditionModalData;

    // modal is used for legends rewards in form of either expeditions cards or income tiles
    let isGoalCard = true;
    if (data.length > 0) {
        isGoalCard = data[0].type === CARD_TYPE.expedition
    }

    const fontSizeStyle = {
        fontSize: "6vw"
    }

    return (
        <Modal show={showModal} onHide={/* todo RESET STATE TO ORIGINAL*/null}>
            <Modal.Header>
                <Modal.Title>Choose legend reward</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    {data.map((element, i) =>
                        <div style={fontSizeStyle} onClick={() => boardStateContext.handleExpeditionReward(element, isGoalCard)}>
                            {isGoalCard ? <Card card={element} index={i}/> : <IncomeTile income={element}/>}
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}