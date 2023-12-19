// This script extracts a Google Play Store App's ratings as custom metrics.

async function testPage(page, context) {
  // Google Play Store {appId}, in this example WhatsApp is used.
  const appId = "com.whatsapp"

  const baseUrl = "https://play.google.com/store/apps/details?id=";
  const detailsUrl = baseUrl + appId;

  // Goto the URL
  await page.goto(detailsUrl);
  
  // Create a function in the page context to extract numerical values
  await page.exposeFunction('convertToNumber', (input) => {
    const multiplier = {
      'B': 1000000000,
      'M': 1000000,
      'K': 1000,
    };
    const match = input.match(/^(\d+(\.\d+)?)\s*([BKM])?.*$/);
    if (!match) {
      throw new Error('Invalid input format');
    }
    const value = parseFloat(match[1]);
    const suffix = match[3].charAt(0).toUpperCase();
    return multiplier[suffix] ? value * multiplier[suffix] : value;
  });
  
  // Take screenshot of the page for reference
  await page.screenshot({ path: 'screenshot.jpg' });

  // Wait for the relevant elements to load
  await page.waitForSelector('[itemprop="starRating"] div');

  // Extract Rating
  const ratingElement = await page.$('[itemprop="starRating"] div');
  const ratingTextElement = await ratingElement.evaluate(element => element.textContent);
  const ratingText = ratingTextElement.replace(/[^\d.]/g, ''); // Remove non-numeric and non-dot characters
  const rating = parseFloat(ratingText);
  console.log('Rating: ', parseFloat(rating));
  
  // Extract Number of Reviews
  const reviewsElement = await page.$('[itemprop="starRating"]');
  const reviewsTextElement = await reviewsElement.evaluate(element => element.parentElement.parentElement.parentElement.querySelector('div:nth-child(2)').textContent);
  // Call the function in the page context
  const reviewsText = await page.evaluate(async (input) => {
    return await window.convertToNumber(input);
  }, reviewsTextElement);
  
  const numberOfReviews = parseFloat(reviewsText);
  console.log('Number of Reviews: ', numberOfReviews)
  
  // Extract Number of Downloads
  const downloadsElement = await page.$('[itemprop="starRating"]');
  const downloadsTextElement = await downloadsElement.evaluate(element => element.parentElement.parentElement.parentElement.querySelector('div:nth-child(1) > div:nth-child(2) > div:nth-child(1)').textContent);
  // Call the function in the page context
  const downloadsText = await page.evaluate(async (input) => {
    return await window.convertToNumber(input);
  }, downloadsTextElement);
  
  const numberOfDownloads = parseFloat(downloadsText);
  console.log('Number of Downloads: ', numberOfDownloads)
  
  // Wait for the 'Phone' button to load and click it
  const phoneButtonSelector = '[aria-label="Phone"]';
  try {
    // Wait for the 'Phone' button to load
    await page.waitForSelector(phoneButtonSelector, { timeout: 5000 });
    // Click the 'Phone' button
    await page.click(phoneButtonSelector);
    
    let currentPhoneFiveStars = null;
    let attempts = 0;
    const maxAttempts = 10;
    const pollingInterval = 1000;

    // Wait for the number of five star review value to change from null
    while (currentPhoneFiveStars === null && attempts < maxAttempts) {
      await page.waitForTimeout(pollingInterval);
      currentPhoneFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));
      attempts++;
    }

    if (currentPhoneFiveStars !== null) {
      console.log('INFO: Phone button found and clicked. Review values changed.');
      // Extract the Rating value
      const phoneRating = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1)', element => element.textContent.trim());

      console.log('=== Phone Rating ===')
      console.log('Rating: ', parseFloat(phoneRating))

      // Set the custom metrics for the App's 'Phone' ratings
      context.setMetric('playstore.phone.rating', parseFloat(phoneRating));
    } else {
      console.error('ERROR: Phone button found and clicked, but the reviews table did not change.');
    }
  } catch (error) {
    console.error('TIMEOUT: Phone button not found. Is the App available for Phone?');
  }

  // Wait for the 'Tablet' button to load and click it
  const tabletButtonSelector = '[aria-label="Tablet"]';
  try {
    // Wait for the 'Tablet' button to load
    await page.waitForSelector(tabletButtonSelector, { timeout: 5000 });
    // Click the 'Tablet' button
    await page.click(tabletButtonSelector);
    
    // Wait for the value of tabletFiveStars to load
    const initialTabletFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));

    let currentTabletFiveStars = initialTabletFiveStars;
    let attempts = 0;
    const maxAttempts = 10;
    const pollingInterval = 1000;

    // Wait for the number of five star reviews to change
    while (currentTabletFiveStars === initialTabletFiveStars && attempts < maxAttempts) {
      await page.waitForTimeout(pollingInterval);
      currentTabletFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));
      attempts++;
    }

    if (currentTabletFiveStars !== initialTabletFiveStars) {
      console.log('INFO: Tablet button found and clicked. Review values changed.');
      // Extract the Rating value
      const tabletRating = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1)', element => element.textContent.trim());

      console.log('=== Tablet Rating ===')
      console.log('Rating: ', parseFloat(tabletRating))

      // Set the custom metrics for the App's 'Tablet' ratings
      context.setMetric('playstore.tablet.rating', parseFloat(tabletRating));
    } else {
      console.error('ERROR: Tablet button found and clicked, but the reviews table did not change.');
    }
  } catch (error) {
    console.error('TIMEOUT: Tablet button not found. Is the App available for Tablet?');
  }
  
  // Wait for the 'Watch' button to load and click it
  const watchButtonSelector = '[aria-label="Watch"]';
  try {
    // Wait for the 'Watch' button to load
    await page.waitForSelector(watchButtonSelector, { timeout: 5000 });
    // Click the 'Watch' button
    await page.click(watchButtonSelector);
    
    // Wait for the value of watchFiveStars to load
    const initialWatchFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));

    let currentWatchFiveStars = initialWatchFiveStars;
    let attempts = 0;
    const maxAttempts = 10;
    const pollingInterval = 1000;

    // Wait for the number of five star reviews to change
    while (currentWatchFiveStars === initialWatchFiveStars && attempts < maxAttempts) {
      await page.waitForTimeout(pollingInterval);
      currentWatchFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));
      attempts++;
    }

    if (currentWatchFiveStars !== initialWatchFiveStars) {
      console.log('INFO: Watch button found and clicked. Review values changed.');
      // Extract the Rating value
      const watchRating = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1)', element => element.textContent.trim());

      console.log('=== Watch Rating ===')
      console.log('Rating: ', parseFloat(watchRating))

      // Set the custom metrics for the App's 'Watch' ratings
      context.setMetric('playstore.watch.rating', parseFloat(watchRating));
    } else {
      console.error('ERROR: Watch button found and clicked, but the reviews table did not change.');
    }
  } catch (error) {
    console.error('TIMEOUT: Watch button not found. Is the App available for Watch?');
  }
  
  // Wait for the 'Chromebook' button to load and click it
  const chromebookButtonSelector = '[aria-label="Chromebook"]';
  try {
    // Wait for the 'Chromebook' button to load
    await page.waitForSelector(chromebookButtonSelector, { timeout: 5000 });
    // Click the 'Chromebook' button
    await page.click(chromebookButtonSelector);
    
    // Wait for the value of chromebookFiveStars to load
    const initialChromebookFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));

    let currentChromebookFiveStars = initialChromebookFiveStars;
    let attempts = 0;
    const maxAttempts = 10;
    const pollingInterval = 1000;

    // Wait for the number of five star reviews to change
    while (currentChromebookFiveStars === initialChromebookFiveStars && attempts < maxAttempts) {
      await page.waitForTimeout(pollingInterval);
      currentChromebookFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));
      attempts++;
    }

    if (currentChromebookFiveStars !== initialChromebookFiveStars) {
      console.log('INFO: Chromebook button found and clicked. Review values changed.');
      // Extract the Rating value
      const chromebookRating = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1)', element => element.textContent.trim());

      console.log('=== Chromebook Rating ===')
      console.log('Rating: ', parseFloat(chromebookRating))

      // Set the custom metrics for the App's 'Chromebook' ratings
      context.setMetric('playstore.chromebook.rating', parseFloat(chromebookRating));
    } else {
      console.error('ERROR: Chromebook button found and clicked, but the reviews table did not change.');
    }
  } catch (error) {
    console.error('TIMEOUT: Chromebook button not found. Is the App available for Chromebook?');
  }
  
    // Wait for the 'TV' button to load and click it
  const tvButtonSelector = '[aria-label="TV"]';
  try {
    // Wait for the 'TV' button to load
    await page.waitForSelector(tvButtonSelector, { timeout: 5000 });
    // Click the 'TV' button
    await page.click(tvButtonSelector);
    
    // Wait for the value of tvFiveStars to load
    const initialTVFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));

    let currentTVFiveStars = initialTVFiveStars;
    let attempts = 0;
    const maxAttempts = 10;
    const pollingInterval = 1000;

    // Wait for the number of five star reviews to change
    while (currentTVFiveStars === initialTVFiveStars && attempts < maxAttempts) {
      await page.waitForTimeout(pollingInterval);
      currentTVFiveStars = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div', element => element.getAttribute('title'));
      attempts++;
    }

    if (currentTVFiveStars !== initialTVFiveStars) {
      console.log('INFO: TV button found and clicked. Review values changed.');
      // Extract the Rating value
      const tvRating = await page.$eval('[data-g-id="reviews"] > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1)', element => element.textContent.trim());

      console.log('=== TV Rating ===')
      console.log('Rating: ', parseFloat(tvRating))

      // Set the custom metrics for the App's 'TV' ratings
      context.setMetric('playstore.tv.rating', parseFloat(tvRating));
    } else {
      console.error('ERROR: TV button found and clicked, but the reviews table did not change.');
    }
  } catch (error) {
    console.error('TIMEOUT: TV button not found. Is the App available for TV?');
  }

  // Set a custom metric for the App rating
  context.setMetric('playstore.rating', parseFloat(rating));

  // Set a custom metric for the number of App reviews
  context.setMetric('playstore.reviews', numberOfReviews);
  
  // Set a custom metric for the number of App downloads
  context.setMetric('playstore.downloads', numberOfDownloads);
}

module.exports = testPage;
