const {Builder, By, until} = require('selenium-webdriver');
(async function addItem() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://host.docker.internal:3000/');
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
  } finally {
    await driver.quit();
  }
})();
