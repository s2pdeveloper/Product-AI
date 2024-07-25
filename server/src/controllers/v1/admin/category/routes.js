const router = require('express').Router();
const upload =require('../../../../middleware/upload')
const CategoryController=require('./category')
const authHelper=require("../../../../models/helper/AuthHelper")

router.post('/create',CategoryController.create);
router.get('/getAll',CategoryController.getAll);
router.get('/getById/:id',CategoryController.getById);
router.put('/update/:id',CategoryController.update);
router.delete('/delete/:id',CategoryController.remove);

module.exports = router;