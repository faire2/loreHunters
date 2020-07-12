import React from "react";
import {EFFECT} from "../../data/effects";
import {
    AdventurerToken,
    Artifact,
    AssistantUpgrade,
    Blimp,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Discard,
    Draw1Card,
    Explore,
    Item,
    Jeep,
    Jewel,
    LocationL3,
    Map,
    Relic,
    Ship,
    SilverAssistant,
    Text,
    Treasure,
    Walk,
    Weapon
} from "../Symbols";

export function getJsxSymbol(effect) {
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
        case EFFECT.gainWalk:
        case EFFECT.loseWalk:
            return <Walk/>;
        case EFFECT.gainJeep:
        case EFFECT.loseJeep:
            return <Jeep/>;
        case EFFECT.gainShip:
        case EFFECT.loseShip:
            return <Ship/>;
        case EFFECT.gainBlimp:
        case EFFECT.loseBlimp:
            return <Blimp/>;
        case EFFECT.gainExploreOrMapIfFirst:
            return <div><Explore/><Map/></div>;
        case EFFECT.gainCoinOrExploreIfFirst:
            return <div><Coin/><Explore/></div>;
        case EFFECT.gainAdventurerForThisRound:
            return <div style={{width: "1.5vw", margin: "0 auto"}}><AdventurerToken/></div>;
        case EFFECT.gainItem:
        case EFFECT.buyItemWithDiscount3:
        case EFFECT.gainItemToHand:
        case EFFECT.revealItemBuyWithDiscount2:
        case EFFECT.useItemOnMarket:
            return <Item/>;
        case EFFECT.gainArtifact:
        case EFFECT.gainArtifactForExplore:
        case EFFECT.revealArtifactBuyWithDiscount:
        case EFFECT.useArtifactOnMarket:
            return <Artifact/>;
        case EFFECT.canActivateL3Location:
            return <LocationL3/>;
        case EFFECT.defeatGuardian:
        case EFFECT.defeatThisGuardian:
            return <DefeatedGuardian/>;
        case EFFECT.destroyCard:
            return <DestroyCard/>;
        case EFFECT.discoverLostCity:
            return <Treasure/>;
        case EFFECT.draw1:
            return <Draw1Card/>;
        case EFFECT.gainAssistant:
            return <SilverAssistant />
        case EFFECT.gainOrUpgradeAssistant:
            return <AssistantUpgrade/>;
        case EFFECT.discard:
            return <Discard/>
        case EFFECT.gainOrUpgradeRelic:
            return <Relic/>
        default:
            console.error("Unable to recognize effect: " + effect);
    }

}