import React from "react";
import {EFFECT} from "../../data/effects.mjs";
import {AdventurerIcon, Coin, DestroyCard, Draw1Card, Plane, Uptrade} from "../Symbols";
import bonusBgr from "../../img/bonus_action_background.png"

export const BonusActions = (props) => {

        const bonusStyle = {
            cursor: "pointer",
            width: "15vw",
            marginRight: "1vw",
            textAlign: "center",
            zIndex: 3,
        };

        const bgrStyle = {
          width: "15vw",
            position: "absolute",
            zIndex: -1,
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
            <div className="d-flex flex-row text-left">
                {bonusArray.map((bonus, i) =>
                    <div key={i}>
                        <img src={bonusBgr} style={bgrStyle}/>
                        {bonus}
                    </div>
                )}
            </div>
        )

    }
;