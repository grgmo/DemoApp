import {by, element, expect, device, waitFor} from 'detox';

describe('Restaurants', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  const assertRestaurant = async (texts: string[]) => {
    for (let i = 0; i < texts.length; i++) {
      await expect(element(by.id('restaurant-0'))).toBeVisible();
    }
  };

  it('should open first restaurant from the list on webview and back to the restaurants list', async () => {
    const firstRestaurant = [
      'Aberdeen - Belmont Street',
      'Unit 10, The Academy, Belmont St',
      'Aberdeen, Aberdeen City',
      'AB10 1LB',
    ];

    await assertRestaurant(firstRestaurant);

    await element(by.text('Aberdeen - Belmont Street')).tap();

    await waitFor(element(by.id('webView')))
      .toBeVisible()
      .withTimeout(2000);

    await expect(element(by.id('loader'))).toBeVisible();

    await waitFor(element(by.id('loader')))
      .not.toBeVisible()
      .withTimeout(10000);

    await element(by.id('close_modal')).tap();

    await waitFor(element(by.id('webView')))
      .not.toBeVisible()
      .withTimeout(2000);

    await expect(element(by.text("Nando's Restaurants"))).toBeVisible();
  });
});
