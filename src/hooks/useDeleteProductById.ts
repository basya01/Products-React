import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { addAlert } from '../store/slices/alerts';
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
      dispatch(addAlert({ text: 'Продукт успішно видалений.', severity: 'success' }));
    } catch (error) {
      dispatch(addAlert({ text: 'Помилка! Продукт не видалений.', severity: 'error' }));
      setStatus(LoadingStatus.FAILED);
    }
  }, []);

  return {
    deleteProduct,
    deletedProduct,
    status,
  };
};
