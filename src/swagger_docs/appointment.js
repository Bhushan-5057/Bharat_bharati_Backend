/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Appointment booking and management APIs
 */

/**
 * @swagger
 * /appointment/create:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - contact_number
 *               - date
 *               - time
 *               - reason_of_meeting
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the person booking appointment
 *               email:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               reason_of_meeting:
 *                 type: string
 *               your_expectation:
 *                 type: string
 *               more_details:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /appointment/get-all:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: List of all appointments
 */

/**
 * @swagger
 * /appointment/get/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Appointment fetched successfully
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointment/update/{id}:
 *   put:
 *     summary: Update appointment details
 *     tags: [Appointment]
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               reason_of_meeting:
 *                 type: string
 *               your_expectation:
 *                 type: string
 *               more_details:
 *                 type: string
 *               view:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointment/delete/{id}:
 *   delete:
 *     summary: Delete appointment by ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Appointment deleted successfully */
