---
title: Security and privacy
description: What Meddleware can and cannot see or do, what you keep in your own hands, how Sealed Storage's trust model works, and what data the sites collect.
---

# Security and privacy

A plain-words description of what you are trusting when you use the Meddleware tools, what Meddleware can and cannot do, and what data the sites
handle. It is not legal advice or a contract. The legal notices are [listed below](#legal-notices).

These tools run on Sui **testnet** today (see [Getting started](/blockchain/sui/getting-started#where-the-tools-run) for the current networks). Test
networks can be reset and their tokens have no value, so do not rely on anything stored there.

## The short version

- There are **no accounts**. You use a wallet, and you keep its keys. Meddleware never holds your keys, funds, passes or coin controls.
- Rules about money and access are enforced by **smart contracts on Sui**, which anyone can read, not by Meddleware's web pages.
- **Everything on a blockchain is public**: addresses, gates, passes, payments and the transactions that made them.
- Sealed files are encrypted **in your browser**. Meddleware cannot read them.

## What you keep in your own hands

| What | Held by | If you lose it |
| --- | --- | --- |
| Your wallet's recovery phrase and keys | you | Your assets cannot be recovered. Meddleware cannot reset or restore a wallet |
| Passes (NFTs) you bought | your wallet | Gone with the wallet. A soulbound pass cannot be moved to a new wallet |
| A gate's admin capability | the wallet that created the gate | You can no longer change the gate. Whoever holds it controls the gate's price and payout address |
| A coin's mint, metadata and upgrade capabilities | the recipient wallet you chose | Whoever holds one has that power; it cannot be recovered or revoked |
| The `Blob` object of a Walrus upload | your wallet | You can no longer extend the blob's storage |
| A Sealed Storage manifest | you (it holds no secret) | You cannot easily find or open the file. Keep a copy |
| A GitHub token typed into Token Issuance | you | It is sent only to GitHub, never stored, and cleared when the push finishes |

## What Meddleware can and cannot see

**Can see**

- Everything public on the chain, like anyone else.
- Standard records of visits to its websites, such as the time, the page and the visitor's IP address. Traffic to the sites passes through Cloudflare.
  The sites limit how often one address can make requests.
- When you use Meddleware's Walrus upload relay or a gated service, your wallet address and the access proof you send, and the file you upload
  through the relay. Files on Walrus are public anyway, and a Sealed Storage file reaches Walrus only after it is encrypted.

**Cannot see**

- Your recovery phrase or private keys. They never leave your wallet.
- The contents of a file before you encrypt it, or the keys that open a sealed file.
- Anything in your wallet beyond what is public on the chain.

## What Meddleware can and cannot do

**Can**

- Change the platform's **commission terms and treasury address** for [Access Gate](/blockchain/sui/access-gate/) sales. The contract caps the commission at
  10% of a price, and a gate can be created with a rule that locks the commission in when it is frozen.
- Publish new versions of a contract package for as long as it is upgradeable. Some earlier packages have been made permanently
  unchangeable, and gates created on them keep working.
- Change the fees in the apps (see [Fees](/blockchain/sui/fees)). The app shows the amount before you sign.

**Cannot**

- Move your funds, spend your pass, or sign anything for you. Every action needs your wallet's approval.
- Change a gate it does not control: only the holder of that gate's admin capability can, and a frozen gate cannot be changed by anyone.
- Take back or reverse a transaction on the blockchain.
- Open your sealed files by itself (see below).
- Recover a lost wallet, pass or capability.

## Sealed Storage {#sealed-storage}

[Sealed Storage](/blockchain/sui/sealed-storage/) is private from Meddleware, but it still rests on some trust. In plain terms:

- **Encryption happens in your browser.** The plain file and the key never reach a Meddleware server. The encrypted bytes go to Walrus and are
  public; without the key they are meaningless.
- **A committee of independent key servers** (the Seal service) holds the pieces of the key. A server releases its piece only if the on-chain policy
  approves the person asking. A **threshold** of servers (for example 2 of 3) must agree to open a file. On testnet the key servers are run by Mysten
  Labs. For mainnet the plan is three independent providers (Overclock, NodeInfra and H2O Nodes), any two of which are needed, so no single provider can
  decrypt and one can be offline.
- **If enough servers are unavailable, nobody can open the file** until they return. Your encrypted file and manifest are not affected.
- **If a threshold of servers misbehaved together, they could decrypt.** That is the cost of not trusting one party. It is why they are
  independent organisations.
- **If Meddleware ever runs a key server itself**, the app shows a notice that it could decrypt your content, and you should seal nothing you would
  not share with it.
- **The policy is code on-chain.** Until its publisher makes the package permanently unchangeable, an upgrade could change who may open content that is
  already sealed.
- **Once opened, always opened.** Someone who decrypted a file keeps the file, even if they later lose their pass. A transferable pass that is sold gives
  the new holder access; use soulbound passes where content must stay with its first buyers.
- **Labels, gate IDs, blob IDs and manifests' non-secret settings are public.** Only the file's contents are encrypted.
- **Storage is time-limited.** The encrypted file is deleted from Walrus when its epochs run out unless you extend it.

## What the websites do with your data

- No account, email address, name or password is asked for. The sites do not ask for personal information.
- The apps do not load scripts from other sites: their security policy allows scripts from the site itself only, and they contain no advertising or
  analytics code.
- Your browser talks **directly** to services outside Meddleware as you use the tools, and those services can see your IP address and requests under their own
  policies: Sui network nodes, Walrus storage nodes, aggregators and relays, Seal key servers and your wallet. Token Issuance also fetches the list of
  open-source licences from GitHub's file hosting, and GitHub only if you choose to create a repository.
- The apps keep a few things in your **browser's own storage** on your device, such as your colour mode, that you accepted the token terms, and what is needed to
  finish an interrupted Walrus upload. They are not sent to Meddleware.
- Your wallet extension is a separate program with its own privacy terms.

## Legal notices

Every page footer links to Meddleware's legal notices, which stand on their own:

- [Copyright notice](https://meddleware.co.uk/legal/copyright.html)
- [Copyleft notice](https://meddleware.co.uk/legal/copyleft.html)

The Meddleware software is released under the BSD Zero Clause Licence (0BSD).

## Reporting a security problem

Please do not post a vulnerability publicly. Email **security@meddleware.co.uk** with what you found and how to reproduce it, and you will get an
acknowledgement within a few working days.
