import { Pagination } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../hooks';

const PaginationProducts = () => {
  const { limit, total, status } = useAppSelector((state) => state.products);
  const countOfPages = Math.ceil(total / limit);
  
  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    
  };

  return <Pagination count={countOfPages} color="primary" onChange={onChangePage} />;
};

export default PaginationProducts;
