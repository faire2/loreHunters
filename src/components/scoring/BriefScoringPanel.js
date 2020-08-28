import {AdventurerToken, Artifact, BronzeRelic, DefeatedGuardian, Fear, Item} from "../Symbols.js";
import React, {useContext} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {getPoints} from "./scoringFunctions.mjs";
import {PlayerStateContext} from "../../Contexts.js";

export const BriefScoringPanel = () => {
    const playerStateContext = useContext(PlayerStateContext);
    const playerState = playerStateContext.playerState;
    const history = useHistory();
    const points = getPoints(playerState);
    const totalPoints = points.itemPoints + points.artifactPoints + points.defeatedGuardianPoints + points.legendPoints
        + points.relicsPoints + points.fearPoints;

    return (
    <div>
        <PointsRow>
            <Item/>:{points.itemPoints}
        </PointsRow>
        <PointsRow>
            <Artifact/>:{points.artifactPoints}
        </PointsRow>
        {/*<div style={rowStyle}>
                <Guardian/>:{points.undefeatedGuardianPoints}
            </div>*/}
        <PointsRow>
            <Fear/>:{points.fearPoints}
        </PointsRow>
        <PointsRow>
            <DefeatedGuardian/>:{points.defeatedGuardianPoints}
        </PointsRow>
        <PointsRow>
            <AdventurerToken color={"black"} style={{width: "1.8vw"}}/>:{!isNaN(points.legendPoints) ? points.legendPoints : 0}
        </PointsRow>
        <PointsRow>
            <BronzeRelic/>:{points.relicsPoints}
        </PointsRow>
        {!isNaN(totalPoints) ? totalPoints : 0}
        <button className="btn-primary" style={{fontSize:"1vw"}}
                onClick={()  => history.push({
                    pathname: "/scoring",
                    data: {playerStates: playerStateContext.playerStates}
                })}>scoring
        </button>
    </div>
    )
}

const PointsRow = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center
`;