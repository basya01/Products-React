import { Container } from '@mui/system';
import { useEffect } from 'react';
import { Categories, Header, PaginationProducts, Products } from './components';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchProducts } from './store/slices/products';

const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" component="main" sx={{ my: 4 }}>
        <Categories />
        <Products items={products.items} sx={{ marginTop: 1 }} />
        <PaginationProducts />
      </Container>
    </div>
  );
};

export default App;
