const router = require('express').Router();


const gpt=require('./gpt/routes')
const category=require('./category/routes');
const product=require('./product/routes')
const user=require('./user/routes')

router.use('/gpt',gpt)
router.use('/category',category);
router.use('/product',product);
router.use('/user',user);
module.exports = router;