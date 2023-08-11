import { ethers } from "ethers";
import getMetadata from "./purejs/getMetadata";
import createMetadata from "./purejs/createMetadata";
import assert from "assert";
import { getGoerliSdk } from "@dethcrypto/eth-sdk-client";

const goerliProvider = new ethers.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/512122ae7cd847d4a5b78c1810cc4bc2"
);

/* const goerliProvider = ethers.getDefaultProvider("goerli"); */

const defaultSigner = ethers.Wallet.createRandom().connect(goerliProvider);

const sdk = getGoerliSdk(defaultSigner);

async function main() {
  // Build our 4byte ID
  const id = ethers.utils.hexlify([1, 2, 3, 4]);
  const id2 = ethers.utils.hexlify([1, 2, 3, 3]);

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

  const encoded1 = ethers.utils.defaultAbiCoder.encode(types, testData);
  const encoded2 = ethers.utils.defaultAbiCoder.encode(types2, testData2);

  const jsRes = createMetadata([id, id2], [encoded1, encoded2]);

  const contractRes = await sdk.metaDataHelper.createMetadata([id, id2], [encoded1, encoded2])

  console.log('contract: ', contractRes)
  console.log('js: ', jsRes);

  /* const res2 = getMetadata(id2, jsRes); */
  const isEq = assert.equal(jsRes, contractRes);
}

if (require.main === module) {
  main();
}