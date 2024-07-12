const Category=require("../../../../models/category")



module.exports.create=async(req,res,next)=>{
   try {
   
    await Category.create(req.body);
    res.success({
        message:"Category Created"
    })   
   } catch (error) {
    console.log(error);
    return res.serverError(error)
   }
}


module.exports.getAll=async(req,res,next)=>{
   try {
   
 const category= await Category.find({});
    res.success({
       data:category
    })   
   } catch (error) {
    console.log(error);
    return res.serverError(error)
   }
}


module.exports.getById=async(req,res,next)=>{
   try {
    const exist=await Category.findById(req.params.id); 
    if(!exist){
        return res.notFound("Data not Exist");
    }
   
    res.success({
    data:exist,
    }) 
   } catch (error) {
return res.serverError(error)
   }
}

module.exports.update=async(req,res,next)=>{
   try {
    const exist=await Category.findById(req.params.id);
    
    if(!exist){
        return res.notFound();
    }
   let category= await Category.findOneAndUpdate({_id:req.params.id},req.body)
    console.log("updated",category)
    res.success({
    message:"Category Updated"
    }) 
   } catch (error) {
    console.log(error);
return res.serverError(error)
   }
}



module.exports.remove=async(req,res,next)=>{
    try {
        const exist=await Category.findById(req.params.id);
        if(!exist){
            return res.status(500).json({ message:"Data not Exist"});
        }
        await Category.findOneAndDelete({_id:req.params.id})
        res.success({
            message:"Category Deleted"
        }) 
       } catch (error) {
        console.log(error);
    return res.serverError(error)
       }
}