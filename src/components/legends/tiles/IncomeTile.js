import {INCOMES} from "./incomes";
import silverBgr from "../../../img/incomes/silverBack.png"
import goldBgr from "../../../img/incomes/goldBack.png"
import noBgr from "../../../img/symbols/A.png"
import React, {useContext} from "react";
import {INCOME_LEVEL, INCOME_SIZE, INCOME_STATE} from "../../../data/idLists";
import {BoardStateContext} from "../../../Contexts";

export const IncomeTile = (props) => {
    const idIncome = props.income;
    const jsxIncome = INCOMES[idIncome.id];
    const effects = idIncome.effects;
    const size = props.size;
    const boardStateContext = useContext(BoardStateContext);
    let state = idIncome.state;

    const bgr = idIncome.level === INCOME_LEVEL.silver ? silverBgr : goldBgr;
    const twoIcons = jsxIncome.effectsText.length > 1;

    const containerStyle = {
        backgroundSize: "contain",
        width: size === INCOME_SIZE.small ? "2.25vw" : "5vw",
        height: size === INCOME_SIZE.small ? "2.25vw" : "5vw",
        fontSize: twoIcons ? (size === INCOME_SIZE.small ? "1.3vw" : "3vw") : (size === INCOME_SIZE.small ? "2vw" : "4.5vw"),
        float: "left",
        position: "relative",
        marginLeft: "0.5vw",
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${bgr}`,
    }

    const effectStyle = {
        marginTop: size === INCOME_SIZE.small ? "-0.6vw" : "-2vw",
        left: 0
    }

    function handleClick() {
        if (state === INCOME_STATE.ready) {
            boardStateContext.handleClickOnIncomeTile(effects, idIncome.id)
        }
    }

    return (
        <div style={containerStyle} onClick={() => handleClick()}>
            <div style={{marginTop: "-0.0vw", display: "flex", flexDirection: "row"}}>
                {state === INCOME_STATE.spent ? "" : jsxIncome.effectsText.map((effect, i) => {
                        const margin = size === INCOME_SIZE.small ? -i * 0.7 + "vw" : -i * 1.5 + "vw"
                        return (
                            <div style={{...effectStyle, ...{marginLeft: margin}}} key={i}>
                                {effect}
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}