#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create simple SVG icons for PWA
function createPWAIcons() {
  console.log('📱 Creating PWA icons...')
  
  // Heart-themed SVG icon
  const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff3b82;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff9f8e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="#ffffff"/>
  <path d="M100 160 L60 120 C50 110, 50 90, 60 80 C70 70, 90 70, 100 80 C110 70, 130 70, 140 80 C150 90, 150 110, 140 120 L100 160 Z" 
        fill="url(#heartGradient)" 
        stroke="#ff3b82" 
        stroke-width="2"/>
  <circle cx="85" cy="95" r="3" fill="#ffffff" opacity="0.8"/>
  <circle cx="115" cy="95" r="3" fill="#ffffff" opacity="0.8"/>
</svg>`.trim()

  // Create different sizes
  const sizes = [
    { size: 192, filename: 'pwa-192x192.png' },
    { size: 512, filename: 'pwa-512x512.png' },
    { size: 180, filename: 'apple-touch-icon.png' },
    { size: 32, filename: 'favicon-32x32.png' },
    { size: 16, filename: 'favicon-16x16.png' }
  ]

  // For now, create placeholder files with the correct naming
  // In a real implementation, you'd use a library like sharp or puppeteer to convert SVG to PNG
  sizes.forEach(({ size, filename }) => {
    const placeholder = `# ${filename}\n# PWA Icon placeholder (${size}x${size})\n# This should be replaced with actual PNG files generated from SVG\n`
    writeFileSync(join(__dirname, '../public', filename), placeholder)
    console.log(`✅ Created placeholder for ${filename}`)
  })

  // Create the SVG maskable icon
  writeFileSync(join(__dirname, '../public/safari-pinned-tab.svg'), svgIcon)
  console.log('✅ Created safari-pinned-tab.svg')

  // Create browserconfig.xml for Windows tiles
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/pwa-192x192.png"/>
            <TileColor>#ff6b6b</TileColor>
        </tile>
    </msapplication>
</browserconfig>`
  
  writeFileSync(join(__dirname, '../public/browserconfig.xml'), browserConfig)
  console.log('✅ Created browserconfig.xml')

  console.log('🎉 PWA icons setup complete!')
  console.log('💡 Note: Placeholder files created. Replace with actual PNG files for production.')
}

createPWAIcons()