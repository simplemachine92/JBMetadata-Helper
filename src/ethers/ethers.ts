import { ethers } from "ethers";
import { MetaDataHelper__factory } from "../../app/contracts";
import { MetaDataHelper } from "../../app/contracts";

class ethersInterface {
  private signer: ethers.Wallet;
  contract!: MetaDataHelper;

  constructor(signer: ethers.Wallet) {
    if (!signer) {
      throw new Error("signer is required");
    }
    this.signer = signer;
    this.contract = MetaDataHelper__factory.connect(
      "0x236C580A7AC3ffB3b453B11F45Ed68187ed33C7E", this.signer
    );
  }

  async addData(id: string, dataToAdd: string, ogData: string) {
    const result = await this.contract.addToMetadata(
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

    const result = this.contract.createMetadata(_ids, [dataTest]);

    return result;
  }

  async getDataById(_id: string, _metadata: ethers.utils.BytesLike) {
    const result = await this.contract.getMetadata(_id, _metadata);

    return result;
  }
}

export default ethersInterface;
