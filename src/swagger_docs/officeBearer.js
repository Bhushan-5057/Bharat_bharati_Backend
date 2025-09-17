/**
 * @swagger
 * tags:
 *   name: OfficeBearer
 *   description: APIs for managing office bearers
 */

/**
 * @swagger
 * /office_bearer/create:
 *   post:
 *     summary: Create a new office bearer
 *     tags: [OfficeBearer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - designation
 *               - file_name
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the office bearer
 *               designation:
 *                 type: string
 *                 description: Designation/role of the office bearer
 *               quotes:
 *                 type: string
 *                 description: Inspirational quote (optional)
 *               file_name:
 *                 type: string
 *                 format: binary
 *               twitter:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: Twitter profile URL (optional)
 *               facebook:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: Facebook profile URL (optional)
 *               gmail:
 *                 type: string
 *                 format: email
 *                 nullable: true
 *                 description: Gmail address (optional)
 *     responses:
 *       201:
 *         description: Office bearer created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /office_bearer/get-all:
 *   get:
 *     summary: Get all office bearers
 *     tags: [OfficeBearer]
 *     responses:
 *       200:
 *         description: List of office bearers
 */

/**
 * @swagger
 * /office_bearer/get/{id}:
 *   get:
 *     summary: Get an office bearer by ID
 *     tags: [OfficeBearer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Office bearer fetched successfully
 *       404:
 *         description: Office bearer not found
 */

/**
 * @swagger
 * /office_bearer/update/{id}:
 *   put:
 *     summary: Update an office bearer
 *     tags: [OfficeBearer]
 *     security:
 *       - bearerAuth: []
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
 *               designation:
 *                 type: string
 *               quotes:
 *                 type: string
 *               file_name:
 *                 type: string
 *                 format: binary
 *               twitter:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: Twitter profile URL (optional)
 *               facebook:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: Facebook profile URL (optional)
 *               gmail:
 *                 type: string
 *                 format: email
 *                 nullable: true
 *                 description: Gmail address (optional)
 *     responses:
 *       200:
 *         description: Office bearer updated successfully
 *       404:
 *         description: Office bearer not found
 */

/**
 * @swagger
 * /office_bearer/delete/{id}:
 *   delete:
 *     summary: Delete an office bearer
 *     tags: [OfficeBearer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Office bearer deleted successfully
 *       404:
 *         description: Office bearer not found
 */