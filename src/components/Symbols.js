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
import shiny from "../img/symbols/D.png"
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

const responsive = {
    height: "1em",
};

export const Coin = (props) => <img src={coin} alt="gain a coin" style={responsive}/>;
export const Discount = (props) => <img src={cardDiscount} alt="discount" style={responsive}/>;
export const Explore = (props) => <img src={explore} alt="gain an explore token" style={responsive}/>;
export const Draw1Card = (props) => <img src={draw1} alt="draw a card" style={responsive}/>;
export const Draw2Cards = (props) => <img src={draw2} alt="draw two cards"style={responsive} />;
export const Draw3Cards = (props) => <img src={draw3} alt="draw three cards"style={responsive} />;
export const Discard = (props) => <img src={discard} alt="discard a cart"style={responsive} />;
export const DestroyCard = (props) => <img src={destroyCard} alt="destroy a card "style={responsive} />;
export const Walk = (props) => <img src={walk} alt="walk" style={responsive}/>;
export const Ship = (props) => <img src={ship} alt="go by a ship" style={responsive}/>;
export const Jeep = (props) => <img src={jeep} alt="go by a jeep" style={responsive}/>;
export const Blimp = (props) => <img src={plane} alt="go by a plane" style={responsive}/>;
export const Text = (props) => <img src={text} alt="gain a text"style={responsive} />;
export const Weapon = (props) => <img src={weapon} alt="gain a weapon"style={responsive} />;
export const Jewel = (props) => <img src={jewel} alt="gain a jewel"style={responsive} />;
export const Arrow = (props) => <img src={arrow} alt="exchanged for"style={responsive} />;
export const Relic = (props) => <img src={shiny} alt="shinies" style={responsive} />;
export const Guardian = (props) => <img src={guardian} alt="guardian"style={responsive} />;
export const Artifact = (props) => <img src={artifact} alt="artifact"style={responsive} />;
export const Uptrade = (props) => <img src={uptrade} alt="uptrade"style={responsive} />;
export const Item = (props) => <img src={item} alt="item"style={responsive} />;
export const Fear = (props) => <img src={fear} alt="fear"style={responsive} />;
export const DefeatedGuardian = (props) => <img src={defeatedGuardian} alt="defeated guardian"style={responsive} />;
export const LocationL1 = (props) => <img src={location1} alt="location of level 1"style={responsive} />;
export const LocationL2 = (props) => <img src={location2} alt="location of level 2"style={responsive} />;
export const LocationL3 = (props) => <img src={location3} alt="location of level 3"style={responsive} />;
export const VictoryPoints = (props) => <img src={victoryPoints} alt="victory points icon" style={responsive} />;
export const Treasure = (props) => <img src={treasure} alt="treasure" style={responsive} />;
export const FreeAction = (props) => <img src={freeAction} alt="treasure" style={responsive} />;
export const Flash = (props) => <img src={flash} alt="action" style={responsive} />;
export const Map = (props) => <img src={map} alt="map" style={responsive} />;
export const SilverAssistant = (props) => <img src={silverAssistantBgr} alt="silver assistant background" style={responsive} />;
export const GoldAssistant = (props) => <img src={goldAssistantBgr} alt="gold assistant background" style={responsive} />;

export const AdventurerIcon = () =>
    <svg width="15" height="15" viewBox="0 0 99 119">
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