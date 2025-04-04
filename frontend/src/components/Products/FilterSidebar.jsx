import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 2000,
  });

  const [priceRange, setPriceRange] = useState([0, 2000]);
  
  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Relaxed Fit",
    "Urban Threads", 
    "Modern Fit",
    "Street Style",
    "ChicStyle",
  ];

  const gender = ["Men", "Women"];

  useEffect(()=>
  {
    //to convert the search params to plain objects
    const params = Object.fromEntries([...searchparams]);
    
    setFilters({
      category: params.category || "",
      gender: params.categories || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 2000,
    });

    setPriceRange([0, params.maxPrice || 2000]);
  }, [searchparams]);


  const handleFilterChange = (e) =>
  {
    const {name, value, checked, type} = e.target;
    let newFilters = {...filters};

    if(type === "checkbox")
    {
      if(checked)
      {
        newFilters[name]= [...(newFilters[name] || []), value];
      }else
      {
        newFilters[name] = newFilters[name].filter((item)=> item !== value);
      }
    }else
    {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };


  const updateURLParams = (newFilters) =>{
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) =>
    {
      if(Array.isArray(newFilters[key]) && newFilters[key].length > 0)
      {
        params.append(key, newFilters[key].join(","));
      }else if(newFilters[key]){
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`); //%2C - encoded version of comma
  };


  const handlePriceChange = (e) =>
  {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice])
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice};
    setFilters(filters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category)=>(
          <div className="flex items-center mb-1" key={category}>
            <input 
            type="radio"
            name="category"
            value={category}
            onChange={handleFilterChange}
            checked={filters.category === category}
            className="mr-2 h-4 w-4 text-fresh-green-500 focus:ring-fresh-green-400 border-gray-300" />
            <span className="text-gray-700">{category}</span>
          </div>
        )
        ) 
        }
      </div>


      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {gender.map((gender)=>(
          <div className="flex items-center mb-1" key={gender}>
            <input 
            type="radio"
            name="gender"
            value={gender}
            onChange={handleFilterChange}
            checked={filters.gender === gender}
            className="mr-2 h-4 w-4 text-fresh-green-500 focus:ring-fresh-green-400 border-gray-300" />
            <span className="text-gray-700">{gender}</span>
          </div>
        )
        ) 
        }
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {
            colors.map((color) =>
            (
              <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 hover:border-fresh-green ${filters.color === color ? "ring-2 ring-fresh-green-500" : ""}`}
              style={{backgroundColor: color.toLocaleLowerCase()
              }}></button>
            ))
          }
        </div>
      </div>


      {/* Size Filter */}
      <div className="mb-6">
        <lable className="block text-gray-600 font-medium mb-2">Size</lable>
        {
          sizes.map((size)=>
          (
            <div className="flex items-center mb-1"
            key={size}
            name="size">
              <input 
              type="checkbox" 
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked= {filters.size.includes(size)}        
              className="mr-2 h-4 w-4 text-fresh-green-500 focus:ring-fresh-green-400 border-gray-300 hover:border-fresh-green"></input>
              <span className="text-gray-700">{size}</span>
            </div>
          ))
        }
      </div>


      {/* Material Filter */}
      <div className="mb-6">
        <lable className="block text-gray-600 font-medium mb-2">Material</lable>
        {
          materials.map((material)=>
          (
            <div className="flex items-center mb-1"
            key={material}
            name="size">
              <input 
              type="checkbox" 
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked= {filters.material.includes(material)} 
              className="mr-2 h-4 w-4 text-fresh-green-500 focus:ring-fresh-green-400 border-gray-300 hover:border-fresh-green"></input>
              <span className="text-gray-700">{material}</span>
            </div>
          ))
        }
      </div>


      {/* Brand Filter */}
      <div className="mb-6">
        <lable className="block text-gray-600 font-medium mb-2">Brand</lable>
        {
          brands.map((brand)=>
          (
            <div className="flex items-center mb-1"
            key={brand}
            name="brand">
              <input 
              type="checkbox" 
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked= {filters.brand.includes(brand)} 
              className="mr-2 h-4 w-4 text-fresh-green-500 focus:ring-fresh-green-400 border-gray-300 hover:border-fresh-green"></input>
              <span className="text-gray-700">{brand}</span>
            </div>
          ))
        }
      </div>


      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
        type="range"
        name="priceRange"
        min={0}
        max={2000} 
        value={priceRange[1]}
        onChange={handlePriceChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"></input>
        <div className="flex justify-between text-gray-600 mt-2">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar;