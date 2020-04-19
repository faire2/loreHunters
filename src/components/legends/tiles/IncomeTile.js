import {INCOMES} from "./incomes";
import silverBgr from "../../../img/incomes/silverBack.png"
import goldBgr from "../../../img/incomes/goldBack.png"
import React from "react";
import {INCOME_LEVEL, INCOME_STATE} from "../../../data/idLists";

export const IncomeTile = (props) => {
    const idIncome = props.income;
    const jsxIncome = INCOMES[idIncome.id];
    const state = idIncome.state;
    const bgr = idIncome.level === INCOME_LEVEL.silver ? silverBgr : goldBgr;
    const twoIcons = jsxIncome.effectsText.length > 1;
    const effects = idIncome.effects;

    const containerStyle = {
        backgroundImage: `url(${bgr}`,
        backgroundSize: "contain",
        width: "2.25vw",
        height: "2.25vw",
        float: "left",
        position: "relative",
        marginLeft: "0.5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        fontSize: twoIcons ? "1vw" : "2vw",
    }

    return (
        <div style={containerStyle}>
            <div style={{marginTop: "-0.7vw"}}>
                {state === INCOME_STATE.spent ? bgr : jsxIncome.effectsText.map((effect, i) => {
                    const marginTop = 0.3 - i * 1 + "vw"
                        return (
                            <div style={{marginTop: marginTop}} key={i}>
                                {effect}
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}