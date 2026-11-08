---
title: Deploying a coin with Token Issuance
description: Step-by-step guide to deploying a Sui coin - identity, token details, supply and policies, review, two wallet approvals, and what to keep afterwards.
---

# Deploying a coin with Token Issuance

A walkthrough of the [Token Issuance app](https://sui-token-issuance.meddleware.co.uk). Read [the overview](/blockchain/sui/token-issuance/)
first: it explains which choices are permanent. You need a [Sui wallet](/blockchain/sui/getting-started) set to Sui testnet; see
[Getting started](/blockchain/sui/getting-started#where-the-tools-run) for which networks are live.

Before you start, have in your wallet about **2.5 SUI** or more: the 2 SUI platform fee plus room for the gas budget (the app asks the
wallet to allow up to 0.5 SUI of gas; the real cost is a small fraction of that and the unused part is not charged).

The app has two tabs: **Deploy** and **My Tokens**. Press **Connect wallet** first ("Connect a Sui wallet to deploy your token.").

## Deploy

The wizard has five steps: **Identity**, **Token**, **Settings**, **Review** and **Done**. Each field has a hint beside it. A field shows
its error once you leave it, and **Next** is disabled until the step is valid. You can go **Back** at any time before deploying.

### 1. Identity (permanent)

- **Package name**: the name of your coin's code package, in lowercase letters, digits and underscores (for example `my_token`).
- **Module name**: a lowercase name for the module inside it (for example `mytoken`). The coin's type is built from it.

The page previews the coin type as `<package>::<module>::<STRUCT>` once both names are valid. These names cannot be changed.

### 2. Token

- **Token name**: the display name wallets show (for example "My Token").
- **Symbol**: the short ticker (for example MYT).
- **Description** (optional).
- **Decimals** (permanent): how many decimal places the coin has. **9** is the Sui convention (1 token = 1,000,000,000 base units).
- **Icon** (optional), in one of three ways:
  - **URL**: an `https://` or `ipfs://` link to an image.
  - **Upload**: choose an image (PNG, JPEG, WebP or SVG) and **Upload to Walrus**. It goes through an upload relay, like in
    [Walrus Storage](/blockchain/sui/walrus-storage/), and may need a pass and a small fee on Meddleware's relay. Leave **Permanent blob**
    ticked so the icon stays available. The file is stored for 53 epochs; extend it later in Walrus Storage.
  - **Browse**: pick an image you have already stored on Walrus.

### 3. Supply and policies

- **Initial supply**: whole tokens created at the start and sent to the recipient. `0` or blank means none. It must fit the number of decimals
  you chose.
- **Supply**: **Mintable** or **Fixed**. Fixed needs an initial supply above zero.
- **Metadata**: **Updatable** or **Frozen**.
- **Package code**: **Immutable** (recommended) or **Upgradeable**.
- **Recipient**: the address that receives the capabilities you keep and the initial supply. Blank means your connected wallet. Check this
  address character by character.
- **License**: the licence written into the source package you can download. It does not affect the coin on-chain.

Choose **Review & deploy**.

### 4. Review

The first time you continue, a window **Before you deploy** lists the terms: everything runs on your computer; the tool is neutral and does
not review or endorse any coin; you are responsible for your coin; on-chain transactions are irreversible; and Meddleware accepts no liability for
loss or harm from your use of the tool. Choose **I understand - continue** to accept (the app remembers this in your browser).

The **Review** card shows the permanent values (symbol, decimals, coin type, and the name too when you froze the metadata), the initial supply, supply policy, metadata policy, package
code, licence and recipient. It also states the one-off fee and the treasury address that receives it. Choose **Confirm & deploy**.

### 5. Deploying and Done

A progress list shows **Preparing the module**, **Publishing (sign in your wallet)**, **Confirming on-chain**, **Finalizing supply & caps (sign
again)**, **Confirming finalize** and **Done**. Keep the tab open and approve both wallet prompts.

When it finishes the page says "(SYMBOL) is live on (network)" and shows:

- The **Coin type** and **Package** (with a link to an explorer).
- The **TreasuryCap** and **MetadataCap**, if you kept them. If you chose a fixed supply or frozen metadata, the page says
  "Fixed - recorded in the coin registry (no TreasuryCap exists)" or "Frozen - recorded in the coin registry (no MetadataCap exists)".
- **Package code**: "Upgradeable" or "Immutable (UpgradeCap burned)".

Then:

- **Download source package (.zip)** gives you the full, buildable code that matches what is on-chain. Keep it.
- **Create a GitHub repo (optional)** pushes that code to a new repository in your own GitHub account. It asks for **your own** GitHub token, sends it
  only to GitHub, never stores it, and clears it when finished. Tick **Make the repository private** if you want that.
- **Deploy another** starts again.

::: warning Keep your capabilities safe
The TreasuryCap (mint and burn), MetadataCap (change description and icon) and UpgradeCap (change the code) are the controls of your coin.
They are in the recipient's wallet. Whoever holds one has that power, and Meddleware cannot recover them.
:::

## My Tokens

**My Tokens** lists the coins your wallet has deployed with this tool: each with its coin type, package and treasury cap (or "None - the supply
is fixed, or the cap is held elsewhere"). An empty list says "No deployed tokens found for this wallet. Deploy one from the Deploy tab."

## If something goes wrong

- **"A coin was published, but the result could not be read."** The page shows the publish transaction. Check it in a Sui explorer before doing
  anything else, and do not deploy again.
- **Your coin is published but not finished.** Choose **Finish setup (sign again)**.
- For other messages see the [reference](/blockchain/sui/token-issuance/reference#messages-you-may-see) and
  [Questions and troubleshooting](/blockchain/sui/faq).
