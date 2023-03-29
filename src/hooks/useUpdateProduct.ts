import axios from 'axios';
import { useCallback, useState } from 'react';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Product } from '../types/models';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateProduct = () => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>();
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
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
    } catch (error) {
      setStatus(LoadingStatus.FAILED);
    }
  }, []);

  return {
    updateProduct,
    updatedProduct,
    status,
  };
};
