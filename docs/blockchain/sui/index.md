---
title: Meddleware on Sui
description: The Meddleware tools for Sui - Walrus Storage, Sealed Storage, Access Gate, Token Issuance and the Treasury - what each does and where to find it.
---

# Meddleware on Sui

Meddleware's Sui platform is a set of connected tools. Each is useful on its own and they are designed to work
together. You use them in your browser with your own Sui wallet; there are no accounts.

## The tools

| Tool | What it does |
| --- | --- |
| [Walrus Storage](/blockchain/sui/walrus-storage/) | Upload files to Walrus, which stores them across a decentralised network, and keep them alive by extending their storage |
| [Sealed Storage](/blockchain/sui/sealed-storage/) | Encrypt a file in your browser, store it on Walrus, and decide on-chain who may open it |
| [Access Gate](/blockchain/sui/access-gate/) | Create and sell NFT passes that prove someone may use your content, service or app. Ownership is checked on-chain |
| [Token Issuance](/blockchain/sui/token-issuance/) | Deploy your own Sui coin from your browser and choose what stays changeable |
| [Treasury](/blockchain/sui/treasury/) | A read-only view of the platform's treasury, its commission rate and the passes sold and used |

The [dashboard](/blockchain/sui/dashboard) shows the Treasury and the first four tools in one place with a single wallet
connection.

## How they fit together

[Sealed Storage](/blockchain/sui/sealed-storage/) stores its encrypted files on Walrus and can use an
[Access Gate](/blockchain/sui/access-gate/) pass as the key that opens them. Walrus uploads through Meddleware's relay can be
gated by a pass too. The [Treasury](/blockchain/sui/treasury/) shows the money side of Access Gate. See
**[How the tools fit together](/blockchain/sui/architecture)**.

## Apps

| Tool | App |
| --- | --- |
| Dashboard | [dash.meddleware.co.uk](https://dash.meddleware.co.uk) |
| Walrus Storage | [sui-walrus-storage.meddleware.co.uk](https://sui-walrus-storage.meddleware.co.uk) |
| Sealed Storage | [sui-sealed-storage.meddleware.co.uk](https://sui-sealed-storage.meddleware.co.uk) |
| Access Gate | [sui-access-gate.meddleware.co.uk](https://sui-access-gate.meddleware.co.uk) |
| Token Issuance | [sui-token-issuance.meddleware.co.uk](https://sui-token-issuance.meddleware.co.uk) |
| Treasury | [treasury.meddleware.co.uk](https://treasury.meddleware.co.uk) |
| Service status | [status.meddleware.co.uk](https://status.meddleware.co.uk) |
| Roadmap | [roadmap.meddleware.co.uk](https://roadmap.meddleware.co.uk) |

## Before you start

- New to Sui wallets? Read [Getting started](/blockchain/sui/getting-started).
- Want to know what you will pay? Read [Fees](/blockchain/sui/fees).
- Want to know what Meddleware can see? Read [Security and privacy](/blockchain/sui/security-and-privacy).
- Stuck? See [Questions and troubleshooting](/blockchain/sui/faq).

::: tip Building on these tools?
This site is for people who use them. Integration guides, the SDKs and self-hosting are on the
[developer site](https://meddleware.dev/sui/).
:::
