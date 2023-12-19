// This script extracts a Apple Store App's ratings as custom metrics.

async function testPage(page, context) {
  // App Store URL, in this example WhatsApp is used.
  const baseUrl = "https://apps.apple.com/us/app/whatsapp-messenger/id310633997";

  // Goto the URL
  await page.goto(baseUrl);
  
  // Take screenshot of the page for reference
  await page.screenshot({ path: 'screenshot.jpg' });

  // Wait for the reviews elements to load
  await page.waitForSelector('.we-customer-ratings', {
      visible: true, // Wait for reviews element to be visible
      timeout: 30000 // Unlimited timeout
  });

  // Extract ratings information
  const customerRatingsElem = await page.$('.we-customer-ratings');
  const rating = await page.evaluate(el => {
    return parseFloat(el.querySelector('.we-customer-ratings__averages > span').textContent);
  }, customerRatingsElem);
  const reviews = await page.evaluate(el => {
    return parseInt(el.querySelector('.we-customer-ratings__count').textContent.replace(" Ratings", ""));
  }, customerRatingsElem);
  
  const starPercentages = await page.evaluate(() => {
    const bars = document.querySelectorAll('.we-star-bar-graph__bar__foreground-bar');
    const percentages = [];

    bars.forEach(bar => {
      const widthStyle = bar.style.width; // Get the style attribute
      const widthPercentage = parseInt(widthStyle.replace('width:', '').replace(';', '').trim()); // Extract percentage value
      percentages.push(widthPercentage);
    });

    return percentages;
  });

  // Set a custom metric for the App rating
  context.setMetric('appstore.rating', rating);

  // Set a custom metric for the number of App reviews
  context.setMetric('appstore.reviews', reviews);
  
  // Set a custom metric for the number of 5* ratings
  context.setMetric('appstore.ratings.fivestar', parseInt(starPercentages[0]));
  
  // Set a custom metric for the number of 4* ratings
  context.setMetric('appstore.ratings.fourstar', parseInt(starPercentages[1]));
  
  // Set a custom metric for the number of 3* ratings
  context.setMetric('appstore.ratings.threestar', parseInt(starPercentages[2]));
  
  // Set a custom metric for the number of 2* ratings
  context.setMetric('appstore.ratings.twostar', parseInt(starPercentages[3]));
  
  // Set a custom metric for the number of 1* ratings
  context.setMetric('appstore.ratings.onestar', parseInt(starPercentages[4]));

  console.log('Rating:', rating);
  console.log('Reviews:', reviews);
  console.log('=== Percentage of Reviews ===')
  console.log('5 Star:', parseInt(starPercentages[0]));
  console.log('4 Star:', parseInt(starPercentages[1]));
  console.log('3 Star:', parseInt(starPercentages[2]));
  console.log('2 Star:', parseInt(starPercentages[3]));
  console.log('1 Star:', parseInt(starPercentages[4]));

}

module.exports = testPage;
