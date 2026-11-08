---
title: Questions and troubleshooting
description: Answers to common questions and fixes for common problems - wallet will not connect, wrong network, rejected transaction, expired blob, cannot decrypt, pass used up - with the real messages the tools show.
---

# Questions and troubleshooting

Find your problem below. The messages are quoted as the tools show them. If nothing here helps, check the
[service status](/blockchain/sui/status-and-roadmap), and see the words you do not know in the [glossary](/blockchain/sui/glossary).

## Wallet and network

### My wallet will not connect

- **"No Sui wallet detected. Install a wallet extension to continue."** Your browser has no Sui wallet extension, or it is disabled for the site.
  Install one (see [Getting started](/blockchain/sui/getting-started#get-a-sui-wallet)), reload the page and try **Connect wallet** again.
- **No wallet is listed in the dashboard.** The dashboard only offers wallets that can sign both transactions and messages. Use another wallet.
- **The connection prompt closes or says it was rejected.** Press **Connect wallet** again and approve it in the extension. A locked wallet must be
  unlocked first.
- **"Several wallets are named (name). Check your browser extensions before choosing one."** Two extensions use the same name. Choose carefully and
  disable the one you do not recognise.

### Wrong network {#wrong-network}

The tool and your wallet must be on the same Sui network, and the tool must be deployed there.

- Check which network the tool is on: its introduction line names it, for example "(testnet)". In the [dashboard](/blockchain/sui/dashboard), look at the **Network** selector.
- Set your wallet to the same network. On testnet you can get free test SUI from the [Sui faucet](https://faucet.sui.io/).
- **"The connected wallet account cannot sign for sui:testnet (it lists: ...)."** Your wallet account does not support that network. Switch account or wallet.
- **"The RPC at (address) serves chain (x), not testnet (y). Check the network and RPC URL."** The network address in use does not belong to the network you chose.
  In the dashboard, check the selector (and the node address if you chose Localnet).
- **"(Tool) is not available on (network). Switch to a network where it is."** or **"Token issuance is not open on (network) yet. Switch to testnet to try it."**
  The tool is not deployed on that network. Which networks are live is on [Getting started](/blockchain/sui/getting-started#where-the-tools-run).

### I rejected a prompt, or my wallet shows an error

- **You rejected the prompt.** Nothing happened. Start the action again and approve it.
- **"The connected wallet account changed; rebuild the transaction and try again."** or **"The selected network changed; rebuild the transaction and try again."**
  You switched account or network while the action was in progress. Do the action again from the start.
- **"This wallet cannot sign transactions."** or **"This wallet cannot sign personal messages."** Your wallet lacks a feature the tool needs. Use another wallet.
- **Not enough SUI.** Every transaction needs SUI for gas. Add some (on testnet, from the faucet). Token Issuance needs about 2.5 SUI: see its
  [walkthrough](/blockchain/sui/token-issuance/walkthrough).

### A transaction failed

- **"Transaction (digest) failed on-chain."** The network refused the transaction. The tool usually adds the reason in plain words (for example,
  "This gate is paused."). Nothing was charged beyond gas. Fix the cause and try again.
- **"Transaction (digest) was submitted but could not be confirmed (...). Refresh before retrying."** It may have gone through. Refresh the page and look
  at your gates, blobs or coins before trying again, so that you do not do it twice. You can also look the digest up in a [Sui explorer](https://suiscan.xyz).

## Walrus Storage

### My blob expired, or is about to

Walrus storage is paid for a number of epochs (about two weeks each on mainnet). A blob marked **Expiring soon** in **My Blobs** should be extended now:
choose **Show cost**, then **Extend** ([how](/blockchain/sui/walrus-storage/walkthrough#extend-a-blob)). Once a blob has expired and the network has removed it, it
**cannot be extended**: upload it again if you still have the file.

### It asks for an access pass, or I have no pass left

On testnet, Meddleware's upload relay needs a pass. **"Access pass required"** and **"An access pass is required to upload through this relay"** mean you have
none, or it has no uses left. Buy one on the same page ([how](/blockchain/sui/walrus-storage/walkthrough#buy-an-upload-pass)).

**"Purchases from this gate are paused right now."** Sales are paused; try later.

### An upload stopped half way

If you see **"Your blob is registered and paid for, but the upload to the relay did not complete"**, choose **Retry upload**. If you see **"Your blob was uploaded and
paid for but not yet certified"**, choose **Certify blob**. Neither pays again. See [the walkthrough](/blockchain/sui/walrus-storage/walkthrough#if-an-upload-stops-half-way).

### "You already have this blob"

You own an identical file. Choose **Extend it** rather than paying for a copy.

### I do not have WAL

WAL pays for Walrus storage and is separate from SUI. On testnet you can exchange test SUI for test WAL; see the
[Walrus documentation](https://docs.wal.app/).

## Sealed Storage

### I cannot decrypt a file {#cant-decrypt}

Opening is refused when the on-chain rule says no, or when too few key servers answer. Work through these:

1. **Right network?** "This manifest is for (network), but this app is on (network). It cannot be decrypted here." Open the app on the manifest's network.
2. **Whole manifest?** "Unrecognised or invalid manifest." Paste the whole file.
3. **Pass-gated file:**
   - Use the ID of the pass for **this** gate. A pass for another gate is refused.
   - The pass must be in the connected wallet.
   - Tick **Soulbound pass** only if your pass is soulbound.
   - A single-use pass with no uses left is refused ([pass used up](#pass-refused)).
   - If the gate owner paused the gate and the gate has the rule that pausing blocks unlocking, access returns when it is unpaused.
4. **Time-locked file:** it opens only once the unlock time (the network's clock) has passed. Before that nobody can open it.
5. **A new pass or gate?** A pass you just bought can take a moment to be visible to the key servers. Wait and try again.
6. **Key servers.** The key servers' own refusal reads **"User does not have access to one or more of the requested keys"**. This usually means one of the above.
   If too few servers answer, nobody can open any sealed file until they return; storage is unaffected. Try later and check the [status page](/blockchain/sui/status-and-roadmap).

The app asks you to sign **one** message to open a file. If you reject it, nothing is opened.

### The file is gone

The encrypted file is stored on Walrus for a limited number of epochs (the Confirm step said how many). After that it cannot be recovered. See
[Sealed Storage](/blockchain/sui/sealed-storage/#what-it-costs-and-what-the-limits-are).

### "Choose a file to encrypt." or the file is too large

Pick a file in the **Details** step. Files up to about 10 MiB are accepted.

### I lost my manifest

The manifest holds no secret, but you need it to find and open the file. If the file was sealed to a gate and its owner published a discovery pointer, use the
**Unlock** tab. Otherwise there is no way to recreate it; keep copies of manifests.

## Access Gate and passes

### My pass was refused, or is used up {#pass-refused}

| Message | What it means |
| --- | --- |
| This NFT has no uses left. | A single-use pass is spent. Buy another. |
| This pass is unlimited; it has no uses to spend. | Unlimited passes cannot be "used up". |
| The NFT or admin cap belongs to a different gate. | You presented a pass for another gate. |
| This gate is paused. | Sales (and, for some gates, uses) are paused. |
| The payment is less than the gate price. | The price changed; try again. |

The full list is in the [Access Gate reference](/blockchain/sui/access-gate/reference#messages-you-may-see). A spent single-use pass may remain in your wallet as a receipt, but it
grants nothing.

### I cannot change my gate

- **"This gate is immutable; it can no longer be changed."** The gate is frozen. This is permanent.
- **"A gate cannot switch between unlimited and single-use passes..."** Create a new gate.
- **"This gate's policy forbids freezing it while paused."** Unpause it first.
- You do not hold the gate's admin capability in the connected wallet: connect the wallet that created the gate.

### I see no gates in "My gates"

"You don't administer any gates yet." means the connected wallet holds no admin capability. Connect the wallet that created the gate, or create one.

## Token Issuance

### "Your coin is published - finish its setup"

The second of the two transactions did not complete. Choose **Finish setup (sign again)**. **Do not deploy again**: that publishes a second coin.

### "A coin was published, but the result could not be read"

Open the publish transaction shown on the page in a Sui explorer before doing anything else. Do not deploy again.

### I cannot mint, or the details cannot be changed

You can only mint if you chose a **mintable** supply and still hold the mint capability. Metadata is only changeable if you chose **updatable** metadata and hold the
metadata capability. A **fixed** supply and **frozen** metadata are permanent. The symbol and decimals can never be changed; the name, description and icon can be changed by the metadata capability holder unless the metadata is frozen. See the
[overview](/blockchain/sui/token-issuance/).

### I sent the capabilities to the wrong address

They cannot be recovered. The recipient address is permanent; check it before you deploy.

## Treasury

### The counts are lower than I expect

"Accesses minted" and "Accesses consumed" come from events, which Sui nodes keep for only a few days. They cover a recent window, not all history. The
**gates** and **balance** figures are read from live state. See the [Treasury reference](/blockchain/sui/treasury/reference).

## General

### Is it free?

Reading is free. Using the tools costs network gas and, in some cases, a small fee or a pass. Everything is listed on [Fees](/blockchain/sui/fees).

### Who can see my data and my files?

See [Security and privacy](/blockchain/sui/security-and-privacy).

### A page is not loading or looks wrong

Check the [status page](/blockchain/sui/status-and-roadmap), reload, and try again. If the problem continues, the cause is a site problem you cannot fix.
