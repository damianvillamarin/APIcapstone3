import { Router } from "express";
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
router.post('/singup',authCtrl.singup)
router.post('/singin',authCtrl.singin)

export default router;