/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: City records with descriptions & images
 */

/**
 * @swagger
 * /cities/create:
 *   post:
 *     summary: Create a new city record with images
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
 *               - files
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Delhi"
 *               description:
 *                 type: string
 *                 example: "Capital city of India"
 *               is_main:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["true", "false"]
 *                 description: Flags for marking main images (parallel to uploaded files)
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: City record created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /cities/get-all:
 *   get:
 *     summary: Get all cities with their images and creator info
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: List of all city records
 */

/**
 * @swagger
 * /cities/get/{id}:
 *   get:
 *     summary: Get a city record by ID
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
 *     summary: Update a city record and optionally its images
 *     tags: [Cities]
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
 *               description:
 *                 type: string
 *               files:
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
 *     summary: Delete a city record and its related images
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: City and related images deleted successfully
 *       404:
 *         description: City not found
 */

/**
 * @swagger
 * /cities/image/update/{id}:
 *   put:
 *     summary: Update a single city image by ID
 *     tags: [Cities]
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
 *               is_main:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 description: Mark this image as the main image
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: City image updated successfully
 *       404:
 *         description: Image not found
 */

/**
 * @swagger
 * /cities/image/delete/{id}:
 *   delete:
 *     summary: Delete a single city image by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: City image deleted successfully
 *       404:
 *         description: Image not found
 */
