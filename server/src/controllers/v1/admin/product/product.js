const { Mongoose, default: mongoose } = require("mongoose");
const { productCategories } = require("../../../../../category");
const Category = require("../../../../models/category");
const Product = require("../../../../models/product");
const AuthHelpler=require("../../../../models/helper/AuthHelper")
const categoryHandler=require("../category/category")


module.exports.create = async (req, res, next) => {
  try {
    await Product.create(req.body);
    res.success({
      message: "Product Created",
    });
  } catch (error) {
    console.log(error);
    return res.serverError(error);
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
  const product=  await Product.find({});
    res.success({
      data:product
    });
  } catch (error) {
    console.log(error);
    return res.serverError(error);
  }
};

module.exports.getAllCategory= async (req, res, next) => {
  try {
 const category=await categoryHandler.getAllCategory()
    res.success({
      data:category
    });
  } catch (error) {
    console.log(error);
    return res.serverError(error);
  }
};



module.exports.getById = async (req, res, next) => {
  try {
    const exist = await Product.findById(req.params.id);

    if (!exist) {
      return res.notFound('Product Not found');
    }
    await Product.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.success({
      data: exist,
    });

  } catch (error) {
    console.log(error);
    return res.serverError(error);
  }
};
module.exports.getAllBycategoryId = async (req, res, next) => {
  try {
    const matchStage = {
      $match: {
        categoryId: new mongoose.Types.ObjectId(req.params.id),
      },
    };
    const pipeline = [matchStage];
    const data = await Product.aggregate(pipeline);
   
     
    return res.success({
      data: data,
    
    });
  } catch (error) {
    console.log(error);
    return res.serverError(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const exist = await Product.findById(req.params.id);
    if (!exist) {
      return res.notFound();
    }
    await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.success({
      message: "Product Updated",
    });
  } catch (error) {
    console.log(error);
    return res.serverError(error);
  }
};

module.exports.remove = async (req, res, next) => {
  try {
    const exist = await Product.findById(req.params.id);
    if (!exist) {
      return res.notFound();
    }
    await Product.findOneAndDelete(req.params.id);
    res.success({
      message: "Product Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.serverError({ message: `Internal Server Error ${error}`});
  }
};
