export default async function testPage(page) {
    // Set the screen resolution, as things render differently on different screen widths
    await page.setViewportSize({
        width: 1200,
        height: 800,
    })

    // Go to the URL which switches into the demo account and wait for domcontentloaded
    await page.goto('https://apps.sematext.com/demo', { waitUntil: 'domcontentloaded' });


    // Go to the Synthetics page
    await page.getByRole('link').filter({ hasText: 'Synthetics' }).click();
    // Wait for the locations map to show up, then take a screenshot
    await page.locator('[id="locationsMap"]').waitFor();
    await page.screenshot({ path: 'synthetics.png' });

    // We use more specific selectors to get our link element
    await page.getByRole('listitem').and(page.getByTitle('Logs')).getByRole('link').click();
    await page.getByText('Custom Logs Demo').waitFor();
    await page.screenshot({ path: 'Logs.png' });
}