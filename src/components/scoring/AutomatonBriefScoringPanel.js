import React, {useContext} from "react";
import styled from "styled-components";
import {AdventurerToken, Artifact, BronzeRelic, DefeatedGuardian, Item, SilverRelic} from "../Symbols.js";
import {getAutomatonPoints} from "./scoringFunctions.mjs";
import {BoardStateContext} from "../../Contexts.js";

export const AutomatonBriefScore = () => {
    const boardStateContext = useContext(BoardStateContext);
    const automatonState = boardStateContext.automatonState;
    const points = getAutomatonPoints(automatonState);
    const totalPoints = points.itemPoints + points.artifactPoints + points.relicPoints + points.legendPoints
        + points.silverRelicPoints + points.defeatedGuardianPoints;

    return (
    <div>
        <PointsRow>
            <Item/>:{points.itemPoints}
        </PointsRow>
        <PointsRow>
            <Artifact/>:{points.artifactPoints}
        </PointsRow>
        <PointsRow>
            <BronzeRelic/>:{points.relicPoints}
        </PointsRow>
        <PointsRow>
            <AdventurerToken color={"black"} style={{width: "1.8vw"}}/>:{points.legendPoints}
        </PointsRow>
        <PointsRow>
            <SilverRelic/>:{points.silverRelicPoints}
        </PointsRow>
        <PointsRow>
            <DefeatedGuardian/>:{points.defeatedGuardianPoints}
        </PointsRow>

        {totalPoints}
    </div>
    )
}

const PointsRow = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center
`;