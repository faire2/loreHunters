import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import ExploredLocation from "../locations/ExploredLocation";
import {LOCATION_LEVEL, LOCATION_STATE} from "../../data/locations";
import UnexploredLocation from "../locations/UnexploredLocation";

export default function LocationsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const locationsLevel1 = boardStateContext.locations.filter(location => location.level === LOCATION_LEVEL["1"]);
    const locationsLevel2 = boardStateContext.locations.filter(location => location.level === LOCATION_LEVEL["2"]);
    const locationsLevel3 = boardStateContext.locations.filter(location => location.level === LOCATION_LEVEL["3"]);

    return (
        <div>
            <div className="d-flex flex-row position-relative">
                {locationsLevel1.map((location, i) =>
                    <div key={"level-1" + i}>
                        {location.state !== LOCATION_STATE.unexplored ?
                            <ExploredLocation location={location}/> :
                            <UnexploredLocation location={location}/>
                        }
                    </div>
                )}
            </div>
            <div className="d-flex flex-row position-relative">
                {locationsLevel2.map((location, i) =>
                    <div key={"level2-" + i}>
                        {location.state !== LOCATION_STATE.unexplored ?
                            <ExploredLocation location={location}/> :
                            <UnexploredLocation location={location}/>
                        }
                    </div>
                )}
            </div>
            <br/>
            <div className="d-flex flex-row position-relative">
                {locationsLevel3.map((location, i) =>
                    <div key={"level3-" + i}>
                        {location.state !== LOCATION_STATE.unexplored ?
                            <ExploredLocation location={location}/> :
                            <UnexploredLocation location={location}/>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}