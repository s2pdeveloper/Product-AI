const { Mongoose, default: mongoose } = require("mongoose");
const { productCategories } = require("../../../../../category");
const Category = require("../../../../models/category");
const Product= require("../../../../models/product")



module.exports.create=async(req,res,next)=>{
   try {
    console.log("Hit the product Route")
    await Product.create(req.body);
    res.status(201).json({
        message:"Product Created"
    }) 
   } catch (error) {
    console.log(error);
return res.status(501).json({message:`Internal Server Error ${error}`})
   }
}




module.exports.getById=async(req,res,next)=>{
   try {
    const exist=await Product.findById(req.params.id);
    
    if(!exist){
        return res.status(500).json({ message:"Data not Exist"});
    }
    await Product.findOneAndUpdate({_id:req.body._id},req.body)
    res.status(201).json({
  data:exist,
    }) 
   } catch (error) {
    console.log(error);
return res.status(501).json({message:`Internal Server Error ${error}`})
   }
}
module.exports.getAllBycategoryId=async(req,res,next)=>{
   try {

    const matchStage={
        $match:{
            categoryId:new mongoose.Types.ObjectId(req.params.id)
        }
    }
    const pipeline=[matchStage]
    const data=await Product.aggregate(pipeline)
    res.status(201).json({
  data:data,
    }) 
   } catch (error) {
    console.log(error);
return res.status(501).json({message:`Internal Server Error ${error}`})
   }
}





module.exports.update=async(req,res,next)=>{
   try {
    const exist=await Product.findById(req.params.id);
    if(!exist){
        return res.status(500).json({ message:"Data not Exist"});
    }
    await Product.findOneAndUpdate({_id:req.params.id},req.body,{new: true})
    res.status(201).json({
    message:"Product Updated"
    }) 
   } catch (error) {
    console.log(error);
return res.status(501).json({message:`Internal Server Error ${error}`})
   }
}


module.exports.remove=async(req,res,next)=>{
    try {
        const exist=await Product.findById(req.params.id);
        if(!exist){
            return res.status(500).json({ message:"Data not Exist"});
        }
        await Product.findOneAndDelete(req.params.id)
        res.status(201).json({
            message:"Product Deleted"
        }) 
       } catch (error) {
        console.log(error);
    return res.status(501).json({message:`Internal Server Error ${error}`})
       }
}