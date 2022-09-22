import {Menu, MenuItem} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';

interface IdiomaMenuProps {
  anchorEl: any;
  handleClose: () => void;
}

function IdiomaMenu({anchorEl, handleClose}: IdiomaMenuProps) {
  const open = Boolean(anchorEl);

  const handleEdit = () => {
    handleClose();
  };
  const handleDelete = () => {
    handleClose();
  };

  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleEdit}>
        <Edit sx={{mr: 2}} />
        Edit
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <Delete sx={{mr: 2}} />
        Remove
      </MenuItem>
    </Menu>
  );
}

export default IdiomaMenu;
