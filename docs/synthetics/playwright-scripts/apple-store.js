export default async function testPage(page, context) {
  // App Store URL, in this example WhatsApp is used.
  const baseUrl = "https://apps.apple.com/us/app/whatsapp-messenger/id310633997";
  
  // Goto the URL
  await page.goto(baseUrl);

  // Take screenshot of the page for reference
  await page.screenshot({ path: 'screenshot.jpg' });

  // Extract ratings information
  const rating = parseFloat(await page.locator('.we-customer-ratings__averages__display').innerText());
  const reviewsText = await page.locator('.we-customer-ratings__count').locator('visible=true').innerText();
  const reviews = parseInt(reviewsText.replace(" Ratings", ""));

  
  const starPercentages = [];
  for (const bar of await page.locator('.we-star-bar-graph__bar__foreground-bar').all()) {
    const widthStyle = await bar.getAttribute('style');
    const widthPercentage = parseInt(widthStyle.replace('width:', '').replace('%', '').replace(';', '').trim());
    starPercentages.push(widthPercentage);
  };

  
  // Set a custom metric for the App rating
  context.setMetric('appstore.rating', rating);

  // Set a custom metric for the number of App reviews
  context.setMetric('appstore.reviews', reviews);

  // Set a custom metric for the number of 5* ratings
  context.setMetric('appstore.ratings.fivestar', starPercentages[0]);

  // Set a custom metric for the number of 4* ratings
  context.setMetric('appstore.ratings.fourstar', starPercentages[1]);

  // Set a custom metric for the number of 3* ratings
  context.setMetric('appstore.ratings.threestar', starPercentages[2]);

  // Set a custom metric for the number of 2* ratings
  context.setMetric('appstore.ratings.twostar', starPercentages[3]);

  // Set a custom metric for the number of 1* ratings
  context.setMetric('appstore.ratings.onestar', starPercentages[4]);

  console.log('Rating:', rating);
  console.log('Reviews:', reviews);
  console.log('=== Percentage of Reviews ===')
  console.log('5 Star:', starPercentages[0]);
  console.log('4 Star:', starPercentages[1]);
  console.log('3 Star:', starPercentages[2]);
  console.log('2 Star:', starPercentages[3]);
  console.log('1 Star:', starPercentages[4]);

}