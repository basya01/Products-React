import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { deleteProductById } from '../store/slices/products';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Product } from '../types/models';
import { useAppDispatch } from './useAppDispatch';

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteProductById = () => {
  const [deletedProduct, setDeletedProduct] = useState<Product>();
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const dispatch = useAppDispatch();
  const deleteProduct = useCallback(async (id: number) => {
    try {
      setStatus(LoadingStatus.PENDING);
      const { data } = await axios.delete(`${API_URL}products/${id}`);
      setDeletedProduct(data);
      dispatch(deleteProductById(id));
      setStatus(LoadingStatus.SUCCEEDED);
    } catch (error) {
      setStatus(LoadingStatus.FAILED);
    }
  }, []);

  return {
    deleteProduct,
    deletedProduct,
    status,
  };
};
