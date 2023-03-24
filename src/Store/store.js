import { createStore } from "redux";

const initialState = {
  products: null
};

export const getAllProducts = data => ({
  type: "getAllProductsAction",
  payload: { data: data }
});

export const deleteProductAction = data => ({
  type: "deleteProductAction",
  payload: { data: data }
});

export const addProductAction = data => ({
  type: "addProductAction",
  payload: { data: data }
});

export const updateProductAction = (product, data) => ({
  type: "updateProductAction",
  payload: { product: product, data: data }
});

function reducer(state, action) {
  if (action.type === "getAllProductsAction") {
    return { ...state, products: action.payload.data };
  }
  if (action.type === "deleteProductAction") {
    return {
      ...state,
      products: state.products.filter(
        product => product.id !== action.payload.data.id
      )
    };
  }
  if (action.type === "addProductAction") {
    return {
      ...state,
      products: [action.payload.data, ...state.products]
    };
  }
  if (action.type === "updateProductAction") {
    return {
      ...state,
      products: state.products.map(product =>
        product.id === action.payload.product.id ? action.payload.data : product
      )
    };
  }

  return state;
}

export const store = createStore(reducer, initialState);
