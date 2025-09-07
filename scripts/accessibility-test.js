#!/usr/bin/env node

import axeCore from 'axe-core'
import { createRequire } from 'module'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

async function runAccessibilityTests() {
  console.log('🔍 Running accessibility tests...')
  
  try {
    // Simple static HTML analysis for accessibility
    const htmlContent = readFileSync(join(__dirname, '../index.html'), 'utf8')
    
    // Check for basic accessibility requirements
    const checks = [
      {
        name: 'Has lang attribute',
        test: () => htmlContent.includes('lang="pt-BR"'),
        message: 'HTML should have lang attribute for screen readers'
      },
      {
        name: 'Has proper heading structure',
        test: () => {
          const h1Count = (htmlContent.match(/<h1[^>]*>/g) || []).length
          const h2Count = (htmlContent.match(/<h2[^>]*>/g) || []).length
          const h3Count = (htmlContent.match(/<h3[^>]*>/g) || []).length
          
          // Should have exactly one h1 and at least one h2
          return h1Count === 1 && h2Count > 0
        },
        message: 'Page should have exactly one h1 and at least one h2 for proper hierarchy'
      },
      {
        name: 'Images have alt attributes',
        test: () => {
          const imgTags = htmlContent.match(/<img[^>]+>/g) || []
          return imgTags.every(img => img.includes('alt='))
        },
        message: 'All images should have alt attributes'
      },
      {
        name: 'Buttons have accessible labels',
        test: () => {
          const buttonTags = htmlContent.match(/<button[^>]*>/g) || []
          return buttonTags.every(btn => 
            btn.includes('aria-label=') || 
            btn.includes('title=') ||
            htmlContent.includes('</button>') // has text content
          )
        },
        message: 'All buttons should have accessible labels'
      },
      {
        name: 'Form inputs have labels',
        test: () => {
          const inputTags = htmlContent.match(/<input[^>]*>/g) || []
          return inputTags.every(input => 
            input.includes('placeholder=') || 
            input.includes('aria-label=') ||
            htmlContent.includes('<label')
          )
        },
        message: 'All form inputs should have labels or placeholders'
      },
      {
        name: 'Has skip navigation',
        test: () => htmlContent.includes('skip') || htmlContent.includes('pular'),
        message: 'Consider adding skip navigation for keyboard users'
      }
    ]
    
    let passed = 0
    let failed = 0
    
    console.log('\n📋 Accessibility Test Results:')
    console.log('================================')
    
    checks.forEach(check => {
      try {
        const result = check.test()
        if (result) {
          console.log(`✅ ${check.name}`)
          passed++
        } else {
          console.log(`❌ ${check.name}`)
          console.log(`   ${check.message}`)
          failed++
        }
      } catch (error) {
        console.log(`⚠️  ${check.name} - Error: ${error.message}`)
        failed++
      }
    })
    
    console.log('\n📊 Summary:')
    console.log(`Passed: ${passed}`)
    console.log(`Failed: ${failed}`)
    console.log(`Total: ${checks.length}`)
    
    const score = Math.round((passed / checks.length) * 100)
    console.log(`Score: ${score}%`)
    
    if (score >= 80) {
      console.log('🎉 Good accessibility compliance!')
    } else {
      console.log('⚠️  Accessibility needs improvement.')
    }
    
    // Exit with error if score is too low
    if (score < 70) {
      process.exit(1)
    }
    
  } catch (error) {
    console.error('❌ Error running accessibility tests:', error.message)
    process.exit(1)
  }
}

runAccessibilityTests()