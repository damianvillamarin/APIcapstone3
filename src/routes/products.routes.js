import { Router } from "express";
const router = Router()
import * as productsCtrl from '../controllers/products.controllers'
import { authJwt } from "../middlewares";


//router.get('/',(req,res) => res.json('get products'))
router.post('/', [authJwt.verifyToken,authJwt.isModerator] ,productsCtrl.createProduct)
router.get('/',productsCtrl.getProducts)
router.get('/:productId',productsCtrl.getProductById)
router.put('/:productId',[authJwt.verifyToken,authJwt.isAdmin] ,productsCtrl.updateProductById)
router.delete('/:productId',[authJwt.verifyToken,authJwt.isAdmin] ,productsCtrl.deleteProductById)


export default router;