import {
  Box,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
} from '@mui/material';
import React from 'react';
import { Product } from '../types/models';

interface ProductsProps extends TableProps {
  items: Product[];
}

interface TableHeadElem {
  id: number;
  name: string;
  key: 'id' | 'title' | 'description' | 'price' | 'thumbnail' | 'rating' | 'stock' | 'category';
}

const tableHeadElems: TableHeadElem[] = [
  { id: 1, name: 'ID', key: 'id' },
  { id: 2, name: 'Назва', key: 'title' },
  { id: 3, name: 'Опис', key: 'description' },
  { id: 4, name: 'Ціна', key: 'price' },
  { id: 5, name: 'Фото', key: 'thumbnail' },
  { id: 6, name: 'Рейтинг', key: 'rating' },
  { id: 7, name: 'Сток', key: 'stock' },
  { id: 8, name: 'Категорія', key: 'category' },
];

const Products: React.FC<ProductsProps> = ({ items, ...props }) => {
  return (
    <Paper elevation={5} {...props}>
      <Table sx={{ textTransform: 'capitalize' }}>
        <TableHead>
          <TableRow>
            {tableHeadElems.map((item) => (
              <TableCell key={item.id}>{item.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((product) => (
            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {tableHeadElems.map(({ id, key }) =>
                key === 'thumbnail' ? (
                  <TableCell>
                    <img
                      src={product[key]}
                      alt="product_photo"
                      style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover' }}
                    />
                  </TableCell>
                ) : (
                  <TableCell key={id} component="th" scope="row">
                    {product[key]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Products;
