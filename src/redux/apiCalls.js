import { setAuthLocalStorage } from '../getCurrentUserDetails';
import { publicRequest, userRequest } from '../requestMethods';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from './productRedux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from './userRedux';

export const login = async (dispath, user) => {
  dispath(loginStart());
  try {
    const res = await publicRequest.post('/auth/signin', user);
    setAuthLocalStorage(res.data);
    dispath(loginSuccess(res.data));
    return res;
  } catch (error) {
    dispath(loginFailure());
  }
};

export const getUsers = async (dispath) => {
  dispath(getUserStart());
  try {
    const res = await userRequest.get('/users');
    dispath(getUserSuccess(res.data));
  } catch (error) {
    dispath(getUserFailure());
  }
};

export const deleteUsers = async (dispath, id) => {
  dispath(deleteUserStart());
  try {
    await userRequest.delete(`/user/${id}`);
    dispath(deleteUserSuccess(id));
  } catch (error) {
    dispath(deleteUserFailure());
  }
};

export const getProducts = async (dispath) => {
  dispath(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    dispath(getProductSuccess(res.data));
  } catch (error) {
    dispath(getProductFailure());
  }
};

export const deleteProducts = async (dispath, id) => {
  dispath(deleteProductStart());
  try {
    await userRequest.delete(`/product/${id}`);
    dispath(deleteProductSuccess(id));
  } catch (error) {
    dispath(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = userRequest.put(`/product/${id}`, product);
    dispatch(updateProductSuccess({ id: id, product: res.data }));
  } catch (err) {
    console.log(err);
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
