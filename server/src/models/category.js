const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema(
  {
    name:{
      type:String,

    },
    description:{
      type:String,
    },
  },

  {
    timestamps: true,
    collection: 'Category',
  }
);
CategorySchema.index({ '$**': 'text' });
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;