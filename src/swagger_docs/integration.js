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
 *               - data
 *               - created_by
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file_name:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: binary
 *               created_by:
 *                 type: integer
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
 *               file_name:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: binary
 *               created_by:
 *                 type: integer
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
 */