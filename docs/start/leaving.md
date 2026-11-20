---
title: Leaving with your data
description: What you can take with you from each Meddleware tool, and how.
---

# Leaving with your data

You can stop using any Meddleware tool at any time and keep what you made with it. None of the tools available now needs an account
with us, so there is nothing to close.

| Tool | What is yours | Where it lives | How to use it without us |
| --- | --- | --- | --- |
| [Walrus Storage](/blockchain/sui/walrus-storage/) | your files and the record that you own them | Walrus, and the `Blob` object in your wallet | read your files from any Walrus aggregator, and extend them with any Walrus client |
| [Sealed Storage](/blockchain/sui/sealed-storage/) | your encrypted files and the rule that says who may open them | Walrus and Sui | decrypt with the open Seal library and your wallet; keep a copy of each file's manifest |
| [Access Gate](/blockchain/sui/access-gate/) | your gates, the passes people bought, and the payments | Sui; the gate's admin capability is in your wallet, and sales are paid to the payout address you set | any app that reads Sui can check a pass; your wallet controls the gate |
| [Token Issuance](/blockchain/sui/token-issuance/) | your coin and its controls | Sui; the capabilities are in the wallet you chose | any Sui wallet or explorer works with your coin |

The tools and their libraries are open source, so you can also run your own copy of any of them.
