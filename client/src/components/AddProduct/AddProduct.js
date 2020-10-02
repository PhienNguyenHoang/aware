import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  addProduct,
  getAllCategory,
  getAllBrand,
} from "../../firebase/firebase";
import "./AddProduct.css";
const AddProduct = () => {
  let categoryList = [];
  let brandList = [];
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [brandOptions, setBrandOptions] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sex, setSex] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const returnCategory = await getAllCategory();
      const returnBrand = await getAllBrand();
      returnCategory.forEach((item) => {
        categoryList.push({ value: item, label: item });
      });
      returnBrand.forEach((item) => {
        brandList.push({ value: item, label: item });
      });
      setCategoryOptions(categoryList);
      setBrandOptions(brandList);
    };
    fetchData();
  }, []);
  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ];
  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "white", label: "White" },
    { value: "Purple", label: "Purple" },
    { value: "pink", label: "Pink" },
    { value: "blue", label: "Blue" },
  ];
  const sexOptions = [
    { value: "ladies", label: "Ladies" },
    { value: "men", label: "Men" },
    { value: "boys", label: "Boys" },
    { value: "girls", label: "Girls" },
  ];
  const typeOptions = [
    { value: "top", label: "Tops" },
    { value: "bottom", label: "Bottoms" },
    { value: "dress", label: "Dresses" },
    { value: "jacket", label: "Jackets" },
  ];
  const resetHooks = () => {
    setName('');
    setPrice('');
    setQuantity('');
    setSex('');
    setType('');
    setCategory([]);
    setColor([]);
    setSize([]);
    setBrand('');
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hello")
    const colorArray = [];
    const sizeArray = [];
    color.forEach((item) => {
      colorArray.push(item.value);
    });
    size.forEach((item) => sizeArray.push(item.value));
    let ProductObject = {
      name: name,
      category: category.value,
      brand: brand.value,
      price: price,
      sizes: sizeArray,
      colors: colorArray,
      amount: quantity,
      customerType: sex.value,
      type: type.value,
    };
    await addProduct(ProductObject);
    alert("Product added succesfully");
    resetHooks();
  };
  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit}>
        <div className="add-product-input-container">
          <div className="add-product-title">Name</div>
          <input
            value={name}
            className="add-product-input-field"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Category</div>
          {/* <input className="add-product-input-field" /> */}
          <Select
            className="Select-name"
            id="Select"
            placeholder="category"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Brand</div>
          {/* <input className="add-product-input-field" /> */}
          <Select
            className="Select-name"
            id="Select"
            placeholder="Brand"
            value={brand}
            options={brandOptions}
            onChange={setBrand}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Price</div>
          <input
            value={price}
            className="add-product-input-field"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Size</div>
          {/* <input className="add-product-input-field" /> */}
          <Select
            className="Select-name"
            id="Select"
            placeholder="Size"
            isMulti
            value={size}
            options={sizeOptions}
            onChange={setSize}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Colors</div>
          {/* <input className="add-product-input-field" /> */}
          <Select
            className="Select-name"
            id="Select"
            placeholder="Colors"
            isMulti
            value={color}
            options={colorOptions}
            onChange={setColor}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Sex</div>
          {/* <input className="add-product-input-field" /> */}
          <Select
            className="Select-name"
            id="Select"
            placeholder="Sex"
            value={sex}
            options={sexOptions}
            onChange={setSex}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Type</div>
          {/* <input className="add-product-input-field" /> */}
          <Select
            className="Select-name"
            id="Select"
            placeholder="Type"
            value={type}
            options={typeOptions}
            onChange={setType}
          />
        </div>
        <div className="add-product-input-container">
          <div className="add-product-title">Quantity</div>
          <input
            value={quantity}
            className="add-product-input-field"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
        </div>
        <div className="add-product-button-container">
          <div className="add-product-button-white">
            <button onClick={resetHooks}>Cancel</button>
          </div>
          <div className="add-product-button-orange">
            <button type="submit">Complete</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
