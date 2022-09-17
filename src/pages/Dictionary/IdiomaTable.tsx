import { MoreVert } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';

interface Wod {
  id: number;
  src: string;
  dst: string;
  dst_extended: string;
}

const IdiomaTable = ({ wods, chooseClicked }: any) => {
  return (
    <TableContainer sx={{ mt: 1 }} component={Paper} elevation={5}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow sx={{ borderBottom: '2px solid black' }}>
            <TableCell>Id</TableCell>
            <TableCell sx={{ pr: 20 }}>Идиома</TableCell>
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
              <TableCell>{el.id}</TableCell>
              <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                {el.src}
                <Box sx={{ ml: 'auto' }}>
                  <Tooltip
                    title='Операции'
                    enterDelay={1000}
                    enterNextDelay={1000}
                    placement='right'
                    onClick={chooseClicked}
                  >
                    <IconButton>
                      <MoreVert></MoreVert>
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>{el.dst}</TableCell>
              <TableCell>{el.dst_extended}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IdiomaTable;
