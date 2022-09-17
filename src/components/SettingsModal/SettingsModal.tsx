import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { Divider, Grid, Stack } from '@mui/material';

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
}

const SettingsModal = ({
  showSettingsModal,
  handleCloseSettingsModal,
  serverAddress,
}: SettingsModalProps) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal open={showSettingsModal} onClose={handleCloseSettingsModal}>
          <Box sx={style}>
            <Typography sx={{ textAlign: 'center' }} variant='h5'>
              Настройки
            </Typography>
            <Stack
              divider={<Divider orientation='horizontal' flexItem />}
              spacing={2}
            >
              <Grid container></Grid>
              <TextField
                variant='outlined'
                defaultValue={serverAddress}
                {...register('example')}
              ></TextField>
              <TextField
                variant='outlined'
                defaultValue={serverAddress}
                {...register('example')}
              ></TextField>
            </Stack>
          </Box>
        </Modal>
      </form>
    </>
  );
};

export default SettingsModal;
