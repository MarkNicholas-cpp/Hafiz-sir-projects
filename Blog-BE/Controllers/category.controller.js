const categoryScheme = require("../Models/category.model");

async function getCategoryIdByName(categoryName) {
    const category = await categoryScheme.findOne({ categoryname: categoryName });
    console.log(category);
    return category._id;
}

async function createCategory(category) {
    const newCategory = new categoryScheme(category);
    await newCategory.save();
    return newCategory;
}
async function getAllCategores(){
    const allCategories = await categoryScheme.find();
    return allCategories;

}
module.exports = { getCategoryIdByName, createCategory ,getAllCategores};