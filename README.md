# Juicebox Metadata Helper Package

## To-do

* Meta-data builder in JS instead of calling helper
* Build rules / script
* Configure eslint
* ESM Compatibility
* Viem interface

## Usage / Importing

Install with package manager
```npm i juicebox-metadata-helper```

Usage in files:
```
import {ethersInterface} from "juicebox-metadata-helper";
```

## Create your Helper Instance

```
import {ethersInterface} from "juicebox-metadata-helper";

  const goerliProvider = new ethers.providers.JsonRpcProvider(
    "YOUR_RPC_URL_STRING",
    "goerli"
  );

  // Instantiate a random signer since we're only calling pure/view functions
  const defaultSigner = ethers.Wallet.createRandom().connect(goerliProvider);

  // Instantiate our metadata-helper class
  const toolkit = new ethersInterface(defaultSigner);
```

## Create a JB compliant Delegate Metadata:

```
// Start building a call to create data
  const testData = [
    [
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ],
  ];

  // Build our 4byte ID
  const id = ethers.utils.hexlify([1, 2, 3, 4]);

  // Send our id, types, and values.
  const res = await toolkit.createData([id], ["address[]"], testData);
```
