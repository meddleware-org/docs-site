---
title: Token Issuance reference
description: Limits, field rules, fee and gas, the messages you may see in Token Issuance, and where the on-chain details of your coin are documented.
---

# Token Issuance reference

The facts behind [Token Issuance](/blockchain/sui/token-issuance/): field rules and limits, the fee, the messages you may see, and the
on-chain documentation of what your coin can do. This page describes testnet;
[Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which networks are live.

## Field rules

| Field | Rule |
| --- | --- |
| Package name, module name | lowercase letters, digits and underscores; must start with a lowercase letter; 64 characters at most |
| Token name | required; 64 characters at most |
| Symbol | required; 32 characters at most |
| Description | optional; 256 characters at most |
| Text fields | no double quotes or backslashes |
| Icon URL | optional; `https://` or `ipfs://`; 512 characters at most |
| Decimals | a whole number from 0 to 18 (9 is typical on Sui) |
| Initial supply | a whole number of tokens; with your decimals it must fit within the largest amount a coin can hold; above zero if the supply is **Fixed** |
| Recipient | a full Sui address: `0x` followed by 64 hex digits; blank means your wallet |
| Icon upload | PNG, JPEG, WebP or SVG; stored on Walrus for 53 epochs |

## Fee and gas

| Item | Value (current default) | Paid to |
| --- | --- | --- |
| Platform fee | 2 SUI, once per coin, inside the publish transaction | the platform treasury |
| Network gas | a small fraction of a SUI (about 0.02 SUI for the publish, measured); the app allows up to 0.5 SUI as a budget, and you pay only the gas actually used | Sui validators |
| Fees on your coin's transfers | none | n/a |

See [Fees](/blockchain/sui/fees) for how these are set and when they may change.

## What the controls are

| Capability | Lets its holder | If you choose... | Then... |
| --- | --- | --- | --- |
| TreasuryCap | mint new coins and burn coins | Supply: Fixed | it never exists; the registry holds the fixed supply |
| MetadataCap | change the description and icon | Metadata: Frozen | it is deleted when the coin is created |
| UpgradeCap | replace the package code | Package code: Immutable | it is destroyed |

The on-chain pages explain these in full: the [overview](/blockchain/sui/onchain/token-issuance/overview) and
[what your coin can and cannot do](/blockchain/sui/onchain/token-issuance/user-guide).

## Messages you may see

| Message | What it means and what to do |
| --- | --- |
| Connect a Sui wallet to deploy your token. / Connect a wallet first. | Press **Connect wallet**. |
| Token issuance is not open on (network) yet. Switch to testnet to try it. | Coins cannot be issued on that network yet. Nothing was deployed. |
| Required | A needed field is empty. |
| Maximum (n) characters | The text is too long. |
| Double quotes and backslashes are not supported | Remove them. |
| Must start with a lowercase letter / Lowercase letters, digits and underscores only | Fix the package or module name. |
| Use an https:// or ipfs:// URL | Fix the icon URL. |
| Enter a whole number / Maximum is 18 (9 is typical on Sui) | Fix the decimals. |
| Enter a whole number, or leave blank for none | Fix the initial supply. |
| Supply exceeds the maximum for this decimal precision | Lower the supply or the decimals. |
| A fixed supply needs an initial supply above zero | Enter a supply, or choose Mintable. |
| Enter a full Sui address (0x followed by 64 hex digits) | Fix the recipient. |
| Your coin is published - finish its setup | The second transaction did not complete. Choose **Finish setup (sign again)**. Do not deploy again. |
| A coin was published, but the result could not be read | Check the publish transaction in an explorer. Do not deploy again. |

More: [Questions and troubleshooting](/blockchain/sui/faq).

## For developers

Generating the same coin from the command line, the template and the deployment flow are covered on the developer site:
[Token template developer guide](https://meddleware.dev/sui/onchain/token-issuance/dev-guide) and
[API reference](https://meddleware.dev/sui/onchain/token-issuance/api-reference).
