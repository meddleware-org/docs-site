---
title: Sealed Storage policies
description: The access rules you can seal a file under - pass holders only, or anyone after an unlock time - what each means and when to choose it.
---

# Sealed Storage policies

A **policy** is the on-chain rule that decides who may open sealed content. You choose one when you encrypt, and it cannot be
changed afterwards without sealing the file again.

## Access-gate NFT

**Only holders of a valid pass for the access gate you chose can open the file.**

- **When you seal:** you give the **Access gate ID**. If your wallet owns gates, the app lists them to pick from; otherwise (or by choice)
  choose **Enter ID manually**.
- **When someone opens it:** they give the gate ID and the ID of the pass they hold, and say whether the pass is soulbound.
- **Use it for:** paid communities, subscriber-only files, gated downloads. Sell the passes with [Access Gate](/blockchain/sui/access-gate/).

Good to know:

- A pass for one gate never opens another gate's content.
- A single-use pass works as **membership** here: opening a file does **not** spend a use. A pass with no uses left is refused.
- Freezing a gate never stops pass holders from opening files. **Pausing** a gate does only if the gate was created with the rule
  "pausing also stops Seal-protected content from being unlocked"; access returns when the gate is unpaused.
- A **transferable** pass that is sold or sent on gives the new holder access. For content that must stay with its buyers, use a gate
  with **soulbound** passes.
- Once decrypted, always decrypted: someone who opened a file keeps the file.

## Time lock

**Anyone can open the file once the unlock time has passed.**

- **When you seal:** you choose the **Unlock time**, in your own time zone.
- **When someone opens it:** they need only the manifest, and to wait until the time arrives.
- **Use it for:** embargoed announcements, scheduled releases and "open after" content.

The time is checked against the **network's clock**, not the opener's computer, so changing a device clock does not help. Before the
time, **nobody** can open it, including you. The time cannot be changed after sealing.

## Choosing a policy

| You want... | Choose |
| --- | --- |
| Access limited to holders of a pass you sell or give out | Access-gate NFT |
| A release open to everyone after a date | Time lock |
| Both at once (a pass, and not before a date) | Not available as one policy today |

More policies (allowlists, subscriptions, owner-only, balance-based access) are planned. They will appear in the app's policy list
when they are released.

## Choosing and changing

Pick the policy and the gate or time carefully. They are part of the encryption. To change who may open a file you must seal the file
again under a new policy and share the new manifest; the old manifest keeps working under its old rule.

For the exact rules as written in the contracts, see [what the policies allow](/blockchain/sui/onchain/sealed-storage/user-guide).
Writing a new policy is a developer task: [Writing policies](https://meddleware.dev/sui/sealed-storage/policies).
