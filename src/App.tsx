import { Container } from '@mui/system';
import { useEffect } from 'react';
import { Categories, Header, PaginationProducts, Products } from './components';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchProducts } from './store/slices/products';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { page, category, search } = useAppSelector((state) => state.filters);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts({ page, category, search }));
    const paramsUrl = queryString.stringify(
      { category, search },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    navigate(paramsUrl);
  }, [page, category, search]);

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" component="main" sx={{ my: 4 }}>
        <Categories />
        <Products items={products.items} sx={{ marginTop: 1 }} />
        <PaginationProducts sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }} />
      </Container>
    </div>
  );
};

export default App;
