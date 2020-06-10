export const addProduct = (product) => {
  console.log("Added on product");
  return { type: "ADD_PRODUCT", payload: { product } };
};

export const addListOfProducts = (products) => {
  console.log("Added List of products");
  return { type: "ADD_PRODUCT_LIST", payload: { products } };
};

export const removeProduct = (id) => {
  return { type: "REMOVE_PRODUCT", payload: { id } };
};

export const updateProduct = (id, product) => {
  return { type: "UPDATE_PRODUCT", payload: { id, product } };
};
