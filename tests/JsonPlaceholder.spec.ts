import { test, expect} from '@playwright/test';

test('Get API testing - Single user', async ({ request }) => {

    let response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    console.log(await response.status);
    console.log(await response.json());
    console.log(await response.statusText);

    expect(await response.status()).toBe(200);
});

test('Get API testing - all user', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
    );

    // 1. Get response status
    const statusCode = response.status();
    console.log('Status Code:', statusCode);

    // 2. Get response status text
    const statusText = response.statusText();
    console.log('Status Text:', statusText);

    // 3. Get response body
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    // 4. Get response headers
    const headers = response.headers();
    console.log('Response Headers:', headers);

    // 5. Number of records
    console.log('Total Records:', responseBody.length);


    // =========================
    // VALIDATIONS
    // =========================

    // Validate status code
    expect(statusCode).toBe(200);

    // Validate status text
    expect(statusText).toBe('OK');

    // Validate response body is an array
    expect(Array.isArray(responseBody)).toBe(true);

    // Validate response contains 100 posts
    expect(responseBody.length).toBe(100);

    // Validate first post
    expect(responseBody[0].id).toBe(1);
    expect(responseBody[0].userId).toBe(1);

    // Validate first post has title
    expect(responseBody[0].title).toBeTruthy();

    // Validate first post has body
    expect(responseBody[0].body).toBeTruthy();

    // Validate Content-Type
    expect(headers['content-type']).toContain('application/json');

});

test('Get API testing - Delete Single user', async ({ request }) => {

    let response = await request.delete("https://jsonplaceholder.typicode.com/posts/1");

    console.log(await response.ok);
    expect(await response.status()).toBe(200);
});

test('PUT API testing - Update single user', async ({ request }) => {

    const requestBody = {
        id: 1,
        title: 'Updated Post Title',
        body: 'This is the updated post body',
        userId: 1
    };

    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: requestBody
        }
    );

    // Response details
    console.log('Response OK:', response.ok());
    console.log('Status Code:', response.status());
    console.log('Status Text:', response.statusText());

    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    // =========================
    // VALIDATIONS
    // =========================

    // 1. Validate response is successful
    expect(response.ok()).toBeTruthy();

    // 2. Validate status code
    expect(response.status()).toBe(200);

    // 3. Validate response body
    expect(responseBody.id).toBe(1);
    expect(responseBody.title).toBe('Updated Post Title');
    expect(responseBody.body).toBe('This is the updated post body');
    expect(responseBody.userId).toBe(1);

});