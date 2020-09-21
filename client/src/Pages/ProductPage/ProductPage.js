import React, { useEffect } from "react";
import './ProductPage.css'
import { getProductsByCustomerType } from "../../firebase/firebase";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
const ProductPage = () => {

    useEffect(() => {
        async function fetchData(){
            const products = await getProductsByCustomerType("Ladies");
            console.log(products);
        }
        fetchData();
    })
  return (

    <div className="grid grid-cols-3 gap-4 paddingLeftRight">
      <div className="col-span-1 left-column">
        <ProductCategory />
        <ProductFilter />
      </div>
      <div className="col-span-2 ...">hello</div>
    </div>
  );
};
export default ProductPage;
