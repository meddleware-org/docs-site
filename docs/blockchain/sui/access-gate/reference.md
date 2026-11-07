---
title: Access Gate reference
description: Gate settings, pass types, fees, permanent rules, deployed testnet identifiers and the messages you may see in Access Gate.
---

# Access Gate reference

The facts behind [Access Gate](/blockchain/sui/access-gate/): what a gate owner can set and change, the fees, the permanent rules a gate can
carry, the on-chain identifiers, and the messages you may see. This page describes testnet;
[Getting started](/blockchain/sui/getting-started#where-the-tools-run) says which networks are live.

## What a gate has

| Setting | Chosen by | Can it change later? |
| --- | --- | --- |
| Price (in SUI, or free) | gate owner | yes, by the gate owner (a paid price must stay at or above the minimum) |
| Payment recipient | gate owner | yes |
| Pass type: unlimited or single-use | gate owner, at creation | **no**. Only the number of uses of a single-use gate can change |
| Number of uses (default credits) | gate owner | yes, on a single-use gate |
| Soulbound or transferable | gate owner, at creation | **no** |
| Auto-burn at zero uses | gate owner | yes, and it applies to passes already sold |
| Pass name, image and description | gate owner | yes |
| Paused or open for sales | gate owner | yes |
| Frozen | gate owner | frozen is permanent |
| Permanent rules (below) | set by the tool that creates the gate | **no** |

## Fees

Current defaults, set on-chain by the platform and shown in the console before you pay. They may change; see [Fees](/blockchain/sui/fees).

| Item | Value (current default) | Paid by | Paid to |
| --- | --- | --- | --- |
| Commission on a sale | 0.2% of the price, at least 0.0005 SUI, at most 10% | the buyer, out of the price | the platform treasury |
| Minimum price of a paid pass | 0.005 SUI (ten times the minimum commission) | n/a | n/a |
| One-off fee for a free gate (price 0) | 1 SUI | the gate owner, when the gate is created free or first made free | the platform treasury |
| Airdrop | the commission a sale at the current price would pay | the gate owner | the platform treasury |
| Network gas | varies | whoever signs | Sui validators |

The treasury address and the commission are visible at any time in the [Treasury](/blockchain/sui/treasury/). A gate owner can choose a
**permanent rule** that locks the commission in when the gate is frozen; otherwise the platform can change the commission terms (never above 10%
of a price) for every gate, frozen ones included.

## Permanent rules of a gate

A tool that creates gates can attach rules to a gate when it is created. They are recorded on the gate, visible to everyone, and can never be
changed afterwards. The console lists the ones it applies under **Permanent rules on this deployment** before you confirm.

| Rule | Meaning |
| --- | --- |
| The gate can't be frozen while paused | A frozen gate can never be left unable to sell. |
| Freezing locks in the current platform commission | The commission your buyers pay cannot change after the freeze. |
| Pausing also stops Seal-protected content from being unlocked | While paused, pass holders cannot open [sealed files](/blockchain/sui/sealed-storage/) for this gate. |
| Pausing also stops passes from being used | While paused, passes cannot be used (for example, for relay uploads). |

A gate whose pause blocks unlocking or use must also forbid freezing while paused.

## Deployed identifiers (testnet)

For checking in a [Sui explorer](https://suiscan.xyz). The superseded earlier packages still serve the gates created on them.

| Thing | ID |
| --- | --- |
| `access_gate` package | `0xd7ddaa94b74330979b2b618fc81206d160a264f1c9ca148a77fa2144301388c9` |
| `PlatformConfig` object | `0x3f81489df58233d96798f34ad44de325e1b4df7e4d615affe72ca181969ee7b5` |

The contract is documented with its package and imported here: the [on-chain overview](/blockchain/sui/onchain/access-gate/overview) and
[using passes and gates](/blockchain/sui/onchain/access-gate/user-guide).

## Messages you may see

These come from the contract and are shown in plain words by the console and other apps.

| Message | What it means and what to do |
| --- | --- |
| This gate is paused. | Sales (or, for some gates, use of passes) are paused. Try again when it resumes. |
| The payment is less than the gate price. | Pay at least the price. |
| This pass is unlimited; it has no uses to spend. | An unlimited pass is never "used up", so there is nothing to spend. |
| This NFT has no uses left. | The pass is spent. Buy another. |
| The NFT or admin cap belongs to a different gate. | You presented a pass or admin capability for another gate. |
| This gate is immutable; it can no longer be changed. | The gate is frozen. |
| The commission exceeds the 10% cap. | The platform cannot set it higher. |
| The treasury or the gate's payment recipient cannot be the zero address. | Use a real address. |
| This gate's policy forbids freezing it while paused. | Unpause the gate before freezing it. |
| The price is below the platform minimum for a paid gate. | Raise the price, or make the gate free. |
| Pay the free-gate fee before setting the price to 0. | Making a gate free pays the one-off fee the first time. |
| This version of the access-gate contract has been retired; reload to use the current one. | Reload the page and try again. |
| A gate cannot switch between unlimited and single-use passes; only the number of uses of a single-use gate can change. | Create a new gate for the other type. |
| Access Gate is not available on (network). Switch to a network where it is. | The tool is not deployed on that network. |
| Free gates are disabled on this deployment. | Choose a paid price. |
| The minimum price for a paid gate is (amount) SUI. | Enter at least that. |
| The image URL must use https (or be a data:image URI). | Fix the NFT image URL. |
| Creating gates is unavailable here right now | A site problem you cannot fix. Try again later; see the [status page](/blockchain/sui/status-and-roadmap). |
| You don't administer any gates yet. Create one in the "Create gate" tab. | Your wallet holds no admin capability. Create a gate, or connect the wallet that does. |

## For developers

Putting a service behind a gate, the proof a gateway verifies, the contract's functions and events, and the SDK are covered on the developer
site: [Access Gate integration](https://meddleware.dev/sui/access-gate/integration),
[Deploy a gateway](https://meddleware.dev/sui/access-gate/gateway) and the
[on-chain API reference](https://meddleware.dev/sui/onchain/access-gate/api-reference). The generated [client API](./api/) and
[gateway wire API](./wire-api/) list every function.
