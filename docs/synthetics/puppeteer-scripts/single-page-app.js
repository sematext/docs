async function testPage(page) {
    await page.goto('https://www.instagram.com/');
    // wait for sign up link element to appear, since it is loaded asynchronously
    await page.waitForSelector('a[href="/accounts/emailsignup/"]');
    await page.click('a[href="/accounts/emailsignup/"]');
    // again wait for login link to appear
    await page.waitForSelector('a[href="/accounts/login/?source=auth_switcher"]');
    await page.click('a[href="/accounts/login/?source=auth_switcher"]');
    await page.waitForSelector('a[href="/accounts/password/reset/"]');
}

module.exports = testPage