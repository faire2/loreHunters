import React from "react";
import {EFFECT} from "../../data/effects";
import {
    AdventurerToken,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Draw1Card,
    Explore,
    GoldAssistant,
    Jewel,
    LocationL3,
    Map,
    SilverAssistant,
    Text,
    Treasure,
    Weapon
} from "../Symbols";

export function getJsxElement(effect) {
    switch (effect) {
        case EFFECT.loseExplore:
        case EFFECT.gainExploreIfFirst:
        case EFFECT.gainExplore:
            return <Explore/>;
        case EFFECT.gainCoin:
        case EFFECT.gainCoinIfFirst:
        case EFFECT.loseCoin:
            return <Coin/>;
        case EFFECT.gainMap:
        case EFFECT.gainMapIfFirst:
        case EFFECT.loseMap:
            return <Map/>;
        case EFFECT.gainWeapon:
        case EFFECT.loseWeapon:
            return <Weapon/>;
        case EFFECT.gainText:
        case EFFECT.loseText:
            return <Text/>;
        case EFFECT.gainJewel:
        case EFFECT.loseJewel:
            return <Jewel/>;
        case EFFECT.gainExploreOrMapIfFirst:
            return <div><Explore/><Map/></div>;
        case EFFECT.gainCoinOrExploreIfFirst:
            return <div><Coin/><Explore/></div>;
        case EFFECT.gainAdventurerForThisRound:
            return <div style={{width: "1.5vw", margin: "0 auto"}}> <AdventurerToken/> </div>;
        case EFFECT.canActivateL3Location:
            return <LocationL3/>;
        case EFFECT.defeatGuardian:
            return <DefeatedGuardian/>;
        case EFFECT.destroyCard:
            return <DestroyCard/>;
        case EFFECT.discoverLostCity:
            return <Treasure/>;
        case EFFECT.draw1:
            return <Draw1Card/>;
        case EFFECT.gainOrUpgradeAssistant:
            return <div><SilverAssistant/><GoldAssistant/></div>;
        default: console.error("Unable to recognize effect: " + effect);
    }

}