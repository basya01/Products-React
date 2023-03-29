import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import blue from '@mui/material/colors/blue';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useCreateProduct } from '../hooks';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Category } from '../types/models';

const validationSchema = yup.object({
  title: yup.string().min(7, 'Назва має бути не менше 7 символів').required("Назва обов'язкова"),
  description: yup.string().min(30, 'Опис має бути не менше 30 символів').required("Опис обов'язковий"),
  price: yup.number().required("Ціна обов'язкова"),
  discountPercentage: yup.number(),
  rating: yup
    .number()
    .min(0, 'Рейтинг від 0 до 5')
    .max(5, 'Рейтинг від 0 до 5')
    .required("Рейтинг обов'язковий"),
  stock: yup.number().required("Сток обов'язковий"),
  brand: yup.string().min(3, 'Бренд має бути не менше 3 символів').required("Бренд обов'язковий"),
  category: yup.string().required("Категорія обо'язкова"),
});

interface CreateProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: Category[];
}

const partOfFields = {
  title: 'Назва',
  description: 'Опис',
  price: 'Ціна',
  discountPercentage: 'Дисконт',
  rating: 'Рейтинг',
  stock: 'Сток',
  brand: 'Бренд',
};
type KeyPartOfFields =
  | 'title'
  | 'description'
  | 'price'
  | 'discountPercentage'
  | 'rating'
  | 'stock'
  | 'brand';

const CreateProductModal: React.FC<CreateProductModalProps> = ({ open, setOpen, categories }) => {
  const { createProduct, status } = useCreateProduct();
  useEffect(() => {
    if (status === LoadingStatus.SUCCEEDED) setOpen(false);
  }, [status]);

  const formik = useFormik({
    initialValues: {
      title: 'asdasdasd',
      description:
        'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',
      price: '123',
      discountPercentage: '123',
      rating: '2',
      stock: '123',
      brand: 'asdasdasdasads',
      category: 'smartphones',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createProduct({
        ...values,
        price: +values.price,
        discountPercentage: +values.discountPercentage,
        rating: +values.rating,
        stock: +values.stock,
        category: values.category as Category,
      });
    },
  });

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          zIndex: 999,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: `3px solid ${blue[500]}`,
          borderRadius: '8px',
          p: 4,
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
        onSubmit={formik.handleSubmit}
        component="form"
      >
        {Object.keys(partOfFields).map((key) => (
          <TextField
            key={key}
            fullWidth
            id={key}
            name={key}
            label={partOfFields[key as KeyPartOfFields]}
            value={formik.values[key as KeyPartOfFields]}
            onChange={formik.handleChange}
            error={formik.touched[key as KeyPartOfFields] && Boolean(formik.errors[key as KeyPartOfFields])}
            helperText={formik.touched[key as KeyPartOfFields] && formik.errors[key as KeyPartOfFields]}
          />
        ))}
        <FormControl sx={{ mt: 2, width: 200, background: '#fff' }}>
          <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
          <Select
            fullWidth
            id="category"
            name="category"
            label="Категорія"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;
