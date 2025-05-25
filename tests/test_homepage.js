/* eslint-env mocha */
const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const os = require('os');
const fs = require('fs');

const APP_HOST = process.env.APP_HOST || 'nodeproject-app';
const APP_PORT = process.env.APP_PORT || 3000;
const APP_URL  = `http://${APP_HOST}:${APP_PORT}`;

describe('Homepage Tests', function() {
  this.timeout(15000);
  let driver;

  before(async function() {
    const userDataDir = path.join(os.tmpdir(), `wd-profile-${Date.now()}`);
    let options = new chrome.Options().addArguments(
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
      `--user-data-dir=${userDataDir}`
    );
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function() {
    if (process.env.CI === 'true') {
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync(`screenshot-${Date.now()}.png`, screenshot, 'base64');
    }
    await driver.quit();
  });

  it('should load homepage successfully', async function() {
    await driver.get(APP_URL);

    const header = await driver.wait(
      until.elementLocated(By.css('h1')),
      5000
    );

    assert.match(
      await header.getText(),
      /Dummy\s+Node\s+App/i,
      'Homepage header text mismatch'
    );
  });
});
