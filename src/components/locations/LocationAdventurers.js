import React from "react";
import styled from "styled-components"
import {AdventurerToken} from "../Symbols";
import {GLOBAL_VARS} from "../../data/idLists";
import {LOCATION_TYPE} from "../functions/enums";

export const LocationAdventurers = (props) => {
    return (
    <div>
        {props.adventurers.map((playerId, i) =>
            <Adventurers key={i} displayOnTop={props.locationType === LOCATION_TYPE.basic || !props.guarded}>
                <AdventurerToken  color={GLOBAL_VARS.playerColors[playerId]}/>
            </Adventurers>
        )}
    </div>
)};

const Adventurers = styled.div`
    position: absolute;
    width: 100%;
    height: ${props => props.displayOnTop ? "2vw" : "1.5vw"};
    margin-top: ${props => props.displayOnTop ? "0.3vw" : "2.5vw"};
    display: flex;
    justify-content: center;    
`;