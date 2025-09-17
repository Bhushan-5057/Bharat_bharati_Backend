/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activities management APIs
 */

/**
 * @swagger
 * /activities/create:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
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
 *                 description: Title of the activity
 *               description:
 *                 type: string
 *                 description: Description of the activity
 *               file_name:
 *                 type: string
 *                 format: binary
 *                 description: File associated with the activity
 *     responses:
 *       201:
 *         description: Activity created successfully
 *       400:
 *         description: Validation error or missing file
 */

/**
 * @swagger
 * /activities/get-all:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of all activities
 */

/**
 * @swagger
 * /activities/get/{id}:
 *   get:
 *     summary: Get activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Activity fetched successfully
 *       404:
 *         description: Activity not found
 */

/**
 * @swagger
 * /activities/update/{id}:
 *   put:
 *     summary: Update activity details
 *     tags: [Activities]
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
 *                 format: binary
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       404:
 *         description: Activity not found
 */

/**
 * @swagger
 * /activities/delete/{id}:
 *   delete:
 *     summary: Delete activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       404:
 *         description: Activity not found
 */