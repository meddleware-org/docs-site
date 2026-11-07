---
title: Using Walrus Storage
description: Step-by-step guide to uploading a file to Walrus, buying an upload pass, finishing an interrupted upload, and viewing and extending your blobs.
---

# Using Walrus Storage

A walkthrough of the [Walrus Storage app](https://sui-walrus-storage.meddleware.co.uk). You need a
[Sui wallet](/blockchain/sui/getting-started) with some **SUI** and some **WAL**, set to Sui testnet. How these steps relate to the
networks: [Getting started](/blockchain/sui/getting-started#where-the-tools-run).

The app has two tabs: **Upload** and **My Blobs**. Press **Connect wallet** first: until you do, each tab asks
you to connect.

## Upload a file

The upload has three steps, **File**, **Options** and **Upload**.

1. **File.** Choose the file. Selecting it moves you on to Options.
2. **Options.**
   - **Storage duration (epochs).** How long the blob is stored, from 1 to 53 epochs. **Max** sets 53; **Short** sets 10. Longer costs
     more now, and you can extend later.
   - **Permanent.** Ticked by default: nobody can delete the blob before it expires. Untick it to store a deletable blob.
   - Choose **Next**.
3. **Upload.** The review shows an **Estimated cost** in the form "~(amount) WAL storage (53 epochs) + ~(amount) SUI relay fee
   (+ gas)", and how many wallet approvals to expect. Choose **Upload to Walrus**.

While it runs, a window titled **Uploading to Walrus...** shows the steps: **Access** (only when a pass is spent), **Encode**,
**Register**, **Upload** and **Certify**. Keep the tab open and approve each wallet prompt. The prompts are:

| Situation | Wallet approvals |
| --- | --- |
| Public relay | two: blob registration, blob certification |
| Meddleware's relay, pass with several uses | three: prove access, registration, certification |
| Meddleware's relay, single-use pass | four: spend a pass use, prove access, registration, certification |

When it finishes, **Uploaded** shows the **Blob ID**, the **URL** where anyone can read the file, and the **Certify tx**.
Copy the blob ID.

### Buy an upload pass

If Meddleware's relay is up and your wallet has no pass, the Upload tab shows **Access pass required**: "This upload relay is
restricted to access-pass holders. Purchase a pass to upload through it."

The card lists the exact terms, read from the chain before your wallet opens:

- **Network**.
- **You pay**: the pass price, plus network gas.
- **Gate owner receives** and **Platform fee**: how the price is split, each with the receiving address.
- **Pass**: how many uses it has, and whether it is soulbound (cannot be transferred).

Choose **Purchase access** and approve the transaction. If the gate is paused you will see "Purchases from this gate are paused
right now." Once the purchase is on-chain, the Upload tab shows the upload form.

::: info Each upload spends a use
Uploading spends **one use** from your pass in an on-chain step before the file is stored. It pays for an upload *attempt*, not
a guaranteed upload. An attempt resumes automatically, even after a page reload if you select the same file again, so a use
is normally not lost. A use is lost without a finished upload only if you abandon the upload for good, cancel a required wallet
approval, or wait so long that the reserved storage lapses.
:::

### If an upload stops half way

Both of these notices mean you have already paid and nothing is charged twice:

- **"Your blob is registered and paid for, but the upload to the relay did not complete."** Choose **Retry upload**.
- **"Your blob was uploaded and paid for but not yet certified."** Choose **Certify blob**. This is one wallet approval and gas only.

If you leave the page, the blob appears in **My Blobs** as **Uploaded, not certified**, with a **Certify** button, as long as you use the same browser.

### "You already have this blob"

If your wallet already owns the same file, a window offers **Extend it** (or **Certify it** if it was never certified), **Upload a new
copy**, or **Cancel**. Extending is usually what you want: a second copy costs the full fee again.

## View your blobs

Open **My Blobs** and choose **Refresh** if the list looks out of date. Each row shows:

| Column | Meaning |
| --- | --- |
| **Blob ID** | The blob's name on Walrus, linked to a Walrus explorer. "N copies" appears when you uploaded the same file more than once |
| **Size** | The file size |
| **Expires** | The epoch where storage ends and how many epochs are left, for example "epoch 480 - 12 epochs left", or "expired". **Expiring soon** marks a short remaining life |
| **Certified** | **Certified** (fully stored), **Uploaded, not certified** (finish it with **Certify**) or **Not certified** |
| **Actions** | **Extend**, **Certify**, or "At max lifetime" when no more can be added |

An empty list says "No Walrus blobs found for this address." The list reads your wallet's blobs from the chain; there is no
separate login.

## Extend a blob

Extend a blob **before** it expires. After it has lapsed and been removed it cannot be extended, only uploaded again.

1. In **My Blobs**, find the blob.
2. Enter how many **epochs to add**, or use **+10**, **+25** or **Max**. The number is limited to what Walrus still allows
   for that blob.
3. Choose **Show cost**. The app prices the extension in WAL, in the form "(amount) WAL for +10 epochs". It is an estimate; your
   wallet shows the real amount.
4. Choose **Extend** and approve the transaction. The blob's end epoch moves out.

If the price cannot be read you will see "price unavailable".

## Read a file back

A blob ID resolves through a Walrus **aggregator** over plain HTTP, and the **URL** in the result card is that address. Anyone with the
ID can fetch the bytes, so files are public unless you encrypted them first with [Sealed Storage](/blockchain/sui/sealed-storage/).

## Common questions

**Is my file private?** No. Walrus files are public. For privacy use [Sealed Storage](/blockchain/sui/sealed-storage/), which
encrypts before storing.

**Why did my wallet ask me to sign more than once?** Registering a blob, certifying it, proving your pass and spending a use are separate
steps. The review step tells you how many to expect.

**Why does it ask for WAL?** WAL pays Walrus for the storage. See [Fees](/blockchain/sui/fees). More help:
[Questions and troubleshooting](/blockchain/sui/faq).
