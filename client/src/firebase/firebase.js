import * as firebase from "firebase/app";
import "firebase/firestore";
import { forEach as pForEach } from "p-iteration";
import config from "./config";

!firebase.apps.length && firebase.initializeApp(config);

const firestore = firebase.firestore();
const PAGE_LIMIT = 1;
export const getAllProductsByCustomerTypeAndType = async (
  customerType,
  type,
  categoryChosen,
  filterConditions,
  page
) => {
  try {
    let productList = [];
    let getProductArray = [];
    const filterOptions = Object.keys(filterConditions);
    let productCursor = parseInt(page) === 1 ? 0 : (page - 1) * PAGE_LIMIT;
    let query = firestore
      .collection("products")
      .where("customerType", "==", customerType);
    if (categoryChosen) {
      query = query.where("category", "==", categoryChosen);
    }
    if (type) {
      query = query.where("type", "==", type);
    }
    if (filterOptions.length > 0) {
      const products = await query.get();
      let filtersAppliedProducts = [];
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
        if (variationsDocs.size > 0) {
          filtersAppliedProducts.push(doc.data());
        }
      });
      return filtersAppliedProducts.slice(
        productCursor,
        productCursor + PAGE_LIMIT
      );
    } else {
      const producstSnapshot = await query.orderBy("createdAt").get();
      console.log("producstSnapshot", producstSnapshot);
      const productAnchor =
        producstSnapshot.docs[
          productCursor <= producstSnapshot.docs.length - 1
            ? productCursor
            : producstSnapshot.docs.length - 1
        ];

      const products = await query
        .orderBy("createdAt")
        .startAfter(productAnchor.data().createdAt)
        .limit(PAGE_LIMIT)
        .get();
      products.forEach((item) => {
        productList.push(item.data());
      });
      return productList;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProductNextPage = async (
  customerType,
  type,
  categoryChosen,
  filterConditions,
  lastCreatedAt
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
    if (filterOptions.length > 0) {
      const products = await query.get();
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
      return productList;
    } else {
      const products = await query
        .orderBy("createdAt")
        .startAfter(lastCreatedAt)
        .limit(20)
        .get();
      products.forEach((item) => {
        productList.push(item.data());
      });
      return productList;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getPreviousPage = async (
  customerType,
  type,
  categoryChosen,
  filterConditions,
  firstCreatedAt
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
    if (filterOptions.length > 0) {
      const products = await query.get();
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
      return productList;
    } else {
      const products = await query
        .orderBy("createdAt", "desc")
        .startAfter(firstCreatedAt)
        .limit(20)
        .get();
      products.forEach((item) => {
        productList.push(item.data());
      });
      const compare = (a, b) => {
        const created1 = a.createdAt;
        const created2 = b.createdAt;
        let comparison = 0;
        if (created1 > created2) {
          comparison = 1;
        } else if (created1 < created2) {
          comparison = -1;
        }
        return comparison;
      };
      productList.sort(compare);
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

export const markOrderComplete = async (orderId) => {
  try {
    const checkExist = (await firestore.collection("orders").doc(orderId).get())
      .exists;
    if (checkExist) {
      await firestore.collection("orders").doc(orderId).update({
        status: "complete",
      });
    } else {
      throw "Order does not exist";
    }
  } catch (error) {
    alert(error);
  }
};
export const markOrderCanceled = async (orderId) => {
  try {
    const checkExist = (await firestore.collection("orders").doc(orderId).get())
      .exists;
    if (checkExist) {
      await firestore.collection("orders").doc(orderId).update({
        status: "canceled",
      });
    } else {
      throw "Order does not exist";
    }
  } catch (error) {
    throw error;
  }
};
