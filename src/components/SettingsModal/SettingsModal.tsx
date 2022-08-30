import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

type SettingsModalProps = {
  showSettingsModal: boolean;
  handleCloseSettingsModal: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  showSettingsModal,
  handleCloseSettingsModal,
}) => {
  return (
    <>
      <Modal open={showSettingsModal} onClose={handleCloseSettingsModal}>
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Text in a modal
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default SettingsModal;
