"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const contracts_1 = require("../../app/contracts");
class ethersInterface {
    constructor(signer) {
        if (!signer) {
            throw new Error("signer is required");
        }
        this.signer = signer;
        this.contract = contracts_1.MetaDataHelper__factory.connect("0x236C580A7AC3ffB3b453B11F45Ed68187ed33C7E", this.signer);
    }
    async addData(id, dataToAdd, ogData) {
        const result = await this.contract.addToMetadata(id, dataToAdd, ogData);
        return result;
    }
    async createData(_ids, _types, _values) {
        const dataTest = ethers_1.ethers.utils.defaultAbiCoder.encode(_types, _values);
        const id = ethers_1.ethers.utils.hexlify([1, 2, 3, 4]);
        const result = this.contract.createMetadata(_ids, [dataTest]);
        return result;
    }
    async getDataById(_id, _metadata) {
        const result = await this.contract.getMetadata(_id, _metadata);
        return result;
    }
}
exports.default = ethersInterface;
