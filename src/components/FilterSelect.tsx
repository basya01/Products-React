import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSort } from '../store/slices/filters';
import { SortType } from '../types/models';

const sortParams = {
  id: 'ID',
  title: 'Назва',
  description: 'Опис',
  price: 'Ціна',
  rating: 'Рейтинг',
  stock: 'Сток',
};
const FilterSelect = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.filters.sort);

  const handleChange = (event: SelectChangeEvent<SortType>) => {
    dispatch(setSort(event.target.value as SortType));
  };

  return (
    <FormControl sx={{ mt: 2, width: 200, background: '#fff' }}>
      <InputLabel>Сортування</InputLabel>
      <Select value={sort} label="Сортування" onChange={handleChange}>
        <MenuItem value={''}>
          <em>Не сортувати</em>
        </MenuItem>
        {Object.entries(sortParams).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
