const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const os = require('os');

(async function homepage() {
  // create unique temp dir for Chrome profile
  const userDataDir = path.join(os.tmpdir(), `wd-profile-${Date.now()}`);

  let options = new chrome.Options()
    .addArguments(
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--user-data-dir=${userDataDir}`
    );

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");
    console.log('Web form page opened successfully');
  } finally {
    await driver.quit();
  }
})();
