---
title: Using Sealed Storage
description: Step-by-step guide to encrypting a file, saving and sharing its manifest, and opening it with the Decrypt and Unlock tabs.
---

# Using Sealed Storage

A walkthrough of the [Sealed Storage app](https://sui-sealed-storage.meddleware.co.uk). You need a
[Sui wallet](/blockchain/sui/getting-started) set to Sui testnet; see
[Getting started](/blockchain/sui/getting-started#where-the-tools-run) for which networks are live.

The app has three tabs: **Encrypt**, **Decrypt** and **Unlock**. Press **Connect wallet** first: each tab asks you to connect
before it shows its form ("Connect a Sui wallet to encrypt and decrypt sealed content.").

## Encrypt and store

The Encrypt tab has three steps: **Policy**, **Details** and **Confirm**.

1. **Policy.** Pick a policy from the list and read its description (see [Policies](/blockchain/sui/sealed-storage/policies)). Choose **Next**.
2. **Details.** The form depends on the policy:
   - **Access-gate NFT:** the **Access gate ID**. Pick one of your gates from the list, or choose **Enter ID manually**.
   - **Time lock:** the **Unlock time**, shown in your own time zone.
   - A **Label (optional)**: a name to recognise the file later. Labels are public.
   - The **File** to encrypt.

   Choose **Next**.
3. **Confirm.** The summary shows the policy, its settings, the file and, for a gate, the address that receives the gate's
   payments (the gate owner), so you can see whose pass holders will be able to open the file. It also says how long the encrypted file
   is stored on Walrus. Choose **Encrypt & store**.

The file is encrypted in your browser and the encrypted bytes are uploaded to Walrus. You then see:

- The **manifest**, labelled "Manifest - save this; it is required to decrypt (it holds no secrets)". Choose **Download manifest** to save
  it as a `.seal.json` file.
- How long the file is kept: "Stored on Walrus through epoch (n)". After that the file is gone, although the key servers and the manifest
  still work. To keep it longer, extend the `Blob` object that was sent to your wallet in
  [Walrus Storage](/blockchain/sui/walrus-storage/walkthrough#extend-a-blob) (My Blobs) before then.

::: tip Choose the policy deliberately
The policy is part of the encryption. To change who may open a file you must seal it again.
:::

::: warning If a link chose the gate for you
If you opened Sealed Storage from a link (for example "Add unlockable content" in the Access Gate console), the gate may be preselected.
The Confirm step then warns "This access gate was preselected by a link you followed, not chosen by you", and you must tick **I want to seal
this file to the gate from the link** before you can continue. Check the gate ID and its owner first: anyone who holds a pass for that gate
will be able to open the file.
:::

### Publish a discovery pointer (optional, pass-gated content)

For access-gate content you can choose **Publish discovery pointer**. This is an on-chain transaction (it costs gas) that lets the
gate's pass holders find your file in the **Unlock** tab without you sending them a manifest. The pointer is public and grants nothing
by itself: the encryption and the gate still decide who can open the file.

## Share

Send the manifest file to whoever should be able to open the file. Because access is enforced on-chain, you can share it openly: only people who
meet the policy (hold a valid pass, or wait for the unlock time) can actually open it. The manifest also works only on the network it was made on.

## Open a file with a manifest (Decrypt tab)

The Decrypt tab has two steps: **Manifest** and **Decrypt**.

1. **Manifest.** Paste the manifest text, or use **Or upload a manifest file**. If the text is wrong you will see "Unrecognised or invalid manifest."
   If it was made on another network you will see "This manifest is for (network), but this app is on (network). It cannot be decrypted here."
   Choose **Next**.
2. **Decrypt.** The app shows the policy and asks for what it needs:
   - **Access-gate NFT:** the **Access gate ID** (already filled in from the manifest), **Your pass NFT** (the object ID of the pass in your wallet),
     and **Soulbound pass** if your pass is soulbound.
   - **Time lock:** nothing; just do this once the unlock time has passed.

   Choose **Decrypt** and approve the **signature** in your wallet. This creates a short-lived session, so you are not asked again for a while.

The app fetches the encrypted file from Walrus, asks the key servers for their key shares and decrypts it in your browser. If the on-chain
check passes, "Decrypted - download started." appears and the file downloads. If it does not (no valid pass, too early, a paused gate), opening
is refused: see [Questions and troubleshooting](/blockchain/sui/faq#cant-decrypt).

### Find your pass's ID

Your wallet's collectibles view, or a [Sui explorer](https://suiscan.xyz) page for your address, shows the object ID of each NFT you own.
Use the ID of the pass for **this** gate.

## Find and open content without a manifest (Unlock tab)

If a gate owner published a discovery pointer, you can find their content from the gate.

1. **Gate.** Enter the **Access gate ID** (or pick it from your own gates). By default only pointers published by the gate's own owner are
   listed; tick "Also list content published by other addresses (unverified: anyone can publish to a gate)" to see others. Choose
   **Find sealed content**.
2. **Unlock.** Enter **Your pass NFT ID**, tick **Pass is soulbound** if it is, and choose **Unlock & download** next to the item you want.
   You will be asked for the same signature.

Items from other publishers are marked "Published by (address): decrypting proves it was sealed to this gate, not who wrote it." If nothing
was published for the gate you will see "No sealed content published for this gate."

## Move content to new key servers (Re-seal)

Content can only be opened by the key servers it was sealed to. If those servers change, use **Re-seal for the current key servers** in the
Decrypt tab. It opens the file with the original servers and seals it again for the current ones, producing a **new** manifest and a new
blob. The old manifest still needs the old servers.

## Common questions

**Can Meddleware read my file?** No. Encryption happens in your browser and the keys are split across independent key servers. See
[Security and privacy](/blockchain/sui/security-and-privacy#sealed-storage).

**What if a key server is down?** The committee is threshold-based (for example 2 of 3), so it tolerates some servers being unreachable. If too
few answer, opening pauses until they return; storage and retrieval are unaffected.

**I lost the manifest. Can I recover the file?** The manifest holds no secret, but you need it (its identity value in particular) to find and
open the file. If you published a discovery pointer, pass holders can still find it in the Unlock tab. Otherwise keep a copy of every manifest.

**Why did it fail?** See [Questions and troubleshooting](/blockchain/sui/faq).
