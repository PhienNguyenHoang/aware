import * as firebase from "firebase/app";
import "firebase/firestore";
import { forEach as pForEach } from "p-iteration";
import config from "./config";

!firebase.apps.length && firebase.initializeApp(config);

const firestore = firebase.firestore();
export const getAllProductsByCustomerTypeAndType = async (
  customerType,
  type,
  categoryChosen,
  filterConditions
) => {
  try {
    let productList = [];
    let getProductArray = [];
    const filterOptions = Object.keys(filterConditions);
    let query = firestore
      .collection("products")
      .where("customerType", "==", customerType);
    if (categoryChosen) {
      query = query.where("category", "==", categoryChosen);
    }
    if (type) {
      query = query.where("type", "==", type);
    }
    const products = await query.get();
    if (filterOptions.length > 0) {
      products.forEach((doc) => {
        getProductArray.push(doc);
      });
      await pForEach(getProductArray, async (doc) => {
        let variations = firestore
          .collection("products")
          .doc(doc.id)
          .collection("variations");
        filterOptions.forEach((item) => {
          variations = variations.where(item, "==", filterConditions[item]);
        });
        let variationsDocs = await variations.get();
        let productName = [];
        variationsDocs.forEach((variationsDoc) => {
          productName.push(variationsDoc.data().name);
        });
        let uniqueProductName = [...new Set(productName)];
        if (uniqueProductName.length > 0) {
          const toBePushedProduct = await firestore
            .collection("products")
            .doc(uniqueProductName[0])
            .get();
          productList.push(toBePushedProduct.data());
        }
      });
      return productList
    } else {
      products.forEach((item) => {
        productList.push(item.data());
      });
      return productList;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllBrand = async () => {
  try {
    const brandList = [];
    const query = await firestore.collection("products");
    const productRef = await query.get();
    productRef.forEach((item) => {
      brandList.push(item.data().brand);
    });
    const returnArray = [...new Set(brandList)];
    return returnArray;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategory = async () => {
  try {
    const categoryList = [];
    const query = await firestore.collection("products");
    const productsRef = await query.get();
    productsRef.forEach((item) => {
      categoryList.push(item.data().category);
    });
    const returnArray = [...new Set(categoryList)];
    return returnArray;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByCustomerTypeAndType = async (customterType, type) => {
  try {
    const categoryList = [];
    const query = firestore
      .collection("products")
      .where("customerType", "==", customterType);
    if (type) {
      query.where("type", "==", type);
    }

    const products = await query.get();
    products.forEach((item) => {
      categoryList.push(item.data().category);
    });
    return [...new Set(categoryList)];
  } catch (error) {
    console.log(error);
  }
};

export const getOneProduct = async (productName) => {
  try {
    let productObj = {};
    const productList = [];
    const variations = [];
    const colors = [];
    const sizes = [];
    const queryProduct = await firestore
      .collection("products")
      .where("name", "==", productName);
    const product = await queryProduct.get();
    const queryVariation = await firestore
      .collection("products")
      .doc(productName)
      .collection("variations")
      .get();
    queryVariation.forEach((item) => {
      variations.push(item.data());
    });
    variations.forEach((variation) => {
      colors.push(variation.color);
      sizes.push(variation.size);
    });
    product.forEach((item) => {
      productList.push(item.data());
    });
    const productData = productList[0];
    productObj = {
      category: productData.category,
      createdAt: productData.createdAt,
      customerType: productData.customerType,
      name: productData.name,
      price: productData.price,
      type: productData.type,
      imageUrl: productData.imageUrl,
      colors: [...new Set(colors)],
      sizes: [...new Set(sizes)],
    };
    return productObj;
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
    const checkExist = await (
      await firestore.collection("products").doc(productDetails.name).get()
    ).exists;
    if (checkExist) {
      throw "Product already exists";
    }
    const productDoc = {
      name: productDetails.name,
      customerType: productDetails.customerType,
      category: productDetails.category,
      type: productDetails.type,
      createdAt: new Date().toISOString(),
      price: productDetails.price,
    };
    await firestore.doc(`/products/${productDetails.name}`).set(productDoc);
    productDetails.colors.forEach((color) => {
      productDetails.sizes.forEach((size) => {
        const productVariations = {
          amount: productDetails.amount,
          color: color,
          size: size,
        };
        firestore
          .doc(`/products/${productDetails.name}`)
          .collection("variations")
          .add(productVariations);
      });
    });
  } catch (error) {
    alert(error);
  }
};

export const addProductToCart = async (cartData) => {
  try {
    const checkExist = (
      await firestore.collection("cart").doc(cartData.userId).get()
    ).exists;
    if (checkExist) {
      if (cartData.product.color && cartData.product.size) {
        await firestore
          .collection("cart")
          .doc(cartData.userId)
          .update({
            products: firebase.firestore.FieldValue.arrayUnion(
              cartData.product
            ),
          });
        alert("added succesfully");
      } else {
        alert("Please select the size and color you want!");
      }
    } else {
      if (cartData.product.color && cartData.product.size) {
        let cartObj = {
          username: cartData.username,
          products: [cartData.product],
        };
        await firestore.collection("cart").doc(cartData.userId).set(cartObj);
        alert("added succesfully");
      } else {
        alert("Please select the size and color you want!");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (username) => {
  try {
    let cartData = {};
    const query = await firestore
      .collection("cart")
      .where("username", "==", username)
      .get();
    query.forEach((item) => {
      cartData.products = item.data().products;
    });
    return cartData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrder = async () => {
  try {
    let orderList = [];
    const query = await firestore.collection("orders").get();
    query.forEach((item) => {
      orderList.push(item.data());
    });
    return orderList;
  } catch (error) {
    console.log(error);
  }
};

export const createAnOrder = async (orderDetails) => {
  try {
    console.log(orderDetails);

    const orderObject = {
      orderId: orderDetails.orderId,
      products: orderDetails.products,
      status: orderDetails.status,
      userId: orderDetails.userId,
      createdAt: new Date().toISOString(),
    };
    if (orderObject.products && orderObject.userId) {
      await firestore
        .collection("orders")
        .doc(orderDetails.orderId)
        .set(orderObject);
    }
    return "successfully";
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserCart = async (userId) => {
  try {
    const checkExist = (await firestore.collection("cart").doc(userId).get())
      .exists;
    if (checkExist) {
      await firestore.collection("cart").doc(userId).delete();
    }
  } catch (error) {
    console.log(error);
  }
};
