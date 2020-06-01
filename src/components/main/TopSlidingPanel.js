import React, {useContext} from "react";
import {PlayerStateContext} from "../../Contexts";
import {useHistory} from "react-router-dom";

export default function TopSlidingPanel(props) {
    const playerStateContext = useContext(PlayerStateContext);
    const extendPanel = props.extendPanel;
    const history = useHistory();


    const slideStyle = {
        position: "fixed",
        top: extendPanel ? 0 : "-5vw",
        left: 0,
        height: "2vw",
        width: "100vw",
        zIndex: 10,
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
        backgroundColor: playerStateContext.playerState.color,
        fontSize: "1vw",
        display: "flex",
        flexFlow: "column",
        justifyItems: "center",

    };

    const rowStyle = {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    };

    return (
        <div style={slideStyle}>
            <div style={rowStyle}>
                <button className="btn-primary"
                        onClick={()  => history.push({
                            pathname: "/scoring",
                            data: {playerStates: playerStateContext.playerStates}
                        })}>scoring
                </button>
                {playerStateContext.isActivePlayer && <button className="btn-primary" onClick={() => playerStateContext.undo()}>undo</button>}
                {playerStateContext.isActivePlayer && <button className="btn-primary" onClick={() => playerStateContext.revert()}>revert</button>}
            </div>
        </div>
    )
}