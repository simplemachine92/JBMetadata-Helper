import { ethers } from "ethers";
import { getGoerliSdk } from "@dethcrypto/eth-sdk-client";

class ethersInterface {
  private signer: ethers.Wallet;
  sdk: any;

  constructor(signer: ethers.Wallet) {
    if (!signer) {
      throw new Error("signer is required");
    }
    this.signer = signer;
    this.sdk = getGoerliSdk(signer);
  }

  async addData(id: string, dataToAdd: string, ogData: string) {
    const result = await this.sdk.metaDataHelper.addToMetadata(
      id,
      dataToAdd,
      ogData
    );

    return result;
  }

  async createData(
    _ids: string[],
    _types: readonly (string | ethers.utils.ParamType)[],
    _values: readonly any[]
  ) {
    const dataTest = ethers.utils.defaultAbiCoder.encode(_types, _values);

    const id = ethers.utils.hexlify([1, 2, 3, 4]);

    const result = this.sdk.metaDataHelper.createMetadata(_ids, [dataTest]);

    return result;
  }

  async getDataById(_id: string, _metadata: ethers.utils.BytesLike) {
    const result = await this.sdk.metaDataHelper.getMetadata(_id, _metadata);

    return result;
  }
}

export default ethersInterface;
