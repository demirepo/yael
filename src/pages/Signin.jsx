import {useDispatch} from 'react-redux';

import {useForm} from 'react-hook-form';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from '@mui/material';
import Grid from '@mui/material/Grid';

import {signinThunk} from '../store/userSlice';

const theme = createTheme();

export default function Signin({isAuth}) {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(signinThunk(data.email, data.password));
  };
  const {register, handleSubmit} = useForm();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{mt: 5, textAlign: 'center'}}>
            Для входа введите данные учетной записи
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{mt: 1}}
          >
            <TextField
              {...register('email')}
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='off'
              autoFocus
            />
            <TextField
              {...register('password')}
              margin='normal'
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='off'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Запомнить'
            />
            <Button type='submit' fullWidth variant='contained' sx={{mt: 3, mb: 2}}>
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Test sx={{mt: 4, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}

function Test(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {
        'Для входа в тестовый профиль используйте адрес "test@test.com" с паролем "123" '
      }
    </Typography>
  );
}
