import SearchIcon from '@mui/icons-material/Search';
import { AppBar, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';

const Header = () => {
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
