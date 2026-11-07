---
title: Glossary
description: Plain-words meanings of the terms used across the Meddleware tools - gate, pass, soulbound, epoch, blob, Seal, key server, MIST, WAL, commission and more.
---

# Glossary

The terms you will meet in the tools, in alphabetical order. Where a tool uses a different word for the same thing, both are given.

| Term | Meaning |
| --- | --- |
| **Access gate** (gate) | An on-chain object with a price and rules that sells passes. See [Access Gate](/blockchain/sui/access-gate/). |
| **Access pass** (pass, access NFT) | The NFT you get when you buy from a gate. Holding a valid pass is the proof that you may use whatever the gate protects. |
| **Admin capability** (AdminCap) | The object that lets its holder manage one gate: its price, recipient, pausing, airdrops and freezing. Whoever holds it controls the gate. |
| **Aggregator** | A Walrus service that serves a stored blob to anyone over plain web requests. |
| **Airdrop** | A gate owner giving passes away for free. The gate owner pays the commission a sale would have paid. |
| **Auto-burn** | A gate setting: a single-use pass that reaches zero uses is deleted instead of being kept as a spent receipt. |
| **Basis point** (bps) | One hundredth of a percent. 100 bps is 1%; the default commission of 20 bps is 0.2%. |
| **Blob** | A file stored on Walrus. |
| **Blob ID** | The permanent name of a blob on Walrus. Anyone who has it can read the blob. |
| **Burn** | To destroy an object for good, such as a pass or a capability. |
| **Certify** (certified) | The last step of a Walrus upload, in which the storage nodes confirm they hold the file. An uploaded but uncertified blob is not fully stored. |
| **Checkpoint** (block) | A numbered batch of finished Sui transactions. A higher number is more recent. |
| **Coin type** | The unique name of a Sui coin, in the form `package::module::STRUCT`. |
| **Commission** | The share of a pass's price that goes to the platform treasury when a pass is sold. See [Fees](/blockchain/sui/fees). |
| **Credit** (use) | One spend of a single-use pass. The gate console calls them credits; the contracts call them uses. |
| **Decimals** | How many decimal places a coin has. With 9, one coin is 1,000,000,000 of its smallest unit. |
| **Deletable blob** | A Walrus blob its owner can remove early to reclaim unused storage. The opposite of a permanent blob. |
| **Encrypt, decrypt** | To scramble a file so it can be read only with a key, and to turn it back. In Sealed Storage both happen in your browser. |
| **Epoch** | Walrus's unit of time. Storage is paid for in epochs. On mainnet an epoch is about two weeks. |
| **Explorer** | A website, such as [Suiscan](https://suiscan.xyz), that lets you look up addresses, objects and transactions on Sui. |
| **Faucet** | A service that gives out free test SUI on a test network. |
| **Free gate** | A gate with price 0. It pays a one-off platform fee. |
| **Freeze** (frozen, immutable) | To make a gate or a coin's settings permanently unchangeable. It cannot be undone. |
| **Gas** | The network fee, paid in SUI, for every transaction on Sui. It goes to the network's validators, not to Meddleware. |
| **Gate owner** | The person who creates a gate and holds its admin capability. |
| **Key server** | One of the independent services that hold pieces of the keys for Sealed Storage and release them only when the on-chain policy approves. |
| **Localnet** | A Sui network run on a developer's own computer. Not for general use. |
| **Mainnet** | The real Sui network, where SUI has value. See [Getting started](/blockchain/sui/getting-started#where-the-tools-run) for whether the tools are live there. |
| **Manifest** | The small file Sealed Storage gives you after sealing a file. It points to the encrypted file and is needed to open it. It holds no secret. |
| **MetadataCap** | The capability to change a coin's description and icon. Frozen metadata deletes it. |
| **Mintable** | A coin whose holder of the TreasuryCap can create more. The opposite of fixed supply. |
| **MIST** | The smallest unit of SUI. 1 SUI is 1,000,000,000 MIST. |
| **NFT** | A unique object in your wallet. A pass is an NFT. |
| **Object ID** | The unique address of an object on Sui. Passes, gates and blobs each have one. |
| **Package** | A published piece of on-chain code. Each coin has its own package. |
| **Pause** | To stop a gate selling new passes for a while. Reversible. |
| **Permanent blob** | A Walrus blob that nobody, including you, can delete before it expires. |
| **Platform** | Meddleware as the owner of the shared contracts and the party that receives platform fees. |
| **Policy** | In Sealed Storage, the on-chain rule that decides who may open a file: pass holders of a gate, or anyone after a time. |
| **Recipient** | The address that receives something: a gate's sale proceeds, or a new coin's capabilities and supply. |
| **Relay** (upload relay) | A service that takes a file from your browser and writes it to Walrus on your behalf, since a browser cannot do it directly. |
| **Relay fee** (tip) | A small SUI payment to whoever runs the upload relay (Meddleware, for its own relay) with each upload. |
| **Seal** | The threshold-encryption system Sealed Storage is built on. See [Sealed Storage](/blockchain/sui/sealed-storage/). |
| **Session key** | A short-lived key created when you sign one wallet message to open a file, so you are not asked again straight away. |
| **Single-use pass** | A pass with a number of uses, each spent by the holder. |
| **Soulbound** | A pass that cannot be transferred to another wallet. |
| **SUI** | Sui's coin, used for gas and for payments in these tools. |
| **Testnet** | A free practice Sui network whose SUI has no value. |
| **Threshold** | How many key servers must agree to release a key. For example 2 of 3. |
| **Time lock** | A Sealed Storage policy: the file opens for anyone after an unlock time. |
| **Treasury** | The platform address that receives commission and fees. See [Treasury](/blockchain/sui/treasury/). |
| **TreasuryCap** | The capability to mint and burn a coin. A fixed supply never has one. |
| **Unlimited pass** | A pass that is never used up; it works as a membership. |
| **UpgradeCap** | The capability to replace a package's code. An immutable package has none. |
| **Wallet** | The browser extension that holds your keys and signs what you approve. |
| **WAL** | Walrus's token, used to pay for storage. Separate from SUI. |
| **Walrus** | The decentralised storage network the storage tools use. |
