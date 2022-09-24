import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {signinThunk} from '../../store/userSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';

const theme = createTheme();

export default function Signin() {
  const dispatch = useAppDispatch();
  const {isLoading, userError} = useAppSelector((state) => state.user);

  const onSubmit = (data: any) => {
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{mt: 3, mb: 2}}
              disabled={isLoading}
            >
              Войти
            </Button>
            {userError && <Alert severity='error'>{userError}</Alert>}
            <Grid container justifyContent='center'>
              <Grid item>
                <Link component={NavLink} to='/signup' variant='body2'>
                  Нет аккаунта? Зарегистрируйтесь
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <TestAccountInfo />
      </Container>
    </ThemeProvider>
  );
}

function TestAccountInfo() {
  return (
    <Box sx={{pt: 4, pb: 4}}>
      <Typography variant='body2' color='text.secondary' align='center'>
        {
          'Для входа в тестовый профиль используйте адрес "test@test.com" с паролем "123" '
        }
      </Typography>
    </Box>
  );
}
