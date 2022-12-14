import {useForm} from 'react-hook-form';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {useAppDispatch} from '../../hooks/redux';

import {signupThunk} from '../../store/userSlice';

const theme = createTheme();

export default function Signup() {
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(signupThunk(data.email, data.password));
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
            Введите данные для регистации нового пользователя
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
            <Button type='submit' fullWidth variant='contained' sx={{mt: 3, mb: 2}}>
              Регистрация
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
