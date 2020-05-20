import axios from '../../axios-order';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SHOW_PRODUCT = 'SHOW_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get('/products');

      const loadedProducts = await response.data;

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (addproductData: any) => {
  return async (dispatch: any, getState: any) => {
    // any async code you want!
    const token = getState().auth.token;

    const response = await axios.post('/products', addproductData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = response;

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.data._id,
        name: resData.data.name,
        brand: resData.data.brand,
        description: resData.data.description,
        image: resData.data.image,
        price: resData.data.price,
        owner: resData.data.owner,
      },
    });
  };
};

export const fetchProductById = (id: string) => {
  return async (dispatch: any) => {
    // any async code you want!
    const response = await axios.get(`/products/${id}`);

    const resData = await response.data;

    dispatch({
      type: SHOW_PRODUCT,
      productData: { data: resData },
    });
  };
};

export const updateProduct = (id: string, updateProductData: any) => {
  return async (dispatch: any, getState: any) => {
    // any async code you want!
    const token = getState().auth.token;

    const response = await axios.patch(`/products/${id}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await response.data;
    console.log(resData);

    dispatch({
      type: UPDATE_PRODUCT,
      productData: { data: resData },
    });
  };
};
