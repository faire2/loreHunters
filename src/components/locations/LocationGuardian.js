import React from "react";
import styled from "styled-components"
import {getJsxSymbol} from "../functions/getJsxSymbol";
import GuardianTemplate from "../../img/gardianImages/guardianplaceholder.png"
import {JsxFromEffects} from "../JsxFromEffects";

export const LocationGuardian = (props) => {
    const guardian = props.guardian;
    const guardianId = guardian.id;

    return (
        <div>
            <GuardianContainer>
                <img src={GuardianTemplate} alt={{guardianId}} style={{width: "100%"}}/>
            </GuardianContainer>
            <DefeatCost>
                {guardian.defeatCost.map((effect, i) =>
                    <div key={i}>
                        {getJsxSymbol(effect)}
                    </div>
                )}
            </DefeatCost>
            <BoonEffects>
                <JsxFromEffects fontSize={"0.9vw"} effectsArray={guardian.effects}/>
            </BoonEffects>
        </div>
    )
};

const GuardianContainer = styled.div`
    position: absolute;;
    width: 100%;
    left: 0;
    top: 0;
    cursor: pointer;
`;

const DefeatCost = styled.div`
    position: absolute;
    top: 0.8vw;
    height: 0;
    display: flex;
    justify-content: center;
    font-size: 0.9vw;
    background-color: rgba(255,0,7,0.3);
    border-radius: 0.5vw;
    padding-bottom: 1.6vw;
`;

const BoonEffects = styled.div`
    position: absolute;
    top: 0.8vw;
    display: flex;
    flex-flow: row;
    background-color: rgba(0,255,27,0.3);
    padding: 0 0.3vw 0.3vw 0.3vw;
    border-radius: 0.5vw;
    right: 0;
`;
