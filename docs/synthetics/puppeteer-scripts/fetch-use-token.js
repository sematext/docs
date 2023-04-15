async function testPage(page) {
    await page.setRequestInterception(true);
    // Intercept the next request, change its method to POST and add the request body
    page.once("request", async interceptedRequest => {
        interceptedRequest.continue({
            method: "POST",
            postData: '{"username": "exampleUser","password": "examplePassword"}',
            headers: { ...interceptedRequest.headers(), "content-type": "application/json" }
        });
    });

    // Sending first request to get token
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

    // Intercept the next request, change its method to POST and add the request body using the response we got from the first request
    page.once("request", async interceptedRequest => {
        interceptedRequest.continue({
            method: "POST",
            postData: { "token": "\${bodyJSON.token}" },
            headers: { ...interceptedRequest.headers(), "content-type": "application/json" }
        });
    });

    // Sending second request using info from the first response
    const result = await page.goto("https://private-xxxxx.apiary-mock.com/exampleSecureEndpoint");
    console.log({
        url: result.url(),
        statusCode: result.status(),
        body: await result.text()
    });
}

module.exports = testPage;