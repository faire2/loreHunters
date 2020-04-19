import React from "react";
import {EFFECT} from "../../data/effects.mjs";
import {AdventurerIcon, AdventurerToken, Coin, DestroyCard, Draw1Card, Blimp, Uptrade} from "../Symbols";
import bonusBgr from "../../img/bonus_action_background.png"

export const BonusActions = (props) => {

        const bonusStyle = {
            cursor: "pointer",
            width: "6.5vw",
            height: "2.2vw",
            marginLeft: "0.3vw",
            textAlign: "center",
            zIndex: 3,
            backgroundImage: `url(${bonusBgr}`,
            backgroundSize: "100%",
            fontSize: "1.3vw"
        };

        const bonusArray = [
                <div style={bonusStyle}
                     onClick={() => props.handleClickOnBonus([EFFECT.loseCoin, EFFECT.loseCoin, EFFECT.gainPlane])}>
                    <Coin/><Coin/>: <Blimp/></div>,
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
            <div className="d-flex flex-row text-left">
                {bonusArray.map((bonus, i) =>
                    <div key={i}>
                        {bonus}
                    </div>
                )}
            </div>
        )

    }
;