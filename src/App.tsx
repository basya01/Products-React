import { Box, Button } from '@mui/material';
import { Container } from '@mui/system';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Categories,
  FilterSelect,
  Header,
  ModalFormProduct,
  PaginationProducts,
  Products,
} from './components';
import { Values } from './components/ModalFormProduct';
import {
  useAppDispatch,
  useAppSelector,
  useCreateProduct,
  useFetchCategories,
  useProductModal,
  useUpdateProduct,
} from './hooks';
import { fetchProducts } from './store/slices/products';
import { Category, Product } from './types/models';

const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const { categories, status: categoriesStatus } = useFetchCategories();
  const { page, category, search, sort } = useAppSelector((state) => state.filters);
  const navigate = useNavigate();
  const { createProduct, status: createProductStatus } = useCreateProduct();
  const { updateProduct, status: updateProductStatus } = useUpdateProduct();
  const [showCreateModal, setShowCreateModal] = useProductModal(createProductStatus);
  const [showUpdateModal, setShowUpdateModal] = useProductModal(createProductStatus);
  const [updatedProduct, setUpdatedProduct] = useState<Product>();

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

  const onSubmitCreate = (values: Values) => {
    createProduct({
      ...values,
      price: +values.price,
      discountPercentage: +values.discountPercentage,
      rating: +values.rating,
      stock: +values.stock,
      category: values.category as Category,
    });
  };

  const onSubmitUpdate = (values: Values) => {
    if (updatedProduct) {
      updateProduct({
        id: updatedProduct.id,
        ...values,
        price: +values.price,
        discountPercentage: +values.discountPercentage,
        rating: +values.rating,
        stock: +values.stock,
        category: values.category as Category,
      });
    }
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const onCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const onEditProduct = (product: Product) => {
    setShowUpdateModal(true);
    setUpdatedProduct(product);
  };

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" component="main" sx={{ my: 4 }}>
        {categories && <Categories categories={categories} status={categoriesStatus} />}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <FilterSelect />
          <Button variant="contained" onClick={() => setShowCreateModal(true)}>
            Створити продукт
          </Button>
        </Box>
        <Products items={products.items} sx={{ marginTop: 1 }} onEditProduct={onEditProduct} />
        <PaginationProducts sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }} />
      </Container>
      {categories && (
        <ModalFormProduct
          open={showCreateModal}
          onClose={onCloseCreateModal}
          categories={categories}
          onSubmit={onSubmitCreate}
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
      {categories && updatedProduct && (
        <ModalFormProduct
          open={showUpdateModal}
          onClose={onCloseUpdateModal}
          categories={categories}
          onSubmit={onSubmitUpdate}
          initialValues={{
            title: updatedProduct.title,
            description: updatedProduct.description,
            price: updatedProduct.price.toString(),
            discountPercentage: updatedProduct.discountPercentage.toString(),
            rating: updatedProduct.rating.toString(),
            stock: updatedProduct.stock.toString(),
            brand: updatedProduct.brand,
            category: updatedProduct.category,
          }}
        />
      )}
    </div>
  );
};

export default App;
