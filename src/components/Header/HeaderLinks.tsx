import {Box, Button} from '@mui/material';
import {Link} from 'react-router-dom';

interface HeaderLinksProps {
  handleCloseNavMenu: () => void;
}

function HeaderLinks({handleCloseNavMenu}: HeaderLinksProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        justifyContent: 'center',
        gap: '50px',
        display: {xs: 'none', md: 'flex'},
      }}
    >
      <Button
        component={Link}
        to='/'
        key='Поиск'
        onClick={handleCloseNavMenu}
        sx={{my: 2, color: 'white', display: 'block'}}
      >
        Поиск
      </Button>
      <Button
        component={Link}
        to='/dictionary'
        key='Словарь'
        onClick={handleCloseNavMenu}
        sx={{my: 2, color: 'white', display: 'block'}}
      >
        Словарь
      </Button>
      <Button
        component={Link}
        to='/training'
        key='Тренировки'
        onClick={handleCloseNavMenu}
        sx={{my: 2, color: 'white', display: 'block'}}
      >
        Тренировки
      </Button>
      <Button
        component={Link}
        to='/reader'
        key='Читалка'
        onClick={handleCloseNavMenu}
        sx={{my: 2, color: 'white', display: 'block'}}
      >
        Читалка
      </Button>
    </Box>
  );
}

export default HeaderLinks;
