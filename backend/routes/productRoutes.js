const express = require("express");
const Product = require("../models/Product");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/authMiddleware");

const router = express.Router();

//@route POST /api/products
//@desc Create a new Product
//@access Private/Admin

router.post("/", protect, admin,  async (req, res) =>{
  try{
    const {
      name, 
      description, 
      price, 
      discountPrice, 
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimesnsions,
      weight,
      sku,
    } = req.body;

    const product = new Product(
      {
        name, 
        description, 
        price, 
        discountPrice, 
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags,
        dimesnsions,
        weight,
        sku,
        user: req.user._id, //Reference to the admin user who created it
      });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  }catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


//@route PUT /api/products/:id
//@desc update an exisiting product ID
//@access Private/Admin

router.put("/:id", protect, admin, async (req, res) =>
{
  try{
    const {
      name, 
      description, 
      price, 
      discountPrice, 
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    //Find product by ID
    const product = await Product.findById(req.params.id);

    if(product){
      //update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.name;
      product.dimensions =  dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;


      //Save the updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    }else{
      res.status(404).json({message: "Product not found"});
    }

  }catch(error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
// @description Delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try{
    //Find the product by ID
    const product = await Product.findById(req.params.id);

    if(product){
      //Remove the product from DB
      await product.deleteOne();
      res.json({message: "Prodyct removed"});
    }else{
      res.status(404). json({message: "Product not found"});
    }
  }catch(error){
    console.error(error);
    res.status(500).send("Sever Error");
  }
})


// @route GET /api/products
// @desc Get all products with optional query filter
// @access Public
router.get("/", async (req, res) => {
  try{
    const {collection, size, color, gender, minPrice, maxPrice, sortBy, 
      search, category, material, brand, limit
    } = req.query;

    let query = {};

    //filter logic
    if(collection && collection.toLocaleLowerCase() !== "all"){
      query.collection = collection;
    }
    if(category && category.toLocaleLowerCase() !== "all"){
      query.category = category;
    }
    if(material){
      query.material = {$in: material.split(",")};//to have multiple material
    }
    if(brand){
      query.brand = {$in: brand.split(",")};//to have multiple material
    }
    if(size){
      query.size = {$in: size.split(",")};//to have multiple material
    }
    if(color){
      query.color = {$in: [color]};//to have multiple material
    }
    if(gender){
      query.gender = gender;
    }
    if(minPrice || maxPrice){
      query.price = {};
      if(minPrice) query.price.$gte = Number[minPrice];
      if(maxPrice) query.price.$lte = Number[maxPrice];
    }
    if(search){
      query.$or = [
        {name: {$regex: search, $options: "i"}},
        {description: {$regex: search, $options: "i"}},
      ];
    }

    //Sort Logic
    let sort = {};
    if(sortBy){
      switch(sortBy) {
        case "priceAsc":
        sort = {price: 1};
        break;
        case "priceDesc":
        sort = {price: -1};
        case "popularity":
        sort = {rating: -1};
        break;
        default:
          break;
      }
    }



    //Fetch products and apply sorting and limit
    let products = await Product.find(query)
    .sort(sort)
    .limit(Number(limit) || 0);
    res.json(products);
  }catch(error)
{
  console.error(error);
  res.status(500).send("Server Error");
}});

module.exports = router;