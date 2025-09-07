import { test, expect } from '@playwright/test'

test.describe('Basic Love Story Website Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('http://localhost:8001')
    await expect(page).toHaveTitle(/Esdra.*Maria Clara/)
  })

  test('should have main heading', async ({ page }) => {
    await page.goto('http://localhost:8001')
    await expect(page.locator('h1')).toContainText('Esdra')
  })
})
