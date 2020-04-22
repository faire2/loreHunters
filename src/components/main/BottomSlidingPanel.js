import React, {useState} from "react";

export default function BottomSlidingPanel(props) {
    const extendPanel = props.extendPanel;

    const slideStyle = {
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100vw",
        height: extendPanel ? "23vw" : "0vw",
        zIndex: 10,
        transition: "all .5s cubic-bezier(0, .2, 0, 1)",
        backgroundColor: "red",
    };



    return (
        <div style={slideStyle} className="d-flex flex-row">
        </div>
    )
}