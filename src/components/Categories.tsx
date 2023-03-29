import { Box, Chip, styled } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCategory } from '../store/slices/filters';
import { LoadingStatus } from '../types/enums/LoadingStatus';
import { Category } from '../types/models/Category';
import CategoriesSkeleton from './CategoriesSkeleton';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingBottom: 3,
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
interface CategoriesProps {
  categories?: Category[];
  status: LoadingStatus;
}

const Categories: React.FC<CategoriesProps> = ({ categories, status }) => {
  const category = useAppSelector((state) => state.filters.category);
  const dispatch = useAppDispatch();

  const handlerCategory = (value: Category) => {
    if (value === category) {
      dispatch(setCategory(null));
      return;
    }
    dispatch(setCategory(value));
  };
  return (
    <StyledBox>
      {categories
        ? categories.map((item) => (
            <Chip
              sx={category === item ? { background: blue[700], color: '#fff' } : {}}
              onClick={() => handlerCategory(item)}
              label={item}
              key={item}
            />
          ))
        : [...new Array(15)].map((_, index) => (
            <Box key={index}>
              <CategoriesSkeleton />
            </Box>
          ))}
    </StyledBox>
  );
};

export default Categories;
