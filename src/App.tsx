import { Box, Button } from '@mui/material';
import { Container } from '@mui/system';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Categories, FilterSelect,
  Header,
  ModalFormProduct,
  PaginationProducts,
  Products
} from './components';
import { Values } from './components/ModalFormProduct';
import { useAppDispatch, useAppSelector, useCreateProduct, useFetchCategories } from './hooks';
import { fetchProducts } from './store/slices/products';
import { LoadingStatus } from './types/enums/LoadingStatus';
import { Category } from './types/models';

const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { categories, status } = useFetchCategories();
  const { page, category, search, sort } = useAppSelector((state) => state.filters);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { createProduct, status: productStatus } = useCreateProduct();

  useEffect(() => {
    if (productStatus === LoadingStatus.SUCCEEDED) {
      setShowModal(false);
    }
  }, [productStatus]);

  useEffect(() => {
    dispatch(fetchProducts({ page, category, search, sort }));
    const paramsUrl = queryString.stringify(
      { category, search, page, sort },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    navigate(paramsUrl);
  }, [page, category, search, sort]);

  const onSubmit = (values: Values) => {
    createProduct({
      ...values,
      price: +values.price,
      discountPercentage: +values.discountPercentage,
      rating: +values.rating,
      stock: +values.stock,
      category: values.category as Category,
    });
  };

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" component="main" sx={{ my: 4 }}>
        {categories && <Categories categories={categories} status={status} />}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <FilterSelect />
          <Button variant="contained" onClick={() => setShowModal(true)}>
            Створити продукт
          </Button>
        </Box>
        <Products items={products.items} sx={{ marginTop: 1 }} />
        <PaginationProducts sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }} />
      </Container>
      {categories && (
        <ModalFormProduct
          open={showModal}
          setOpen={setShowModal}
          categories={categories}
          onSubmit={onSubmit}
          initialValues={{
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            rating: '',
            stock: '',
            brand: '',
            category: '',
          }}
        />
      )}
    </div>
  );
};

export default App;
