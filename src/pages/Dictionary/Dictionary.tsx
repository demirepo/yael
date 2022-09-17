import axios from 'axios';
import React from 'react';
import RoundMenuButton from '../../components/RoundMenuButton/RoundMenuButton';
import IdiomaContextMenu from './IdiomaContextMenu';
import IdiomaTable from './IdiomaTable';

const Dictionary = () => {
  const [wods, setWods] = React.useState([]);
  const [, setChoosen] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<EventTarget | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const row = (e.target as HTMLElement).closest('.MuiButtonBase-root');
    if (row) {
      const id = row.children[0].innerHTML.toString();
      setChoosen(id);
      setAnchorEl(e.target);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        const response = await axios.get('http://192.168.1.2:5555/api/wods');
        setWods(response.data);
      } catch (error) {
        console.log('Ошибка запроса к wods api', error);
      }
    };

    if (isMounted) fetch();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <IdiomaTable wods={wods} chooseClicked={handleClick} />
      <IdiomaContextMenu anchorEl={anchorEl} handleClose={handleClose} />
      <RoundMenuButton />;
    </>
  );
};

export default Dictionary;
