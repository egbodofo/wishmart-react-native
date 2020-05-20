import {
  // DELETE_PRODUCT,
  CREATE_PRODUCT,
  // UPDATE_PRODUCT,
  SHOW_PRODUCT,
  SET_PRODUCTS,
} from '../actions/products';

const initialState = {
  availableProducts: [],
  showProduct: null,
};

export default (
  state = initialState,
  action: {
    type: any;
    products: any;
    productData: {
      id: any;
      name: any;
      brand: any;
      image: any;
      description: any;
      price: any;
      owner: any;
      data: any;
    };
  }
) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
      };
    // case CREATE_PRODUCT:
    //   const newProduct = (action.productData.id,
    //   action.productData.name,
    //   action.productData.brand,
    //   action.productData.image,
    //   action.productData.description,
    //   action.productData.price,
    //   action.productData.owner)();
    //   return {
    //     ...state,
    //     availableProducts: state.availableProducts.concat(newProduct),
    //   };
    case SHOW_PRODUCT:
      return {
        ...state,
        showProduct: action.productData.data,
      };
  }
  return state;
};
