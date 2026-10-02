const { chromium } = require('playwright');
const path = require('path');

const baseUrl = process.argv[2] || 'http://127.0.0.1:8766/';
const outputDir = process.argv[3] || process.cwd();
const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'short-laptop', width: 1513, height: 618 },
  { name: 'desktop', width: 1440, height: 1000 },
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const failures = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const result = await page.evaluate(() => {
      const root = document.documentElement;
      const hero = document.querySelector('.hero-grid')?.getBoundingClientRect();
      const heroPanel = document.querySelector('.hero-panel')?.getBoundingClientRect();
      const title = document.querySelector('h1')?.getBoundingClientRect();
      const firstAction = document.querySelector('.action-deck a')?.getBoundingClientRect();
      return {
        title: document.title,
        noindex: document.querySelector('meta[name="robots"]')?.content.includes('noindex') || false,
        horizontalOverflow: root.scrollWidth > root.clientWidth + 1,
        heroBottom: hero ? Math.round(hero.bottom) : null,
        titleVisible: title ? title.top >= 0 && title.bottom <= window.innerHeight : false,
        titleContained: title && heroPanel ? title.left >= heroPanel.left - 1 && title.right <= heroPanel.right + 1 : false,
        firstActionWidth: firstAction ? Math.round(firstAction.width) : null,
        links: document.querySelectorAll('a').length,
        emptyLinks: [...document.querySelectorAll('a')].filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
      };
    });
    await page.screenshot({ path: path.join(outputDir, `btfd-${viewport.name}.png`), fullPage: false });
    if (result.horizontalOverflow || !result.noindex || !result.titleVisible || !result.titleContained || result.emptyLinks || consoleErrors.length) {
      failures.push({ viewport: viewport.name, result, consoleErrors });
    }
    console.log(JSON.stringify({ viewport: viewport.name, ...result, consoleErrors }));
    await page.close();
  }

  await browser.close();
  if (failures.length) {
    console.error(JSON.stringify({ failures }, null, 2));
    process.exit(1);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
