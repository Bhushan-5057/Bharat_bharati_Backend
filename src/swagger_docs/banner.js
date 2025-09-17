/**
 * @swagger
 * tags:
 *   name: Banner
 *   description: Banner management APIs
 */

/**
 * @swagger
 * /banner/create:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - created_by
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Banner image file
 *               created_by:
 *                 type: integer
 *                 description: ID of the user who created the banner
 *     responses:
 *       201:
 *         description: Banner created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /banner/get-all:
 *   get:
 *     summary: Get all banners
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: List of banners
 */

/**
 * @swagger
 * /banner/get/{id}:
 *   get:
 *     summary: Get banner by ID
 *     tags: [Banner]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Banner fetched successfully
 *       404:
 *         description: Banner not found
 */

/**
 * @swagger
 * /banner/update/{id}:
 *   put:
 *     summary: Update banner by ID
 *     tags: [Banner]
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
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Updated banner image file
 *               created_by:
 *                 type: integer
 *                 description: ID of the user who updated the banner
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *       404:
 *         description: Banner not found
 */

/**
 * @swagger
 * /banner/delete/{id}:
 *   delete:
 *     summary: Delete banner by ID
 *     tags: [Banner]
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
 *         description: Banner deleted successfully
 *       404:
 *         description: Banner not found
 */