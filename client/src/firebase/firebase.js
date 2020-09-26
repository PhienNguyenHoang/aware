import * as firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";
import _ from 'lodash';
!firebase.apps.length && firebase.initializeApp(config);

const firestore = firebase.firestore();
export const getAllProductsByCustomerTypeAndType = async (
  customerType,
  type
) => {
  try {
    const productList = [];
    const query = await firestore
      .collection("products")
      .where("customerType", "==", customerType)
      .where("type", "==", type);
    const products = await query.get();
    products.forEach((item) => productList.push(item.data()));
    return productList;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByCustomerTypeAndType = async (customterType, type) => {
  try {
    const categoryList = [];
    const query = await firestore
      .collection("products")
      .where("customerType", "==", customterType)
      .where("type", "==", type);
    const products = await query.get();
    products.forEach((item) => {
      categoryList.push(item.data().category);
    });
    return [...(new Set(categoryList))];
    
  } catch (error) {
    console.log(error);
  }
};

export const getAllProduct = async () => {
  try {
    const productList = [];
    const products = await firestore.collection("products").get();
    products.forEach((item) => {
      productList.push(item.data());
    });
    return productList;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (productDetails) => {
  try {
    const checkExist = await (await firestore.collection('products').doc(productDetails.name).get()).exists;
    if(checkExist) {
      throw 'Product already exists'
    }
    const productDoc = {
      name: productDetails.name,
      customerType: productDetails.customerType,
      category:productDetails.category,
      type: productDetails.type,
      createdAt: new Date().toISOString(),
      price: productDetails.price,
    }
    await firestore.doc(`/products/${productDetails.name}`).set(productDoc);
    productDetails.colors.forEach(color => {
      productDetails.sizes.forEach(size => {
        const productVariations = {
          amount: productDetails.amount,
          color: color,
          size: size,
        }
       firestore.doc(`/products/${productDetails.name}`).collection('variations').add(productVariations);
      })
    })

  } catch (error) {
    alert(error);
  }
}
