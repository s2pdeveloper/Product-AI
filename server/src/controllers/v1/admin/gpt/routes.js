const router = require('express').Router();
const upload =require('../../../../middleware/upload')
const {generate, generateDescription}=require('./gpt')
router.post('/generate',upload.single("image"),generate)
router.post('/GenerateDescription',upload.single("image"),generateDescription)
module.exports = router