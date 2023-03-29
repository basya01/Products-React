import { Box, Button, LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alerts,
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
import { LoadingStatus } from './types/enums/LoadingStatus';
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
  const [showUpdateModal, setShowUpdateModal] = useProductModal(updateProductStatus);
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
    navigate(`?${paramsUrl}`);
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

  const isProductSuccessAndNotEmpty = products.status === LoadingStatus.SUCCEEDED && !!products.items.length;
  const isProductNotIdleAndNotEmpty = products.status !== LoadingStatus.IDLE && !products.items.length;

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" component="main" sx={{ my: 4 }}>
        <Categories categories={categories} status={categoriesStatus} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <FilterSelect />
          <Button variant="contained" onClick={() => setShowCreateModal(true)}>
            Створити продукт
          </Button>
        </Box>
        {products.status === LoadingStatus.PENDING && <LinearProgress sx={{ marginTop: 1 }} />}
        {isProductSuccessAndNotEmpty && (
          <Products items={products.items} sx={{ marginTop: 1 }} onEditProduct={onEditProduct} />
        )}
        {isProductNotIdleAndNotEmpty && (
          <Typography variant="h5" component="p">
            Продукти не знайдені
          </Typography>
        )}
        {isProductSuccessAndNotEmpty && (
          <PaginationProducts sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }} />
        )}
      </Container>
      {categories && (
        <ModalFormProduct
          buttonLable="Створити"
          open={showCreateModal}
          onClose={onCloseCreateModal}
          categories={categories}
          onSubmit={onSubmitCreate}
          status={createProductStatus}
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
          buttonLable="Оновити"
          open={showUpdateModal}
          onClose={onCloseUpdateModal}
          categories={categories}
          onSubmit={onSubmitUpdate}
          status={updateProductStatus}
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
      <Alerts />
    </div>
  );
};

export default App;
