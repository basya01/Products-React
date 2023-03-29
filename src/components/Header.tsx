import SearchIcon from '@mui/icons-material/Search';
import { AppBar, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSearch } from '../store/slices/filters';

const Header = () => {
  const search = useAppSelector((state) => state.filters.search);
  const [searchValue, setSearchValue] = useState(search);
  const dispatch = useAppDispatch();

  const changeSearchDebounce = useCallback(
    debounce((value: string) => {
      dispatch(setSearch(value));
    }, 1000),
    []
  );

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchDebounce(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Container maxWidth="lg">
          <Toolbar variant="dense" disableGutters component="nav" sx={{ py: 1 }}>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                mr: 10,
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
            >
              PRODUCTS
            </Typography>
            <TextField
              id="filled-basic"
              variant="standard"
              value={searchValue}
              onChange={handlerSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="medium" />
                  </InputAdornment>
                ),
              }}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
