const router = require('express').Router();
const upload =require('../../../../middleware/upload')
const productController=require('./product')

router.post('/create',productController.create);
router.get('/getById/:id',productController.getById);
router.get('/getAllByCategoryId/:id',productController.getAllBycategoryId);
router.put('/update/:id',productController.update);
router.delete('/delete/:id',productController.remove);



module.exports = router