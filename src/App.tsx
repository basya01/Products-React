import { Box, Button } from '@mui/material';
import { Container } from '@mui/system';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Categories,
  CreateProductModal,
  FilterSelect,
  Header,
  PaginationProducts,
  Products,
} from './components';
import { useAppDispatch, useAppSelector, useFetchCategories } from './hooks';
import { fetchProducts } from './store/slices/products';

const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { categories, status } = useFetchCategories();
  const { page, category, search, sort } = useAppSelector((state) => state.filters);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
        <CreateProductModal open={showModal} setOpen={setShowModal} categories={categories} />
      )}
    </div>
  );
};

export default App;
