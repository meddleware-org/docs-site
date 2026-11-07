---
title: How the tools fit together
description: How Walrus Storage, Sealed Storage, Access Gate, Token Issuance and the Treasury relate, and where money and permission flow.
---

# How the tools fit together

The tools are useful on their own, and they are designed to be combined. This page shows how.

## The building blocks

| Tool | Provides | Builds on |
| --- | --- | --- |
| **Access Gate** | NFT passes that prove someone is allowed in | Sui |
| **Walrus Storage** | Decentralised file (blob) storage | Sui and Walrus |
| **Sealed Storage** | Encryption with an on-chain rule for who may open the file | Walrus, Seal and (optionally) Access Gate |
| **Token Issuance** | Your own Sui coin | Sui (and Walrus, if you upload an icon) |
| **Treasury** | A read-only view of the platform's treasury and Access Gate activity | Access Gate |

## Sealed Storage uses Walrus, Seal and Access Gate

When you seal a file:

1. **Seal** encrypts it in your browser under a **policy** you choose.
2. **Walrus** stores the encrypted bytes. Anyone can download them, but they are useless without the key.
3. The **policy** decides who can get the key. One policy is **Access Gate pass ownership**: only holders of a valid pass for a
   gate you choose can open the file. Another is a **time lock**: anyone, but only after a time you choose.

So a pass you sell with Access Gate can be the key to encrypted content on Walrus: three tools, one flow.

```text
 file --encrypt in your browser--> encrypted bytes --store--> Walrus
              ^
              | who may open it?
        a policy: pass holders (Access Gate) or a time lock
```

## Gated uploads to Walrus

[Walrus Storage](/blockchain/sui/walrus-storage/) sends uploads through an **upload relay**. Meddleware's relay can be **gated**: you
hold a valid pass, prove it from your wallet, and the relay accepts the upload. The pass price and a small relay fee fund the
service. While Meddleware's relay is up, a wallet without a pass is asked to buy one and is not sent to the public relay. Only if
Meddleware's relay is unavailable does the app fall back to the public Walrus relay.

## Where the Treasury fits

The [Treasury](/blockchain/sui/treasury/) creates nothing; it observes. It reads the platform's settings from the chain (the
treasury address and the commission rate), lists the gates the treasury runs, and shows passes being sold and used.

## Token Issuance stands apart

[Token Issuance](/blockchain/sui/token-issuance/) does not depend on the others. It only touches Walrus if you choose to upload a
coin icon, and it pays its one-off fee to the platform treasury.

## The commission thread

One number ties the economics together: the **commission** the platform takes when an Access Gate pass is sold. It is read
from the chain, capped on-chain at 10% of the price, and paid to the treasury inside the same transaction as the purchase. The
web pages cannot change it. See [Fees](/blockchain/sui/fees) for the current values.

## Next

- [Fees](/blockchain/sui/fees) and [Security and privacy](/blockchain/sui/security-and-privacy)
- [Walrus Storage](/blockchain/sui/walrus-storage/), [Sealed Storage](/blockchain/sui/sealed-storage/),
  [Access Gate](/blockchain/sui/access-gate/), [Token Issuance](/blockchain/sui/token-issuance/),
  [Treasury](/blockchain/sui/treasury/)
