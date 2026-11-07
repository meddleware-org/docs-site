---
title: Dashboard
description: The Meddleware dashboard shows the Treasury and the Walrus Storage, Sealed Storage, Access Gate and Token Issuance tools in one place, with one wallet connection and a network selector.
---

# Dashboard

The dashboard at [dash.meddleware.co.uk](https://dash.meddleware.co.uk) puts the Meddleware tools in one place. It adds nothing of its own:
each tool inside it is the same one you get at its own address, and every figure is read from the chain by that tool. Its advantage is that you
connect your wallet **once** and the connection is shared by all of them.

## What it shows

The dashboard has two sections, listed in the side menu under **Organisation**:

| Section | What you see |
| --- | --- |
| **Treasury** | The [Treasury](/blockchain/sui/treasury/) console. It is the page the dashboard opens on, and it needs no wallet. |
| **Blockchain** | A strip of tabs, one per tool: [Walrus Storage](/blockchain/sui/walrus-storage/), [Sealed Storage](/blockchain/sui/sealed-storage/), [Access Gate](/blockchain/sui/access-gate/) and [Token Issuance](/blockchain/sui/token-issuance/). |

Opening **Blockchain** changes the side menu to a **Back** button and the chain list (today **Sui** is the only chain). Older addresses such as
`/walrus` or `/access-gate` take you to the Blockchain section.

At the bottom of the page the footer links to this documentation and the developer site, and shows the platform's [status](/blockchain/sui/status-and-roadmap)
("All systems operational", "Partial outage", "Major outage", "Status unavailable" or "Checking status...").

## Connect your wallet

Open any tool that needs a wallet and press **Connect wallet**, then choose your wallet. The side menu then shows your address (copy it, or
open it in a Sui explorer) and a **Disconnect** button. Until you connect it says "No wallet connected". The connection works in every tab; you do not
connect again per tool. The dashboard asks only for wallets that can sign both transactions and messages, so a wallet missing either is not
offered.

If you see "No Sui wallet detected. Install a wallet extension to continue.", see [Getting started](/blockchain/sui/getting-started#get-a-sui-wallet).

## Choose a network

Once a wallet is connected, the side menu shows a **Network** selector. Every tool in the dashboard follows it at once.

- **Testnet** is the practice network. Which networks are live is stated on [Getting started](/blockchain/sui/getting-started#where-the-tools-run);
  a network that is not live yet cannot be chosen.
- **Localnet** is for developers who run a Sui node on their own computer. It asks for that node's address. You do not need it.

If a tool is not deployed on the network you picked, it says so (for example "Access Gate is not available on (network). Switch to a network
where it is."). Your wallet must be on the same network too; see [Questions and troubleshooting](/blockchain/sui/faq#wrong-network).

The separate tool addresses do not have a selector: each is fixed to one network, which its introduction line names (for example "Create and manage
on-chain access gates on Sui (testnet).").

## Appearance

The control in the header switches between light and dark colours. The dashboard opens dark by default.
