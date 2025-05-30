const express = require("express");
const Product = require("../models/Product");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/authMiddleware");

const router = express.Router(); // router -level middleware

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
      dimensions,
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
        dimensions,
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
      res.json({message: "Product removed"});
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
      if(minPrice) query.price.$gte = Number(minPrice);
      if(maxPrice) query.price.$lte = Number(maxPrice);
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

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public

router.get("/best-seller", async(req, res) =>{
  try{
    const bestSeller = await Product.findOne().sort({rating: -1});
    if(bestSeller){
      res.json(bestSeller);
    }else{
      res.status(404).json({message: "No Best Seller Found"});
    }
  }catch(error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @route GET /api/profucts/new-arrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public

router.get("/new-arrivals", async (req, res) =>{
  try {
    //Fetch latest 8 products
    const newArrivals = await Product.find().sort({createdAt: -1}).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Sever Error");
  }
})

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public

router.get("/:id", async (req, res) =>
{
  try{
    const product = await Product.findById(req.params.id);
    if(product){
      res.json(product);
    }else{
      res.status(404).json({message: "Product Not Found"});
    }
  } catch(error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @route GET /api/products/similar/ :id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public

router.get("/similar/:id", async (req, res) => {
  const {id} = req.params;
  try{
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }

    const similarProducts = await Product.find({
      _id: {$ne: id}, //Execute the current product ID
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  }catch(error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});



module.exports = router;