import {FIELD_SIZE} from "../../../data/legends.mjs";

export function getCanPlaceTokens(canPlaceTokens, legend, fieldIndex, columnIndex, previousColumnPositions) {
    if (fieldIndex === 0) {
        switch (legend.fields[columnIndex][0].size) {
            case FIELD_SIZE["1"]:
                canPlaceTokens[0] = previousColumnPositions[0][0];
                canPlaceTokens[1] = previousColumnPositions[1][0];
                break;
            case FIELD_SIZE["1.5"]:
            case FIELD_SIZE["2"]:
                canPlaceTokens[0] = previousColumnPositions[0][0] || previousColumnPositions[0][1];
                canPlaceTokens[1] = previousColumnPositions[1][0] || previousColumnPositions[1][1];
                break;
            case FIELD_SIZE["3"]:
                canPlaceTokens[0] = previousColumnPositions[0][0] || previousColumnPositions[0][1] || previousColumnPositions[0][2];
                canPlaceTokens[1] = previousColumnPositions[1][0] || previousColumnPositions[1][1] || previousColumnPositions[1][2];
                break;
            default:
                console.warn("Unable to determine field size in previousColumnPositions");
        }
    } else if (fieldIndex === 1 && (legend.fields[columnIndex][0].size === FIELD_SIZE["1"]
        || legend.fields[columnIndex][0].size === FIELD_SIZE["1.5"])) {
        switch (legend.fields[columnIndex][1].size) {
            case FIELD_SIZE["1"]:
                canPlaceTokens[0] = previousColumnPositions[0][1];
                canPlaceTokens[1] = previousColumnPositions[1][1];
                break;
            case FIELD_SIZE["1.5"]:
            case FIELD_SIZE["2"]:
                canPlaceTokens[0] = previousColumnPositions[0][1] || previousColumnPositions[0][2];
                canPlaceTokens[1] = previousColumnPositions[1][1] || previousColumnPositions[1][2];
                break;
            default:
                console.warn("Unable to determine field size in previousColumnPositions");
        }
    } else if (fieldIndex === 1 && legend.fields[columnIndex][0].size === FIELD_SIZE["2"]) {
        switch (legend.fields[columnIndex][1].size) {
            case FIELD_SIZE["1"]:
                canPlaceTokens[0] = previousColumnPositions[0][2];
                canPlaceTokens[1] = previousColumnPositions[1][2];
                break;
            default:
                console.warn("Unable to determine field size in previousColumnPositions");
        }
    } else if (fieldIndex === 2) {
        switch (legend.fields[columnIndex][2].size) {
            case FIELD_SIZE["1"]:
                canPlaceTokens[0] = previousColumnPositions[0][2];
                canPlaceTokens[1] = previousColumnPositions[1][2];
                break;
            default:
                console.warn("Unable to determine field size in previousColumnPositions");
        }
    }
    return canPlaceTokens;
}