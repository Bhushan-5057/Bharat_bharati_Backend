/**
 * @swagger
 * tags:
 *   name: OfficeBearer
 *   description: APIs for managing office bearers
 */

/**
 * @swagger
 * /office-bearer/create:
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
 *               - data
 *               - created_by
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the office bearer
 *               designation:
 *                 type: string
 *                 description: Designation/role of the office bearer
 *               quotes:
 *                 type: string
 *                 description: Inspirational quote
 *               file_name:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *               twitter:
 *                 type: string
 *               facebook:
 *                 type: string
 *               gmail:
 *                 type: string
 *               created_by:
 *                 type: integer
 *                 description: ID of the user creating the record
 *     responses:
 *       201:
 *         description: Office bearer created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /office-bearer/get-all:
 *   get:
 *     summary: Get all office bearers
 *     tags: [OfficeBearer]
 *     responses:
 *       200:
 *         description: List of office bearers
 */

/**
 * @swagger
 * /office-bearer/get/{id}:
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
 * /office-bearer/update/{id}:
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
 *               facebook:
 *                 type: string
 *               gmail:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Office bearer updated successfully
 *       404:
 *         description: Office bearer not found
 */

/**
 * @swagger
 * /office-bearer/delete/{id}:
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