import axios from 'axios';
import { useCallback, useState } from 'react';
import { addAlert } from '../store/slices/alerts';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Product } from '../types/models';
import { useAppDispatch } from './useAppDispatch';

const API_URL = import.meta.env.VITE_API_URL;

export const useCreateProduct = () => {
  const [createdProduct, setCreatedProduct] = useState<Product>();
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const dispatch = useAppDispatch();
  const createProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    try {
      setStatus(LoadingStatus.PENDING);
      const { data } = await axios.post(`${API_URL}products/add`, product, {
        headers: { 'Content-Type': 'application/json' },
      });
      setCreatedProduct(data);
      setStatus(LoadingStatus.SUCCEEDED);
      dispatch(addAlert({ text: 'Продукт успішно створений.', severity: 'success' }));
    } catch (error) {
      setStatus(LoadingStatus.FAILED);
      dispatch(addAlert({ text: 'Помилка! Продукт не створений.', severity: 'error' }));
    }
  }, []);

  return {
    createProduct,
    createdProduct,
    status,
  };
};
