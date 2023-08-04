"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eth_sdk_1 = require("@dethcrypto/eth-sdk");
exports.default = (0, eth_sdk_1.defineConfig)({
  contracts: {
    goerli: {
      metaDataHelper: "0x236C580A7AC3ffB3b453B11F45Ed68187ed33C7E",
    },
  },
});
