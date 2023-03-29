import axios from 'axios';
import { useCallback, useState } from 'react';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Product } from '../types/models';

const API_URL = import.meta.env.VITE_API_URL;

export const useCreateProduct = () => {
  const [createdProduct, setCreatedProduct] = useState<Product>();
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const createProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    try {
      setStatus(LoadingStatus.PENDING);
      const { data } = await axios.post(`${API_URL}products/add`, product, {
        headers: { 'Content-Type': 'application/json' },
      });
      setCreatedProduct(data);
      setStatus(LoadingStatus.SUCCEEDED);
    } catch (error) {
      setStatus(LoadingStatus.FAILED);
    }

    return new Promise((res) => {
      if (status === LoadingStatus.SUCCEEDED) {
        res(true);
      }
    });
  }, []);

  return {
    createProduct,
    createdProduct,
    status,
  };
};
