import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import blue from '@mui/material/colors/blue';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
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

export interface Values {
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
}

interface ModalFormProductProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  onSubmit: (values: Values) => void;
  initialValues: Values;
  buttonLable: string;
  status: LoadingStatus;
}

const values = {
  title: 'Назва',
  description: 'Опис',
  price: 'Ціна',
  discountPercentage: 'Дисконт',
  rating: 'Рейтинг',
  stock: 'Сток',
  brand: 'Бренд',
};

type KeyValue = 'title' | 'description' | 'price' | 'discountPercentage' | 'rating' | 'stock' | 'brand';

const ModalFormProduct: React.FC<ModalFormProductProps> = ({
  open,
  onClose,
  categories,
  onSubmit,
  initialValues,
  buttonLable,
  status,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

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
        {Object.keys(values).map((key) => (
          <TextField
            key={key}
            fullWidth
            id={key}
            name={key}
            label={values[key as KeyValue]}
            value={formik.values[key as KeyValue]}
            onChange={formik.handleChange}
            error={formik.touched[key as KeyValue] && Boolean(formik.errors[key as KeyValue])}
            helperText={formik.touched[key as KeyValue] && formik.errors[key as KeyValue]}
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
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={status === LoadingStatus.PENDING}
        >
          {buttonLable}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalFormProduct;
