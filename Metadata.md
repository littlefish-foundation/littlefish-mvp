# Littlefish Action Metadata version:0.0.1
This Littlefish MVP project has specified an Action metadata to be used for the project. 
All actions in the Littlefish project must comply with the metadata. 
This metadata is compatible with [CIP25- NFT Metadata Standard](https://cips.cardano.org/cips/cip25/#version1).

## Action metadata
You can see the example action metadata below: 
```json
{
  "721": {
    "collection_policy_id": {
      "LittlefishAction": {
        "id": "01GDNHB3H0XFMZ7MPSEGW2TNM8",
        "name": "Frontend Updates", 
        "description": ["This action is ......", "End of the action description."], 
        "image":"ipfs://......", 
        "mediaType": "image/png", 
        "version": "0.0.1",  
        "mintDate": "1663948777372",
        "types": ["Research","Software Development"], 
        "colony": "Littlefish Foundation", 
        "producer": "addr1.....",
        "links": [
          {
            "name": "Youtube",
            "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            "name": "Linktree",
            "url": "https://linktr.ee/littlefish.foundation"
         }
        ], 
        "files": [{
          "name": "Image 1", 
          "mediaType": "image/png",
          "src": "ipfs://.....", 
        },{
          "name": "Image 2",
          "mediaType": "image/png", 
          "src": "ipfs://.....",
        }]
      }
    }
  }
}   
```

## Membership badge metadata
Membership badge metadata is an extension of the Action metadata. Here an example of membership badge:

```json
{
  "721": {
    "collection_policy_id": {
      "LittlefishAction": {
        "id": "01GDNHB3H0XFMZ7MPSEGW2TNM8",
        "name": "Littlefish Colony Membership Badge#1", 
        "description": ["This action represents membership to Littlefish Colony"], 
        "image":"ipfs://......", 
        "mediaType": "image/png", 
        "version": "0.0.1",  
        "mintDate": "1663948777372",
        "types": ["Membership Badge"], 
        "colony": "Littlefish Foundation", 
        "mintedFor": "addr1.....",
        "links": [
          {
            "name": "Linktree",
            "url": "https://linktr.ee/littlefish.foundation"
         }
        ], 
        "files": [{
          "name": "Colony Whitepaper", 
          "mediaType": "application/pdf",
          "src": "ipfs://....."
        }
        ]
      }
    }
  }
}   
```
