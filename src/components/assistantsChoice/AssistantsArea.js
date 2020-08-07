import React, {useContext} from "react";
import styled from "styled-components"
import {BoardStateContext} from "../../Contexts";
import {Assistant} from "./Assistant";
import {ASSISTANT_TILE_SIZE} from "../functions/enums";

export const AssistantsArea = () => {
    const boardStateContext = useContext(BoardStateContext);
    const assistantsOffer = boardStateContext.store.assistantsOffer;
    return (
        <Assistants>
            {assistantsOffer[0] && <Assistant size={ASSISTANT_TILE_SIZE.small} assistant={assistantsOffer[0]}/>}
            {assistantsOffer[1] && <Assistant size={ASSISTANT_TILE_SIZE.small} assistant={assistantsOffer[1]}/>}
        </Assistants>
    )
};

const Assistants = styled.div`
    position: absolute;
    left: 0.4vw;
    top: 19vw;
    width: 4vw;
    height: 9vw;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
`;
