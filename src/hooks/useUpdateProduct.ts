import axios from 'axios';
import { useCallback, useState } from 'react';
import { addAlert } from '../store/slices/alerts';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Product } from '../types/models';
import { useAppDispatch } from './useAppDispatch';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateProduct = () => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>();
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const dispatch = useAppDispatch();
  const updateProduct = useCallback(async ({ id, ...body }: Product) => {
    try {
      setStatus(LoadingStatus.PENDING);
      const { data } = await axios.put(
        `${API_URL}products/${id}`,
        { ...body },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setUpdatedProduct(data);
      setStatus(LoadingStatus.SUCCEEDED);
      dispatch(addAlert({ text: 'Продукт успішно оновлений.', severity: 'success' }));
    } catch (error) {
      setStatus(LoadingStatus.FAILED);
      dispatch(addAlert({ text: 'Помилка! Продукт не оновлений.', severity: 'error' }));
    }
  }, []);

  return {
    updateProduct,
    updatedProduct,
    status,
  };
};
