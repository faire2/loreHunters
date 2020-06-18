import {INCOMES} from "./incomes";
import silverBgr from "../../../img/incomes/silverBack.png"
import goldBgr from "../../../img/incomes/goldBack.png"
import React, {useContext} from "react";
import {BoardStateContext} from "../../../Contexts";
import {INCOME_LEVEL, INCOME_SIZE, INCOME_STATE} from "../../functions/enums";

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
        width: size === INCOME_SIZE.small ? "2.1vw" : "2.8vw",
        height: size === INCOME_SIZE.small ? "2.25vw" : "3vw",
        fontSize: twoIcons ? (size === INCOME_SIZE.small ? "1.0vw" : "1.4vw") : (size === INCOME_SIZE.small ? "1.7vw" : "2.2vw"),
        float: "left",
        position: "relative",
        marginLeft: "0.5vw",
        backgroundImage: `url(${bgr}`,
    };

    const centerWrapStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    };

    const effectStyle = {
        marginBottom: "30%"
    };

    function handleClick() {
        if (state === INCOME_STATE.ready) {
            boardStateContext.handleClickOnIncomeTile(effects, idIncome.id)
        }
    }

    return (
        <div style={containerStyle} onClick={() => handleClick()}>
            <div style={centerWrapStyle}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {state === INCOME_STATE.spent ? "" : jsxIncome.effectsText.map((effect, i) => {
                            const margin = size === INCOME_SIZE.small ?
                                twoIcons ? (-i * 0.7 + "vw") : (0) :
                                twoIcons ? (-i * 1.6 + "vw") : (0);
                            return (
                                <div style={{...effectStyle, ...{marginLeft: margin}}} key={i}>
                                    {effect}
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
};