import type { Page } from '@playwright/test'
import { offline } from '@meddleware/frontend-config/look'

/** A page of the built site, with every request that leaves localhost refused. */
export const page_ =
  (path: string) =>
  async (page: Page): Promise<void> => {
    // Refuse every request that leaves localhost.
    await offline(page)
    // Open the page.
    await page.goto(path)
    // Wait for the page's heading, so the page has rendered.
    await page.getByRole('heading', { level: 1 }).first().waitFor()
  }
