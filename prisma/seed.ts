import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient

async function seed() {
  const query = Prisma.sql`INSERT INTO
    "Issue" (title, description, status, "createdAt", "updatedAt")
    VALUES
      (
        'Website Login Issue',
        'Users are unable to log in to the website. They receive an error message when attempting to sign in.',
        'OPEN',
        '2023-09-01 10:00:00',
        '2023-09-01 10:00:00'
      ),
      (
        'Product Page Loading Slowly',
        'The product page is taking a long time to load, causing a poor user experience.',
        'IN_PROGRESS',
        '2023-09-02 11:15:00',
        '2023-09-02 11:15:00'
      ),
      (
        'Payment Gateway Down',
        'The payment gateway is currently offline, preventing customers from making purchases.',
        'CLOSED',
        '2023-09-03 12:30:00',
        '2023-09-03 12:30:00'
      ),
      (
        'Mobile App Crashes on Launch',
        'The mobile app crashes immediately upon launch, making it unusable.',
        'OPEN',
        '2023-09-04 13:45:00',
        '2023-09-04 13:45:00'
      ),
      (
        'Order Tracking Not Updating',
        'Customers are unable to track their orders as the tracking information is not being updated.',
        'IN_PROGRESS',
        '2023-09-05 14:00:00',
        '2023-09-05 14:00:00'
      ),
      (
        'Missing Product Images',
        'Some product images are missing from the catalog, making it hard for customers to view products.',
        'CLOSED',
        '2023-09-06 15:15:00',
        '2023-09-06 15:15:00'
      ),
      (
        'Password Reset Not Working',
        'Users cannot reset their passwords using the "Forgot Password" feature on the website.',
        'OPEN',
        '2023-09-07 16:30:00',
        '2023-09-07 16:30:00'
      ),
      (
        'Checkout Process Errors',
        'Customers are encountering errors during the checkout process, preventing them from completing orders.',
        'IN_PROGRESS',
        '2023-09-08 17:45:00',
        '2023-09-08 17:45:00'
      ),
      (
        'Email Notifications Delayed',
        'Email notifications, such as order confirmations and shipping updates, are being delayed.',
        'CLOSED',
        '2023-09-09 18:00:00',
        '2023-09-09 18:00:00'
      ),
      (
        'Broken Links on Homepage',
        'There are broken links on the homepage that need to be fixed for a seamless user experience.',
        'OPEN',
        '2023-09-10 19:15:00',
        '2023-09-10 19:15:00'
      ),
      (
        'Inventory Sync Issue',
        'The inventory levels are not syncing correctly, leading to discrepancies between online and offline stock.',
        'IN_PROGRESS',
        '2023-09-11 20:30:00',
        '2023-09-11 20:30:00'
      ),
      (
        'Performance Degradation on Server',
        'The server is experiencing performance degradation, causing slow response times.',
        'CLOSED',
        '2023-09-12 21:45:00',
        '2023-09-12 21:45:00'
      ),
      (
        'Broken Search Functionality',
        'The search functionality on the website is not returning accurate results or is not working at all.',
        'OPEN',
        '2023-09-13 22:00:00',
        '2023-09-13 22:00:00'
      ),
      (
        'SSL Certificate Expiry',
        'The SSL certificate is nearing its expiry date and needs to be renewed to ensure secure connections.',
        'IN_PROGRESS',
        '2023-09-14 23:15:00',
        '2023-09-14 23:15:00'
      ),
      (
        'Incorrect Product Pricing',
        'Some products are displaying incorrect prices, leading to pricing discrepancies.',
        'CLOSED',
        '2023-09-15 09:30:00',
        '2023-09-15 09:30:00'
      ),
      (
        '404 Error on Blog Pages',
        'Visitors are encountering 404 errors when trying to access blog articles on the website.',
        'OPEN',
        '2023-09-16 10:45:00',
        '2023-09-16 10:45:00'
      ),
      (
        'Customer Support Chat Unavailable',
        'The live chat support feature is currently unavailable, leaving customers without immediate assistance.',
        'IN_PROGRESS',
        '2023-09-17 12:00:00',
        '2023-09-17 12:00:00'
      ),
      (
        'Missing User Profile Data',
        'User profile data, such as names and contact information, is missing for some accounts.',
        'CLOSED',
        '2023-09-18 13:15:00',
        '2023-09-18 13:15:00'
      ),
      (
        'Payment Refund Request',
        'A customer has requested a refund for an order, and it needs to be processed promptly.',
        'OPEN',
        '2023-09-19 14:30:00',
        '2023-09-19 14:30:00'
      ),
      (
        'Broken Checkout Button',
        'The "Checkout" button on the website is not functioning correctly, preventing order completion.',
        'IN_PROGRESS',
        '2023-09-20 15:45:00',
        '2023-09-20 15:45:00'
  );`

  try {
    await prisma.$queryRaw(query)
    console.log('Your DB was sown')
  } catch (error) {
    console.log(`Something went wrong while filling your DB. Error: ${error}`)
  }
}

seed()