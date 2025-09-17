/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service management APIs
 */

/**
 * @swagger
 * /service/create:
 *   post:
 *     summary: Create a new service
 *     tags: [Service]
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
 *               - description
 *               - file_name
 *               - created_by
 *             properties:
 *               title:
 *                 type: string
 *                 description: Service title
 *               description:
 *                 type: string
 *                 description: Service description
 *               file_name:
 *                 type: string
 *                 format: binary
 *                 description: Upload service image/file
 *               created_by:
 *                 type: integer
 *                 description: ID of the user creating the service
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /service/get-all:
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: List of services
 */

/**
 * @swagger
 * /service/get/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service fetched successfully
 *       404:
 *         description: Service not found
 */

/**
 * @swagger
 * /service/update/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Service]
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
 *               description:
 *                 type: string
 *               file_name:
 *                 type: string
 *                 format: binary
 *                 description: Updated service image/file
 *               created_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 */

/**
 * @swagger
 * /service/delete/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Service]
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
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */