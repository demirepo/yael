import { Menu, MenuItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

type IdiomaMenuProps = {
  anchorEl: any;
  handleClose: () => void;
};

const IdiomaMenu: React.FC<IdiomaMenuProps> = ({ anchorEl, handleClose }) => {
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
        <Edit sx={{ mr: 2 }}></Edit>Edit
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <Delete sx={{ mr: 2 }}></Delete>Remove
      </MenuItem>
    </Menu>
  );
};

export default IdiomaMenu;
