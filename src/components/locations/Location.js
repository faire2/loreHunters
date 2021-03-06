import React, {useContext} from "react";
import styled from "styled-components";
import emptyBgr from "../../img/locations/bgr-empty.png"
import brownBgr from "../../img/locations/brownEmpty.png"
import greenBgr from "../../img/locations/greenEmpty.png"
import basicBgr from "../../img/locations/bgr-basic-empty.png"
import {BoardStateContext} from "../../Contexts";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE, RELIC} from "../functions/enums";
import {getExplorationCost} from "./functions/locationFunctions";
import {ExplorationCost} from "./ExplorationCost";
import {LocationEffects} from "./LocationEffects";
import {LocationAdventurers} from "./LocationAdventurers";
import {LocationGuardian} from "./LocationGuardian";
import {RelicWithResource} from "../relics/RelicWithResource";
import {EFFECT} from "../../data/effects";
import {LocationTravelCost} from "./LocationTravelCost";

export default function Location(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;

    let locationBackground = null;
    let travelCost = [];

    // location background
    if (location.state === LOCATION_STATE.unexplored) {
        locationBackground = emptyBgr;
    } else if (location.type === LOCATION_TYPE.brown) {
        locationBackground = brownBgr;
        if (location.level === LOCATION_LEVEL["2"]) {
            travelCost = [EFFECT.loseJeep];
        } else {
            travelCost = [EFFECT.loseJeep, EFFECT.loseJeep];
        }
    } else if (location.type === LOCATION_TYPE.green) {
        locationBackground = greenBgr;
        if (location.level === LOCATION_LEVEL["2"]) {
            travelCost = [EFFECT.loseShip];
        } else {
            travelCost = [EFFECT.loseShip, EFFECT.loseShip];
        }
    } else if (location.type === LOCATION_TYPE.basic) {
        locationBackground = basicBgr;
        travelCost = [location.slots];
    } else {
        console.log("Unable to process location level or type in Location.js: " + location.id + " / " + location.type + " / " + location.level)
    }

    /* explore costs for unexplored location */
    const exploreCost = getExplorationCost(location.type, location.level, false, null);
    return (
        <LocationWrapper explored={location.state !== LOCATION_STATE.unexplored} exploredBgr={locationBackground}
             onClick={() => boardStateContext.handleClickOnLocation(location, false)}>
            {location.state === LOCATION_STATE.unexplored &&
                <RelicWrapper>
                    <RelicWithResource relicType={location.level === LOCATION_LEVEL["2"] ? RELIC.bronze : RELIC.silver}
                                       effects={location.relicEffects} fontSize={1.3}/>
                </RelicWrapper>
            }
            {location.guardian && location.state === LOCATION_STATE.guarded &&
                <div onClick={() => boardStateContext.handleClickOnLocation(location, true)}>
                    <LocationGuardian guardian={location.guardian}/>
                </div>
            }
            {(location.state === LOCATION_STATE.explored || location.state === LOCATION_STATE.guarded)
                && <LocationTravelCost travelCost={travelCost}/>}

            {location.state === LOCATION_STATE.unexplored ? <ExplorationCost exploreCost={exploreCost}/>
                : <LocationEffects effects={location.effects}/>}

            <LocationAdventurers adventurers={location.adventurers} locationType={location.type} guarded={location.guardian != null}/>
        </LocationWrapper>
    )
}

const LocationWrapper = styled.div`
    width: 6.3vw;
    height: 4.2vw;
    position: relative;
    text-align: center;
    margin-right: 0.5vw;
    background-image: url(${props => props.exploredBgr});
    background-size: contain;
`;

const RelicWrapper = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
`;
