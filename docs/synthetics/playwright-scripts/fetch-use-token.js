export default async function testPage(page) {

    // Get the api request API to make our post call
    const apiRequest = page.request;

    // Make a POST request to the authentication endpoint
    const response = await apiRequest.post("https://private-c82e7-stcloudtest.apiary-mock.com/authenticate", {
        data: {
            username: "exampleUser",
            password: "examplePassword"
        }
    });

    const responseJSON = await response.json();

    // Secure URL which requires authentication and the appropriate headers which we'll add to the request
    const secureURL = `https://private-c82e7-stcloudtest.apiary-mock.com/${responseJSON.loginPath}`;
    const additionalHeaders = {
        "content-type": "application/json",
        "Authorization": `Bearer ${responseJSON.token}`
    };

    // Intercept the request to the secure URL and add the necessary headers
    await page.route(secureURL, route => {
        route.continue({
            method: 'POST',
            headers: {
                ...route.request().headers(),
                ...additionalHeaders
            }
        });
    });

    // Now safely navigate to the secure URL
    const result = await page.goto(secureURL);

    console.log({
        url: result.url(),
        statusCode: result.status(),
        body: await result.text()
    });
}