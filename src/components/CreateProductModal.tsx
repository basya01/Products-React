import { Box, Button, Modal, TextField } from '@mui/material';
import blue from '@mui/material/colors/blue';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from '../utils/fileValidation';

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
  images: yup
    .array()
    .nullable()
    .required("Фото обов'язково")
    .test('is-correct-file', 'Некоректний файл', checkIfFilesAreTooBig)
    .test('is-big-file', 'Файл занадто великий', checkIfFilesAreCorrectType),
});

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
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

const CreateProductModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
      brand: '',
      category: '',
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(1);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title">
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;
