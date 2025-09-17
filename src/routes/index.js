import express from 'express';
import userRouter from './userRoutes.js';
import bannerRouter from './Homepage/bannerRoutes.js'
import serviceRouter from './Homepage/serviceRoutes.js'
import appointmentRouter from './Homepage/appointmentRoutes.js'
import officeBearerRouter from './Homepage/officeBearerRoutes.js'
import certificateRouter from '../routes/certificateRoutes.js'
import integrationRouter from '../routes/IntegrationRoutes.js'
import educationRouter from '../routes/educationRoutes.js'
import activitiesRouter from '../routes/activitiesRoutes.js'
import citiesRouter from '../routes/citiesRoutes.js'
import galleryImageRouter from '../routes/galleryImageRoutes.js'
import galleryVideoRouter from '../routes/galleryVideoRoutes.js'
import donationPageRouter from '../routes/donationPageRoutes.js'
import dashboardRouter from './dashboardRoutes.js'
import blogRouter from './blogsRoutes.js'

let router = express.Router()

router.use((req, res, next) => {
    console.log("Called", req.path);
    next()
})

// Mounting all the routers
router.use('/user', userRouter);
router.use('/banner', bannerRouter);
router.use('/service', serviceRouter);
router.use('/appointment', appointmentRouter);
router.use('/office_bearer', officeBearerRouter);
router.use('/certificate', certificateRouter);
router.use('/integration', integrationRouter);
router.use('/education', educationRouter);
router.use('/activities', activitiesRouter);
router.use('/cities', citiesRouter);
router.use('/gallery_image', galleryImageRouter);
router.use('/gallery_video', galleryVideoRouter);
router.use('/donation_page', donationPageRouter);
router.use('/dashboard', dashboardRouter);
router.use('/blogs', blogRouter);

export default router