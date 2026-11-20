---
title: How we treat your data
description: What Meddleware can see and keep, what your browser stores, and what is public.
---

# How we treat your data

The short version: we ask for nothing about you, we store nothing in your browser until you ask, and we never track you, show you
adverts or sell data. The full detail is on [Security and privacy](/blockchain/sui/security-and-privacy).

## What we see

- **Visits to our sites**: the time, the page and your IP address, as with any website. Traffic passes through Cloudflare, which carries
  our sites. The sites limit how often one address can make requests.
- **What you send to a service of ours**, such as a file through our upload relay or the wallet address you use with a gated service.
- **Nothing else.** The tools work without an account, so there is no name, email address or password to hold.

## What your browser keeps

Nothing until you do something that needs it, and only for that:

- your colour mode, only if you tick **Remember on this device** (untick it to forget);
- the network you chose, until you close the tab;
- an upload or payment in progress, until it finishes, so a reload does not lose what you paid for;
- that you accepted a tool's terms.

None of it is sent to us.

## What is public

Anything written to a public blockchain, or stored on Walrus without encryption, is public and permanent: no one can delete it, us
included. Sealed Storage encrypts your files in your browser before they leave it.

## Who else your browser talks to

To read a blockchain or a storage network, your browser contacts that network directly: for Sui, a full node (by default the public one
run by Mysten Labs), and for Walrus, its storage nodes and aggregators. They see your IP address, as any website you visit does.
