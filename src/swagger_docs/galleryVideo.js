/**
 * @swagger
 * tags:
 *   name: Gallery Videos
 *   description: API for managing gallery videos 
 */

/**
 * @swagger
 * /gallery-videos/add:
 *   post:
 *     summary: Add a new video to the gallery
 *     tags: [Gallery Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - youtube_url
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Charity event highlights"
 *               youtube_url:
 *                 type: string
 *                 example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *     responses:
 *       201:
 *         description: Video added successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /gallery-videos/get-all:
 *   get:
 *     summary: Get all videos from the gallery
 *     tags: [Gallery Videos]
 *     responses:
 *       200:
 *         description: List of gallery videos
 */

/**
 * @swagger
 * /gallery-videos/get/{id}:
 *   get:
 *     summary: Get a video by ID
 *     tags: [Gallery Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video fetched successfully
 *       404:
 *         description: Video not found
 */

/**
 * @swagger
 * /gallery-videos/update/{id}:
 *   put:
 *     summary: Update a video in the gallery
 *     tags: [Gallery Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Updated video description"
 *               youtube_url:
 *                 type: string
 *                 example: "https://www.youtube.com/watch?v=abcd1234xyz"
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       404:
 *         description: Video not found
 */

/**
 * @swagger
 * /gallery-videos/delete/{id}:
 *   delete:
 *     summary: Delete a video from the gallery
 *     tags: [Gallery Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 */
