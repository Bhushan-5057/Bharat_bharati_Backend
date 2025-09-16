/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blogs management APIs
 */

/**
 * @swagger
 * /blogs/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slug
 *               - meta_title
 *               - meta_description
 *               - content
 *               - tags
 *               - category
 *               - file_name
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the blog
 *               slug:
 *                 type: string
 *                 description: URL-friendly slug
 *               meta_title:
 *                 type: string
 *                 description: SEO title
 *               meta_description:
 *                 type: string
 *                 description: SEO description
 *               content:
 *                 type: string
 *                 description: Blog body content
 *               tags:
 *                 type: string
 *                 description: Comma separated tags
 *               category:
 *                 type: string
 *                 description: Blog category
 *               file_name:
 *                 type: string
 *                 format: binary
 *                 description: Blog image file
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Validation error or missing file
 */

/**
 * @swagger
 * /blogs/get-all:
 *   get:
 *     summary: Get all blogs (optionally filter by category)
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter blogs by category
 *     responses:
 *       200:
 *         description: List of all blogs
 */

/**
 * @swagger
 * /blogs/get/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog slug
 *     responses:
 *       200:
 *         description: Blog fetched successfully
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /blogs/update/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
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
 *               slug:
 *                 type: string
 *               meta_title:
 *                 type: string
 *               meta_description:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: string
 *               category:
 *                 type: string
 *               file_name:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /blogs/delete/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */