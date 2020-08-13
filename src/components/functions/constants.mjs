import {EFFECT} from "../../data/effects";

export const silverAssistantsOfferNumber = 3;

export const TRANSPORT_EFFECTS = [EFFECT.loseWalk, EFFECT.losePlane, EFFECT.loseJeep, EFFECT.loseShip];

export const LOCATION_DISCOUNT_EFFECTS = [EFFECT.exploreAnyLocationWithDiscount2, EFFECT.exploreAnyLocationWithDiscount3,
    EFFECT.placeToBasicLocationDiscount2, EFFECT.placeToBasicLocationActivateTwice, EFFECT.placeToBrownLocation, EFFECT.placeToGreenLocation,
    EFFECT.placeAnywhere, EFFECT.placeToBrownLocation, EFFECT.placeToGreenLocation, EFFECT.placeAnywhere];

export const CANCELLABLE_EFFECTS = [EFFECT.destroyCard, EFFECT.uptrade, EFFECT.gainItemOfValue, EFFECT.activateThisLocationAgain,
    ...LOCATION_DISCOUNT_EFFECTS];

export const pointsForUnusedRelics = [
    [1], [2], [2], [3],
];

export const relicRewards = [[EFFECT.loseCoin, EFFECT.arrow, EFFECT.gainJewel], [EFFECT.gainWeapon], [EFFECT.gainText, EFFECT.gainText],
    [EFFECT.gainCoin, EFFECT.gainExplore], [EFFECT.draw1]];