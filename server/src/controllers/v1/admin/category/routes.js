const router = require('express').Router();
const upload =require('../../../../middleware/upload')
const CategoryController=require('./category')
const authHelper=require("../../../../models/helper/AuthHelper")

router.post('/create',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),CategoryController.create);
router.get('/getById/:id',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),CategoryController.getById);
router.put('/update/:id',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),CategoryController.update);
router.delete('/delete/:id',authHelper.authenticateJWT(["ADMIN","SUPERADMIN"]),CategoryController.remove);

module.exports = router