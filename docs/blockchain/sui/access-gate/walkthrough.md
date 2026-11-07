---
title: Using Access Gate
description: Step-by-step guide for gate owners to create, manage, airdrop to and freeze a gate, and for pass holders to buy and use a pass.
---

# Using Access Gate

Two audiences: **gate owners** who create and sell passes, and **pass holders** who buy and use them. You need a
[Sui wallet](/blockchain/sui/getting-started) set to Sui testnet; [Getting started](/blockchain/sui/getting-started#where-the-tools-run)
says which networks are live.

## For gate owners

Use the [Access Gate console](https://sui-access-gate.meddleware.co.uk). It has two tabs, **Create gate** and **My gates**. Press **Connect
wallet** first ("Connect a Sui wallet to create and manage your access gates.").

### Create a gate

The form has three steps.

1. **Economics**
   - **Price (SUI).** What a buyer pays. `0` makes a free gate, which pays a one-off platform fee (shown next to the field). A paid gate has a
     minimum price (also shown).
   - **Default credits.** `0` makes an **unlimited** pass. A number `N` makes a **single-use** pass with N uses. This choice is fixed once the
     gate exists, though you can change N later.
   - **Payment recipient.** Where the sale proceeds go, after the platform's commission. It starts as your own address.
2. **Appearance** (what wallets show for each pass)
   - **NFT name**, **NFT image URL** (an `https://` address, or a small `data:image` link; 2,048 characters at most) and **NFT description**.
3. **Options**
   - **Soulbound (non-transferable NFTs).** Fixed once the gate exists.
   - **Auto-burn NFTs at zero credits.** A spent single-use pass is deleted instead of kept as a receipt.
   - If the console applies any **Permanent rules on this deployment**, they are listed here before you confirm. They are recorded on the
     gate for good and anyone can read them. See [the reference](/blockchain/sui/access-gate/reference#permanent-rules-of-a-gate).

Choose **Create gate** and approve the transaction. "Gate created. Transaction (digest)" appears, and you land in **My gates**.

Creating the gate gives your wallet an **admin capability (AdminCap)** for it. **Whoever holds the AdminCap controls the gate's price and
payout address, so keep it in a wallet you control.**

### Manage your gates

**My gates** lists every gate whose admin capability your wallet holds. Each card shows its name, its gate ID (copy it, or open it in an
explorer) and badges for its state: the price (or **Free**), **Unlimited** or "(N) credits", **Soulbound**, **Paused**, **Frozen** and any
permanent rules such as "Pause blocks unlocks". Open **Manage** on a card for:

- **Settings.** Edit and **Update** one setting at a time: price, payment recipient, default credits (single-use gates only), NFT name, NFT image
  URL, NFT description. Setting the price to `0` makes the gate free and pays the one-off free-gate fee the first time.
- **Pause purchases / Unpause purchases.** Stops or restarts sales.
- **Auto-burn spent NFTs / Keep spent NFTs as receipts.** Changes what happens to a pass at zero uses. It applies to passes already
  sold, too.
- **Airdrop.** Enter an address under **Airdrop access to** and choose **Airdrop**. The recipient pays nothing; you pay the platform commission
  a sale at the current price would have carried (the console shows the amount).
- **Freeze gate (irreversible).** See below.

A card also offers **Add unlockable content**, which opens [Sealed Storage](/blockchain/sui/sealed-storage/) with this gate already chosen.

### Freeze (irreversible)

::: warning Freezing is permanent
**Freeze gate** makes the gate immutable. It destroys the admin capability, so the gate's settings and airdrops can **never** be
changed again. Purchases and uses keep working. The console asks you to type **FREEZE** in the window "Freeze this gate?" and then choose
**Confirm freeze**. There is no undo.

If you freeze a **paused** gate, it can never sell again. Some gates carry a permanent rule that forbids freezing while paused, and then the
console says "This gate can't be frozen while paused (its policy keeps frozen gates purchasable). Unpause it first."
:::

## For pass holders

### Buy a pass

Buy from the page or app the gate owner points you to. The Access Gate console itself is for gate owners. For example, the
[Walrus Storage](/blockchain/sui/walrus-storage/walkthrough#buy-an-upload-pass) app shows its pass price and **Purchase access**. You see the
exact payment, who receives each part and the network before your wallet opens. You pay the price plus network gas, the split happens on-chain,
overpayment is refunded, and the pass arrives in your wallet.

### Use a pass

- An **unlimited** pass is simply held: a service checks that your wallet owns it. Some services ask your wallet to sign a short message to
  prove it. That is free and moves nothing.
- A **single-use** pass is spent by approving a "use" transaction in your wallet. It leaves a verifiable record that the service checks, which
  is why a service cannot spend your pass behind your back. The [Walrus Storage](/blockchain/sui/walrus-storage/walkthrough#buy-an-upload-pass)
  app does this for you at the start of each upload.
- To open **encrypted content** sealed to the gate, use [Sealed Storage](/blockchain/sui/sealed-storage/walkthrough). Opening a file does not
  spend a use.

### Move or destroy a pass

A **transferable** pass can be sent to another wallet or traded. A **soulbound** pass cannot. The contract also lets a holder destroy (burn)
a pass; through a wallet or app that offers it, that is permanent.

## Common questions

**Who receives my payment?** Split on-chain: a commission to the platform treasury, and the rest to the gate's payment recipient. Passes cost at
least 0.005 SUI at current defaults.

**Can the gate owner take my pass back?** No. It is your NFT in your wallet. Pausing a gate stops new sales only.

**Can a service accept the same use twice?** The chain does not stop a service that is careless, but services built properly track each use once.
Only use services you trust.

**Why was my pass refused?** See [Questions and troubleshooting](/blockchain/sui/faq#pass-refused).
