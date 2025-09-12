/**
 * @swagger
 * tags:
 *   name: Gallery Images
 *   description: API for managing gallery images
 */

/**
 * @swagger
 * /gallery/add:
 *   post:
 *     summary: Upload one or multiple images
 *     tags: [Gallery Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: One or multiple image files
 *     responses:
 *       201:
 *         description: Image(s) uploaded successfully
 *       400:
 *         description: No files uploaded
 */

/**
 * @swagger
 * /gallery/get-all:
 *   get:
 *     summary: Get all gallery images
 *     tags: [Gallery Images]
 *     responses:
 *       200:
 *         description: List of all gallery images
 */

/**
 * @swagger
 * /gallery/get/{id}:
 *   get:
 *     summary: Get a gallery image by ID
 *     tags: [Gallery Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image found
 *       404:
 *         description: Image not found
 */

/**
 * @swagger
 * /gallery/update/{id}:
 *   put:
 *     summary: Update a gallery image
 *     tags: [Gallery Images]
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
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload a new file to replace the old one
 *     responses:
 *       200:
 *         description: Image updated successfully
 *       404:
 *         description: Image not found
 */

/**
 * @swagger
 * /gallery/delete/{id}:
 *   delete:
 *     summary: Delete a gallery image by ID
 *     tags: [Gallery Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 */
