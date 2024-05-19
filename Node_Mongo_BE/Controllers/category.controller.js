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
module.exports = { getCategoryIdByName, createCategory };