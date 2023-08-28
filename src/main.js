"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const getMetadata_1 = __importDefault(require("./purejs/getMetadata"));
const createMetadata_1 = __importDefault(require("./purejs/createMetadata"));
const assert_1 = __importDefault(require("assert"));
const eth_sdk_client_1 = require("@dethcrypto/eth-sdk-client");
const goerliProvider = new ethers_1.ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/cf24d56cea4141b08f70122415338780");
/* const goerliProvider = ethers.getDefaultProvider("goerli"); */
const defaultSigner = ethers_1.ethers.Wallet.createRandom().connect(goerliProvider);
const sdk = (0, eth_sdk_client_1.getGoerliSdk)(defaultSigner);
async function main() {
    // Build our 4byte ID
    const id = ethers_1.ethers.utils.hexlify([1, 2, 3, 4]);
    const id2 = ethers_1.ethers.utils.hexlify([1, 2, 3, 3]);
    // Start building a call to create data
    const testData = [
        [
            "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        ],
    ];
    const types = ["address[]"];
    // Start building a call to create data
    const testData2 = [
        [
            "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        ],
    ];
    const types2 = ["address[]"];
    const encoded1 = ethers_1.ethers.utils.defaultAbiCoder.encode(types, testData);
    const encoded2 = ethers_1.ethers.utils.defaultAbiCoder.encode(types2, testData2);
    const jsRes = (0, createMetadata_1.default)([id, id2], [encoded1, encoded2]);
    const contractRes = await sdk.metaDataHelper.createMetadata([id, id2], [encoded1, encoded2]);
    console.log('contract: ', contractRes);
    console.log('js: ', jsRes);
    const isEq = assert_1.default.equal(jsRes, contractRes);
    const getById = (0, getMetadata_1.default)(id, jsRes);
    console.log(getById);
}
if (require.main === module) {
    main();
}
