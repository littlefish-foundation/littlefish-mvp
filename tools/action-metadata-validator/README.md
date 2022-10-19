## Action Metadata Validator

This code tests the action metadata whether it conforms the type standards described in https://cips.cardano.org/cips/cip25/#generalstructure
The specific violations to the standards can be seen from the console output. 

### Usage

First please prepare a valid `action.json` file with the action metadata and make sure that this file is in the same folder with the validator. 
Then run the following command:

```bash
node index.js 
```