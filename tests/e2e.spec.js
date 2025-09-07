import { test, expect } from '@playwright/test'

test.describe('Love Story Website E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Esdra.*Maria Clara.*Nossa História de Amor/)
    await expect(page.locator('h1')).toContainText('Esdra & Maria Clara')
  })

  test('should have proper navigation', async ({ page }) => {
    // Check navigation links
    const navLinks = [
      { text: 'Início', href: '#inicio' },
      { text: 'Nossa História', href: '#nossa-historia' },
      { text: 'Momentos Especiais', href: '#momentos' },
      { text: 'Galeria', href: '#galeria' },
      { text: 'Promessas', href: '#promessas' },
      { text: 'Mensagem', href: '#mensagem' }
    ]

    for (const link of navLinks) {
      await expect(page.locator(`a[href="${link.href}"]`)).toBeVisible()
    }
  })

  test('should display love story content', async ({ page }) => {
    await expect(page.locator('#nossa-historia')).toBeVisible()
    await expect(page.locator('#nossa-historia h2')).toContainText('Nossa História')
    await expect(page.getByText('Desde 24 de Junho de 2015')).toBeVisible()
  })

  test('should have working image gallery', async ({ page }) => {
    await expect(page.locator('#galeria')).toBeVisible()
    await expect(page.locator('.swiper-container')).toBeVisible()
    
    // Test gallery navigation
    const nextButton = page.locator('.swiper-button-next')
    const prevButton = page.locator('.swiper-button-prev')
    
    await expect(nextButton).toBeVisible()
    await expect(prevButton).toBeVisible()
  })

  test('should have functional love calculator', async ({ page }) => {
    const firstNameInput = page.locator('input[placeholder="Primeiro nome"]')
    const secondNameInput = page.locator('input[placeholder="Segundo nome"]')
    const calculateButton = page.locator('button:has-text("Calcular Compatibilidade")')

    await expect(firstNameInput).toBeVisible()
    await expect(secondNameInput).toBeVisible()
    await expect(calculateButton).toBeVisible()

    // Test calculation
    await firstNameInput.fill('Esdra')
    await secondNameInput.fill('Maria Clara')
    await calculateButton.click()

    // Should show a result
    await expect(page.locator('.love-result')).toBeVisible({ timeout: 5000 })
  })

  test('should have working theme switcher', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle')
    await expect(themeToggle).toBeVisible()
    
    // Click theme toggle and verify dark mode
    await themeToggle.click()
    await expect(page.locator('body')).toHaveClass(/dark-theme/)
    
    // Click again to return to light mode
    await themeToggle.click()
    await expect(page.locator('body')).not.toHaveClass(/dark-theme/)
  })

  test('should display countdown timers', async ({ page }) => {
    // Check anniversary countdown
    await expect(page.getByText('Próximo Aniversário de Namoro')).toBeVisible()
    await expect(page.locator('.countdown-timer')).toBeVisible()
    
    // Check birthday countdown
    await expect(page.getByText('Próximo Aniversário da Maria Clara')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check mobile navigation
    const menuToggle = page.locator('.menu-toggle')
    await expect(menuToggle).toBeVisible()
    
    // Test mobile menu
    await menuToggle.click()
    await expect(page.locator('nav ul')).toBeVisible()
  })

  test('should load without console errors', async ({ page }) => {
    const errors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Filter out network errors for external resources (expected in test environment)
    const criticalErrors = errors.filter(error => 
      !error.includes('net::ERR_BLOCKED_BY_CLIENT') &&
      !error.includes('404') &&
      !error.includes('Failed to load resource')
    )
    
    expect(criticalErrors).toHaveLength(0)
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check essential meta tags
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
  })
})