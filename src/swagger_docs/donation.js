// Swagger JSDoc for Donation Page API
/**
 * @swagger
 * tags:
 *   name: DonationPage
 *   description: API for managing donation pages
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DonationPage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         sub_title:
 *           type: string
 *         account_holder_name:
 *           type: string
 *         account_number:
 *           type: string
 *         bank_name:
 *           type: string
 *         ifsc_code:
 *           type: string
 *         created_by:
 *           type: integer
 *         creator:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         file_name:
 *           type: string
 *         data:
 *           type: string
 *           format: byte
 */

/**
 * @swagger
 * /donation-page:
 *   post:
 *     summary: Create a new donation page
 *     tags: [DonationPage]
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
 *       201:
 *         description: Donation Page created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 donationPageWithRelation:
 *                   $ref: '#/components/schemas/DonationPage'
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /donation-page/{id}:
 *   get:
 *     summary: Get a single donation page by ID
 *     tags: [DonationPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Donation Page found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DonationPage'
 *       404:
 *         description: Donation Page not found
 */

/**
 * @swagger
 * /donation-page:
 *   get:
 *     summary: Get all donation pages
 *     tags: [DonationPage]
 *     responses:
 *       200:
 *         description: List of donation pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DonationPage'
 */

/**
 * @swagger
 * /donation-page/{id}:
 *   put:
 *     summary: Update a donation page
 *     tags: [DonationPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *         description: Donation Page updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DonationPage'
 *       404:
 *         description: Donation Page not found
 */

/**
 * @swagger
 * /donation-page/{id}:
 *   delete:
 *     summary: Delete a donation page
 *     tags: [DonationPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Donation Page deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Donation Pagenot found
 */