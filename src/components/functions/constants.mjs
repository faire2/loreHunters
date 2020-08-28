import {EFFECT} from "../../data/effects.mjs";
import {AUTOMATON, DIRECTION} from "./enums.mjs";

export const silverAssistantsOfferNumber = 3;

export const TRANSPORT_EFFECTS = [EFFECT.loseWalk, EFFECT.losePlane, EFFECT.loseJeep, EFFECT.loseShip];

export const LOCATION_DISCOUNT_EFFECTS = [EFFECT.exploreAnyLocationWithDiscount2, EFFECT.exploreAnyLocationWithDiscount3,
    EFFECT.placeToBasicLocationDiscount2, EFFECT.placeToBasicLocationActivateTwice, EFFECT.placeToBrownLocation, EFFECT.placeToGreenLocation,
    EFFECT.placeAnywhere, EFFECT.placeToBrownLocation, EFFECT.placeToGreenLocation, EFFECT.placeAnywhere];

export const CANCELLABLE_EFFECTS = [EFFECT.destroyCard, EFFECT.uptrade, EFFECT.gainItemOfValue, EFFECT.activateThisLocationAgain,
    ...LOCATION_DISCOUNT_EFFECTS, EFFECT.defeatGuardianOnOwnedLocation, EFFECT.defeatGuardianOnOwnOrEmptyLocation];

export const pointsForUnusedRelics = [
    [1], [2], [2], [3],
];

export const relicRewards = [[EFFECT.loseCoin, EFFECT.arrow, EFFECT.gainJewel], [EFFECT.gainWeapon], [EFFECT.gainText, EFFECT.gainText],
    [EFFECT.gainCoin, EFFECT.gainExplore], [EFFECT.draw1]];

export const automatonActions = [
    {action: AUTOMATON.adventurerCoin, direction: DIRECTION.left},
    {action: AUTOMATON.adventurerExplore, direction: DIRECTION.right},
    {action: AUTOMATON.adventurerText, direction: DIRECTION.left},
    {action: AUTOMATON.adventurerWeapon, direction: DIRECTION.right},
    {action: AUTOMATON.adventurerJewel, direction: DIRECTION.left},
    {action: AUTOMATON.takesItem, direction: DIRECTION.right},
    {action: AUTOMATON.takesArtifact, direction: DIRECTION.left},
    {action: AUTOMATON.exploresLocation, direction: DIRECTION.right},
    {action: AUTOMATON.researches, direction: DIRECTION.left},
    {action: AUTOMATON.defeatsOrResearches, direction: DIRECTION.right}
];

export const automatonTurns = [0, 7, 8, 9, 10];