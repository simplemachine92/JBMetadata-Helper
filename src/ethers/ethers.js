"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const eth_sdk_client_1 = require("@dethcrypto/eth-sdk-client");
class ethersInterface {
    constructor(signer) {
        if (!signer) {
            throw new Error("signer is required");
        }
        this.signer = signer;
        this.sdk = (0, eth_sdk_client_1.getGoerliSdk)(signer);
    }
    async addData(id, dataToAdd, ogData) {
        const result = await this.sdk.metaDataHelper.addToMetadata(id, dataToAdd, ogData);
        return result;
    }
    async createData(_ids, _types, _values) {
        const dataTest = ethers_1.ethers.utils.defaultAbiCoder.encode(_types, _values);
        const id = ethers_1.ethers.utils.hexlify([1, 2, 3, 4]);
        const result = this.sdk.metaDataHelper.createMetadata(_ids, [dataTest]);
        return result;
    }
    async getDataById(_id, _metadata) {
        const result = await this.sdk.metaDataHelper.getMetadata(_id, _metadata);
        return result;
    }
}
exports.default = ethersInterface;
