// The pages the browser tests visit: the home page, the Sui overview, a tool's overview, its walkthrough and its long reference page, and the
// pages with a different structure (a long list of questions, the fee tables, the glossary table, the security page, a tool with a wizard).
/** The pages the browser tests visit, by name. */
export const PAGES = {
  // The platform's own pages first, then the Sui section.
  home: '/',
  sui: '/blockchain/sui/',
  gettingStarted: '/blockchain/sui/getting-started',
  walrus: '/blockchain/sui/walrus-storage/',
  // A walkthrough and a long reference page.
  walrusWalkthrough: '/blockchain/sui/walrus-storage/walkthrough',
  reference: '/blockchain/sui/walrus-storage/reference',
  // A tool with a wizard.
  tokenIssuance: '/blockchain/sui/token-issuance/',
  // The fee tables, the security page, the long list of questions and the glossary table: the pages with a different structure.
  fees: '/blockchain/sui/fees',
  security: '/blockchain/sui/security-and-privacy',
  faq: '/blockchain/sui/faq',
  glossary: '/blockchain/sui/glossary',
} as const
