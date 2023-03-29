import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Category } from '../types/models/Category';

const API_URL = import.meta.env.VITE_API_URL;

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setStatus(LoadingStatus.PENDING);
        const { data } = await axios.get<Category[]>(`${API_URL}products/categories`);
        setCategories(data);
        setStatus(LoadingStatus.SUCCEEDED);
      } catch (error) {
        setStatus(LoadingStatus.FAILED);
      }
    };
    fetchCategories();
  }, []);

  return { categories, status };
};
