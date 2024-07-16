const router = require('express').Router();
const upload =require('../../../../middleware/upload')
const productController=require('./product')
const authHelper=require("../../../../models/helper/AuthHelper")

router.post('/create',authHelper.authenticateJWT(["ADMIN","SUPER_ADMIN"]),productController.create);

router.get('/getAll',authHelper.authenticateJWT(["ADMIN","SUPER_ADMIN"]),productController.getAll);
router.get('/getAllCategory',authHelper.authenticateJWT(["ADMIN","SUPER_ADMIN"]),productController.getAllCategory);

router.get('/getById/:id',authHelper.authenticateJWT(["ADMIN","SUPER_ADMIN"]),productController.getById);
router.get('/getAllByCategoryId/:id',authHelper.authenticateJWT(["ADMIN","SUPER_ADMIN"]),productController.getAllBycategoryId);
router.put('/update/:id',authHelper.authenticateJWT(["ADMIN","SUPER_ADMIN"]),productController.update);
router.delete('/delete/:id',authHelper.authenticateJWT(["ADMIN","SUPER_ADMIN"]),productController.remove);
module.exports = router