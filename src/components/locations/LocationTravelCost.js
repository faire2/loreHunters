import React from "react";
import styled from "styled-components"
import {OverlappingJsxFromEffects} from "../JsxFromEffects";

export const LocationTravelCost = props =>
    <TravelCost>
        <OverlappingJsxFromEffects fontSize={"1vw"} effectsArray={props.travelCost}/>
    </TravelCost>

const TravelCost = styled.div`
  position: absolute;
  bottom: 0.2vw;
  left: 0;
`;
