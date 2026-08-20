import { test, expect, request } from "@playwright/test";

test("Create token", async ({ request }) => {
  const respone = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123",
      },
    },
  );

  console.log("Status", respone.status());

  const responseBody = await respone.json();

  console.log("Response", responseBody);

  const token = responseBody.token;

  console.log("Token", token);
});

test("Get all Booking", async ({ request }) => {
  const response = await request.get(
    "https://restful-booker.herokuapp.com/booking",
  );

  const statusCode = response.status();
  console.log("Status Code", statusCode);

  const responseBody = await response.json();
  console.log("Response Body", responseBody);
  console.log("Response Body", responseBody.length);
});

test("Post Booking", async ({ request }) => {
  const bookingResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: {
        firstname: "Swaralee",
        lastname: "Jadhav",
        totalprice: 2500,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-08-20",
          checkout: "2026-08-25",
        },
        additionalneeds: "Breakfast",
      },
    },
  );

  console.log("Status code:", bookingResponse.status());
  console.log("Status text:", bookingResponse.statusText());
  console.log("Response OK:", bookingResponse.ok());

  const responseBooking = await bookingResponse.json();
  console.log("Response Body", responseBooking);
  console.log("Booking ID:", responseBooking.bookingid);
  console.log("Booking Details:", responseBooking.booking);

  expect(bookingResponse.status()).toBe(200);
  expect(bookingResponse.ok()).toBeTruthy();

  expect(responseBooking.bookingid).toBeTruthy();

  expect(responseBooking.booking.firstname).toBe("Swaralee");
  expect(responseBooking.booking.lastname).toBe("Jadhav");
  expect(responseBooking.booking.totalprice).toBe(2500);
  expect(responseBooking.booking.depositpaid).toBe(true);
});

test("Get Booking ID", async ({ request }) => {
  const getBookingResponse = await request.get(
    "https://restful-booker.herokuapp.com/booking/${bookingid}",
  );

  console.log("Status code", getBookingResponse.status());
  console.log("Status text", getBookingResponse.statusText());

  const responseBookingID = await getBookingResponse.json();

  console.log("Response Body", responseBookingID);

  expect(responseBookingID.firstname).toBe("Swaralee");
  expect(responseBookingID.lastname).toBe("Jadhav");
  expect(responseBookingID.totalprice).toBe(2500);
  expect(responseBookingID.depositpaid).toBe(true);
});

test.only("Post and Get Booking", async ({ request }) => {
  const bookingResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: {
        firstname: "Swaralee",
        lastname: "Jadhav",
        totalprice: 2500,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-08-20",
          checkout: "2026-08-25",
        },
        additionalneeds: "Breakfast",
      },
    },
  );

  console.log("Status code:", bookingResponse.status());
  console.log("Status text:", bookingResponse.statusText());
  console.log("Response OK:", bookingResponse.ok());

  const responseBooking = await bookingResponse.json();

  console.log("Response Body:", responseBooking);
  console.log("Booking ID:", responseBooking.bookingid);
  console.log("Booking Details:", responseBooking.booking);

  expect(bookingResponse.status()).toBe(200);
  expect(bookingResponse.ok()).toBeTruthy();
  expect(responseBooking.bookingid).toBeTruthy();

  expect(responseBooking.booking.firstname).toBe("Swaralee");
  expect(responseBooking.booking.lastname).toBe("Jadhav");
  expect(responseBooking.booking.totalprice).toBe(2500);
  expect(responseBooking.booking.depositpaid).toBe(true);

  const bookingId = responseBooking.bookingid;

  console.log('____________get request_______________');
  
  const getBookingResponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
  );

  console.log("GET Status code:", getBookingResponse.status());
  console.log("GET Status text:", getBookingResponse.statusText());

  const responseBookingID = await getBookingResponse.json();

  console.log("GET Response Body:", responseBookingID);

  expect(getBookingResponse.status()).toBe(200);
  expect(getBookingResponse.ok()).toBeTruthy();

  expect(responseBookingID.firstname).toBe("Swaralee");
  expect(responseBookingID.lastname).toBe("Jadhav");
  expect(responseBookingID.totalprice).toBe(2500);
  expect(responseBookingID.depositpaid).toBe(true);
  expect(responseBookingID.bookingdates.checkin).toBe("2026-08-20");
  expect(responseBookingID.bookingdates.checkout).toBe("2026-08-25");
  expect(responseBookingID.additionalneeds).toBe("Breakfast");
});