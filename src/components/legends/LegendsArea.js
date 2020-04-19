import React, {useContext} from 'react';
import {BoardStateContext} from "../../Contexts";
import {Legend} from "./Legend";
import {Income} from "./tiles/Income";
import goal from  "../../img/cardBackgrounds/Goal.png"
import bonusBgr from "../../img/bonus_action_background.png";

export function LegendsArea() {
    const boardStateContext = useContext(BoardStateContext);
    const legends = boardStateContext.legends;
    const store = boardStateContext.store
    let incomes1offer;
    let incomes2offer;
    if (store !== null) {
        incomes1offer = store.incomes1Offer;
        incomes2offer = store.incomes2Offer;
    }

    const containerStyle = {
        position: "absolute",
        top: 0,
        marginLeft: "47vw",
        zIndex: 0,
        height: "23vw",
        width: "80vw",
        marginBottom: "3vw",
    };

    const incomes1Style = {
        marginLeft: "5.5vw"
    }

    const incomes2Style = {
        marginLeft: "16.5vw"
    }

    const explorePlaceholder = <div style={{
        height: "3.5vw",
        width: "5vw",
        backgroundImage: `url(${goal}`,
        backgroundSize: "100% 100%",
        fontSize: "0.9vw",
        color: "white",
        float: "left",
    }}>
    </div>

    return (
        <div style={containerStyle}>
            {legends && legends.map((legend, i) =>
                <div key={"legend" + i}>
                    <Legend legend={legend} legends={legends} legendIndex={i}/>
                </div>
            )}
            <div style={{marginLeft:"0.5vw"}}>{explorePlaceholder}</div>
            {incomes1offer && incomes1offer.map((income, i) =>
                <div style={incomes1Style} key={i}>
                    <Income income={income}/>
                </div>
            )}
            <div style={{position: "absolute", marginLeft:"11.5vw"}}>{explorePlaceholder}</div>
            {incomes1offer && incomes2offer.map((income, i) =>
                <div style={incomes2Style} key={i}>
                    <Income income={income}/>
                </div>
            )}
        </div>
    )
}