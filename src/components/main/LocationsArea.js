import React, {useContext} from "react";
import {BoardStateContext} from "../../Contexts";
import ExploredLocation from "../locations/ExploredLocation";
import UnexploredLocation from "../locations/UnexploredLocation";
import {LOCATION_STATE} from "../../data/idLists";
import {Locations} from "../../data/locations";

export default function LocationsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const locations = boardStateContext.locations;

    const style = {
        minHeight: 160,
    }

    const leftMargin = {
        marginLeft: 240,
    }

    const empty = {
        minWidth: 160,
    }

    return (
        <div>
            <div style={style} className="d-flex flex-row position-relative">
                {locations !== null && locations.line1.map((location, i) =>
                    <div key={"location" + i}>
                        {location.state !== LOCATION_STATE.unexplored ?
                            <ExploredLocation location={Locations[location.id]} level={location.level}
                                              state={location.state} type={location.type}/> :
                            <UnexploredLocation location={Locations[location.id]} level={location.level}
                                                state={location.state} type={location.type}/>
                        }
                    </div>
                )}
            </div>
            <div style={leftMargin}>
                <div style={style} className="d-flex flex-row position-relative">
                    {locations !== null && locations.line2.map((location, i) =>
                        <div key={"location" + i}>
                            {location.state !== LOCATION_STATE.unexplored ?
                                <ExploredLocation location={Locations[location.id]} level={location.level}
                                                  state={location.state} type={location.type}/> :
                                <UnexploredLocation location={Locations[location.id]} level={location.level}
                                                    state={location.state} type={location.type}/>
                            }
                        </div>
                    )}
                </div>
            </div>
            <div style={style} className="d-flex flex-row position-relative">
                <br/>
                {locations !== null && locations.line3.map((location, i) =>
                    <div key={"location" + i}>
                        {location.state !== LOCATION_STATE.unexplored ?
                            <ExploredLocation location={Locations[location.id]} level={location.level}
                                              state={location.state} type={location.type}/> :
                            <UnexploredLocation location={Locations[location.id]} level={location.level}
                                                state={location.state} type={location.type}/>
                        }
                    </div>
                )}
            </div>
            <div style={leftMargin}>
                <div style={style} className="d-flex flex-row position-relative">
                    <br/>
                    {locations !== null && locations.line4.map((location, i) => {
                        if (location === "empty") {
                            return <div style={empty}></div>
                        } else {
                            return (
                                <div key={"location" + i}>
                                    {location.state !== LOCATION_STATE.unexplored ?
                                        <ExploredLocation location={Locations[location.id]} level={location.level}
                                                          state={location.state} type={location.type}/> :
                                        <UnexploredLocation location={Locations[location.id]} level={location.level}
                                                            state={location.state} type={location.type}/>
                                    }
                                </div>
                            )
                        }
                    })
                    }
                </div>
            </div>
        </div>
    )
}