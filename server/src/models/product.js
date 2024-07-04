const mongoose = require('mongoose');
const Category = require('./category');
const productSchema = mongoose.Schema(
  {
    name:{
      type:String,
    },
    categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
    },
    description:{
      type:String,
    },
    key:[     
    ],
    userKey:[],
  },
  {
    timestamps: true,
    collection: 'Product',
  }
);
productSchema.index({ '$**': 'text' });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;