import { Button, Paper, Table, TableBody, TableCell, TableHead, TableProps, TableRow } from '@mui/material';
import React from 'react';
import { Product } from '../types/models';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteProductById } from '../hooks';
import { LoadingStatus } from '../types/enums/LoadingStatus';

interface ProductsProps extends TableProps {
  items: Product[];
}

interface TableElem {
  id: number;
  name: string;
  key: 'id' | 'title' | 'description' | 'price' | 'thumbnail' | 'rating' | 'stock' | 'category';
}
const tableElems: TableElem[] = [
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
  const { deleteProduct, status } = useDeleteProductById();
  const handlerDelete = (id: number) => {
    deleteProduct(id);
  };

  return (
    <Paper elevation={5} {...props}>
      <Table sx={{ textTransform: 'capitalize' }}>
        <TableHead>
          <TableRow>
            {tableElems.map((item) => (
              <TableCell key={item.id}>{item.name}</TableCell>
            ))}
            <TableCell>Інструменти</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((product) => (
            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {tableElems.map(({ id, key }) => (
                <TableCell key={id} component="th" scope="row">
                  {key === 'thumbnail' ? (
                    <img
                      src={product[key]}
                      alt="product_photo"
                      style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover' }}
                    />
                  ) : (
                    product[key]
                  )}
                </TableCell>
              ))}
              <TableCell component="th" scope="row">
                <Button>
                  <EditIcon sx={{ cursor: 'pointer' }} color="primary" fontSize="large" />
                </Button>
                <Button color="error" onClick={() => handlerDelete(product.id)} disabled={status === LoadingStatus.PENDING}>
                  <DeleteForeverIcon sx={{ cursor: 'pointer' }} color="error" fontSize="large" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Products;
