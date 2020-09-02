import React from "react";
import styled from "styled-components";

import seaTurtleImg from "../img/cardImages/items/turtle.png"
import ostrichImg from "../img/cardImages/items/ostrich.png"
import packDonkeyImg from "../img/cardImages/items/packDonkey.png"
import horseImg from "../img/cardImages/items/horse.png"
import dogImg from "../img/cardImages/items/dog.png"
import canoeImg from "../img/cardImages/items/canoe.png"
import jeepImg from "../img/cardImages/items/jeep.png"
import bootsImg from "../img/cardImages/items/boots.png"
import hotAirBalloonImg from "../img/cardImages/items/balloon.png"
import airPlaneImg from "../img/cardImages/items/airPlane.png"
import goldPanImg from "../img/cardImages/items/goldPan.png"
import trowelImg from "../img/cardImages/items/trowel.png"
import pickaxeImg from "../img/cardImages/items/pickaxe.png"
import journalImg from "../img/cardImages/items/journal.png"
import parrotImg from "../img/cardImages/items/parrot.png"
import pocketWatchImg from "../img/cardImages/items/pocketWatch.png"
import grapplingHookImg from "../img/cardImages/items/grapplingHook.png"
import binocularsImg from "../img/cardImages/items/binoculars.jpg"
import revolverImg from "../img/cardImages/items/revolver.jpg"
/*import camouflagePaintImg from "../img/cardImages/items/camouflagePaint.png"*/
import tentImg from "../img/cardImages/items/tent.png"
import fishingRodImg from "../img/cardImages/items/fishingRod.png"
import compassImg from "../img/cardImages/items/compass.png"
import bowAndArrowsImg from "../img/cardImages/items/bowAndArrows.png"
import messengerPidgeonImg from "../img/cardImages/items/pidgeon.png"
import whipImg from "../img/cardImages/items/whip.png"
import bookOfMythsImg from "../img/cardImages/items/bookOfMyths.png"
import bagImg from "../img/cardImages/items/bag.png"
import flaskImg from "../img/cardImages/items/flask.png"
import beartrapImg from "../img/cardImages/items/beartrap.png"
import airmailImg from "../img/cardImages/items/airmail.png"
/*import floraSamplesImg from "../img/cardImages/items/floraSamples.png"*/
import torchImg from "../img/cardImages/items/torch.png"
import machetteImg from "../img/cardImages/items/machete.png"
/*import mirrorShardImg from "../img/cardImages/artifacts/mirrorShard.png"*/
import pathFinderStaffImg from "../img/cardImages/artifacts/pathFinderStaff.png"
import cursedTreasureImg from "../img/cardImages/artifacts/cursedTreasure.png"
import darkKnowledgeImg from "../img/cardImages/artifacts/darkKnowledge.png"
import baneBanisherImg from "../img/cardImages/artifacts/blade.png"
import warMaskImg from "../img/cardImages/artifacts/warMask.png"
import beastKillerImg from "../img/cardImages/artifacts/beastKiller.png"
import flameJewelImg from "../img/cardImages/artifacts/flameJewel.png"
import inscribedBladeImg from "../img/cardImages/artifacts/inscribedBlade.png"
import transmutationImg from "../img/cardImages/artifacts/transmutation.png"

import {
    AdventurerIcon,
    Arrow,
    Artifact,
    AssistantUpgrade,
    Blimp,
    BronzeRelic,
    Coin,
    DefeatedGuardian,
    DestroyCard,
    Discard,
    Draw1Card,
    Draw2Cards,
    Explore,
    Fear,
    Flash,
    GainAction,
    GoldAssistant,
    Guardian,
    Item,
    Jeep,
    Jewel,
    LocationL1,
    LocationL2,
    LocationL3,
    PlaceAdventurer,
    SecondLegendToken,
    Ship,
    Text,
    Uptrade,
    Walk,
    Weapon
} from "../components/Symbols";

const Icons = styled.div`
    font-size: 1.1vw;
`;

export const CARD_TEXTS = Object.freeze({
    fear: {
        id: "fear",
        effectsText: "",
    },
    coin1: {
        id: "coin1",
        effectsText: <Icons><Coin/><GainAction/></Icons>,
    },
    coin2: {
        id: "coin2",
        effectsText: <Icons><Coin/><GainAction/></Icons>,
    },
    explore1: {
        id: "explore1",
        effectsText: <Icons><Explore/><GainAction/></Icons>,
    },
    explore2: {
        id: "explore2",
        effectsText: <Icons><Explore/><GainAction/></Icons>,
    },
    seaTurtle: {
        id: "seaTurtle",
        effectsText: <div><Draw1Card/><br/><PlaceAdventurer/> with a discount of <Ship/>.
        </div>,
        image: seaTurtleImg,
    },
    ostrich: {
        id: "ostrich",
        effectsText: <div><Draw1Card/><br/><PlaceAdventurer/> with a discount of <Jeep/>.
        </div>,
        image: ostrichImg,
    },
    packDonkey: {
        id: "packDonkey",
        effectsText: <Icons><Draw2Cards/></Icons>,
        image: packDonkeyImg,
    },
    horse: {
        id: "horse",
        effectsText: <Icons><Draw1Card/><Coin/><Explore/></Icons>,
        image: horseImg,
    },
    steamBoat: {
        id: "steamBoat",
        effectsText: <Icons><Explore/><Explore/><GainAction/></Icons>,
        image: canoeImg,
    },
    jeep: {
        id: "jeep",
        effectsText: <Icons><Explore/><Explore/><GainAction/></Icons>,
        image: jeepImg,
    },
    boots: {
        id: "boots",
        effectsText: <div><Explore/><br/><PlaceAdventurer/> with a discount of <Walk/><Walk/>.
        </div>,
        image: bootsImg,
    },
    goldPan: {
        id: "goldPan",
        effectsText: <Icons><Coin/><Coin/><GainAction/></Icons>,
        image: goldPanImg,
    },
    trowel: {
        id: "trowel",
        effectsText: <Icons><Explore/><Arrow/><Jewel/></Icons>,
        image: trowelImg,
    },
    pickaxe: {
        id: "pickaxe",
        effectsText: <Icons><Explore/><Arrow/><Weapon/><Text/></Icons>,
        image: pickaxeImg,
    },
    hotAirBaloon: {
        id: "hotAirBaloon",
        effectsText: <div><b>Exile</b> this card to <PlaceAdventurer/> with a discount of <Blimp/>.
            plus a a discount of <Explore/><Explore/><Explore/> if discovering a new site.</div>,
        image: hotAirBalloonImg,
    },
    airplane: {
        id: "airplane",
        effectsText: <div><PlaceAdventurer/> with a <b>discount</b> of <Blimp/>, plus a discount
            of <Explore/><Explore/> if discovering a new location.</div>,
        image: airPlaneImg,
    },
    journal: {
        id: "journal",
        effectsText: <div><b>Exile</b> this card to progress with your <SecondLegendToken/></div>,
        image: journalImg,
    },
    parrot: {
        id: "parrot",
        effectsText: <Icons><Discard/><Arrow/><Jewel/>.</Icons>,
        image: parrotImg,
    },
    wristWatch: {
        id: "wristWatch",
        effectsText: <div><b>Gain:</b>
            <Coin/><Coin/><GainAction/> or <b>Pass</b> to gain <Coin/><Coin/><Coin/>.</div>,
        image: pocketWatchImg,
    },
    armyKnife: {
        id: "armyKnife",
        effectsText: <div>Draw three cards and keep one. Discard others with no effect.</div>,
        image: "",
    },
    binoculars: {
        id: "binoculars",
        effectsText: <div><Flash/><b>Activate</b> a <LocationL2/></div>,
        image: binocularsImg,
    },
    tent: {
        id: "tent",
        effectsText: <div><b>Activate:</b> a site you currently occupy. Pay <Explore /><Explore />
        if it is a <LocationL3 /> site. </div>,
        image: tentImg,
    },
    fishingRod: {
        id: "fishingRod",
        effectsText: <div>Buy <Item/> with discount of <Coin/><Coin/><Coin/>, <b>include</b> the
            top card of the deck.
        </div>,
        image: fishingRodImg,
    },
    compass: {
        id: "compass",
        effectsText: <div>Buy <Artifact/> with discount of <Explore/><Explore/><Explore/>, <b>include</b> the top card of the deck.</div>,
        image: compassImg,
    },
    bowAndArrows: {
        id: "bowAndArrows",
        effectsText: <div>Gain <Explore/> for each <Guardian/> you overcame and
            each <Guardian/> you are confronting, up to 3.</div>,
        image: bowAndArrowsImg,
    },
    carrierPidgeon: {
        id: "carrierPidgeon",
        effectsText: <Icons><Text/><Text/><GainAction/></Icons>,
        image: messengerPidgeonImg,
    },
    whip: {
        id: "whip",
        effectsText:
            <div>Exile this card to gain <Artifact/> for free.</div>,
        image: whipImg,
    },
    roughMap: {
        id: "roughMap",
        effectsText: <div>Exile this card to gain <Explore/><Explore/><Explore/></div>,
        image: bookOfMythsImg,
    },
    airDrop: {
        id: "airDrop",
        effectsText: <div>Exile this card to gain <Item/> for free to your hand.</div>,
        image: airmailImg,
    },
    flask: {
        id: "flask",
        effectsText: <div>Exile this card to <Draw1Card/><Draw1Card/><Draw1Card/></div>,
        image: flaskImg,
    },
    machete: {
        id: "machete",
        effectsText: <Icons><Explore/><Explore/><DestroyCard/></Icons>,
        image: machetteImg,
    },
    axe: {
            id: "axe",
            effectsText: <Icons><Explore/><DestroyCard/></Icons>,
        image: null,
    },
    torch: {
        id: "torch",
        effectsText: <Icons><Text/><DestroyCard/></Icons>,
        image: torchImg,
    },
    bag: {
        id: "bag",
        effectsText: <div><Coin/><br/> Draw a card from the bottom of you deck.
        </div>,
        image: bagImg,
    },
    rope: {
        id: "rope",
        effectsText: <Icons><Discard/><Arrow/><Draw1Card/><Draw1Card/></Icons>,
        image: null,
    },
    revolver: {
        id: "revolver",
        effectsText: <div><Explore/><Arrow/><DefeatedGuardian/> on a site you occupy.</div>,
        image: revolverImg,
    },
    hat: {
        id: "hat",
        effectsText: <Icons><Coin/><Explore/><GainAction/></Icons>,
    },
    beartrap: {
        id: "beartrap",
        effectsText: <div><b>Exile</b> this card to <DefeatedGuardian/> on any site that is
            not occupied by another player.</div>,
        image: beartrapImg,
    },
    grapplingHook: {
        id: "grapplingHook",
        effectsText: <Icons><Discard/><Arrow/><Draw1Card/><DestroyCard/></Icons>,
        image: grapplingHookImg,
    },
    dog: {
        id: "dog",
        effectsText: <div><Explore/><br/> <b>Activate</b> an unoccupied <LocationL1/> site.</div>,
        image: dogImg,
    },
    philologyBook: {
        id: "philologyBook",
        effectsText: <div>Gain <Explore/> for each <BronzeRelic/> you own, up to 3.</div>,
        image: journalImg,
    },
    chronometer: {
        id: "chronometer",
        effectsText: <div><b>Gain:</b>
            <Coin/><Explore/><GainAction/> or <b>Pass</b> to gain <Explore/><Explore/><Explore/>.</div>,
        image: pocketWatchImg,
    },
    theodolite: {
        id: "theodolite",
        effectsText: <div><Coin/><br/> Gain <Explore/> for each of your <AdventurerIcon/> already
            placed on the board.</div>,
        image: null,
    },
    pathfinderSandals: {
        id: "pathfinderSandals",
        effectsText:
            <div>Relocate a placed <AdventurerIcon/> to a <LocationL1/> and <b>activate</b> it.</div>,
        image: "",
    },
    pathfinderStaff: {
        id: "pathfinderStaff",
        effectsText:
            <div>Move your placed <AdventurerIcon/> to a <LocationL1/> or <LocationL2/> and <b>activate</b> it.</div>,
        image: pathFinderStaffImg,
    },
    warMask: {
        id: "warMask",
        effectsText:
            <div><Weapon/><br/> Don't gain <Fear/> from <Guardian/> this round.</div>,
        image: warMaskImg,
    },
    treasureChest: {
        id: "treasureChest",
        effectsText:
            <Icons><Draw1Card/><Coin/></Icons>,
        image: null,
    },
    ritualDagger: {
        id: "ritualDagger",
        effectsText:
            <Icons><DestroyCard/><Weapon/></Icons>,
        image: baneBanisherImg,
    },
     earRingOfLight: {
        id: "earRingOfLight",
        effectsText:
            <div>Draw up to 3 cards and keep one. You may return one of them to the top of the deck.</div>,
         image: null,
     },
    mortar: {
        id: "mortar",
        effectsText:
            <Icons><DestroyCard/><Arrow/><Coin/><Coin/></Icons>,
        image: transmutationImg,
    },
    serpentGold: {
        id: "serpentGold",
        effectsText:
            <div>You may gain <Fear/> to gain <Coin/><Coin/><Coin/><Coin/></div>,
        image: cursedTreasureImg,
    },
    serpentsIdol: {
        id: "serpentsIdol",
        effectsText:
            <div>Gain <Fear/> to gain a <Jewel/></div>,
        image: darkKnowledgeImg,
    },
    serpentsGold: {
        id: "serpentsGold",
        effectsText:
            <div>Gain <Fear/> to gain <Coin/><Coin/><Coin/><Coin/></div>,
        image: darkKnowledgeImg,
    },
    monkeyMedallion: {
        id: "monkeyMedallion",
        effectsText: <div>Gain <Item/> for free, place it on the top of your deck.</div>,
    },
    idolOfAraAnu: {
        id: "idolOfAraAnu",
        effectsText:
            <div>Research with a discount of <Jewel/></div>,
        image: flameJewelImg,
    },
    inscribedBlade: {
        id: "inscribedBlade",
        effectsText:
            <div><GainAction/><b>Discount</b> <Text/><Text/> of <Weapon/> to progress in a
                legend.</div>,
        image: inscribedBladeImg,
    },
    guardianOccarina: {
        id: "guardianOccarina",
        effectsText:
            <div>Return a placed <AdventurerIcon/> back to your pool. All your travel icons
                count as <Blimp/> this  round.
            </div>,
    },
    owlEyes: {
        id: "owlEyes",
        effectsText:
            <div><DestroyCard/><br/> Activate a completely unoccupied <LocationL1/>.</div>,
    },
    warClub: {
        id: "warClub",
        effectsText:
            <div>Overcome <Guardian/> on a site that is not occupied by another player.</div>,
        image: beastKillerImg,
    },
    sunDial: {
        id: "sunDial",
        effectsText:
            <div>Gain <Text/><Text/> or <b>pass</b> to gain <Jewel/>
            </div>,
    },
    tradersSatchel: {
        id: "tradersSatchel",
        effectsText:
            <Icons><Uptrade/><Coin/><Coin/><Coin/>
            </Icons>,
    },
    huntingArrows: {
        id: "huntingArrows",
        effectsText:
            <div>Gain <Fear/> to gain <Weapon/><Weapon/></div>,
    },
    coconutFlask: {
        id: "coconutFlask",
        effectsText:
            <div><Coin/><Coin/><br/><b>Activate</b> the weaker effect of an assistant in the offer.
            </div>,
    },
    cauldron: {
        id: "cauldron",
        effectsText:
            <Icons><Draw1Card/><DestroyCard/>
            </Icons>,
    },
    ancientWine: {
        id: "ancientWine",
        effectsText:
            <div><Coin/><br/>Use effect of <GoldAssistant/> available on the supply board.
            </div>,
    },
    decoratedHorn: {
        id: "decoratedHorn",
        effectsText:
            <div>Exchange your <AssistantUpgrade/> with one available in store, keep his level
                and Refresh him and</div>,
    },
    ornateHammer: {
        id: "ornateHammer",
        effectsText:
            <div>Exile rightmost <Item/> in the card row. Gain any <Item/> from the exile.</div>,
    },
    starCharts: {
        id: "starCharts",
        effectsText:
            <div>Pay <Coin/> to activate two different <LocationL1/>
            </div>,
    },
    stoneJar: {
        id: "stoneJar",
        effectsText:
            <Icons><Draw1Card/>
            </Icons>,
    },
    passageShell: {
        id: "passageShell",
        effectsText:
            <div><PlaceAdventurer/> onto a <LocationL1/> site for free. You may activate it twice instead of once.</div>,
    },
    ceremonialRattle: {
        id: "ceremonialRattle",
        effectsText:
            <div>Refresh <AssistantUpgrade/></div>,
    },
    sacredDrum: {
        id: "sacredDrum",
        effectsText:
            <div><Discard/><br/>Refresh all of your <AssistantUpgrade/></div>,
    },
    stoneKey: {
        id: "stoneKey",
        effectsText:
            <div>Return a slotted <BronzeRelic/> back to your pool.</div>,
    },
    obsidianEarring: {
        id: "obsidianEarring",
        effectsText:
            <div>Draw up to two cards from the bottom of your deck. Keep one of them and discard the
            other one with no effect.</div>,
    },
    guidingStone: {
        id: "guidingStone",
        effectsText:
            <div>Reveal the top tile of the <LocationL2/> stack. Activate it, then put it on the bottom.
            </div>,
    },
    guidingSkull: {
        id: "guidingSkull",
        effectsText:
            <div>Pay <Explore/> to reveal the top tile of the <LocationL2/> stack. Activate it, then put it on the bottom.
            </div>,
    },
    runesOfDead: {
        id: "runesOfDead",
        effectsText:
            <Icons><Fear/><Coin/><Text/><Text/><Text/></Icons>,
    },
    guradiansCrown: {
        id: "guradiansCrown",
        effectsText:
            <div>Move <Guardian/> from a site you occupy to any unocuppied
                <LocationL1/> or <LocationL2/> with no <Guardian/>. Activate the site.</div>,
    },
    lantern: {
        id: "lantern",
        effectsText: <div>Activate a <LocationL1 /> site.</div>
    }
});