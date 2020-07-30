import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import {
    BgeBrownEmpty,
    BgrBasicEmpty,
    BgrBrownUnexplored,
    BgrEmpty,
    BgrGreenEmpty,
    BgrGreenUnexplored,
    BgrLostCity,
} from "./functions/locationsImages";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATION_TYPE, RELIC} from "../functions/enums";
import {getExplorationCost} from "./functions/locationFunctions";
import {ExplorationCost} from "./ExplorationCost";
import {LocationEffects} from "./LocationEffects";
import {LocationAdventurers} from "./LocationAdventurers";
import {LocationGuardian} from "./LocationGuardian";
import {RelicWithResource} from "../relics/RelicWithResource";
import styled from "styled-components";

export default function Location(props) {
    const boardStateContext = useContext(BoardStateContext);
    const location = props.location;

    /* transport icons for explored location*/
    /*const transportIcons = [];
    for (let i = 0; i < location.useCost.amount; i++) {
        transportIcons.push(<span key={i}>{location.useCost.transportType}</span>)
    }*/
    let locationBackground = null;
    let locationUnexploredBackground = null;


    // location background
    if (location.type === LOCATION_TYPE.brown) {
        locationBackground = <BgeBrownEmpty/>;
        if (location.level === LOCATION_LEVEL["2"]) {
            locationUnexploredBackground = <BgrBrownUnexplored/>;
        } else if (location.level === LOCATION_LEVEL["3"]) {
            locationUnexploredBackground = <BgrBrownUnexplored/>;
        }
    } else if (location.type === LOCATION_TYPE.green) {
        locationBackground = <BgrGreenEmpty/>;
        if (location.level === LOCATION_LEVEL["2"]) {
            locationUnexploredBackground = <BgrGreenUnexplored/>;
        } else if (location.level === LOCATION_LEVEL["3"]) {
            locationUnexploredBackground = <BgrGreenUnexplored/>
        }
    } else if (location.type === LOCATION_TYPE.undetermined) {
        locationBackground = <BgrEmpty/>;
        locationUnexploredBackground = <BgrGreenUnexplored/>
    } else if (location.type === LOCATION_TYPE.basic) {
        locationBackground = <BgrBasicEmpty/>;
    } else if (location.type === LOCATION_TYPE.lostCity) {
        locationBackground = <BgrLostCity/>;
        locationUnexploredBackground = <BgrBrownUnexplored/>;
    } else if (location.type === LOCATION_TYPE.emptyBrownLocation || location.type === LOCATION_TYPE.emptyGreenLocation
        || location.type === LOCATION_TYPE.emptyLocation) {
        locationBackground = <BgrEmpty/>;
        locationUnexploredBackground = <BgrEmpty/>;
    } else {
        console.log("Unable to process location level or type in Location.js: " + location.id + " / " + location.type + " / " + location.level)
    }

    /*const levelSymbol = location.level === LOCATION_LEVEL["2"] ? <Level2Symbol/> : <Level3Symbol/>;
    const levelSymbolStyle = {
        position: "absolute",
        marginTop: "-0.1vw",
        fontSize: "0.6vw",
        width: "100%",
    };
    */

    /* explore costs for unexplored location */
    const exploreCost = getExplorationCost(location.type, location.level, false, null);
    return (
        <LocationWrapper
             onClick={() => boardStateContext.handleClickOnLocation(location, false)}>
            {location.state === LOCATION_STATE.unexplored &&
            <RelicWrapper>
                <RelicWithResource relicType={location.level === LOCATION_LEVEL["2"] ? RELIC.bronze : RELIC.silver}
                                   effects={location.relicEffects} fontSize={1.3}/>
            </RelicWrapper>
            }
            {/*{location.state === LOCATION_STATE.unexplored && <div style={levelSymbolStyle}>{levelSymbol}</div>}*/}
            {location.state === LOCATION_STATE.unexplored ? locationUnexploredBackground : locationBackground}
            {location.state === LOCATION_STATE.unexplored ? <ExplorationCost exploreCost={exploreCost}/>
                : <LocationEffects effects={location.effects}/>}

            {location.guardian && location.state === LOCATION_STATE.guarded &&
            <div onClick={() => boardStateContext.handleClickOnLocation(location, true)}>
                <LocationGuardian guardian={location.guardian}/>
            </div>
            }
            <LocationAdventurers adventurers={location.adventurers}/>
        </LocationWrapper>
    )
}

const RelicWrapper = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const LocationWrapper = styled.div`
    width: 7vw;
    height: 4.2vw;
    position: relative;
    text-align: center;
    margin-right: 0.5vw;
`;
