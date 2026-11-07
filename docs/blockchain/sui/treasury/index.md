---
title: Treasury
description: A read-only view of the Meddleware platform's treasury - balance, commission rate, the gates it runs and the passes sold and used. No wallet needed.
---

# Treasury

The **Treasury** console is a read-only view of the money side of the Meddleware platform. Open it at
[treasury.meddleware.co.uk](https://treasury.meddleware.co.uk) or as the first page of the
[dashboard](https://dash.meddleware.co.uk).

This page describes the tool on Sui **testnet**. [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which
networks are live.

## What it is

A console that reads public data straight from Sui and shows:

- the platform **treasury** address and its SUI balance,
- the **commission rate** charged on [Access Gate](/blockchain/sui/access-gate/) purchases,
- the **gates** the treasury runs, which are its sources of revenue,
- a live list of **pass activity**: passes sold and used.

You do **not** need a wallet: everything shown is public on-chain data, and the console cannot move any money.

## When to use it

- You want to **check** the platform's commission rate or treasury address before you buy or sell a pass.
- You want to see which gates the platform runs and their prices.
- You want to follow **activity**: passes sold and used.

To create or manage a gate, use [Access Gate](/blockchain/sui/access-gate/).

## The tabs

### Overview

The treasury balance, the commission rate and the treasury address, then counters for **Active gates**, **Accesses minted** (passes sold or
given away) and **Accesses consumed** (passes used), and the most recent activity.

### Accounts

The **Sui Treasury Account**: the commission rate (as a percentage and in basis points; see the [glossary](/blockchain/sui/glossary)), the
current balance and the address. Below it, **Revenue Sources**: a table of the gates the treasury runs, each with its name, price and
object ID linked to a Sui explorer. The treasury is shown as one account among possibly many so more revenue sources can be added later.

### Activity

**Revenue Events**: the most recent **Access Sold** and **Access Used** events, newest first, each with the buyer or holder's address, the
checkpoint ("Block") and the transaction, linked to a Sui explorer. **Refresh** reloads the list. The text "Indexed since checkpoint (n)"
tells you how far back the list reaches.

## What the balance includes

The balance is everything the treasury address holds in SUI: coin objects **and** its address balance. Commission arrives as coins; SUI sent
another way lands in the address balance. Both count.

## How "active gates" is counted

The console finds gates by looking up the admin capabilities the treasury owns and reading the gate each one controls, not by replaying old
events. Sui nodes forget old events after a few days, which would make an event-based count too low. Counting from live state always reflects
what exists now. The Activity list, which is an event list, therefore only reaches back as far as the events are kept.

## Commission, in one line

When someone buys a pass, a share of the price goes to the treasury and the rest to the gate's payment recipient. The rate is read live from the
chain and is capped at 10%. See [Fees](/blockchain/sui/fees) for the current terms.
