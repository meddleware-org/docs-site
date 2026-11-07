---
title: Getting started
description: What you need before using the Meddleware tools - a Sui wallet, a little SUI, the right network - and how to connect.
---

# Getting started

Everything here runs on [Sui](https://sui.io). You use each tool in your browser with a **Sui wallet**.
There are no accounts, passwords or sign-ups: your wallet is your identity, and every action is something
you approve in it. This page covers what applies to all the tools.

<NetworkNotice />

## Get a Sui wallet

Install a Sui wallet browser extension, for example [Slush](https://slush.app/), the official Sui wallet,
or any wallet that supports the Sui wallet standard. Create or import an account and keep your recovery
phrase safe. Nobody at Meddleware can recover it for you, and anyone who has it can empty your wallet.

If a tool shows **No Sui wallet detected. Install a wallet extension to continue.**, your browser has no
Sui wallet extension (or the extension is switched off for that site).

## Where the tools run

Sui has separate networks:

- **Testnet** is a free practice network that uses **test** SUI with no real value. It is the best place to try
  things out, and it is where the tools run today.
- **Mainnet** is the real network, where SUI has value.

The sentence at the top of this page, and on the [home page](/), is read from the deployment records and is the one place
this site says which networks are live. Every other page describes **testnet**.

Set your wallet to **Testnet**. If the tool and your wallet are on different networks you will see an error or a
refused signature: see [Questions and troubleshooting](/blockchain/sui/faq#wrong-network). You can get free test SUI from
the [Sui faucet](https://faucet.sui.io/).

## What you need in your wallet

- **SUI** pays the network fee ("gas") for each action. It is small: see [Fees](/blockchain/sui/fees).
- **WAL** is only needed for [Walrus Storage](/blockchain/sui/walrus-storage/), where it pays for the storage itself.
  The other tools do not need it.

## Open a tool and connect

Each tool has its own address, and the [dashboard](/blockchain/sui/dashboard) brings them together.

| Tool | Address |
| --- | --- |
| Dashboard (Treasury and the four tools below, one wallet connection) | [dash.meddleware.co.uk](https://dash.meddleware.co.uk) |
| Walrus Storage | [sui-walrus-storage.meddleware.co.uk](https://sui-walrus-storage.meddleware.co.uk) |
| Sealed Storage | [sui-sealed-storage.meddleware.co.uk](https://sui-sealed-storage.meddleware.co.uk) |
| Access Gate | [sui-access-gate.meddleware.co.uk](https://sui-access-gate.meddleware.co.uk) |
| Token Issuance | [sui-token-issuance.meddleware.co.uk](https://sui-token-issuance.meddleware.co.uk) |
| Treasury | [treasury.meddleware.co.uk](https://treasury.meddleware.co.uk) |

Press **Connect wallet**, choose your wallet, and approve the connection in it. The dashboard keeps one connection for all
the tools inside it.

- Reading the [Treasury](/blockchain/sui/treasury/) needs **no wallet**.
- Uploading, encrypting, creating gates or issuing a coin needs a connected wallet that can sign transactions. Opening
  sealed files also needs it to sign a message.

## What your wallet will ask you to approve

- A **transaction** changes something on the blockchain (a purchase, an upload registration, a new gate). It costs gas.
  Read the wallet's summary before you approve.
- A **message signature** costs nothing and changes nothing on-chain. [Sealed Storage](/blockchain/sui/sealed-storage/) asks for one
  to open a file, and some services ask for one to prove you hold a pass.

You can always reject a prompt. Nothing happens unless you approve.

## The chain is the source of truth

Prices, ownership, commission and access rules are enforced by smart contracts on Sui, not by the web pages. The pages show
you the state and help you build a transaction, but they cannot override what the chain says. Anything a page shows can be
checked on a [Sui explorer](https://suiscan.xyz).

## Next steps

- [How the tools fit together](/blockchain/sui/architecture): the big picture.
- [What it costs](/blockchain/sui/fees) and [what Meddleware can and cannot see](/blockchain/sui/security-and-privacy).
- Pick a tool: [Walrus Storage](/blockchain/sui/walrus-storage/), [Sealed Storage](/blockchain/sui/sealed-storage/),
  [Access Gate](/blockchain/sui/access-gate/), [Token Issuance](/blockchain/sui/token-issuance/),
  [Treasury](/blockchain/sui/treasury/).
- Words you do not know: the [glossary](/blockchain/sui/glossary).
