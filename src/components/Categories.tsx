import { Box, Chip, styled } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useFetchCategories } from '../hooks';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingBottom: 3,
  maxWidth: '100%',
  textTransform: 'capitalize',
  gap: 5,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 10,
    height: 5,
  },
  '&::-webkit-scrollbar-track': { background: 'rgba(0, 0, 0, 0.05)', borderRadius: 20 },
  '&::-webkit-scrollbar-thumb': {
    background: blue[700],
    borderRadius: 20,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}));

const Categories = () => {
  const { categories, status } = useFetchCategories();
  const [active, setActive] = useState<number>();

  const handlerCategory = (index: number) => {
    setActive(index);
  };

  return (
    <StyledBox>
      {categories?.map((item, index) => (
        <Chip
          sx={active === index ? { background: blue[700], color: '#fff' } : {}}
          onClick={() => handlerCategory(index)}
          label={item}
          key={index}
        />
      ))}
    </StyledBox>
  );
};

export default Categories;
