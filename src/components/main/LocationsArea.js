import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import ExploredLocation from "../locations/ExploredLocation";
import UnexploredLocation from "../locations/UnexploredLocation";
import {LOCATION_STATE} from "../../data/idLists";
import {Locations} from "../../data/locations";

export default function LocationsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const locations = boardStateContext.locations;

    return (
        <div>
            <div className="d-flex flex-row position-relative mb-5">
                {locations !== null && Object.keys(locations).map((key, i) =>
                    <div key={"location" + i}>
                        {locations[key].state !== LOCATION_STATE.unexplored ?
                            <ExploredLocation location={Locations[key]} level={locations[key].level} state={locations[key].state} /> :
                            <UnexploredLocation location={Locations[key]} level={locations[key].level} state={locations[key].state}/>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}