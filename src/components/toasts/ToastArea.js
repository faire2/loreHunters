import React, {useContext} from "react";
import styled from "styled-components/dist/styled-components.js"
import {BoardStateContext} from "../../Contexts";
import {Toast} from "react-bootstrap";

export function ToastArea() {
    const boardStateContext = useContext(BoardStateContext);
    const toastMessages = boardStateContext.toastMessages;

    function removeToast(index) {
        let tMessages = [...toastMessages];
        tMessages.push(toastMessages[index]); //todo remove
        tMessages.splice(index, 1);
        boardStateContext.setToastMessages(tMessages);
    }

    return (
        <ToastTransition>
            {toastMessages.map((message, i) =>
                <ToastTransition>
                <Toast key={i} onClose={() => removeToast(i)} delay={3000} autohide>
                    <Toast.Header>
                        {/*<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />*/}
                        <strong className="mr-auto">Bootstrap</strong>
                        {/*<small>just now</small>*/}
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
                </ToastTransition>
            )}
        </ToastTransition>
    )
}

const ToastTransition = styled.div`
  transition: 2s;
`;
