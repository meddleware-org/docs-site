---
title: Token Issuance
description: Deploy your own Sui coin from your browser - what you get, the one-off fee, which choices are permanent, what happens on-chain and the risks to understand first.
---

# Token Issuance

Deploy your own coin on Sui directly from your browser. Your wallet signs and pays for everything; nothing is compiled or signed on a
Meddleware server, and you keep the complete source code of what you deployed. Open the app at
[sui-token-issuance.meddleware.co.uk](https://sui-token-issuance.meddleware.co.uk), or use the **Token Issuance** tab of the
[dashboard](/blockchain/sui/dashboard).

This page describes the tool on Sui **testnet**. [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which
networks are live. If a network is not open for issuing coins you will see "Token issuance is not open on (network) yet. Switch to
testnet to try it." and nothing is deployed.

## What you get

- A **new coin** of your own, with its own name, symbol and decimals, registered in Sui's coin registry so wallets can find and show it.
- A new **package** (the coin's code) published for it. One package per coin; a new coin is always a new package.
- An **initial supply** (possibly zero) sent to the address you choose.
- **Capabilities** that control the coin afterwards, depending on your choices below: the right to mint more, to change its description and
  icon, and to upgrade its code.
- A **source package (.zip)** of the exact code you deployed, which you can download and rebuild to check it matches what is on-chain, and
  optionally push to a GitHub repository in your own account.

## What it costs

A one-off **platform fee of 2 SUI** (current default; may change) is included in the publish transaction and paid to the platform treasury, plus
the network's **gas**, which is a small fraction of a SUI. The coin itself never charges fees on transfers. Details and the exact numbers
are on [Fees](/blockchain/sui/fees). The review step shows the fee before you confirm.

## Choices you make, and which are permanent

| Choice | Options | Can it change later? |
| --- | --- | --- |
| Symbol, decimals, package and module name | free text within limits | **No.** They are fixed for good, whatever else you choose |
| **Supply** | **Mintable**: you keep the right to mint more. **Fixed**: the whole supply is created at the start and nobody can ever mint again | A fixed supply is final, even if you got the amount wrong. A mintable supply stays in the hands of whoever holds the mint capability |
| **Metadata** | **Updatable**: you keep the right to change the name, description and icon (the symbol and decimals never change). **Frozen**: all of them are locked for good | Frozen is final |
| **Package code** | **Immutable** (recommended): the right to upgrade is destroyed and the code is sealed. **Upgradeable**: you keep the upgrade capability | Immutable is final |
| **Recipient** | the address that receives the capabilities and the initial supply (your wallet if left blank) | No. Check it carefully |

Choosing **fixed**, **frozen** and **immutable** gives holders the strongest guarantees, and wallets can see them. Mintable, updatable or
upgradeable keeps the flexibility, and the trust that goes with it rests on whoever holds those capabilities.

## What happens on-chain, in plain words

1. **Publish.** One transaction publishes your coin's package and pays the platform fee. When the package is created it registers your coin
   with Sui's coin registry (fixing its decimals, symbol and name), creates the initial supply, and applies your supply and metadata
   choices. A fixed supply is handed to the registry so no mint capability exists. Frozen metadata deletes the metadata capability. An
   immutable package burns its upgrade capability.
2. **Finalise.** A second transaction completes the registration so the coin becomes a shared, discoverable object, and moves the
   remaining capabilities and the initial supply to your recipient.

You approve **two** wallet prompts. If the second one is interrupted, the app shows "Your coin is published - finish its setup". Choose
**Finish setup (sign again)**. Do not deploy again; that would publish a second coin.

## Risks to understand first

- **Everything above that is marked permanent is permanent.** Transactions on a blockchain cannot be reversed.
- **Whoever holds a capability has its power.** If you keep the mint capability, anyone who obtains it can create unlimited coins. Keep it in a
  wallet you control, or give it up by choosing a fixed supply. Sending a capability to someone transfers the power with it.
- **A wrong recipient is unrecoverable.** The capabilities and the supply go to the address you enter.
- **Icons live elsewhere.** An icon is a link to a file hosted somewhere (for example on Walrus). If that file disappears, wallets show a broken
  icon. An icon you upload through the app is stored on Walrus for a limited time (see [Walrus Storage](/blockchain/sui/walrus-storage/)).
- **You are the author.** Meddleware does not review, approve or endorse any coin made with the tool, and its appearance here is not a mark
  of legitimacy. You are responsible for your coin, its content and its use, including following the law where you live. Do not create coins that
  impersonate other projects or mislead people.
- **No custody.** Meddleware never holds your coin, your keys or your capabilities.

## Next

- **[Walkthrough](/blockchain/sui/token-issuance/walkthrough)**: deploy a coin step by step.
- **[Reference](/blockchain/sui/token-issuance/reference)**: limits, messages and the on-chain details.
- What your coin can and cannot do afterwards: [the on-chain user guide](/blockchain/sui/onchain/token-issuance/user-guide).
