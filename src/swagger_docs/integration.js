/**
 * @swagger
 * tags:
 *   name: Integration
 *   description: Integration management APIs
 */

/**
 * @swagger
 * /integration/create:
 *   post:
 *     summary: Create a new integration
 *     tags: [Integration]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - file_name
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the integration
 *               description:
 *                 type: string
 *                 description: Description of the integration
 *               file_name:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the integration
 *     responses:
 *       201:
 *         description: Integration created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /integration/get-all:
 *   get:
 *     summary: Get all integrations
 *     tags: [Integration]
 *     responses:
 *       200:
 *         description: List of all integrations
 */

/**
 * @swagger
 * /integration/get/{id}:
 *   get:
 *     summary: Get integration by ID
 *     tags: [Integration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Integration fetched successfully
 *       404:
 *         description: Integration not found
 */

/**
 * @swagger
 * /integration/update/{id}:
 *   put:
 *     summary: Update integration details
 *     tags: [Integration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title (optional)
 *               description:
 *                 type: string
 *                 description: Updated description (optional)
 *               file_name:
 *                 type: string
 *                 format: binary
 *                 description: Updated image file (optional)
 *     responses:
 *       200:
 *         description: Integration updated successfully
 *       404:
 *         description: Integration not found
 */

/**
 * @swagger
 * /integration/delete/{id}:
 *   delete:
 *     summary: Delete integration by ID
 *     tags: [Integration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Integration deleted successfully
 *       404:
 *         description: Integration not found
 */