import { Pagination } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setPage } from '../store/slices/filters';

const PaginationProducts = () => {
  const { limit, total, status } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const countOfPages = Math.ceil(total / limit);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  return <Pagination count={countOfPages} color="primary" onChange={onChangePage} />;
};

export default PaginationProducts;
