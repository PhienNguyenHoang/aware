import * as firebase from "firebase/app";
import 'firebase/firestore';
import config from "./config";

!firebase.apps.length && firebase.initializeApp(config);

const firestore = firebase.firestore();
export const getProductsByCustomerType = async (customterType) => {
  try {
    const productList = [];
    const products = await firestore
      .collection("products")
      .where("customerType", "==", customterType)
      .get();
    products.forEach((item) => productList.push(item.data()));
    return productList;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByCustomerTypeAndType = async (customterType, type) => {
  try {
    const categoryList = [];
    const query = await firestore.collection("category").where("customerType", "==", customterType).where("type", "==", type);
    const categories = await query.get();
    categories.forEach((item) => {
      categoryList.push({name: item.data().name, id: item.id});
    });
    return categoryList;
  } catch (error) {
    console.log(error);
  }
};
