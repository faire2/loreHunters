import React from "react";
import styled from "styled-components";
import {OverlappingJsxFromEffects} from "../JsxFromEffects";

export const ExplorationCost = (props) => {
    return (
        <ExploreCostContainer>
            <OverlappingJsxFromEffects fontSize="1.3vw" effectsArray={props.exploreCost}/>
        </ExploreCostContainer>
    )
};

const ExploreCostContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 2.2vw;
    display: flex;
    flex-flow: row;
    justify-content: center;
`;
