/**
 * @swagger
 * tags:
 *   name: Education
 *   description: Education and school management APIs
 */

/**
 * @swagger
 * /education/create:
 *   post:
 *     summary: Create a new education record
 *     tags: [Education]
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
 *               school_address:
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
 *         description: Education record created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /education/get-all:
 *   get:
 *     summary: Get all education records
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: List of all education records
 */

/**
 * @swagger
 * /education/get/{id}:
 *   get:
 *     summary: Get education record by ID
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education record fetched successfully
 *       404:
 *         description: Education record not found
 */

/**
 * @swagger
 * /education/update/{id}:
 *   put:
 *     summary: Update education record
 *     tags: [Education]
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
 *               school_address:
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
 *         description: Education record updated successfully
 *       404:
 *         description: Education record not found
 */

/**
 * @swagger
 * /education/delete/{id}:
 *   delete:
 *     summary: Delete education record by ID
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education record deleted successfully
 */