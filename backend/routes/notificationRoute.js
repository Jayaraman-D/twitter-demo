// Notification Route.js

import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import { deleteSingleNotification, getNotification } from '../controllers/notificationController.js'
import { deleteNotification } from '../controllers/notificationController.js'

const router = express.Router()

router.get('/', protectRoute, getNotification)
router.delete('/', protectRoute , deleteNotification)
router.delete('/:id', protectRoute, deleteSingleNotification)

export default router