#!/usr/bin/env node

import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

async function runLighthouseTests() {
  console.log('🚨 Running Lighthouse performance tests...')

  let chrome
  try {
    // Launch Chrome
    chrome = await launch({ chromeFlags: ['--headless'] })

    // Run Lighthouse
    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    }

    const runnerResult = await lighthouse('http://localhost:8000', options)

    if (!runnerResult || !runnerResult.lhr) {
      throw new Error('Failed to run Lighthouse')
    }

    const { categories } = runnerResult.lhr

    console.log('\n📊 Lighthouse Results:')
    console.log('======================')

    const results = {
      Performance: categories.performance?.score * 100,
      Accessibility: categories.accessibility?.score * 100,
      'Best Practices': categories['best-practices']?.score * 100,
      SEO: categories.seo?.score * 100
    }

    let allPassed = true

    Object.entries(results).forEach(([category, score]) => {
      const scoreText = score ? Math.round(score) : 0
      const status = scoreText >= 90 ? '✅' : scoreText >= 70 ? '⚠️' : '❌'
      console.log(`${status} ${category}: ${scoreText}/100`)

      if (scoreText < 90) {
        allPassed = false
      }
    })

    const averageScore = Object.values(results).reduce((sum, score) => sum + (score || 0), 0) / 4
    console.log(`\n📈 Average Score: ${Math.round(averageScore)}/100`)

    if (allPassed) {
      console.log('🎉 All Lighthouse scores meet the ≥90 requirement!')
    } else {
      console.log('⚠️  Some Lighthouse scores need improvement to reach ≥90.')
    }

    // Generate detailed report for CI
    if (process.env.CI) {
      console.log('\n📝 Detailed Issues:')
      Object.entries(categories).forEach(([, category]) => {
        if (category.score < 0.9) {
          console.log(`\n${category.title}:`)
          category.auditRefs
            .filter(ref => runnerResult.lhr.audits[ref.id].score < 1)
            .slice(0, 5) // Show top 5 issues
            .forEach(ref => {
              const audit = runnerResult.lhr.audits[ref.id]
              console.log(`  - ${audit.title}: ${audit.description}`)
            })
        }
      })
    }

    // Exit with error if average score is too low
    if (averageScore < 85) {
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Error running Lighthouse tests:', error.message)
    console.log('💡 Make sure the development server is running on localhost:8000')
    process.exit(1)
  } finally {
    if (chrome) {
      await chrome.kill()
    }
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runLighthouseTests()
}
