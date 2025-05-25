const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const os = require('os');

(async function addItem() {
  const userDataDir = path.join(os.tmpdir(), `wd-profile-add-${Date.now()}`);
  
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
    await driver.get("http://nodeproject-app:3000");
    await driver.findElement(By.id('name')).sendKeys('TestItem');
    await driver.findElement(By.id('qty')).sendKeys('5');
    await driver.findElement(By.css('button[type=submit]')).click();
    await driver.wait(
      until.elementTextContains(
        driver.findElement(By.xpath("//li[contains(text(),'TestItem')]")),
        'TestItem'
      ),
      5000
    );
    console.log('Add item test passed');
  } finally {
    await driver.quit();
  }
})();
