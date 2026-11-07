---
title: Access Gate
description: Create and sell NFT passes that prove someone may use your content, service or app - unlimited or single-use, transferable or soulbound - with ownership checked on-chain.
---

# Access Gate

Create **passes** (NFTs) that prove someone may use something of yours: a download, an API, an app, a members' area or encrypted
files. Ownership is checked on-chain, so there is no account system to run. Gate owners create and manage gates in the console at
[sui-access-gate.meddleware.co.uk](https://sui-access-gate.meddleware.co.uk), or in the **Access Gate** tab of the
[dashboard](/blockchain/sui/dashboard).

This page describes the tool on Sui **testnet**. [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which
networks are live.

## What it is

An **access gate** is an on-chain object with a price and a set of rules. Anyone can **buy** a pass (an NFT) from it, and holding a valid
pass is the proof of access. Passes can be **unlimited** (a membership) or **single-use** (spent a use at a time), and optionally
**soulbound** (impossible to transfer).

There are two roles:

- **Gate owners** create and manage gates: set the price, give passes away, pause sales, freeze the gate.
- **Pass holders** buy a pass and use it to reach whatever the gate protects.

The console is for gate owners. A buyer purchases in whichever app or page the gate owner points to. For example, the
[Walrus Storage](/blockchain/sui/walrus-storage/) app sells the pass for Meddleware's upload relay.

## When to use it

- You want to **sell access**: a paid community, premium content, a members' area.
- You want to **gate a service or app** behind pass ownership. The service must check passes itself (a developer task: see below).
- You want to gate **encrypted content**: combine it with [Sealed Storage](/blockchain/sui/sealed-storage/), where a pass becomes the key.
- You want **tickets** or **memberships** represented as NFTs.

## How a purchase works

1. The buyer pays the gate's price in SUI, plus network gas.
2. The payment is split on-chain, in the same transaction: a **commission** to the platform treasury and the rest to the gate's **payment
   recipient** (the gate owner, or whoever the owner named). Any overpayment is refunded.
3. The buyer receives the pass NFT.

The gate owner does not have to approve or co-sign a purchase, and a purchase either happens completely or not at all.

## Unlimited and single-use passes

- An **unlimited** pass is an ongoing membership. Using it does not consume it.
- A **single-use** pass carries a number of **uses** (the console also calls them **credits**). The holder spends one by approving an
  on-chain "use" transaction, which leaves a verifiable record the service can check. Nobody else can spend your pass.

When a single-use pass reaches zero uses, the gate owner's **auto-burn** setting decides whether it is deleted or kept as a spent receipt. A
spent pass cannot grant access either way.

## Soulbound passes

A **soulbound** pass cannot be transferred, not even by its holder. Use it when access should stay with one wallet and not be resold. If
the holder loses the wallet, the pass is gone with it. The rule is enforced by the contract. Whether a gate's passes are soulbound is chosen
when the gate is created and cannot change.

## What it costs

The platform takes a **commission** on each sale, at current defaults **0.2% of the price, but never less than 0.0005 SUI and never more
than 10%**, so a paid pass costs at least **0.005 SUI**. Creating a paid gate is free apart from network gas. A **free** gate (price 0)
pays a one-off platform fee, currently **1 SUI**. Giving passes away (an **airdrop**) pays the commission a sale would have paid. See
[Fees](/blockchain/sui/fees) for all the figures and who receives them. The terms are held in a shared on-chain setting, and a gate owner
sets only the price.

## Pausing and freezing

- **Pause** stops new purchases for a while. It does not take back passes already sold.
- **Freeze** makes the gate permanent: its settings and airdrops can never be changed again. Purchases and uses carry on. This cannot be undone.

## For developers

To make your own service check passes, or to run a gateway that puts any web service behind a gate, see the
[Access Gate integration guide](https://meddleware.dev/sui/access-gate/) on the developer site.

## Next

- **[Walkthrough](/blockchain/sui/access-gate/walkthrough)**: create and manage a gate; buy and use a pass.
- **[Reference](/blockchain/sui/access-gate/reference)**: settings, fees, rules and the messages you may see.
