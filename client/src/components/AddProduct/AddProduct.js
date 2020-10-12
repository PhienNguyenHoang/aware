import React, { useState, useEffect } from "react";
import Select from "react-select";
import { forEach as pForEach } from "p-iteration";

import {
  addProduct,
  getAllCategory,
  getAllBrand,
  storage,
  uploadImages,
} from "../../firebase/firebase";
import logo from "../../Images/logo.png";
import add from "../../Images/add.png";
import AdminDashboardMenu from "../AdminDashboardMenu/AdminDashboardMenu";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import "./AddProduct.css";
const AddProduct = () => {
  let categoryList = [];
  let brandList = [];
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [brandOptions, setBrandOptions] = useState([]);
  let imageUrls = [];
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sex, setSex] = useState("");
  const [type, setType] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [file, setFile] = useState([]);
  const [url, setURL] = useState([]);
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
    setName("");
    setPrice("");
    setQuantity("");
    setSex("");
    setType("");
    setCategory([]);
    setColor([]);
    setSize([]);
    setBrand("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const colorArray = [];
    const sizeArray = [];
    color.forEach((item) => {
      colorArray.push(item.value);
    });
    size.forEach((item) => sizeArray.push(item.value));
    // await pForEach(file, async (item) => {
    //   console.log("hello");
    //   const uploadTask = storage.ref(`/images/${item.name}`).put(item);
    //   uploadTask.on("state_changed", console.log, console.error, () => {
      //     storage
      //       .ref("images")
    //       .child(item.name)
    //       .getDownloadURL()
    //       .then((fileUrl) => {
    //         console.log(fileUrl);
    //         imageUrlArray.push(fileUrl);
    //         console.log(imageUrlArray);
    //       });
    //   });
    // });
    // for (const item of file) {
      //   const uploadTask = storage.ref(`/images/${item.name}`).put(item);
      //   uploadTask.on("state_changed", console.log, console.error, () => {
    //     storage
    //       .ref("images")
    //       .child(item.name)
    //       .getDownloadURL()
    //       .then((fileUrl) => {
      //         console.log(fileUrl);
      //         imageUrlArray.push(fileUrl);
      //         console.log(imageUrlArray);
      //       });
    //   });
    // }
    let imageUrlArray = await uploadImages(file);
    console.log(imageUrlArray);
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
      imageUrl: imageUrlArray,
    };
    await addProduct(ProductObject);
    // alert("Product added succesfully");
    resetHooks();
  };
  let markUp1 = image1 ? (
    <div className="col-span-1 customize-add-product-photo">
      <img src={image1} alt="" className="product-preview-image" />
    </div>
  ) : (
    <label htmlFor="input">
      <div className="col-span-1 customize-add-product-photo">
        <div className="add-product-icon-container">
          <input
            type="file"
            id="input"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage1(URL.createObjectURL(e.target.files[0]));
              setFile([...file, e.target.files[0]]);
            }}
          />
          <img src={add} alt="" className="add-product-icon" />
          <span>Add photo</span>
        </div>
      </div>
    </label>
  );
  let markUp2 = image2 ? (
    <div className="col-span-1 customize-add-product-photo">
      <img src={image2} alt="" className="product-preview-image" />
    </div>
  ) : (
    <label htmlFor="input">
      <div className="col-span-1 customize-add-product-photo">
        <div className="add-product-icon-container">
          <input
            type="file"
            id="input"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage2(URL.createObjectURL(e.target.files[0]));
              setFile([...file, e.target.files[0]]);
            }}
          />
          <img src={add} alt="" className="add-product-icon" />
          <span>Add photo</span>
        </div>
      </div>
    </label>
  );
  let markUp3 = image3 ? (
    <div className="col-span-1 customize-add-product-photo">
      <img src={image3} alt="" className="product-preview-image" />
    </div>
  ) : (
    <label htmlFor="input">
      <div className="col-span-1 customize-add-product-photo">
        <div className="add-product-icon-container">
          <input
            type="file"
            id="input"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage3(URL.createObjectURL(e.target.files[0]));
              setFile([...file, e.target.files[0]]);
            }}
          />
          <img src={add} alt="" className="add-product-icon" />
          <span>Add photo</span>
        </div>
      </div>
    </label>
  );
  let markUp4 = image4 ? (
    <div className="col-span-1 customize-add-product-photo">
      <img src={image4} alt="" className="product-preview-image" />
    </div>
  ) : (
    <label htmlFor="input">
      <div className="col-span-1 customize-add-product-photo">
        <div className="add-product-icon-container">
          <input
            type="file"
            id="input"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage4(URL.createObjectURL(e.target.files[0]));
              setFile([...file, e.target.files[0]]);
            }}
          />
          <img src={add} alt="" className="add-product-icon" />
          <span>Add photo</span>
        </div>
      </div>
    </label>
  );
  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <div className="admin-logo-container">
          <img alt="" src={logo} />
        </div>
        <AdminDashboardMenu />
      </div>
      <div className="dashboard-content">
        <AdminNavBar />
        <div className="add-product-container">
          <form>
            <div className="add-product-input-container">
              <div className="add-product-title">PHOTOS</div>
              <div className="grid grid-cols-4 gap-4 customize-add-product-photo-container">
                {/* <label htmlFor="input">
                  <div className="col-span-1 customize-add-product-photo">
                    <div className="add-product-icon-container">
                      <input
                        type="file"
                        id="input"
                        style={{ display: "none" }}
                      />
                      <img src={add} alt="" className="add-product-icon" />
                      <span>Add photo</span>
                    </div>
                  </div>
                </label> */}
                {markUp1}
                {markUp2}
                {markUp3}
                {markUp4}
              </div>
            </div>
            <div className="add-product-input-container">
              <div className="add-product-title">NAME</div>
              <input
                value={name}
                className="add-product-input-field"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="add-product-input-container">
              <div className="add-product-title">CATEGORY</div>
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
              <div className="add-product-title">BRAND</div>
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
              <div className="add-product-title">PRICE</div>
              <input
                value={price}
                className="add-product-input-field"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="add-product-input-container">
              <div className="add-product-title">SIZE</div>
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
              <div className="add-product-title">COLORS</div>
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
              <div className="add-product-title">SEX</div>
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
              <div className="add-product-title">TYPE</div>
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
              <div className="add-product-title">QUANTITY</div>
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
                <button onClick={handleSubmit}>Complete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
