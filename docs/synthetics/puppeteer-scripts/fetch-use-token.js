async function testPage(page) {
    await page.setRequestInterception(true);
    // Intercept the next request, change its method to POST and add the request body
    page.once("request", async interceptedRequest => {
        interceptedRequest.continue({
            method: "POST",
            postData: '{"username": "exampleUser","password": "examplePassword"}',
            headers: {
                ...interceptedRequest.headers(),
                "content-type": "application/json"
            }
        });
    });

    // Sending the first request to get the token
    const response = await page.goto("https://private-xxxxx.apiary-mock.com/authenticate");
    bodyJSON = await response.json();
    // response.text() prints out the response body as a string, useful if you're not using JSON
    // response.json() parses the response body JSON and throws an error if it isn't valid JSON
    console.log({
        url: response.url(),
        statusCode: response.status(),
        body: await response.text(),
        bodyJSON
    });

    // Secure URL which requires authentication and the appropriate headers which we'll add to the request
    const secureURL = "https://private-xxxxx.apiary-mock.com/exampleSecureEndpoint";
    const additionalHeaders = {
        "content-type": "application/json",
        "Authorization": `Bearer ${bodyJSON.example_header_token}`
    };

    // Intercept the next request, change its method to POST and add the token from the response we got from the first request
    // Use page.on instead of page.once and check against URLs you want to intercept when intercepting additional requests after the
    // first one, since that way we can avoid intercepting other requests made from the first page instead of the one we need to modify
    page.on("request", async interceptedRequest => {
        // Ensure that the URL capitalization is the same when performing the comparison
        if (interceptedRequest.url() === secureURL.toLowerCase()) {
            interceptedRequest.continue({
                method: "POST",
                postData: { "token": `${bodyJSON.example_body_token}` },
                headers: {
                    ...interceptedRequest.headers(),
                    ...additionalHeaders
                }
            });
        } else {
            interceptedRequest.continue();
        }
    });

    // Sending the second request using the info from the first response
    const result = await page.goto(secureURL);
    console.log({
        url: result.url(),
        statusCode: result.status(),
        body: await result.text()
    });
}

module.exports = testPage;