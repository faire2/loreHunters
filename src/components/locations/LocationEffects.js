import React from "react";
import styled from "styled-components"
import {getJsxSymbol} from "../functions/getJsxSymbol";

export const LocationEffects = (props) => {
/* effects text for explored location */
   return (
    <Effects>
        {props.effects.map((effect, i) =>
            <div key={i}>
                {getJsxSymbol(effect)}
            </div>
        )}
    </Effects>
)};

const Effects = styled.div`
    position: absolute;
    width: 100%;
    font-size: 1.2vw;
    display: flex;
    flex-flow: row;
    justify-content: center;
    bottom: 0;
    margin-bottom: 0.3vw;
`;
