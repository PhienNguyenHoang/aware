import * as firebase from "firebase";
import config from "./config";

!firebase.apps.length && firebase.initializeApp(config);

const firestore = firebase.firestore();
export const getProductsByCustomerType = async (customterType) => {
    try {
        const productList = [];
        const products = await firestore.collection('products').where("customerType", "==", customterType).get();
        products.forEach(item => productList.push(item.data()));
        return productList;
    } catch (error) {
        console.log(error);
    }
};
