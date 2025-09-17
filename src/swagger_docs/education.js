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
 *     summary: Create a new education or school record
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
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [education, school]
 *                 default: school
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               school_address:
 *                 type: string
 *                 description: Required if type is "school"
 *               is_main:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["true", "false"]
 *                 description: Flags for marking main image (parallel to uploaded files)
 *               files:
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
 *     summary: Get all education or school records
 *     tags: [Education]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [education, school]
 *         description: Filter by type
 *     responses:
 *       200:
 *         description: List of education records
 */

/**
 * @swagger
 * /education/get/{id}:
 *   get:
 *     summary: Get education or school record by ID
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
 *     summary: Update an education or school record
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
 *               type:
 *                 type: string
 *                 enum: [education, school]
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               school_address:
 *                 type: string
 *               files:
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
 *     summary: Delete education or school record by ID (with related images)
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
 *       404:
 *         description: Record not found
 */

/**
 * @swagger
 * /education/image/update/{id}:
 *   put:
 *     summary: Update a single education image by ID
 *     tags: [Education]
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
 *                 description: Mark image as main
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Image updated successfully
 *       404:
 *         description: Image not found
 */

/**
 * @swagger
 * /education/image/delete/{id}:
 *   delete:
 *     summary: Delete a single education image by ID
 *     tags: [Education]
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