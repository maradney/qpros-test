import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver';

type testResponse = {
  status: 'SUCCESS' | 'FAILURE';
  message?: string;
};

export async function GET(request: Request) {
  const response: testResponse = {
    status: 'SUCCESS',
  };
  try {
    const driver = await (new Builder()
      .forBrowser(Browser.FIREFOX)
      .build());
    try {
      await runTestSteps(driver);
    } catch (error) {
      response.status = 'FAILURE';
      response.message = 'Testing steps error';
    } finally {
      await driver.quit();
    }
  } catch (error) {
    response.status = 'FAILURE';
    response.message = 'Selenium builder error';
  }

  return Response.json(response);
}

const runTestSteps = async (driver: WebDriver) => {
  await driver.get('https://www.google.com/ncr');
  await driver.findElement(By.name('q')).sendKeys('testing', Key.RETURN);
  await driver.wait(until.titleIs('testing - Google Search'), 3000);
};
