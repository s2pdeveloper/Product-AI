require('dotenv').config();
const express = require("express");
const multer=require('multer')
const cors=require("cors")
require('./src/config/dataBaseConnection')
const app = express();
const PORT =process.env.PORT || 2024;
const bodyPaser=require('body-parser')
const apiRouter=require('./src/routes/index')
app.use(cors())/ app.use(bodyPaser.urlencoded({extended:false}))
app.use(express.json());
// app.use(bodyPaser.json());
const {GPT, GPT2}=require('./chatGpt')
const prompt=require('./category');
const upload = require('./src/middleware/upload');
app.use('/',apiRouter)
// app.post('/gpt',upload.single('image'),async (req,res,next)=>{

//   const image = req.file.buffer.toString('base64');

//    await GPT(req,res,image);

// })

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
