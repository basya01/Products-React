import { Pagination, PaginationProps } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setPage } from '../store/slices/filters';

const PaginationProducts: React.FC<PaginationProps> = (props) => {
  const { limit, total, status } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.filters.page);
  const countOfPages = Math.ceil(total / limit);
  console.log(page);
  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    window.scrollTo(0, 0);
    dispatch(setPage(page));
  };

  return (
    <Pagination {...props} defaultPage={page} count={countOfPages} color="primary" onChange={onChangePage} />
  );
};

export default PaginationProducts;
