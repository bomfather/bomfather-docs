// @ts-check
const { test, expect } = require('@playwright/test');
const { playAudit } = require('playwright-lighthouse');

// Configure a slow 3G throttling profile
const throttling = {
  // 6x slowdown
  cpuSlowdownMultiplier: 6,
  rttMs: 150,
  throughputKbps: 750,
  requestLatencyMs: 1000,
  downloadThroughputKbps: 750,
  uploadThroughputKbps: 750,
};

test('Lighthouse LCP performance on slow-3G', async ({ browser }) => {
  // Launch a new browser context with desktop device
  const page = await browser.newPage();
  
  // Go to the homepage
  await page.goto('/');
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Run Lighthouse audit
  const { lhr } = await playAudit({
    page,
    thresholds: {
      performance: 70,
      accessibility: 90,
      'best-practices': 80,
      seo: 80,
    },
    port: 9222,
    config: {
      extends: 'lighthouse:default',
      settings: {
        throttling,
        formFactor: 'desktop',
        screenEmulation: { 
          width: 1350, 
          height: 940,
          deviceScaleFactor: 1, 
          mobile: false 
        },
      },
    },
  });
  
  // Check that LCP is under 1.2s
  const lcpValue = lhr.audits['largest-contentful-paint'].numericValue;
  console.log(`Largest Contentful Paint: ${lcpValue}ms`);
  
  // Assert that LCP is under 1.2s (1200ms)
  expect(lcpValue).toBeLessThan(1200);
}); 