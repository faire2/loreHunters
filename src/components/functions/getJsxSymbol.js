import React from "react";
import {EFFECT} from "../../data/effects";
import {
    AdventurerToken,
    Arrow,
    Artifact,
    AssistantUpgrade,
    Blimp,
    BronzeRelic,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Discard,
    Discount,
    Draw1Card,
    Explore,
    GainAction,
    GoldAssistant,
    Item,
    Jeep,
    Jewel,
    LocationL3,
    Map,
    PlaceAdventurer,
    SecondLegendToken,
    Ship,
    SilverAssistant,
    Text,
    Treasure,
    Uptrade,
    Walk,
    Weapon
} from "../Symbols";
import {DivRow, ResearchTokenWrapper} from "./styles";

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
        case EFFECT.progressWithWeapon:
            return <Weapon/>;
        case EFFECT.gainText:
        case EFFECT.loseText:
            return <Text/>;
        case EFFECT.progressWithTexts:
            return <DivRow><Text/><Text/></DivRow>
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
        case EFFECT.gainPlane:
        case EFFECT.loseBlimp:
            return <Blimp/>;
        case EFFECT.gainExploreOrMapIfFirst:
            return <DivRow><Explore/><Map/></DivRow>;
        case EFFECT.gainCoinOrExploreIfFirst:
            return <DivRow><Coin/><Explore/></DivRow>;
        case EFFECT.gainAdventurerForThisRound:
        case EFFECT.returnAdventurer:
            return <div style={{width: "1.5vw", margin: "0 auto"}}><AdventurerToken/></div>;
        case EFFECT.gainItemToTop:
        case EFFECT.buyItemWithDiscount3:
        case EFFECT.gainItemToHand:
        case EFFECT.revealItemBuyWithDiscount3:
        case EFFECT.useItemOnMarket:
            return <Item/>;
        case EFFECT.gainArtifact:
        case EFFECT.gainArtifactForExplore:
        case EFFECT.revealArtifactBuyWithDiscount3:
        case EFFECT.useArtifactOnMarket:
            return <Artifact/>;
        case EFFECT.gainRewardLevel:
            return <Treasure/>;
        case EFFECT.canActivateL3Location:
            return <LocationL3/>;
        case EFFECT.defeatGuardianOnOwnedLocation:
        case EFFECT.defeatThisGuardian:
            return <DefeatedGuardian/>;
        case EFFECT.destroyCard:
            return <DestroyCard/>;
        case EFFECT.draw1:
            return <Draw1Card/>;
        case EFFECT.gainSilverAssistant:
            return <SilverAssistant/>
        case EFFECT.gainGoldAssistant:
        case EFFECT.upgradeAssistant:
            return <GoldAssistant/>
        case EFFECT.refreshAllAssistants:
            return <AssistantUpgrade/>;
        case EFFECT.discard:
            return <Discard/>
        case EFFECT.gainOrUpgradeRelic:
        case EFFECT.gainBronzeRelic:
            return <BronzeRelic/>
        case EFFECT.gainAction:
            return <GainAction/>
        case EFFECT.discoverLostCity:
        case EFFECT.finishRound:
            return ""
        case EFFECT.arrow:
            return <Arrow/>
        case EFFECT.progressWithSecondToken:
            return <ResearchTokenWrapper><SecondLegendToken/></ResearchTokenWrapper>
        case EFFECT.placeAnywhere:
            return <PlaceAdventurer/>
        case EFFECT.exploreAnyLocationWithDiscount3:
            return <DivRow><PlaceAdventurer/><Explore/><Explore/><Explore/></DivRow>
        case EFFECT.uptrade:
            return <Uptrade/>
        case EFFECT.buyWithDiscount1:
            return <Discount/>
        case EFFECT.gainWeaponOrJewel:
            return <DivRow><Weapon/>/<Jewel/></DivRow>
        case EFFECT.gainPlaneOrCoin:
            return <DivRow><Blimp/>/<Coin/></DivRow>
        case EFFECT.gainShipOrCoin:
            return <DivRow><Ship/>/<Coin/></DivRow>
        case EFFECT.gainJeepOrCoin:
            return <DivRow><Jeep/>/<Coin/></DivRow>
        default:
            console.error("Unable to recognize effect in getJsxEffect: " + effect);
    }
}

