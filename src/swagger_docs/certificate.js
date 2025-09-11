/**
 * @swagger
 * tags:
 *   name: Certificate
 *   description: Certificate management APIs
 */

/**
 * @swagger
 * /certificate/add:
 *   post:
 *     summary: Add a new certificate
 *     tags: [Certificate]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file_name
 *               - pdf
 *             properties:
 *               file_name:
 *                 type: string
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Certificate added successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /certificate/get-all:
 *   get:
 *     summary: Get all certificates
 *     tags: [Certificate]
 *     responses:
 *       200:
 *         description: List of all certificates
 */

/**
 * @swagger
 * /certificate/get/{id}:
 *   get:
 *     summary: Get certificate by ID
 *     tags: [Certificate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Certificate fetched successfully
 *       404:
 *         description: Certificate not found
 */

/**
 * @swagger
 * /certificate/update/{id}:
 *   put:
 *     summary: Update certificate details
 *     tags: [Certificate]
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
 *               file_name:
 *                 type: string
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Certificate updated successfully
 *       404:
 *         description: Certificate not found
 */

/**
 * @swagger
 * /certificate/delete/{id}:
 *   delete:
 *     summary: Delete certificate by ID
 *     tags: [Certificate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Certificate deleted successfully
 */