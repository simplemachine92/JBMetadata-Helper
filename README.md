# Juicebox Metadata Helper Package

## To-do

* Build rules / CI & Tests
* Configure eslint
* ESM Compatibility

## Install / Importing

Install with package manager
```npm i juicebox-metadata-helper```

```
import {createMetadata} from "juicebox-metadata-helper";
```

## Usage

```
  // Start building our data to add
  const types = ["address[]"];

  const testData = [
    [
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ],
  ];

  // Build our 4byte ID
  const id = ethers.utils.hexlify([1, 2, 3, 4]);

  // Encode metadata
  const testDataE = ethers.utils.defaultAbiCoder.encode(types, testData);

  // Create lookup table with our handy helper
  const res = createMetadata([id], [testDataE]);
```