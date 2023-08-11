"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const MIN_METADATA_LENGTH = 37;
const RESERVED_SIZE = 32;
const ID_SIZE = 4;
const NEXT_DELEGATE_OFFSET = 8;
const WORD_SIZE = 32;
const TOTAL_ID_SIZE = 5;
function getMetadata(id, metadata) {
    const metadataBytes = ethers_1.ethers.utils.arrayify(metadata);
    if (metadataBytes.length <= MIN_METADATA_LENGTH)
        return [false, ""];
    const firstOffset = metadataBytes[RESERVED_SIZE + ID_SIZE];
    for (let i = RESERVED_SIZE; metadataBytes[i + ID_SIZE] != 0 && i < firstOffset * WORD_SIZE;) {
        const currentOffset = metadataBytes[i + ID_SIZE];
        const idBytes = metadataBytes.slice(i, i + ID_SIZE);
        const idHex = ethers_1.ethers.utils.hexlify(idBytes);
        if (idHex == id) {
            const end = i + NEXT_DELEGATE_OFFSET >= firstOffset * WORD_SIZE ||
                metadataBytes[i + NEXT_DELEGATE_OFFSET] == 0
                ? metadataBytes.length
                : metadataBytes[i + NEXT_DELEGATE_OFFSET] * WORD_SIZE;
            const targetMetadataBytes = metadataBytes.slice(currentOffset * WORD_SIZE, end);
            const targetMetadata = ethers_1.ethers.utils.hexlify(targetMetadataBytes);
            return [true, targetMetadata];
        }
        i += TOTAL_ID_SIZE;
    }
    return [false, ""];
}
exports.default = getMetadata;
