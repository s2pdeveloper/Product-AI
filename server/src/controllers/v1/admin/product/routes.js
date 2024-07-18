const router = require('express').Router();
const upload =require('../../../../middleware/upload')
const productController=require('./product')
const authHelper=require("../../../../models/helper/AuthHelper")

router.post('/create',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),productController.create);

router.get('/getAll',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),productController.getAll);
router.get('/getAllCategory',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),productController.getAllCategory);

router.get('/getById/:id',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),productController.getById);
router.get('/getAllByCategoryId/:id',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),productController.getAllBycategoryId);
router.put('/update/:id',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),productController.update);
router.delete('/delete/:id',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),productController.remove);
module.exports = router