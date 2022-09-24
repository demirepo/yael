import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form';
import Typography from '@mui/material/Typography';
import {Button, Divider, Grid, Stack} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface SettingsModalProps {
  showSettingsModal: boolean;
  serverAddress: string;
  handleCloseSettingsModal: () => void;
  onSubmit: any;
}

function SettingsModal({
  showSettingsModal,
  handleCloseSettingsModal,
  serverAddress,
  onSubmit,
}: SettingsModalProps) {
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal open={showSettingsModal} onClose={handleCloseSettingsModal}>
        <Box sx={style}>
          <Typography sx={{textAlign: 'center'}} variant='h5'>
            Настройки
          </Typography>
          <Stack divider={<Divider orientation='horizontal' flexItem />} spacing={2}>
            <Grid container />
            <TextField
              variant='outlined'
              defaultValue={serverAddress}
              {...register('serverAddress')}
            />
            <TextField
              variant='outlined'
              defaultValue={serverAddress}
              {...register('example')}
            />
            <Button type='submit'>Сохранить</Button>
          </Stack>
        </Box>
      </Modal>
    </form>
  );
}

export default SettingsModal;
