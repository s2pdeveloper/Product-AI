require('dotenv').config();
const User=require("./src/models/user")
const express = require("express");
const app = express();
require('./src/config/dataBaseConnection')
const cors=require("cors")
const PORT =process.env.PORT || 2024;
const bodyPaser=require('body-parser')
const apiRouter=require('./src/routes/index')
const customResponse=require("./src/models/helper/CustomResponses")
app.use(cors())/ app.use(bodyPaser.urlencoded({extended:false}))
app.use(express.json());


app.use(customResponse)
const swaggerHandler = require('./utils/swaggerHandler');//swagger 
const { usersRoles } = require('./src/config/Options');
app.use('/',apiRouter)



swaggerHandler.setup(app)
app.listen(PORT,async () => {
    console.log(`Server is running on PORT ${PORT}`);

    CreateSuperAdmin()
    
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});


async function CreateSuperAdmin(){
  const superAdmin=await User.findOne({email:"admin123@gmail.com"})
  if(!superAdmin){
    await User.create({
      name:"admin",
      email:"admin123@gmail.com",
      gender:"MALE",
      role:"SUPERADMIN",
      password:"admin123",
     firstName:"super",
     lastName:"admin"
    })
  }

}