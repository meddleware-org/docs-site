---
title: Sealed Storage reference
description: The manifest file, limits, deployed testnet identifiers and the messages you may see in Sealed Storage.
---

# Sealed Storage reference

The facts behind [Sealed Storage](/blockchain/sui/sealed-storage/): the manifest you keep, the limits, the deployed identifiers
and what the messages mean. This page describes testnet; [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says
which networks are live.

## The manifest

The file you download after sealing (`<label>.seal.json`). It holds **no secrets**:

```json
{
  "policyType": "nft-gate",
  "id": "(Seal identity, hex)",
  "blobId": "(Walrus blob ID of the encrypted file)",
  "network": "testnet",
  "params": { "gateId": "0x..." },
  "label": "(your label)"
}
```

| Field | Meaning |
| --- | --- |
| `policyType` | The rule the file was sealed under: `nft-gate` (access-gate NFT) or `time-lock`. |
| `id` | The encryption identity. It cannot be recomputed, and it is needed to open the file. |
| `blobId` | Where the encrypted file is on Walrus. |
| `network` | The network the file was sealed on. A manifest only works on that network. |
| `params` | Non-secret settings of the policy, such as the gate ID or the unlock time. |
| `label` | Your optional name for the file. It is public. |

Keep the manifest safe. Anyone who has it can try to open the file, but only if the policy lets them.

## Limits

| Limit | Value |
| --- | --- |
| Encrypted file size | about 10 MiB by default (the public Walrus publisher's limit) |
| Time stored on Walrus | the number of epochs stated at the Confirm step (default 5), then the encrypted file is gone unless you extend it |
| Key servers needed to open a file | a threshold of the committee, for example 2 of 3 (default 2) |
| Label length of a published discovery pointer | 256 characters |
| Wallet signature | one per session, then the session expires |

## Deployed identifiers (testnet)

These are the on-chain identifiers behind the tool, for checking in a [Sui explorer](https://suiscan.xyz).

| Thing | ID |
| --- | --- |
| `sealed_storage` package | `0x0c8f73490b14836e6a7a724fb46b242cb061d04a5f193fd637159997f8a1773d` |
| `PolicyConfig` object (version gate) | `0xee0403ba15c250223527150d147f29bedfb1ec46bb2282c341be462ff0ad7d1a` |

The contract's own documentation is imported from its package: the [on-chain overview](/blockchain/sui/onchain/sealed-storage/overview) and
[what the policies allow](/blockchain/sui/onchain/sealed-storage/user-guide).

## Messages you may see

| Message | What it means and what to do |
| --- | --- |
| Connect a Sui wallet to encrypt and decrypt sealed content. | Press **Connect wallet**. |
| Sealed Storage is not available on (network): no sealed_storage deployment is recorded for it. | The tool is not deployed on the network you chose. Switch to a network where it is. |
| A warning at the top of the tool saying Sealed Storage is not available or not configured here | Sealing is switched off on this network for a reason you cannot change. Try again later; see the [status page](/blockchain/sui/status-and-roadmap). |
| Choose a file to encrypt. | Pick a file in the **Details** step. |
| Confirm that you want to seal to the gate from the link. | Tick the box at the Confirm step, or go back and choose the gate yourself. |
| This gate could not be read as an access gate of this network | The gate ID is wrong, or belongs to another network. |
| Unrecognised or invalid manifest. | The text is not a manifest. Paste the whole file. |
| This manifest is for (network), but this app is on (network). It cannot be decrypted here. | Open the app on the network named in the manifest. |
| Paste or upload a valid manifest. | The Manifest step needs a manifest before **Decrypt**. |
| Requesting decryption keys - approve the signature in your wallet... | Approve the signature in your wallet. |
| User does not have access to one or more of the requested keys | The key servers refused: the policy said no. See [Questions and troubleshooting](/blockchain/sui/faq#cant-decrypt). |
| Enter a gate id to search. / Enter your pass NFT id. | Fill in the field in the **Unlock** tab. |
| No sealed content published for this gate. | The gate owner has not published a discovery pointer. Ask them for the manifest. |
| This content is already sealed to the current key servers; nothing to do. | Re-seal is not needed. |

## For developers

Using Sealed Storage from your own code, the manifest format, and writing policies are covered on the developer site:
[Sealed Storage SDK](https://meddleware.dev/sui/sealed-storage/), [integration](https://meddleware.dev/sui/sealed-storage/integration) and
[Writing policies](https://meddleware.dev/sui/sealed-storage/policies). The generated [client API](./api/) lists every function.
