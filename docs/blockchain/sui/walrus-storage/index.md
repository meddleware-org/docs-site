---
title: Walrus Storage
description: Upload files to Walrus decentralised storage from your browser, understand how long they are kept and what it costs, and extend them before they expire.
---

# Walrus Storage

Upload files to [Walrus](https://walrus.xyz), a decentralised network that stores "blobs" (files) and records their lifetime
on Sui, and manage how long they are kept. Open the app at
[sui-walrus-storage.meddleware.co.uk](https://sui-walrus-storage.meddleware.co.uk), or use the **Walrus Storage** tab of the
[dashboard](/blockchain/sui/dashboard).

This page describes the tool on Sui **testnet**. [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which
networks are live.

## What it is

Walrus spreads each file across many independent storage nodes, so no single party holds or controls it. In the app you connect a
wallet, upload a file, and get back a **blob ID** (the file's permanent name on Walrus) and a link to read it. Later you can list the
blobs your wallet owns and extend their storage.

## When to use it

- You need file storage that does not depend on one company, addressed by a stable ID.
- You are storing media, documents or datasets for an app or an NFT.
- You want to store **encrypted** content: [Sealed Storage](/blockchain/sui/sealed-storage/) uses Walrus underneath.

It is not a free, permanent drive. Storage is paid for and **time-limited**, and files are public unless you encrypt them first.

## Blobs expire

::: warning Walrus storage is time-limited
A blob is stored for a number of **epochs**, Walrus's unit of time. On mainnet an epoch is two weeks (14 days); on testnet it is one day. When the paid period
ends the network may delete the blob. To keep a file, **extend it before it expires**: the **My Blobs** tab does this, and flags a
blob as **Expiring soon**.
:::

More epochs means a longer life and a higher price. One upload can reserve up to **53 epochs**; you reach longer lifetimes by
extending later. The app shows the cost before you confirm.

## Permanent or deletable

When you upload you choose **Permanent** (the default) or untick it for a **deletable** blob.

- **Permanent**: nobody, including you, can remove it before it expires. If you upload the same file again, the app notices and
  offers to extend the copy you already have instead.
- **Deletable**: you can remove the blob early and reclaim the unused storage.

## What you pay

You need two coins in your wallet:

- **WAL**, Walrus's storage token, pays for the storage. It depends on the file size and the number of epochs.
- **SUI** pays the network fee ("gas") and, through Meddleware's relay, a small relay fee. Meddleware's relay may also require a pass.

See [Fees](/blockchain/sui/fees) for the figures and who receives each part.

## Meddleware's relay and the public relay

Your browser cannot write to Walrus directly, so uploads go through an **upload relay**.

- **Meddleware's relay** is what the app uses by default. On testnet it is **pass-gated**: you need an access pass, which the app
  sells you on the spot if you have none (see [the walkthrough](/blockchain/sui/walrus-storage/walkthrough#buy-an-upload-pass)).
  A small **relay fee** (a "tip") goes with each upload, and the app never pays more than a fixed ceiling.
- **The public Walrus relay** is a fallback. The app uses it only if Meddleware's relay is not configured or is not responding.
  While Meddleware's relay is up, a wallet without a pass is asked to buy one and is **not** sent to the public relay.

Either way the file ends up on the same Walrus network.

## What you get back

After an upload you see **Uploaded** with the **Blob ID**, a **URL** from which anyone can read the file, and the certification
transaction. Keep the blob ID: it is how you, or anyone, reads the file back. See the [reference](/blockchain/sui/walrus-storage/reference) for the details.

## Next

- **[Walkthrough](/blockchain/sui/walrus-storage/walkthrough)**: upload, view and extend blobs step by step.
- **[Reference](/blockchain/sui/walrus-storage/reference)**: limits, costs and the messages you may see.
