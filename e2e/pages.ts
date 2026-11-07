// The pages the browser tests visit: the home page, the Sui overview, a tool's overview, its walkthrough and its long reference page, and the
// pages with a different structure (a long list of questions, the fee tables, the glossary table, the security page, a tool with a wizard).
export const PAGES = {
  home: '/',
  sui: '/blockchain/sui/',
  gettingStarted: '/blockchain/sui/getting-started',
  walrus: '/blockchain/sui/walrus-storage/',
  walrusWalkthrough: '/blockchain/sui/walrus-storage/walkthrough',
  reference: '/blockchain/sui/walrus-storage/reference',
  tokenIssuance: '/blockchain/sui/token-issuance/',
  fees: '/blockchain/sui/fees',
  security: '/blockchain/sui/security-and-privacy',
  faq: '/blockchain/sui/faq',
  glossary: '/blockchain/sui/glossary',
} as const
