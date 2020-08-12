import React from "react";
import styled from "styled-components"
import {getJsxSymbol} from "./functions/getJsxSymbol";

export const JsxFromEffects = (props) => {
    return (
        <EffectsWrapper fontSize={props.fontSize}>
            {props.effectsArray.map((effect, i) =>
                <Effect i={i} key={i}>
                    {getJsxSymbol(effect)}
                </Effect>
            )}
        </EffectsWrapper>
    )
};

const EffectsWrapper = styled.div`
    font-size: ${props => props.fontSize};
    display: flex;
    flex-flow: row;
    align-items: center;
`;

const Effect = styled.div`
    margin-left: ${props => props.i > 0 ? (props.i * - 0.1) - 0.7 + "vw" : 0};
`;
