---
title: Treasury reference
description: What the Treasury console's figures mean, the current commission terms, the deployed testnet identifiers it reads and the messages you may see.
---

# Treasury reference

What the [Treasury](/blockchain/sui/treasury/) console shows and where it comes from. The console only displays on-chain data. This page
describes testnet; [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which networks are live.

## Deployed identifiers (testnet)

The console reads the `access_gate` package below. Check them in a [Sui explorer](https://suiscan.xyz). The canonical list is on the
[on-chain overview](/blockchain/sui/onchain/access-gate/overview).

| Thing | ID |
| --- | --- |
| `access_gate` package | `0xd7ddaa94b74330979b2b618fc81206d160a264f1c9ca148a77fa2144301388c9` |
| `PlatformConfig` object | `0x3f81489df58233d96798f34ad44de325e1b4df7e4d615affe72ca181969ee7b5` |

## The platform's settings

The `PlatformConfig` object holds the settings the whole platform shares. Current defaults:

| Setting | Meaning | Current default |
| --- | --- | --- |
| Treasury | the address that receives the commission | shown on the Overview and Accounts tabs |
| Commission rate | share of a sale's price paid to the treasury, in basis points (100 bps = 1%) | 20 bps (0.2%) |
| Minimum commission | floor on the commission of a paid sale | 0.0005 SUI |
| Free-gate fee | one-off fee for a gate with price 0 | 1 SUI |

A paid sale's commission is the price times the rate, raised to the minimum, and never more than 10% of the price (a limit in the contract).
The console shows the rate as a percentage. The minimum price of a paid pass, 0.005 SUI, is ten times the minimum commission.

## What each figure means

| Figure | Where | Meaning |
| --- | --- | --- |
| SUI balance / Current balance | Overview, Accounts | all SUI held by the treasury address: coin objects plus its address balance |
| Commission rate | Overview, Accounts | the rate above, as a percentage and in basis points (bps) |
| Active gates | Overview | gates whose admin capability the treasury owns, counted from live state |
| Accesses minted | Overview | passes sold or given away that the event list reaches |
| Accesses consumed | Overview | passes used (single-use passes spent) that the event list reaches |
| Gate name, Price, Object ID | Accounts, Revenue Sources | the gate's NFT name, its price in SUI (or Free) and its on-chain ID |
| Access Sold / Access Used | Activity | a pass was bought or given away / a use of a pass was spent |
| Address | Activity | the buyer of a sold pass, or the holder who used one |
| Block | Activity | the Sui checkpoint number, which is like a block height: higher is newer |
| Transaction | Activity | the identifier of the transaction that emitted the event |

Counts and the activity list come from events that Sui nodes keep only for a short time, so "Accesses minted" and "Accesses consumed" cover
the recent window, not the platform's whole history. The console says from which checkpoint it has data.

## Messages you may see

| Message | What it means and what to do |
| --- | --- |
| Loading... | Data is being read. Wait a moment. |
| PlatformConfig not loaded. | The platform's settings could not be read. Refresh; if it persists, see the [status page](/blockchain/sui/status-and-roadmap). |
| No gates found. | The treasury runs no gates on this network. |
| No events found. / No recent events. | No pass activity in the window the console can see. |

## For developers

To read the same objects and events from code, see [Treasury data](https://meddleware.dev/sui/treasury/data) (the objects, events and
JSON shapes) and [Treasury for developers](https://meddleware.dev/sui/treasury/) on the developer site. Event history is read from a Sui
node, or from the optional [read indexer](https://meddleware.dev/sui/indexer) when one is configured.
