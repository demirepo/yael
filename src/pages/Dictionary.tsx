import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import RoundMenuButton from '../components/RoundMenuButton/RoundMenuButton';

const Dictionary = () => {
  console.log('rerender');
  const [wods, setWods] = React.useState([]);
  const [choosen, setChoosen] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        const response = await axios.get('http://192.168.1.14:5555/api/wods');
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

  const chooseClicked = (e: React.MouseEvent<HTMLElement>) => {
    const row = (e.target as HTMLElement).closest(
      '.MuiTableRow-root'
    ) as HTMLElement;
    if (row) {
      const id = row.children[0].innerHTML.toString();
      if (id) setChoosen(id);
    }
  };

  type Wod = {
    id: number;
    src: string;
    dst: string;
    dst_extended: string;
  };
  return (
    <>
      <TableContainer sx={{ mt: 1 }} component={Paper} elevation={5}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ borderBottom: '2px solid black' }}>
              <TableCell>Id</TableCell>
              <TableCell>Идиома</TableCell>
              <TableCell>Перевод</TableCell>
              <TableCell>Дополнительный перевод</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wods.map((el: Wod) => (
              <TableRow
                key={el.id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={chooseClicked}
              >
                <TableCell component='th'>{el.id}</TableCell>
                <TableCell>{el.src}</TableCell>
                <TableCell>{el.dst}</TableCell>
                <TableCell>{el.dst_extended}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RoundMenuButton />;
    </>
  );
};

export default Dictionary;
