import React from "react";
import {EFFECT} from "../../data/effects";
import {AdventurerIcon, Coin, DestroyCard, Draw1Card, Plane, Uptrade} from "../Symbols";

export const BonusArea = (props) => {

        const bonusStyle = {
            cursor: "pointer",
            backgroundColor: "#844219",
            width: "13vw",
            marginRight: "1vw"
        };

        const bonusArray = [
                <div style={bonusStyle}
                     onClick={() => props.handleClickOnBonus([EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.gainPlane])}>
                    <Coin/><Coin/>: <Plane/></div>,
                <div style={bonusStyle}
                     onClick={() => props.handleClickOnBonus([EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.destroyCard])}>
                    <Coin/><Coin/>: <DestroyCard/></div>,
                <div style={bonusStyle}
                     onClick={() => props.handleClickOnBonus([EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.uptrade])}>
                    <Coin/><Coin/>: <Uptrade/></div>,
                <div style={bonusStyle}
                     onClick={() => props.handleClickOnBonus([EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.draw1])}>
                    <Coin/><Coin/>: <Draw1Card/></div>,
                <div style={bonusStyle}
                     onClick={() => props.handleClickOnBonus([EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.gainAdventurerForThisRound])}>
                    <Coin/><Coin/><Coin/>: <AdventurerIcon/></div>
            ];

        return (
            <div className="d-flex flex-row">
                {bonusArray.map(bonus =>
                    bonus
                )}
            </div>
        )

    }
;