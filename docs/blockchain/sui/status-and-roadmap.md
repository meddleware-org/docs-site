---
title: Status and roadmap
description: How to read status.meddleware.co.uk, which shows whether the platform is working, and roadmap.meddleware.co.uk, which shows what is planned, in progress and done.
---

# Status and roadmap

Two public pages tell you whether the platform is working right now, and what is coming.

## Status: status.meddleware.co.uk

[status.meddleware.co.uk](https://status.meddleware.co.uk) is titled **Service Status**. Check it first when a tool misbehaves.

### Reading it

At the top, a banner gives the overall state and when it was last updated ("Updated (date and time)"):

| Banner | Meaning |
| --- | --- |
| **All systems operational** | Everything the platform checks is working. |
| **Partial outage** | Some parts are degraded or down. Tools that rely on them may fail. |
| **Major outage** | Most or all of the platform is down. |
| **Status unknown** | The status cannot be determined. |

Below it, the checks are grouped by what they support. Each group is a card and each line in it names one part of the platform with its own
state: **Operational**, **Degraded**, **Down** or **Unknown**. A coloured dot goes with each word, but the word is the meaning.

### How current it is

The platform checks itself every 15 seconds on the server side. The page asks for fresh results about as often while it is open, and it never
probes the services itself. If a refresh fails you will see "The latest check failed (reason). This is the last status received, and it may be out
of date." and the last good result stays on screen. If the very first load fails you will see "Could not load status".

### In other places

The footer of the [dashboard](/blockchain/sui/dashboard) shows the same overall state as a small link to this page. The status is also available as data at
[status.meddleware.co.uk/api/status](https://status.meddleware.co.uk/api/status).

The status page covers Meddleware's own services. It does not tell you whether Sui, Walrus, a Seal key server or your wallet is having trouble; for
those see [Questions and troubleshooting](/blockchain/sui/faq).

## Roadmap: roadmap.meddleware.co.uk

[roadmap.meddleware.co.uk](https://roadmap.meddleware.co.uk) lists the work Meddleware has chosen to make public, grouped into **phases**. A phase has a
name, a description and sometimes a date window.

### Reading it

Each item in a phase has a title, a description and a status shown as a word with a symbol:

| Status | Meaning |
| --- | --- |
| **Planned** | Intended, not started. |
| **In progress** | Being worked on now. |
| **Done** | Finished. |
| **Cancelled** | Dropped. |

An item with a date reads "Planned for (date)", or "Target was (date)" once it is done. The dates are targets, not promises. **Last updated** says when
the roadmap last changed. Use the **Show items that are** control (**Everything**, **Planned**, **In progress**, **Done**) to filter. If nothing
is published yet the page says "Nothing has been published yet. Check back soon." and if it cannot load you can choose **Try again**.

### The verifiable record

Where available, **Verifiable record of this roadmap** opens a panel with a signed copy of the roadmap stored on Walrus: who signed it, its
SHA-256 fingerprint, the signature, the Walrus blob and how long it is stored. It lets you check the roadmap without trusting the website: fetch the
blob, confirm its SHA-256 matches, and verify the signature over the blob's bytes as a Sui personal message against the signer's address.

## Where the tools run

Neither page tells you which Sui networks the tools are live on. For that, see
[Getting started](/blockchain/sui/getting-started#where-the-tools-run).
