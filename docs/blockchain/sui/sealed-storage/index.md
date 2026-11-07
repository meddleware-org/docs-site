---
title: Sealed Storage
description: Encrypt a file in your browser, store it on Walrus and control on-chain who can open it - pass holders only, or anyone after a set time.
---

# Sealed Storage

Encrypt a file in your browser, store the encrypted bytes on [Walrus](/blockchain/sui/walrus-storage/), and let only the right
people open it, with the rule enforced **on-chain**. Open the app at
[sui-sealed-storage.meddleware.co.uk](https://sui-sealed-storage.meddleware.co.uk), or use the **Sealed Storage** tab of the
[dashboard](/blockchain/sui/dashboard).

This page describes the tool on Sui **testnet**. [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which
networks are live.

## What it is

Sealed Storage combines three things:

- **[Seal](https://seal-docs.wal.app/)** is threshold encryption. The keys that open a file are held by a committee of
  independent **key servers**, not by one party and not by Meddleware.
- **[Walrus](/blockchain/sui/walrus-storage/)** stores the encrypted bytes.
- A **policy** is an on-chain rule that decides who may open the file.

You encrypt under a policy and keep (or share) a small **manifest**. Anyone who meets the policy can open the file. Nobody else can,
even though the encrypted bytes are stored publicly.

## When to use it

- You want to keep something **private** on public, decentralised storage.
- You want access tied to an **on-chain condition**: "only holders of this [Access Gate](/blockchain/sui/access-gate/) pass", or "only after
  this date".
- You want to **share** encrypted content without running a key server or handing anyone a raw key.

If the content is not sensitive, plain [Walrus Storage](/blockchain/sui/walrus-storage/) is simpler.

## How it works

1. **Encrypt.** Your browser encrypts the file under the policy you choose. No key material ever reaches a Meddleware server.
2. **Store.** The encrypted file is uploaded to Walrus. The app gives you a **manifest** that points to it.
3. **Open.** To open it you sign **one** wallet message, which creates a short-lived session. If the on-chain policy approves you, a threshold
   of the key servers releases their key shares and the file is decrypted in your browser.

## The manifest

Sealing produces a small **manifest** file: the pointer you save or share. It records the policy, the encryption identity, the
Walrus blob ID, the network and any non-secret settings (such as the gate). It holds **no secrets**, but you need it to open the file, so
keep it. See the [reference](/blockchain/sui/sealed-storage/reference#the-manifest).

## What it costs and what the limits are

- Meddleware charges **no fee** for sealing or opening. Signing the message is free.
- The app stores the encrypted file on Walrus for you through a public Walrus publisher, so you need no WAL. Check the **Confirm** step: it
  states how many epochs the file is stored for (the default is 5). After that the file is gone, even though the key servers still work.
  To keep it longer, extend the blob you now own in [Walrus Storage](/blockchain/sui/walrus-storage/walkthrough#extend-a-blob).
- The default size limit is about **10 MiB** per file.
- Publishing a discovery pointer (optional, for pass-gated content) is a normal transaction and costs gas.

## Who holds the keys?

Decryption keys are split across a **committee** of independent key servers. A threshold of them (for example 2 of 3) must agree before a
file opens, so no single server can open your files, and one being offline does not stop you. Meddleware never holds your keys. The
trust model, and what happens if too few servers answer, is on [Security and privacy](/blockchain/sui/security-and-privacy#sealed-storage).

## Know before you seal

These points are shown in the app too:

- The threshold of key servers together *could* decrypt, and if fewer are online than the threshold, **nobody** can until they return.
- The policy rules are on-chain code. Until the package's publisher makes it permanently unchangeable, an upgrade could change access to
  content that is already sealed.
- Once someone has opened a file, losing their pass does not take that access back.
- Labels and the gate a file is sealed to are public. Only the content is encrypted.
- The encrypted file lives on Walrus for a limited time.

## Next

- **[Walkthrough](/blockchain/sui/sealed-storage/walkthrough)**: encrypt, share and open a file step by step.
- **[Policies](/blockchain/sui/sealed-storage/policies)**: the access rules you can choose.
- **[Reference](/blockchain/sui/sealed-storage/reference)**: the manifest, limits and messages.
