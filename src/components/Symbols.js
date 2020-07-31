import React from "react";

import draw1 from "../img/symbols/Card+.png"
import draw2 from "../img/symbols/Card++.png"
import draw3 from "../img/symbols/Card+++.png"
import destroyCard from "../img/symbols/CardX.png"
import discard from "../img/symbols/Card-.png"
import coin from "../img/symbols/C.png"
import explore from "../img/symbols/E.png"
import walk from "../img/symbols/Walk.png"
import ship from "../img/symbols/Ship.png"
import jeep from "../img/symbols/Jeep.png"
import plane from "../img/symbols/Plane.png"
import text from "../img/symbols/T.png"
import weapon from "../img/symbols/W.png"
import jewel from "../img/symbols/J.png"
import arrow from "../img/symbols/A.png"
import shiny from "../img/relics/Relic.png"
import guardian from "../img/symbols/G.png"
import artifact from "../img/symbols/Artifact.png"
import uptrade from "../img/symbols/UptradeIcon.png"
import item from "../img/symbols/Item.png"
import fear from "../img/symbols/Fear.png"
import defeatedGuardian from "../img/symbols/GX.png"
import location1 from "../img/symbols/L1.png"
import location2 from "../img/symbols/L2.png"
import location3 from "../img/symbols/L3.png"
import victoryPoints from "../img/symbols/VP.png"
import treasure from "../img/symbols/Treasure.png"
import freeAction from "../img/symbols/freeAction.png"
import cardDiscount from "../img/symbols/CardDiscount.png"
import flash from "../img/symbols/Flash.png"
import map from "../img/symbols/Map.png"
import silverAssistantBgr from "../img/incomes/silverBack.png"
import goldAssistantBgr from "../img/incomes/goldBack.png"
import silverRelic from "../img/relics/RelicSilver.png"
import goldRelic from "../img/relics/RelicGold.png"
import assistantUpgrade from "../img/symbols/AssistantUpgrade.png"
import placeAdventurer from "../img/symbols/PlaceAdventurer.png"

const responsive = {
    height: "1em",
};

export const Coin = () => <img src={coin} alt="gain a coin" style={responsive}/>;
export const Discount = () => <img src={cardDiscount} alt="discount" style={responsive}/>;
export const Explore = () => <img src={explore} alt="gain an explore token" style={responsive}/>;
export const Draw1Card = () => <img src={draw1} alt="draw a card" style={responsive}/>;
export const Draw2Cards = () => <img src={draw2} alt="draw two cards" style={responsive}/>;
export const Draw3Cards = () => <img src={draw3} alt="draw three cards" style={responsive}/>;
export const Discard = () => <img src={discard} alt="discard a cart" style={responsive}/>;
export const DestroyCard = () => <img src={destroyCard} alt="destroy a card " style={responsive}/>;
export const Walk = () => <img src={walk} alt="walk" style={responsive}/>;
export const Ship = () => <img src={ship} alt="go by a ship" style={responsive}/>;
export const Jeep = () => <img src={jeep} alt="go by a jeep" style={responsive}/>;
export const Blimp = () => <img src={plane} alt="go by a plane" style={responsive}/>;
export const Text = () => <img src={text} alt="gain a text" style={responsive}/>;
export const Weapon = () => <img src={weapon} alt="gain a weapon" style={responsive}/>;
export const Jewel = () => <img src={jewel} alt="gain a jewel" style={responsive}/>;
export const Arrow = () => <img src={arrow} alt="exchanged for" style={responsive}/>;
export const BronzeRelic = () => <img src={shiny} alt="shinies" style={responsive}/>;
export const Guardian = () => <img src={guardian} alt="guardian" style={responsive}/>;
export const Artifact = () => <img src={artifact} alt="artifact" style={responsive}/>;
export const Uptrade = () => <img src={uptrade} alt="uptrade" style={responsive}/>;
export const Item = () => <img src={item} alt="item" style={responsive}/>;
export const Fear = () => <img src={fear} alt="fear" style={responsive}/>;
export const DefeatedGuardian = () => <img src={defeatedGuardian} alt="defeated guardian" style={responsive}/>;
export const LocationL1 = () => <img src={location1} alt="location of level 1" style={responsive}/>;
export const LocationL2 = () => <img src={location2} alt="location of level 2" style={responsive}/>;
export const LocationL3 = () => <img src={location3} alt="location of level 3" style={responsive}/>;
export const VictoryPoints = () => <img src={victoryPoints} alt="victory points icon" style={responsive}/>;
export const Treasure = () => <img src={treasure} alt="treasure" style={responsive}/>;
export const GainAction = () => <img src={freeAction} alt="treasure" style={responsive}/>;
export const Flash = () => <img src={flash} alt="action" style={responsive}/>;
export const Map = () => <img src={map} alt="map" style={responsive}/>;
export const SilverAssistant = () => <img src={silverAssistantBgr} alt="silver assistant background"
                                               style={responsive}/>;
export const GoldAssistant = () => <img src={goldAssistantBgr} alt="gold assistant background"
                                             style={responsive}/>;
export const SilverRelic = () => <img src={silverRelic} alt="silver silver relic" style={responsive}/>;
export const GoldRelic = () => <img src={goldRelic} alt="gold relic" style={responsive}/>;
export const AssistantUpgrade = () => <img src={assistantUpgrade} alt="assistant upgrade" style={responsive}/>;
export const PlaceAdventurer = () => <img src={placeAdventurer} alt="place an adventurer to a location" style={responsive}/>;

export const AdventurerIcon = () =>
    <svg width="5" height="6" viewBox="0 0 99 119">
        <metadata>
            Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g transform="translate(0.000000,119.000000) scale(0.100000,-0.100000)"
           fill="#000000" stroke="none">
            <path d="M336 1174 c-10 -9 -16 -33 -16 -62 0 -26 -4 -52 -8 -59 -4 -6 -35 -17 -69 -23 -35 -7 -68 -19 -74 -26 -23 -28 50 -108 134 -145 20 -9 27 -19 27
-40 0 -23 -5 -30 -27 -35 -98 -21 -212 -74 -265 -122 -36 -32 -38 -38 -38 -92 0 -84 11 -92 134 -105 32 -3 62 -8 67 -11 11 -6 -12 -69 -50 -133 -77 -129
-114 -215 -115 -266 l-1 -50 168 -3 168 -2 57 90 c33 52 63 89 71 88 8 -2 35 -41 61 -88 l47 -85 172 -3 171 -2 0 43 c0 56 -35 151 -90 247 -86 149 -86 148
-74 160 6 6 43 14 83 17 98 8 121 26 121 97 0 62 -17 89 -84 133 -42 28 -157 74 -221 88 -29 6 -28 7 23 24 79 27 122 76 122 139 0 47 -72 102 -135 102 -18
0 -25 7 -30 33 -3 17 -13 49 -22 70 l-16 37 -138 0 c-112 0 -141 -3 -153 -16z"/>
        </g>
    </svg>;

export const AdventurerToken = (props) => {
    const color = props.color;
    const adventurerSVG =
        <svg width="100%" height="100%" viewBox="0 0 99 119">
            <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g transform="translate(0.000000,119.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                <path d="M336 1174 c-10 -9 -16 -33 -16 -62 0 -26 -4 -52 -8 -59 -4 -6 -35 -17 -69 -23 -35 -7 -68 -19 -74 -26 -23 -28 50 -108 134 -145 20 -9 27 -19 27
-40 0 -23 -5 -30 -27 -35 -98 -21 -212 -74 -265 -122 -36 -32 -38 -38 -38 -92 0 -84 11 -92 134 -105 32 -3 62 -8 67 -11 11 -6 -12 -69 -50 -133 -77 -129
-114 -215 -115 -266 l-1 -50 168 -3 168 -2 57 90 c33 52 63 89 71 88 8 -2 35 -41 61 -88 l47 -85 172 -3 171 -2 0 43 c0 56 -35 151 -90 247 -86 149 -86 148
-74 160 6 6 43 14 83 17 98 8 121 26 121 97 0 62 -17 89 -84 133 -42 28 -157 74 -221 88 -29 6 -28 7 23 24 79 27 122 76 122 139 0 47 -72 102 -135 102 -18
0 -25 7 -30 33 -3 17 -13 49 -22 70 l-16 37 -138 0 c-112 0 -141 -3 -153 -16z"/>
            </g>
        </svg>

    return (
        <div style={props.style}>
            {adventurerSVG}
        </div>
    )
};

export const FirstLegendToken = (props) => {
    const color = props.color;
    const tokenSvg =
        <svg width="80%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-5 70 200 50">
            <path fill={color}
                  d="M 81.5 0 L 84.5 0 L 100 11.5 Q 99.3 13.8 101.5 13 L 116 25.5 L 136 48.5 L 160 86.5 L 166 109.5 L 166 136.5 L 162 154.5 L 156 167.5 L 139.5 187 L 126.5 197 L 106.5 206 L 97.5 208 L 68.5 208 Q 36.7 200.8 19 179.5 Q 8.4 167.6 3 150.5 L 0 136.5 L 0 109.5 L 6 86.5 L 20 62.5 L 41 35.5 L 57.5 19 L 81.5 0 Z "/>
        </svg>

    return (
        <div style={props.style}>
            {tokenSvg}
        </div>
    )
};
export const SecondLegendToken = (props) => {
    const color = props.color;
    const tokenSvg =
        <svg width="80%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-5 70 200 50">
            <path fill={color}
                  d="M 4 0 L 11.5 0 L 26.5 3 L 34.5 3 L 35.5 4 L 43.5 4 L 44.5 5 L 55.5 5 L 56.5 6 L 98.5 7 L 99.5 6 L 115.5 6 L 116.5 5 L 136.5 4 L 137.5 3 L 144.5 3 L 145.5 2 L 165 0 L 163 20.5 L 162 21.5 L 162 28.5 L 161 29.5 L 161 37.5 L 160 38.5 L 160 49.5 L 159 50.5 L 158 99.5 L 159 100.5 L 159 115.5 L 160 116.5 L 161 134.5 L 162 135.5 L 162 142.5 L 163 143.5 L 165 162 L 138.5 159 L 137.5 158 L 118.5 157 L 117.5 156 L 71.5 155 L 70.5 156 L 54.5 156 L 53.5 157 L 33.5 158 L 32.5 159 L 25.5 159 L 24.5 160 L 4 162 L 5 148.5 L 6 147.5 L 6 139.5 L 7 138.5 L 8 115.5 L 9 114.5 L 10 68.5 L 9 67.5 L 8 34.5 L 7 33.5 L 7 24.5 L 6 23.5 L 6 14.5 L 5 13.5 L 4 0 Z "/>
        </svg>

    return (
        <div style={props.style}>
            {tokenSvg}
        </div>
    )
};