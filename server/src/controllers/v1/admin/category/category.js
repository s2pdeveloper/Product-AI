const Category=require("../../../../models/category")



module.exports.create=async(req,res,next)=>{
   try {
   
    await Category.create(req.body);
    res.status(201).json({
        message:"Category Created"
    }) 
   } catch (error) {
    console.log(error);
return res.status(501).json({message:`Internal Server Error ${error}`})
   }
}


module.exports.getById=async(req,res,next)=>{
   try {
    const exist=await Category.findById(req.params.id); 
    if(!exist){
        return res.status(500).json({ message:"Data not Exist"});
    }
   
    res.status(201).json({
    data:exist
    }) 
   } catch (error) {

    console.log(error);
return res.status(501).json({message:`Internal Server Error ${error}`})
   }
}

module.exports.update=async(req,res,next)=>{
   try {
    const exist=await Category.findById(req.params.id);
    
    if(!exist){
        return res.status(500).json({ message:"Data not Exist"});
    }
    await Category.findOneAndUpdate({_id:req.params.id},req.body)
    res.status(201).json({
    message:"Category Updated"
    }) 
   } catch (error) {
    console.log(error);
return res.status(501).json({message:`Internal Server Error ${error}`})
   }
}



module.exports.remove=async(req,res,next)=>{

    try {
        const exist=await Category.findById(req.body._id);
        if(!exist){
            return res.status(500).json({ message:"Data not Exist"});
        }
        await Category.findOneAndDelete({_id:req.params.id})
        res.status(201).json({
            message:"Category Deleted"
        }) 
       } catch (error) {
        console.log(error);
    return res.status(501).json({message:`Internal Server Error ${error}`})
       }
}