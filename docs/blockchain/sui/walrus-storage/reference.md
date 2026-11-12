---
title: Walrus Storage reference
description: Limits, lifetimes, costs and the messages you may see in Walrus Storage - the facts to look up while you use the app.
---

# Walrus Storage reference

The facts behind the [Walrus Storage app](https://sui-walrus-storage.meddleware.co.uk): limits, lifetimes, what each cost
covers, and what its messages mean. Figures marked "current default" can change: see [Fees](/blockchain/sui/fees). This page
describes testnet; [Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which networks are live.

## Limits

| Limit | Value |
| --- | --- |
| Storage per upload or extension | 1 to 53 epochs |
| Length of an epoch | about two weeks on mainnet; set by the Walrus network |
| Longest a blob can be reserved ahead | 53 epochs from now, so a blob cannot be extended past that point until some epochs have passed |
| Largest file through Meddleware's relay | 100 MiB (current default) |
| Relay fee ceiling the app will pay | 0.005 SUI per upload |
| Who can read a blob | anyone who has its blob ID, unless you encrypted it |

## What a blob's status means

| Label | Meaning |
| --- | --- |
| **Certified** | The storage nodes confirmed the file and the blob is fully stored. |
| **Uploaded, not certified** | The file was sent but the last step (certification) is outstanding. Choose **Certify**: gas only, no new upload. |
| **Not certified** | Registered on-chain but not certified, and this browser holds nothing saved to finish it with. |
| **Expiring soon** | Few epochs remain. Extend it. |
| **expired** | The storage period has ended. The network may already have deleted the file. |
| **At max lifetime** | The blob already reaches the furthest epoch Walrus allows. |

## What each cost covers

| Cost | Paid in | Paid to | Depends on |
| --- | --- | --- | --- |
| Storage | WAL | the Walrus network | file size, number of epochs |
| Relay fee ("tip") | SUI | Meddleware (when you use its relay) | file size |
| Upload pass | SUI | Meddleware | one pass buys several uploads |
| Network gas | SUI | Sui validators | the transactions in the upload |

Current defaults for the relay fee and the pass are on the [Fees](/blockchain/sui/fees) page. The relay asks for the minimum it
needs; the ceiling above only stops a misbehaving relay from asking for more.

## Messages you may see

| Message | What it means and what to do |
| --- | --- |
| Connect a Sui wallet to upload and manage your blobs. | Press **Connect wallet**. |
| Walrus storage is not available on (network). Switch to testnet or mainnet. | Walrus has no such network (for example a local test network). Pick a network Walrus runs on. |
| Checking access... | The app is looking for a pass in your wallet. Wait a moment. |
| Access pass required | Meddleware's relay needs a pass. Buy one in the card below the message. |
| Purchases from this gate are paused right now. | The pass seller has paused sales. Try again later. |
| The pass price could not be read from the chain, so purchase is unavailable | The network could not be reached. Use **Read the price again**. |
| An access pass is required to upload through this relay | You have no usable pass (or its uses are spent). Buy one. |
| Checking the upload relay... | Wait: the relay is being checked. |
| The relay settings are not valid, so uploads are unavailable | A site problem you cannot fix. Try again later; see the [status page](/blockchain/sui/status-and-roadmap). |
| Choose a file first. | Pick a file in the **File** step. |
| You already have this blob | You own an identical file: extend it instead of paying twice. |
| Failed: (reason) | Shown under a blob in **My Blobs** when an extension or certification did not go through. The reason is the wallet's or the network's own message. |

More: [Questions and troubleshooting](/blockchain/sui/faq).

## For developers

Uploading from your own code, the proof format the relay checks, and running your own relay are covered on the developer site:
[Walrus Storage SDK](https://meddleware.dev/sui/walrus-storage/), [integration](https://meddleware.dev/sui/walrus-storage/integration) and
[Self-host a relay](https://meddleware.dev/sui/walrus-storage/relay-self-host). The generated [client API](./api/) lists every
function.
