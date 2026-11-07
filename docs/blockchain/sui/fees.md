---
title: Fees
description: Every fee you can pay when using the Meddleware tools, in plain words - what it is, the current default amount, and who receives it.
---

# Fees

This page lists **every** fee you can pay when you use the Meddleware tools, who receives it, and the **current default** amount.

::: warning Current defaults, may change
The amounts below are the current defaults. Meddleware reviews them regularly and can change them: the platform's commission terms are
held in a shared on-chain setting, and the other fees are set in the apps. **The app always shows the exact amount before you approve**, and
your wallet shows it again when you sign. Check the figure in front of you, not this page, before you pay. These figures describe testnet;
[Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which networks are live.
:::

SUI amounts are written in SUI. For reference, 1 SUI is 1,000,000,000 MIST, the smallest unit.

## Fees paid to Meddleware

Meddleware receives these at the **platform treasury**, whose address and balance anyone can see in the [Treasury](/blockchain/sui/treasury/).

| What | Current default | When you pay it |
| --- | --- | --- |
| **Commission on an access pass sale** | 0.2% of the price, but never less than 0.0005 SUI and never more than 10% (a limit enforced by the contract) | Each time a pass is bought from a gate. It comes out of the price, so the buyer pays no extra |
| **Minimum price of a paid pass** | 0.005 SUI | Not a fee: the lowest price a gate owner can set (ten times the minimum commission) |
| **Free-gate fee** | 1 SUI, once per gate | When a gate owner creates a free gate (price 0), or makes a gate free for the first time |
| **Airdrop commission** | the commission a sale at the gate's price would pay | When a gate owner gives passes away from a paid gate |
| **Token issuance fee** | 2 SUI, once per coin | In the transaction that publishes a new coin with [Token Issuance](/blockchain/sui/token-issuance/) |
| **Upload relay fee** | 0.0001 SUI plus 1 MIST (0.000000001 SUI) per KiB of the *encoded* file, which Walrus makes several times the file size plus a fixed overhead. In practice about 0.00016 SUI for a small file, 0.00021 SUI for 10 MiB and 0.0006 SUI for 100 MiB. The app will not pay more than 0.005 SUI | With each upload through Meddleware's Walrus relay |
| **Upload pass for Meddleware's relay** | 0.005 SUI for 10 uploads (0.0005 SUI an upload), soulbound | When you buy a pass in [Walrus Storage](/blockchain/sui/walrus-storage/) |

The pass price goes to Meddleware in full: the relay's pass is sold by the platform, so both the gate owner's share and the platform's commission
are Meddleware's. On a gate that someone else owns, only the commission goes to Meddleware and the rest goes to that gate's payment recipient.

Meddleware sizes the small per-use fees (relay fee, the pass share per upload, the commission floor) to stay a small share of what the action
costs you on the network anyway, and the one-off fees (free gate, coin issuance) well below comparable services.

## Fees paid to others

| What | Paid in | Paid to | Amount |
| --- | --- | --- | --- |
| **Walrus storage** | WAL | the Walrus network (its storage nodes) | Depends on the file size and the number of epochs. At mainnet prices on 2026-10-19, a small file costs about 0.010 WAL for one epoch, and about 0.2 WAL for 53 epochs; a 10 MiB file about 0.017 WAL for one epoch |
| **Network gas** | SUI | Sui validators | A small, variable amount for every transaction. Approximate figures below |
| **Seal key servers** | not charged by this app | n/a | Sealed Storage adds no fee for key servers |

Approximate network gas per action on mainnet, estimated from testnet measurements (your wallet shows the exact figure; testnet gas can differ):

| Action | About |
| --- | --- |
| Buy an access pass | 0.0044 SUI (mostly the storage of the pass, returned if the pass is later burned) |
| Spend one use of a pass | 0.0001 SUI |
| Create a gate | 0.0053 SUI |
| Register a Walrus blob (storage start) | 0.0031 SUI |
| Certify a Walrus blob | 0.0001 SUI |
| Publish a coin with Token Issuance | 0.019 SUI |

Making a coin needs your wallet to allow up to 0.5 SUI of gas as a budget. That is a ceiling, not a charge: you pay only what is used.

## Things with no fee

- Reading anything: the [Treasury](/blockchain/sui/treasury/), the [dashboard](/blockchain/sui/dashboard), [status](/blockchain/sui/status-and-roadmap) and these docs.
- Sealing and opening files in [Sealed Storage](/blockchain/sui/sealed-storage/): no Meddleware fee, and signing the message is free. Only publishing a
  discovery pointer costs gas.
- Creating a paid gate (apart from gas).
- Transfers of a coin made with Token Issuance: your coin never charges fees on its own transfers.
- Signing a message to prove you hold a pass.

## Where you see a fee before paying

| Tool | Where |
| --- | --- |
| Walrus Storage | The **Estimated cost** line on the review step; the **Access pass required** card for the pass price and who receives what |
| Access Gate | The price field's hint (free-gate fee, minimum price); the airdrop field's hint (commission) |
| Token Issuance | The **Review** card |
| Any tool | The summary your wallet shows before you approve |
