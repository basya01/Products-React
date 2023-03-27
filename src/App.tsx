import { Container } from '@mui/system';
import { useEffect } from 'react';
import { Categories, Header, Products } from './components';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
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
      </Container>
    </div>
  );
};

export default App;
