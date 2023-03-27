import { Box } from '@mui/material';
import React from 'react';
import { useFetchCategories } from '../hooks';

const Categories = () => {
  const { categories, status } = useFetchCategories();
  return <Box sx={{ display: 'flex' }}></Box>;
};

export default Categories;
