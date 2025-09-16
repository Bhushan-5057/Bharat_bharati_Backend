/**
 * @swagger
 * tags:
 *   name: DonationPage
 *   description: Donation Page management APIs
 */

/**
 * @swagger
 * /donation-page/create:
 *   post:
 *     summary: Create a donation page (only one page allowed)
 *     tags: [DonationPage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - sub_title
 *               - account_holder_name
 *               - account_number
 *               - bank_name
 *               - ifsc_code
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the donation page
 *               description:
 *                 type: string
 *                 description: Description of the donation page
 *               sub_title:
 *                 type: string
 *                 description: Subtitle of the donation page
 *               account_holder_name:
 *                 type: string
 *                 description: Account holder name for donations
 *               account_number:
 *                 type: string
 *                 description: Bank account number
 *               bank_name:
 *                 type: string
 *                 description: Bank name
 *               ifsc_code:
 *                 type: string
 *                 description: IFSC code of the bank
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File associated with the donation page
 *     responses:
 *       201:
 *         description: Donation Page created successfully
 *       400:
 *         description: A page already exists or file missing
 */

/**
 * @swagger
 * /donation-page/get-all:
 *   get:
 *     summary: Get all donation pages
 *     tags: [DonationPage]
 *     responses:
 *       200:
 *         description: List of all donation pages
 */

/**
 * @swagger
 * /donation-page/get/{id}:
 *   get:
 *     summary: Get donation page by ID
 *     tags: [DonationPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Donation Page ID
 *     responses:
 *       200:
 *         description: Donation Page fetched successfully
 *       404:
 *         description: Donation Page not found
 */

/**
 * @swagger
 * /donation-page/update/{id}:
 *   put:
 *     summary: Update donation page details
 *     tags: [DonationPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Donation Page ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               sub_title:
 *                 type: string
 *               account_holder_name:
 *                 type: string
 *               account_number:
 *                 type: string
 *               bank_name:
 *                 type: string
 *               ifsc_code:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Donation Page updated successfully
 *       404:
 *         description: Donation Page not found
 */

/**
 * @swagger
 * /donation-page/delete/{id}:
 *   delete:
 *     summary: Delete donation page by ID
 *     tags: [DonationPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Donation Page ID
 *     responses:
 *       200:
 *         description: Donation Page deleted successfully
 *       404:
 *         description: Donation Page not found
 */