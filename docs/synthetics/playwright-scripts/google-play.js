// This script extracts a Google Play Store App's ratings as custom metrics.

export default async function testPage(page, context) {


  // Goto the WhatsappURL
  await page.goto('https://play.google.com/store/apps/details?id=com.whatsapp');
  
  // Create a function in the page context to extract numerical values
  const convertToNumber = (input) => {
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
  };
  
  
  // Take screenshot of the page for reference
  await page.screenshot({ path: 'screenshot.jpg' });
  const starRatingElement = page.locator('[itemprop="starRating"]').first();
  const starRating = await starRatingElement.locator('div[aria-label$="stars out of five stars"]').textContent();
  const rating = parseFloat(starRating?.replace(/[^\d.]/g, ''));
  console.log('Rating: ', rating);


  
  // Extract Number of Reviews
  const starRatingParentElement = await starRatingElement.evaluateHandle(element => element.parentElement.parentElement);
  const numberOfReviewsElement = await starRatingParentElement.waitForSelector('div:nth-child(2)');
  const numberOfReviews = convertToNumber(await numberOfReviewsElement.textContent());
  console.log('Number of Reviews: ', numberOfReviews)
  
  // Extract Number of Downloads

  const downloadsText = await page.getByText('Downloads')
  .first()
  .evaluate(element => element.previousElementSibling?.textContent);
  const numberOfDownloads = convertToNumber(downloadsText);
  console.log('Number of Downloads: ', numberOfDownloads);

  // Set a custom metric for the App rating
  context.setMetric('playstore.rating', parseFloat(rating));

  // Set a custom metric for the number of App reviews
  context.setMetric('playstore.reviews', numberOfReviews);
  
  // Set a custom metric for the number of App downloads
  context.setMetric('playstore.downloads', numberOfDownloads);
}
