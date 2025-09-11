/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: City and cities description & Images APIs
 */

/**
 * @swagger
 * /cities/create:
 *   post:
 *     summary: Create a new cities record
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - created_by
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               created_by:
 *                 type: integer
 *               file_name:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Cities record created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /cities/get-all:
 *   get:
 *     summary: Get all cities records
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: List of all cities records
 */

/**
 * @swagger
 * /cities/get/{id}:
 *   get:
 *     summary: Get cities record by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: City record fetched successfully
 *       404:
 *         description: City record not found
 */

/**
 * @swagger
 * /cities/update/{id}:
 *   put:
 *     summary: Update city record
 *     tags: [Cities]
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
 *               created_by:
 *                 type: integer
 *               file_name:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: City record updated successfully
 *       404:
 *         description: City record not found
 */

/**
 * @swagger
 * /cities/delete/{id}:
 *   delete:
 *     summary: Delete city record by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: City record deleted successfully
 */