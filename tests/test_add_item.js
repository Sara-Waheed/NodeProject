/* eslint-env mocha */

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const os = require('os');

(async function fillWebForm() {
  const userDataDir = path.join(os.tmpdir(), `wd-profile-form-${Date.now()}`);

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
    // Navigate to the Selenium demo form
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");

    // Fill in the text input
    await driver.findElement(By.name('my-text')).sendKeys('Test Input');

    // Click the submit button
    await driver.findElement(By.css('button')).click();

    // Wait for the title to change after form submission
    await driver.wait(until.titleIs('Form submitted'), 5000);

    console.log('Form submission test passed');
  } finally {
    await driver.quit();
  }
})();
